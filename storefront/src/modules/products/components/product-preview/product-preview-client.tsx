"use client"

import { Button } from "@medusajs/ui"
import { useState } from "react"
import { useParams } from "next/navigation"
import { useTranslation } from "react-i18next"

import { addToCart } from "@lib/data/cart"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { HttpTypes } from "@medusajs/types"
import { VariantPrice } from "types/global"

type ProductPreviewClientProps = {
  product: HttpTypes.StoreProduct
  pricedProduct: HttpTypes.StoreProduct
  cheapestPrice: VariantPrice | null
  isFeatured?: boolean
}

export default function ProductPreviewClient({
  product,
  pricedProduct,
  cheapestPrice,
  isFeatured,
}: ProductPreviewClientProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { t } = useTranslation()
  const params = useParams()
  
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!pricedProduct.variants?.[0]?.id) return
    
    setIsAdding(true)
    try {
      await addToCart({
        variantId: pricedProduct.variants[0].id,
        quantity: 1,
        countryCode: params.countryCode as string,
      })
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error)
    } finally {
      setIsAdding(false)
    }
  }

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
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-primary transition-colors duration-300" data-testid="product-title">
            {product.title}
          </h3>
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
          <Button
            onClick={handleAddToCart}
            disabled={isAdding || !pricedProduct.variants?.[0]?.id}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
            isLoading={isAdding}
          >
            {isAdding ? 'Ajout...' : t('product.addToCart')}
          </Button>
        </div>
      </div>
    </div>
  )
}
