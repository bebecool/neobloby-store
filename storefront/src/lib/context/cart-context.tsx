"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface CartContextType {
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  cartCount: number
  setCartCount: (count: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  return (
    <CartContext.Provider value={{
      isCartOpen,
      openCart,
      closeCart,
      cartCount,
      setCartCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
