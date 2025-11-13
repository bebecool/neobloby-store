import type { MiddlewaresConfig } from "@medusajs/medusa"

export const config: MiddlewaresConfig = {
  routes: [
    {
      matcher: "/admin/*",
      middlewares: [
        (req, res, next) => {
          // Récupérer le logger depuis le scope
          const logger = req.scope.resolve("logger")
          
          // Log ALL DELETE requests to admin endpoints
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
}
