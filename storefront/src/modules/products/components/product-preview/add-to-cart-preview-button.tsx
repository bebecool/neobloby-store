"use client"

import { useState } from "react"
import { Button } from "@medusajs/ui"
import { useParams } from "next/navigation"
import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { useCart } from "@lib/context/cart-context"

interface AddToCartPreviewButtonProps {
  product: HttpTypes.StoreProduct & {
    variants?: HttpTypes.StoreProductVariant[] | null
  }
}

export default function AddToCartPreviewButton({ product }: AddToCartPreviewButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const countryCode = useParams().countryCode as string
  const { openCart, setCartCount } = useCart()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!product.variants || product.variants.length === 0) {
      return
    }

    setIsLoading(true)

    try {
      await addToCart({
        variantId: product.variants[0].id,
        quantity: 1,
        countryCode,
      })
      
      setIsAdded(true)
      
      // Ouvrir le panneau panier sur mobile
      if (window.innerWidth < 768) {
        openCart()
      }
      
      setTimeout(() => setIsAdded(false), 2000)
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading || !product.variants || product.variants.length === 0}
      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-xl shadow-lg text-sm btn-smooth-hover"
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Ajout...
        </span>
      ) : isAdded ? (
        "✓ Ajouté au panier !"
      ) : (
        "Ajouter au panier"
      )}
    </Button>
  )
}
