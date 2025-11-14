"use client"

import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import { useParams } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getTranslatedField, getTranslatedCollectionField } from "@lib/util/product-translation"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const params = useParams()
  const locale = (params?.locale as string) || 'fr'
  
  console.log('ProductInfo - Locale:', locale)
  console.log('ProductInfo - Product metadata:', product.metadata)
  
  const translatedTitle = getTranslatedField(product, 'title', locale)
  const translatedDescription = getTranslatedField(product, 'description', locale)
  const translatedCollectionTitle = product.collection 
    ? getTranslatedCollectionField(product.collection, 'title', locale)
    : null

  console.log('ProductInfo - Translated title:', translatedTitle)
  console.log('ProductInfo - Original title:', product.title)

  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && translatedCollectionTitle && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {translatedCollectionTitle}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="text-3xl leading-10 text-ui-fg-base"
          data-testid="product-title"
        >
          {translatedTitle}
        </Heading>

        <Text
          className="text-medium text-ui-fg-subtle whitespace-pre-line"
          data-testid="product-description"
        >
          {translatedDescription}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
