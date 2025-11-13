import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { IFileModuleService } from "@medusajs/framework/types"
import { Modules, ContainerRegistrationKeys, remoteQueryObjectFromString } from "@medusajs/framework/utils"
import { Client } from "minio"

// In-memory cache to store product media before updates
// Structure: { productId: [imageUrl1, imageUrl2, ...] }
const productMediaCache = new Map<string, string[]>()

// MinIO configuration from environment
const MINIO_CONFIG = {
  endPoint: process.env.MINIO_ENDPOINT || 'bucket.railway.internal',
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY || '',
  secretKey: process.env.MINIO_SECRET_KEY || '',
  bucket: 'medusa-media'
}

export default async function handleProductMediaDeleted({
  event: { data },
  container,
}: SubscriberArgs<any>) {
  const logger = container.resolve("logger")
  const remoteQuery = container.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const fileModuleService: IFileModuleService = container.resolve(Modules.FILE)
  
  // Initialize MinIO client
  const minioClient = new Client({
    endPoint: MINIO_CONFIG.endPoint,
    port: MINIO_CONFIG.port,
    useSSL: MINIO_CONFIG.useSSL,
    accessKey: MINIO_CONFIG.accessKey,
    secretKey: MINIO_CONFIG.secretKey
  })

  try {
    // Get the current product data with images
    const queryObject = remoteQueryObjectFromString({
      entryPoint: "product",
      variables: { id: data.id },
      fields: ["id", "title", "images.*"],
    })

    const [product] = await remoteQuery(queryObject)
    
    if (!product) {
      return
    }

    // Extract current image URLs
    const currentImages = (product.images || []).map((img: any) => img.url)

    // Get cached images from before the update
    const previousImages = productMediaCache.get(data.id) || []

    // Find deleted images (in previous but not in current)
    const deletedImages = previousImages.filter(url => !currentImages.includes(url))
    
    if (deletedImages.length > 0) {
      // Delete each image from MinIO
      for (const imageUrl of deletedImages) {
        try {
          // Extract filename from URL
          // URL format: https://cdn.neobloby.com/medusa-media/filename.ext
          const filename = imageUrl.split('/').pop()
          
          if (!filename) {
            logger.warn(`Failed to extract filename from URL: ${imageUrl}`)
            continue
          }

          // Delete directly from MinIO using the MinIO client
          await minioClient.removeObject(MINIO_CONFIG.bucket, filename)
          logger.info(`✅ Deleted image from MinIO: ${filename}`)

        } catch (error) {
          logger.error(`❌ Failed to delete image from MinIO: ${imageUrl}`, error)
        }
      }
    }

    // Update cache with current images for next time
    productMediaCache.set(data.id, currentImages)

  } catch (error) {
    logger.error(`Error processing product media deletion:`, error)
  }
}

export const config: SubscriberConfig = {
  event: "product.updated",
}
