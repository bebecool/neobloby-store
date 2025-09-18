"use client"

import { Button } from "@medusajs/ui"
import { useState } from "react"
import { useParams } from "next/navigation"
import { useTranslation } from "react-i18next"

import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

type AddToCartButtonProps = {
  product: HttpTypes.StoreProduct
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { t } = useTranslation()
  const params = useParams()
  
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!product.variants?.[0]?.id) return
    
    setIsAdding(true)
    try {
      await addToCart({
        variantId: product.variants[0].id,
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
    <Button
      onClick={handleAddToCart}
      disabled={isAdding || !product.variants?.[0]?.id}
      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
      isLoading={isAdding}
    >
      {isAdding ? 'Ajout...' : t('product.addToCart')}
    </Button>
  )
}
