import type {
  MedusaRequest,
  MedusaResponse,
  MedusaNextFunction,
} from "@medusajs/framework/http"
import type { MiddlewaresConfig } from "@medusajs/framework/http"

export default {
  routes: [
    {
      matcher: "/admin/*",
      middlewares: [
        (req: MedusaRequest, res: MedusaResponse, next: MedusaNextFunction) => {
          const logger = req.scope.resolve("logger")
          
          // Log ALL DELETE requests
          if (req.method === "DELETE") {
            logger.warn("=================================================")
            logger.warn("🔴 DELETE REQUEST INTERCEPTED")
            logger.warn(`Method: ${req.method}`)
            logger.warn(`URL: ${req.url}`)
            logger.warn(`Path: ${req.path}`)
            logger.warn(`Base URL: ${req.baseUrl}`)
            logger.warn(`Original URL: ${req.originalUrl}`)
            logger.warn(`Params: ${JSON.stringify(req.params)}`)
            logger.warn(`Query: ${JSON.stringify(req.query)}`)
            logger.warn("=================================================")
          }
          
          next()
        },
      ],
    },
  ],
} satisfies MiddlewaresConfig
