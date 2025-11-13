import { AbstractFileProviderService, MedusaError } from '@medusajs/framework/utils';
import { Logger } from '@medusajs/framework/types';
import {
  ProviderUploadFileDTO,
  ProviderDeleteFileDTO,
  ProviderFileResultDTO,
  ProviderGetFileDTO,
  ProviderGetPresignedUploadUrlDTO
} from '@medusajs/framework/types';
import { Client } from 'minio';
import path from 'path';
import { ulid } from 'ulid';
import { Readable } from 'stream';

type InjectedDependencies = {
  logger: Logger
}

interface MinioServiceConfig {
  endPoint: string
  accessKey: string
  secretKey: string
  bucket?: string
  publicUrl?: string    // <-- ajout
}

export interface MinioFileProviderOptions extends MinioServiceConfig {}

const DEFAULT_BUCKET = 'medusa-media'

class MinioFileProviderService extends AbstractFileProviderService {
  static identifier = 'minio-file'
  protected readonly config_: MinioServiceConfig
  protected readonly logger_: Logger
  protected client: Client
  protected readonly bucket: string

  constructor({ logger }: InjectedDependencies, options: MinioFileProviderOptions) {
    super()
    this.logger_ = logger
    this.config_ = {
      endPoint: options.endPoint,
      accessKey: options.accessKey,
      secretKey: options.secretKey,
      bucket: options.bucket,
      publicUrl: options.publicUrl   // <-- ajout
    }

    this.bucket = this.config_.bucket || DEFAULT_BUCKET
    this.logger_.info(`MinIO service initialized with bucket: ${this.bucket}`)

    // Parser l'endpoint pour extraire le protocole, host et port
    let endPoint = this.config_.endPoint
    let port = 9000
    let useSSL = false

    // Si l'endpoint contient un protocole (http:// ou https://)
    if (endPoint.includes('://')) {
      const url = new URL(endPoint.startsWith('http') ? endPoint : `http://${endPoint}`)
      endPoint = url.hostname
      port = url.port ? parseInt(url.port) : (url.protocol === 'https:' ? 443 : 9000)
      useSSL = url.protocol === 'https:'
    } else if (endPoint.includes(':')) {
      // Si l'endpoint contient un port (ex: bucket.railway.internal:9000)
      const parts = endPoint.split(':')
      endPoint = parts[0]
      port = parseInt(parts[1])
    }

    this.logger_.info(`MinIO client config: endPoint=${endPoint}, port=${port}, useSSL=${useSSL}`)

    this.client = new Client({
      endPoint,
      port,
      useSSL,
      accessKey: this.config_.accessKey,
      secretKey: this.config_.secretKey
    })

    this.initializeBucket().catch(error => {
      this.logger_.error(`Failed to initialize MinIO bucket: ${error.message}`)
    })
  }

  static validateOptions(options: Record<string, any>) {
    const requiredFields = ['endPoint', 'accessKey', 'secretKey']
    requiredFields.forEach((field) => {
      if (!options[field]) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `${field} is required in the provider's options`
        )
      }
    })
  }

  private async initializeBucket(): Promise<void> {
    try {
      const bucketExists = await this.client.bucketExists(this.bucket)
      
      if (!bucketExists) {
        await this.client.makeBucket(this.bucket)
        this.logger_.info(`Created bucket: ${this.bucket}`)

        const policy = {
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'PublicRead',
              Effect: 'Allow',
              Principal: '*',
              Action: ['s3:GetObject'],
              Resource: [`arn:aws:s3:::${this.bucket}/*`]
            }
          ]
        }

        await this.client.setBucketPolicy(this.bucket, JSON.stringify(policy))
        this.logger_.info(`Set public read policy for bucket: ${this.bucket}`)
      } else {
        this.logger_.info(`Using existing bucket: ${this.bucket}`)
        try {
          const policy = {
            Version: '2012-10-17',
            Statement: [
              {
                Sid: 'PublicRead',
                Effect: 'Allow',
                Principal: '*',
                Action: ['s3:GetObject'],
                Resource: [`arn:aws:s3:::${this.bucket}/*`]
              }
            ]
          }
          await this.client.setBucketPolicy(this.bucket, JSON.stringify(policy))
          this.logger_.info(`Updated public read policy for existing bucket: ${this.bucket}`)
        } catch (policyError) {
          this.logger_.warn(`Failed to update policy for existing bucket: ${policyError.message}`)
        }
      }
    } catch (error) {
      this.logger_.error(`Error initializing bucket: ${error.message}`)
      throw error
    }
  }

  async upload(file: ProviderUploadFileDTO): Promise<ProviderFileResultDTO> {
    if (!file?.filename) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, 'No filename provided')
    }

    try {
      const parsedFilename = path.parse(file.filename)
      const fileKey = `${parsedFilename.name}-${ulid()}${parsedFilename.ext}`
      
      // Gérer différents types de contenu
      let content: Buffer
      const fileContent = file.content as any
      
      if (Buffer.isBuffer(file.content)) {
        // Déjà un Buffer, l'utiliser directement
        content = file.content
        this.logger_.debug(`File content is already a Buffer (${content.length} bytes)`)
      } else if (fileContent?.pipe && typeof fileContent.pipe === 'function') {
        // Si c'est un stream (vérifié par la présence de .pipe)
        const chunks: Buffer[] = []
        for await (const chunk of fileContent) {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
        }
        content = Buffer.concat(chunks)
        this.logger_.debug(`Converted stream to Buffer (${content.length} bytes)`)
      } else if (typeof file.content === 'string') {
        // Si c'est une string, l'utiliser directement comme Buffer
        content = Buffer.from(file.content, 'utf-8')
        this.logger_.debug(`Converted string to Buffer (${content.length} bytes)`)
      } else if (fileContent instanceof ArrayBuffer) {
        // Si c'est un ArrayBuffer
        content = Buffer.from(new Uint8Array(fileContent))
        this.logger_.debug(`Converted ArrayBuffer to Buffer (${content.length} bytes)`)
      } else if (ArrayBuffer.isView(fileContent)) {
        // Si c'est un TypedArray (Uint8Array, etc.)
        content = Buffer.from(fileContent.buffer, fileContent.byteOffset, fileContent.byteLength)
        this.logger_.debug(`Converted TypedArray to Buffer (${content.length} bytes)`)
      } else {
        this.logger_.error(`Unknown content type: ${typeof file.content}`)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, `Invalid file content type: ${typeof file.content}`)
      }

      await this.client.putObject(
        this.bucket,
        fileKey,
        content,
        content.length,
        {
          'Content-Type': file.mimeType,
          'x-amz-meta-original-filename': file.filename,
          'x-amz-acl': 'public-read'
        }
      )

      // Générer l'URL publique du fichier
      let url: string
      if (this.config_.publicUrl) {
        // Si publicUrl est fourni, l'utiliser directement
        const baseUrl = this.config_.publicUrl.endsWith('/') 
          ? this.config_.publicUrl.slice(0, -1) 
          : this.config_.publicUrl
        url = `${baseUrl}/${this.bucket}/${fileKey}`
      } else {
        // Sinon, construire l'URL à partir de l'endpoint
        const protocol = this.config_.endPoint.includes('localhost') || this.config_.endPoint.includes('127.0.0.1') 
          ? 'http' 
          : 'https'
        url = `${protocol}://${this.config_.endPoint}/${this.bucket}/${fileKey}`
      }

      this.logger_.info(`Successfully uploaded file ${fileKey} to MinIO bucket ${this.bucket}, URL: ${url}`)

      return { url, key: fileKey }
    } catch (error) {
      this.logger_.error(`Failed to upload file: ${error.message}`)
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to upload file: ${error.message}`
      )
    }
  }

  async delete(
    fileData: ProviderDeleteFileDTO
  ): Promise<void> {
    if (!fileData?.fileKey) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'No file key provided'
      )
    }

    try {
      await this.client.removeObject(this.bucket, fileData.fileKey)
      this.logger_.info(`Successfully deleted file ${fileData.fileKey} from MinIO bucket ${this.bucket}`)
    } catch (error) {
      // Log error but don't throw if file doesn't exist
      this.logger_.warn(`Failed to delete file ${fileData.fileKey}: ${error.message}`)
    }
  }

  async getPresignedDownloadUrl(fileData: ProviderGetFileDTO): Promise<string> {
    if (!fileData?.fileKey) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, 'No file key provided')
    }
    try {
      // Si publicUrl est configuré, retourner l'URL publique directe
      // au lieu d'une URL pré-signée (qui pointe vers l'endpoint interne)
      if (this.config_.publicUrl) {
        const baseUrl = this.config_.publicUrl.endsWith('/') 
          ? this.config_.publicUrl.slice(0, -1) 
          : this.config_.publicUrl
        const publicUrl = `${baseUrl}/${this.bucket}/${fileData.fileKey}`
        this.logger_.info(`Using public URL for file ${fileData.fileKey}: ${publicUrl}`)
        return publicUrl
      }

      // Fallback : générer une URL pré-signée (pour environnements sans URL publique)
      const url = await this.client.presignedGetObject(
        this.bucket,
        fileData.fileKey,
        24 * 60 * 60
      )
      this.logger_.info(`Generated presigned URL for file ${fileData.fileKey}`)
      return url
    } catch (error) {
      this.logger_.error(`Failed to generate URL: ${error.message}`)
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to generate URL: ${error.message}`
      )
    }
  }

  async getPresignedUploadUrl(
    fileData: ProviderGetPresignedUploadUrlDTO
  ): Promise<ProviderFileResultDTO> {
    if (!fileData?.filename) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'No filename provided'
      )
    }

    try {
      // Use the filename directly as the key (matches S3 provider behavior for presigned uploads)
      const fileKey = fileData.filename

      // Generate presigned PUT URL that expires in 15 minutes
      const url = await this.client.presignedPutObject(
        this.bucket,
        fileKey,
        15 * 60 // URL expires in 15 minutes
      )

      return {
        url,
        key: fileKey
      }
    } catch (error) {
      this.logger_.error(`Failed to generate presigned upload URL: ${error.message}`)
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to generate presigned upload URL: ${error.message}`
      )
    }
  }

  async getAsBuffer(fileData: ProviderGetFileDTO): Promise<Buffer> {
    if (!fileData?.fileKey) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'No file key provided'
      )
    }

    try {
      const stream = await this.client.getObject(this.bucket, fileData.fileKey)
      const buffer = await new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = []

        stream.on('data', (chunk: Buffer) => chunks.push(chunk))
        stream.on('end', () => resolve(Buffer.concat(chunks)))
        stream.on('error', reject)
      })

      this.logger_.info(`Retrieved buffer for file ${fileData.fileKey}`)
      return buffer
    } catch (error) {
      this.logger_.error(`Failed to get buffer: ${error.message}`)
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to get buffer: ${error.message}`
      )
    }
  }

  async getDownloadStream(fileData: ProviderGetFileDTO): Promise<Readable> {
    if (!fileData?.fileKey) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'No file key provided'
      )
    }

    try {
      // Get the MinIO stream directly
      const minioStream = await this.client.getObject(this.bucket, fileData.fileKey)

      this.logger_.info(`Retrieved download stream for file ${fileData.fileKey}`)
      return minioStream
    } catch (error) {
      this.logger_.error(`Failed to get download stream: ${error.message}`)
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to get download stream: ${error.message}`
      )
    }
  }
}

export default MinioFileProviderService
