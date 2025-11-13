import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { IFileModuleService } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export default async function handleFileDeleted({
  event: { data },
  container,
}: SubscriberArgs<{ id: string; file_key: string }>) {
  const logger = container.resolve("logger")
  const fileModuleService: IFileModuleService = container.resolve(Modules.FILE)

  try {
    logger.info(`[file-deleted subscriber] Received file deletion event for ID: ${data.id}, fileKey: ${data.file_key}`)

    if (!data.file_key) {
      logger.warn(`[file-deleted subscriber] No file_key provided, skipping deletion`)
      return
    }

    // Delete the file from storage
    await fileModuleService.deleteFiles([data.id])
    logger.info(`[file-deleted subscriber] Successfully deleted file ${data.file_key} from storage`)
  } catch (error) {
    logger.error(`[file-deleted subscriber] Failed to delete file: ${error.message}`)
  }
}

export const config: SubscriberConfig = {
  event: "file.deleted",
}
