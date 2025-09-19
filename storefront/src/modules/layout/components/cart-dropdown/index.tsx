"use client"

import { useState, useRef, useCallback } from "react"
import { Dialog } from "@headlessui/react"
import { XMark, Trash } from "@medusajs/icons"
import { convertToLocale } from "@lib/util/money"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { deleteLineItem, updateLineItem } from "@lib/data/cart"
import { useParams } from "next/navigation"
import { useTranslation } from 'react-i18next'

type CartDropdownProps = {
  cart: HttpTypes.StoreCart | null
  onClick?: () => void
  buttonClassName?: string
  badgeClassName?: string
}

const CartDropdown = ({ cart, onClick, buttonClassName = "relative rounded-xl bg-primary hover:bg-primary/90 px-5 py-2.5 text-white font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5", badgeClassName = "absolute -right-1 -top-1 rounded-full bg-accent px-2 py-0.5 text-xs text-black font-bold shadow-sm" }: CartDropdownProps) => {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const open = () => {
    setSidebarVisible(true)
    setTimeout(() => setSidebarOpen(true), 10) // Laisse le composant se monter avant la transition
  }
  const close = () => {
    if (!isUpdating) {
      setSidebarOpen(false)
      setTimeout(() => setSidebarVisible(false), 300) // Attend la fin de la transition avant de démonter
    }
  }

  // Fonction pour update avec gestion du loading
  const updateQuantity = async (lineId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setIsUpdating(true)
    try {
      await updateLineItem({
        lineId,
        quantity: newQuantity
      })
      // Pas de reload, juste revalidation
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  // Fonction pour supprimer avec gestion du loading
  const removeItem = async (lineId: string) => {
    setIsUpdating(true)
    try {
      await deleteLineItem(lineId)
      // Pas de reload, juste revalidation
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  // Gestion du survol avec timeout pour éviter les fermetures accidentelles
  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setShowDropdown(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false)
    }, 300) // 300ms de délai
  }, [])

  const params = useParams();
  const isFrench = params?.lang === "fr" || params?.countryCode === "fr";

  const totalItems =
    cart?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  return (
    <>
      {/* Container global avec gestion du survol */}
      <div 
        className="h-full relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className="h-full flex items-center text-ui-fg-subtle hover:text-ui-fg-base gap-2 relative"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            open()
            onClick?.()
          }}
        >
          <div className={buttonClassName}>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
              </svg>
              <span>{t('cart.title')}</span>
            </div>
            {/* Notification badge comme l'ancien front */}
            {totalItems > 0 && (
              <span className={badgeClassName}>
                {totalItems}
              </span>
            )}
          </div>
        </button>

        {/* Mini-panier au survol */}
        {showDropdown && (
          <div 
            className="absolute top-full right-0 mt-1 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Header violet avec icône panier */}
            <div className="bg-gradient-to-r from-primary to-purple-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center gap-2">
                <svg 
                  className="w-5 h-5" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                </svg>
                <h3 className="text-lg font-medium">{t('cart.myCart')}</h3>
              </div>
              <p className="text-sm opacity-90 mt-1">{totalItems} article{totalItems > 1 ? 's' : ''}</p>
                <div className="mt-2">
                  <span className="font-bold text-lg text-accent">
                    {t('cart.total')}: {convertToLocale({
                      amount: cart?.subtotal || 0,
                      currency_code: cart?.region?.currency_code || "EUR",
                    })}
                  </span>
              </div>
            </div>
            
            {/* Contenu du panier */}
            <div className="p-6">
              {!cart || !cart.items || cart.items.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Votre panier est vide</p>
              ) : (
                <>
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                          {item.variant?.product?.thumbnail && (
                            <Image
                              src={item.variant.product.thumbnail}
                              alt={item.title}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">
                            {item.title}
                          </h4>
                          {item.variant?.title && item.variant.title !== 'Default variant' && (
                            <p className="text-xs text-gray-500 mb-1">
                              {item.variant.title}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            Qté: {item.quantity}
                          </p>
                          <button
                            className="flex items-center justify-center text-xs text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full p-1 transition-all duration-200"
                            onClick={() => removeItem(item.id)}
                            disabled={isUpdating}
                            title="Supprimer"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-primary">
                            {convertToLocale({
                              amount: (item.unit_price || 0) * item.quantity,
                              currency_code: cart.region?.currency_code || "EUR",
                            })}
                          </div>
                          <div className="text-xs text-gray-500">
                            {convertToLocale({
                              amount: item.unit_price || 0,
                              currency_code: cart.region?.currency_code || "EUR",
                            })} / unité
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <LocalizedClientLink
                      href="/cart"
                      className="w-full bg-primary text-white text-center py-3 px-4 rounded-lg text-sm font-medium hover:bg-primary/90 block"
                    >
                      {t('cart.viewCart')}
                    </LocalizedClientLink>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Cart avec animation fluide */}
      {sidebarVisible && (
        <div className="fixed inset-0 z-[9999]" style={{ pointerEvents: 'none' }}>
          {/* Backdrop cliquable pour fermer le panier, derrière le panneau */}
          <div
            className={`absolute inset-0 z-[9998] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0"}`}
            aria-label="Fermer le panier"
            tabIndex={-1}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
            style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          ></div>
          {/* Panneau du panier - responsive : pleine largeur mobile, largeur fixe desktop */}
          <div className="absolute inset-y-0 right-0 z-[9999] w-full md:w-[28rem]" style={{ pointerEvents: 'auto' }}>
            <div className="h-full">
              <div className={`h-full overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-in-out will-change-transform ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex h-full flex-col">
                  {/* Bouton croix fermeture mobile */}
                  <button
                    onClick={close}
                    className="md:hidden fixed top-4 right-4 z-[60] bg-white rounded-full shadow-lg p-3 border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:scale-105"
                    aria-label="Fermer le panier"
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  {/* Header moderne */}
                  <div className="bg-gradient-to-r from-primary to-purple-600 text-white p-4 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                          </svg>
                          {t('cart.myCart')}
                        </h2>
                        <p className="text-white/80 text-sm">{totalItems} article{totalItems > 1 ? 's' : ''}</p>
                        {totalItems > 0 && (
                          <p className="text-accent font-semibold text-lg">
                            {t('cart.total')}: {convertToLocale({
                              amount: cart?.subtotal || 0,
                                  currency_code: cart?.region?.currency_code || "EUR",
                                })}
                              </p>
                            )}
                          </div>
                          <button 
                            onClick={close} 
                            className="hidden md:flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl px-3 py-1.5 text-white font-medium transition-all duration-200"
                          >
                            <span>{t('cart.close')}</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* Contenu du panier avec scroll */}
                      <div className="flex-1 overflow-y-auto min-h-0 p-3">
                        {!cart || !cart.items || cart.items.length === 0 ? (
                          <div className="text-center py-8">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                              </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('cart.empty')}</h3>
                            <p className="text-gray-500 text-sm">{t('cart.emptyDesc')}</p>
                          </div>
                        ) : (
                          <div className="space-y-3" style={{minHeight: 'fit-content'}}>
                            {cart.items.map((item) => (
                              <div key={item.id} className="group bg-white rounded-2xl border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-200 p-3">
                                <div className="flex items-center gap-3">
                                  <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-gray-100 flex-shrink-0">
                                    {item.variant?.product?.thumbnail && (
                                      <Image
                                        src={item.variant.product.thumbnail}
                                        alt={item.title}
                                        fill
                                        sizes="64px"
                                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                                      />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">{item.title}</h3>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <button 
                                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                          disabled={item.quantity <= 1 || isUpdating}
                                          className="w-7 h-7 rounded-full bg-gray-100 hover:bg-primary hover:text-white text-gray-600 font-semibold flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                          </svg>
                                        </button>
                                        <span className="font-bold text-gray-900 min-w-[24px] text-center text-sm">{item.quantity}</span>
                                        <button 
                                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                          disabled={isUpdating}
                                          className="w-7 h-7 rounded-full bg-gray-100 hover:bg-primary hover:text-white text-gray-600 font-semibold flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                          </svg>
                                        </button>
                                      </div>
                                      <div className="text-right">
                                        <div className="font-bold text-primary text-sm">
                                          {convertToLocale({
                                            amount: (item.unit_price || 0) * item.quantity,
                                            currency_code: cart?.region?.currency_code || "EUR",
                                          })}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                          {convertToLocale({
                                            amount: item.unit_price || 0,
                                            currency_code: cart?.region?.currency_code || "EUR",
                                          })} / unité
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <button 
                                    onClick={() => removeItem(item.id)}
                                    disabled={isUpdating}
                                    className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 flex items-center justify-center transition-all duration-200 hover:scale-105 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Supprimer l'article"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* Footer avec total et bouton payer */}
                      {cart && cart.items && cart.items.length > 0 && (
                        <div className="border-t bg-white flex-shrink-0 p-0 m-0 rounded-b-2xl shadow-inner">
                          <div className="p-6 pb-10 flex flex-col gap-4">
                            <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-gray-100">
                              <span className="text-lg font-semibold text-gray-700">{t('cart.total')}</span>
                              <span className="text-2xl font-bold text-primary">
                                {convertToLocale({
                                  amount: cart?.subtotal || 0,
                                  currency_code: cart?.region?.currency_code || "EUR",
                                })}
                              </span>
                            </div>
                            <LocalizedClientLink
                              href="/cart"
                              className="rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary px-6 py-4 font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl flex justify-center items-center gap-2 text-base w-full"
                              onClick={close}
                            >
                              <span className="flex items-center justify-center w-full">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                {t('cart.checkout')}
                              </span>
                            </LocalizedClientLink>
                            <div className="bg-white rounded-xl px-2 py-2 border border-gray-100 text-xs text-gray-500 text-center mt-2">
                              🔒 {t('cart.secure')} • 🚚 {t('cart.freeShipping')}
                            </div>
                          </div>
                        </div>
                      )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CartDropdown
