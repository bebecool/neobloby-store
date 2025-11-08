
import { Suspense } from "react"
import Image from "next/image"

import { listRegions } from "@lib/data/regions"
import { enrichLineItems, retrieveCart } from "@lib/data/cart"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import LanguageSwitcher from "@modules/layout/components/language-switcher"
import CountrySelect from "@modules/layout/components/country-select"
import NavLinks from "@modules/layout/components/nav-links"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  
  // Récupérer et enrichir le panier pour le passer au SideMenu
  let cart = null
  try {
    cart = await retrieveCart()
    if (cart?.items?.length) {
      const enrichedItems = await enrichLineItems(cart.items, cart.region_id!)
      cart.items = enrichedItems
    }
  } catch (error) {
    // Si erreur, cart reste null
  }

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="bg-white shadow-lg rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 flex h-16 md:h-20 items-center justify-between gap-4">
          {/* Logo + titre NeoBloby */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <LocalizedClientLink href="/" className="flex items-center gap-2 md:gap-3">
              <Image
                src="/images/mascotte.png"
                alt="Mascotte Neobloby"
                width={60}
                height={60}
                className="bg-transparent w-[60px] h-[60px]"
                style={{ width: '60px', height: '60px' }}
                unoptimized
              />
              <Image
                src="/images/neobloby-logo-gradient.png"
                alt="Logo Neobloby"
                width={180}
                height={50}
                className="h-9 md:h-12 w-auto object-contain"
                unoptimized
              />
            </LocalizedClientLink>
          </div>

          {/* Navigation desktop avec design NeoBloby */}
          <nav className="hidden md:flex items-center gap-3 text-base font-medium flex-1 justify-end">
            <NavLinks />
            
            {/* Sélecteur de langue */}
            <LanguageSwitcher />
            
            {/* Sélecteur de pays avec logique Medusa */}
            <CountrySelect regions={regions} />
            
            {/* Bouton compte */}
            <LocalizedClientLink href="/account" className="text-gray-600 hover:text-primary transition-all duration-300 p-2.5 rounded-xl hover:bg-gray-50">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </LocalizedClientLink>
            
            {/* Bouton panier Medusa */}
            <CartButton />
          </nav>

          {/* Actions mobiles : loupe + panier + menu burger */}
          <div className="md:hidden flex items-center gap-3">
            {/* Bouton recherche (loupe) sur mobile */}
            <LocalizedClientLink 
              href="/search" 
              className="text-gray-600 hover:text-primary transition-all duration-300 p-2 rounded-xl hover:bg-gray-50"
              aria-label="Rechercher"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </LocalizedClientLink>
            
            {/* Menu burger avec panier */}
            <SideMenu regions={regions} cart={cart} />
          </div>
        </div>
      </header>
    </div>
  )
}
