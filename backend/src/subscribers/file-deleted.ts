import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { IFileModuleService } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export default async function handleFileDeleted({
  event: { data },
  container,
}: SubscriberArgs<{ id: string; file_key?: string }>) {
  const logger = container.resolve("logger")
  const fileModuleService: IFileModuleService = container.resolve(Modules.FILE)

  try {
    logger.info(`[file-deleted subscriber] ========== FILE DELETION EVENT RECEIVED ==========`)
    logger.info(`[file-deleted subscriber] Event data: ${JSON.stringify(data, null, 2)}`)
    logger.info(`[file-deleted subscriber] File ID: ${data.id}`)
    logger.info(`[file-deleted subscriber] File key: ${data.file_key}`)

    // Retrieve the file details from the database to get the file_key
    let fileKey = data.file_key
    let fileUrl = null

    if (!fileKey) {
      logger.info(`[file-deleted subscriber] No file_key in event data, retrieving from database...`)
      try {
        const file = await fileModuleService.retrieveFile(data.id)
        fileUrl = file.url
        logger.info(`[file-deleted subscriber] Retrieved file from database: ${JSON.stringify(file, null, 2)}`)
      } catch (error) {
        logger.warn(`[file-deleted subscriber] Could not retrieve file from database: ${error.message}`)
      }
    }

    const urlToProcess = fileKey || fileUrl
    
    if (!urlToProcess) {
      logger.warn(`[file-deleted subscriber] No file URL available, skipping MinIO deletion`)
      return
    }

    // Extract the actual filename from the URL
    // URL format: https://cdn.neobloby.com/medusa-media/filename.ext
    const filename = urlToProcess.split('/').pop()
    logger.info(`[file-deleted subscriber] Extracted filename from URL: ${filename}`)

    // Get the MinIO provider directly
    try {
      const minioProvider = (fileModuleService as any).providers_.find(
        (p: any) => p.constructor.identifier === 'minio-file'
      )

      if (!minioProvider) {
        logger.error(`[file-deleted subscriber] MinIO provider not found`)
        return
      }

      logger.info(`[file-deleted subscriber] Found MinIO provider, calling delete method...`)
      
      await minioProvider.delete({
        fileKey: filename,
      })
      
      logger.info(`[file-deleted subscriber] ✓ Successfully deleted file ${filename} from MinIO storage`)
    } catch (error) {
      logger.error(`[file-deleted subscriber] ✗ Failed to delete from MinIO: ${error.message}`)
      logger.error(`[file-deleted subscriber] Error stack: ${error.stack}`)
    }
  } catch (error) {
    logger.error(`[file-deleted subscriber] Error in file deletion handler: ${error.message}`)
    logger.error(`[file-deleted subscriber] Stack trace: ${error.stack}`)
  }
}

export const config: SubscriberConfig = {
  event: "file.deleted",
}
