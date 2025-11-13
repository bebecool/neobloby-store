import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { IFileModuleService } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export default async function handleProductMediaDeleted({
  event: { data },
  container,
}: SubscriberArgs<any>) {
  const logger = container.resolve("logger")
  
  logger.warn("🎯 ========== PRODUCT.UPDATED EVENT RECEIVED ==========")
  logger.warn(`🎯 Event data keys: ${JSON.stringify(Object.keys(data), null, 2)}`)
  logger.warn(`🎯 Full event data: ${JSON.stringify(data, null, 2)}`)
  logger.warn("🎯 ====================================================")

  // Try to detect deleted media
  // The data structure might contain before/after information or just the updated product
  if (data.additional_data) {
    logger.warn(`🎯 Additional data found: ${JSON.stringify(data.additional_data, null, 2)}`)
  }
}

export const config: SubscriberConfig = {
  event: "product.updated",
}
