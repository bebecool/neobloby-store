"use client"

import { useState } from "react"
import { XMark } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import { useTranslation } from 'react-i18next'

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import LanguageSwitcher from "@modules/layout/components/language-switcher"
import CountrySelect from "@modules/layout/components/country-select"

const SideMenu = ({ 
  regions,
  cart 
}: { 
  regions: HttpTypes.StoreRegion[] | null
  cart: HttpTypes.StoreCart | null
}) => {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)

  const open = () => {
    setMenuVisible(true)
    setTimeout(() => setMenuOpen(true), 10) // Laisse le composant se monter avant la transition
  }
  
  const close = () => {
    setMenuOpen(false)
    setTimeout(() => setMenuVisible(false), 300) // Attend la fin de la transition avant de démonter
  }
  
  const SideMenuItems = {
    [t('nav.home') || 'Home']: "/",
    [t('nav.shop') || 'Store']: "/store",
    [t('nav.search') || 'Search']: "/search",
    [t('nav.account') || 'Account']: "/account",
    [t('nav.cart') || 'Cart']: "/cart",
  }

  return (
    <div className="h-full">
      <div className="flex items-center h-full gap-4">
        {/* Utilisation du vrai CartDropdown */}
        <CartDropdown 
          cart={cart} 
          buttonClassName="relative rounded-xl bg-primary hover:bg-primary/90 px-2.5 md:px-3 py-2 text-white font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          badgeClassName="absolute -right-1 -top-1 rounded-full bg-accent px-2 py-0.5 text-xs text-black font-bold shadow-sm"
        />

        {/* Menu hamburger */}
        <button
          data-testid="nav-menu-button"
          onClick={open}
          className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-current"
          >
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Menu Sidebar avec animation fluide comme le panier */}
      {menuVisible && (
        <div className="fixed inset-0 z-[9999]" style={{ pointerEvents: 'none' }}>
          {/* Backdrop cliquable pour fermer le menu */}
          <div
            className={`absolute inset-0 z-[9998] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
            aria-label="Fermer le menu"
            tabIndex={-1}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
            style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          />
          
          {/* Panneau du menu - responsive : pleine largeur mobile, largeur fixe desktop */}
          <div className="absolute inset-y-0 right-0 z-[9999] w-full md:w-[28rem]" style={{ pointerEvents: 'auto' }}>
            <div className="h-full">
              <div 
                data-testid="nav-menu-popup"
                className={`h-full overflow-y-auto bg-gradient-to-br from-primary/95 via-purple-600/95 to-primary/95 shadow-xl transition-transform duration-300 ease-in-out will-change-transform ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
              >
                <div className="flex flex-col h-full">
                  {/* Header avec bouton fermer */}
                  <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
                    <div className="text-white">
                      <h2 className="text-2xl font-bold tracking-tight">Menu</h2>
                    </div>
                    {/* Bouton mobile : blanc avec croix noire */}
                    <button 
                      data-testid="close-menu-button-mobile" 
                      onClick={close}
                      className="flex md:hidden items-center justify-center bg-white rounded-full shadow-2xl p-2.5 border border-gray-300 hover:bg-gray-100 transition-all duration-200"
                      aria-label="Fermer le menu"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    {/* Bouton desktop : transparent avec croix blanche */}
                    <button 
                      data-testid="close-menu-button" 
                      onClick={close}
                      className="hidden md:flex p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 hover:scale-110"
                    >
                      <XMark className="text-white w-5 h-5" />
                    </button>
                  </div>

                  {/* Paramètres en haut - Langue et Pays */}
                  <div className="px-6 py-3 border-b border-white/10 bg-black/10 backdrop-blur-sm space-y-3">
                    {/* Sélecteur de langue */}
                    <div>
                      <label className="text-white text-xs font-medium mb-1.5 block">
                        Langue
                      </label>
                      <LanguageSwitcher />
                    </div>

                    {/* Sélecteur de pays */}
                    <div className="w-full">
                      <label className="text-white text-xs font-medium mb-1.5 block">
                        Pays de livraison
                      </label>
                      <CountrySelect regions={regions || []} />
                    </div>
                  </div>

                  {/* Navigation principale */}
                  <div className="flex-1 overflow-y-auto px-6 py-3">
                    <ul className="flex flex-col gap-1">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="group flex items-center gap-3 text-white text-lg font-semibold px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 active:scale-95"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              <svg 
                                className="w-4 h-4 text-accent transition-transform group-hover:translate-x-1" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="transition-all group-hover:translate-x-0.5">{name}</span>
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-3 border-t border-white/10 bg-black/20">
                    <Text className="text-white/60 text-[10px] text-center leading-relaxed">
                      © {new Date().getFullYear()} Neobloby Store · All rights reserved
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SideMenu
