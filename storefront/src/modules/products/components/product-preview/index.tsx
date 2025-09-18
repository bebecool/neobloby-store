import { Text } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import AddToCartPreviewButton from "./add-to-cart-preview-button"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary/20">
      <LocalizedClientLink href={`/products/${product.handle}`} className="block">
        <div data-testid="product-wrapper">
          <div className="relative overflow-hidden rounded-t-2xl">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="full"
              isFeatured={isFeatured}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </LocalizedClientLink>
      
      <div className="p-4 space-y-3">
        <div className="flex flex-col gap-2">
          <LocalizedClientLink href={`/products/${product.handle}`}>
            <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-primary transition-colors duration-300" data-testid="product-title">
              {product.title}
            </h3>
          </LocalizedClientLink>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {cheapestPrice && (
                <div className="bg-gradient-to-r from-primary to-purple-600 text-white px-3 py-1 rounded-full font-bold text-lg shadow-md">
                  <PreviewPrice price={cheapestPrice} />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <AddToCartPreviewButton product={pricedProduct} />
        </div>
      </div>
    </div>
  )
}
