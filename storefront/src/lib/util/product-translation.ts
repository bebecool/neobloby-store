import { HttpTypes } from "@medusajs/types"

/**
 * Get translated product field from metadata
 * Falls back to default field if translation not found
 */
export function getTranslatedField(
  product: HttpTypes.StoreProduct,
  field: 'title' | 'description',
  locale: string
): string {
  // If locale is French (default), return the original field
  if (locale === 'fr' || !product.metadata) {
    return product[field] || ''
  }

  // Try to get translated field from metadata
  const translatedField = product.metadata[`${field}_${locale}`]
  
  if (translatedField && typeof translatedField === 'string') {
    return translatedField
  }

  // Fallback to original field
  return product[field] || ''
}

/**
 * Get translated product with all fields
 */
export function getTranslatedProduct(
  product: HttpTypes.StoreProduct,
  locale: string
): HttpTypes.StoreProduct {
  return {
    ...product,
    title: getTranslatedField(product, 'title', locale),
    description: getTranslatedField(product, 'description', locale),
  }
}

/**
 * Get translated collection field from metadata
 */
export function getTranslatedCollectionField(
  collection: HttpTypes.StoreCollection,
  field: 'title',
  locale: string
): string {
  // If locale is French (default), return the original field
  if (locale === 'fr' || !collection.metadata) {
    return collection[field] || ''
  }

  // Try to get translated field from metadata
  const translatedField = collection.metadata[`${field}_${locale}`]
  
  if (translatedField && typeof translatedField === 'string') {
    return translatedField
  }

  // Fallback to original field
  return collection[field] || ''
}
