import type {
  MedusaRequest,
  MedusaResponse,
  MedusaNextFunction,
} from "@medusajs/framework/http"

export async function middleware(
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction
) {
  const logger = req.scope.resolve("logger")
  
  // Log toutes les requêtes DELETE vers l'admin
  if (req.method === "DELETE" && req.url.includes("/admin/")) {
    logger.warn(`[DELETE REQUEST INTERCEPTED] ${req.method} ${req.url}`)
    logger.warn(`[DELETE REQUEST INTERCEPTED] Params: ${JSON.stringify(req.params)}`)
    logger.warn(`[DELETE REQUEST INTERCEPTED] Query: ${JSON.stringify(req.query)}`)
  }
  
  next()
}
