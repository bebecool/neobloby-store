import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { deleteFilesWorkflow } from "@medusajs/core-flows"
import { HttpTypes } from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  MedusaError,
  Modules,
  remoteQueryObjectFromString,
} from "@medusajs/framework/utils"

export const GET = async (
  req: AuthenticatedMedusaRequest<HttpTypes.SelectParams>,
  res: MedusaResponse<HttpTypes.AdminFileResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const variables = { id: req.params.id }

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "file",
    variables,
    fields: req.queryConfig.fields,
  })

  const [file] = await remoteQuery(queryObject)
  if (!file) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      `File with id: ${req.params.id} not found`
    )
  }

  res.status(200).json({ file })
}

export const DELETE = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse<HttpTypes.AdminFileDeleteResponse>
) => {
  const logger = req.scope.resolve("logger")
  const id = req.params.id

  logger.info(`[Custom File Deletion] Starting deletion of file: ${id}`)

  try {
    // First, get the file details from the database
    const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
    const queryObject = remoteQueryObjectFromString({
      entryPoint: "file",
      variables: { id },
      fields: ["id", "url"],
    })

    const [file] = await remoteQuery(queryObject)
    
    if (!file) {
      logger.warn(`[Custom File Deletion] File not found in database: ${id}`)
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `File with id: ${id} not found`
      )
    }

    logger.info(`[Custom File Deletion] File found in database: ${file.url}`)

    // Delete from MinIO storage using the File Module
    // The file module will use our custom MinIO provider to delete from storage
    const fileModuleService = req.scope.resolve(Modules.FILE)
    
    logger.info(`[Custom File Deletion] Calling deleteFiles on file module...`)
    await fileModuleService.deleteFiles([id])
    logger.info(`[Custom File Deletion] File deleted from MinIO successfully`)

    // Also run the standard workflow to clean up database entries
    logger.info(`[Custom File Deletion] Running deleteFilesWorkflow to clean database...`)
    await deleteFilesWorkflow(req.scope).run({
      input: { ids: [id] },
    })
    logger.info(`[Custom File Deletion] Database cleanup completed`)

    res.status(200).json({
      id,
      object: "file",
      deleted: true,
    })
  } catch (error) {
    logger.error(`[Custom File Deletion] Error deleting file ${id}:`, error)
    throw error
  }
}
