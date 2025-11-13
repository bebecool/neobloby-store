import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { IFileModuleService } from "@medusajs/framework/types"
import { Modules, ContainerRegistrationKeys, remoteQueryObjectFromString } from "@medusajs/framework/utils"

// In-memory cache to store product media before updates
// Structure: { productId: [imageUrl1, imageUrl2, ...] }
const productMediaCache = new Map<string, string[]>()

export default async function handleProductMediaDeleted({
  event: { data },
  container,
}: SubscriberArgs<any>) {
  const logger = container.resolve("logger")
  const remoteQuery = container.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const fileModuleService: IFileModuleService = container.resolve(Modules.FILE)
  
  logger.warn("🎯 ========== PRODUCT.UPDATED EVENT RECEIVED ==========")
  logger.warn(`🎯 Product ID: ${data.id}`)

  try {
    // Get the current product data with images
    const queryObject = remoteQueryObjectFromString({
      entryPoint: "product",
      variables: { id: data.id },
      fields: ["id", "title", "images.*"],
    })

    const [product] = await remoteQuery(queryObject)
    
    if (!product) {
      logger.warn(`🎯 Product not found: ${data.id}`)
      return
    }

    // Extract current image URLs
    const currentImages = (product.images || []).map((img: any) => img.url)
    logger.warn(`🎯 Current images: ${JSON.stringify(currentImages, null, 2)}`)

    // Get cached images from before the update
    const previousImages = productMediaCache.get(data.id) || []
    logger.warn(`🎯 Previous images (cached): ${JSON.stringify(previousImages, null, 2)}`)

    // Find deleted images (in previous but not in current)
    const deletedImages = previousImages.filter(url => !currentImages.includes(url))
    
    if (deletedImages.length > 0) {
      logger.warn(`🔥 IMAGES DELETED: ${deletedImages.length} image(s)`)
      logger.warn(`🔥 Deleted image URLs: ${JSON.stringify(deletedImages, null, 2)}`)

      // Delete each image from MinIO
      for (const imageUrl of deletedImages) {
        try {
          // Extract filename from URL
          // URL format: https://cdn.neobloby.com/medusa-media/filename.ext
          const filename = imageUrl.split('/').pop()
          
          if (!filename) {
            logger.warn(`🔥 Could not extract filename from URL: ${imageUrl}`)
            continue
          }

          logger.warn(`🔥 Deleting from MinIO: ${filename}`)

          // Use the file module service to delete the file
          // The file module will use our custom MinIO provider
          try {
            // Use remoteQuery to find the file by URL
            const queryObject = remoteQueryObjectFromString({
              entryPoint: "file",
              fields: ["id", "url"],
            })
            
            const files = await remoteQuery(queryObject)
            const fileRecord = files.find((f: any) => f.url === imageUrl)
            
            if (fileRecord?.id) {
              logger.warn(`🔥 Found file ID: ${fileRecord.id}, deleting...`)
              await fileModuleService.deleteFiles([fileRecord.id])
              logger.warn(`✅ Successfully deleted from MinIO and database: ${filename}`)
            } else {
              logger.warn(`🔥 File not found in database with URL: ${imageUrl}`)
              logger.warn(`🔥 Total files in database: ${files.length}`)
            }
          } catch (deleteError) {
            logger.error(`🔥 Error during file deletion:`)
            logger.error(deleteError)
          }

        } catch (error) {
          logger.error(`🔥 Error deleting image from MinIO:`, error)
        }
      }
    } else {
      logger.warn(`🎯 No images were deleted in this update`)
    }

    // Update cache with current images for next time
    productMediaCache.set(data.id, currentImages)
    logger.warn(`🎯 Updated cache with ${currentImages.length} image(s)`)
    logger.warn("🎯 ====================================================")

  } catch (error) {
    logger.error(`🎯 Error processing product update:`, error)
  }
}

export const config: SubscriberConfig = {
  event: "product.updated",
}
