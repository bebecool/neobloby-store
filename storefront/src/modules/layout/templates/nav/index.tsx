
import { Suspense } from "react"
import Image from "next/image"

import { listRegions } from "@lib/data/regions"
import { retrieveCart } from "@lib/data/cart"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import LanguageSwitcher from "@modules/layout/components/language-switcher"
import CountrySelect from "@modules/layout/components/country-select"
import NavLinks from "@modules/layout/components/nav-links"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  
  // Récupérer le panier pour le passer au SideMenu
  let cart = null
  try {
    cart = await retrieveCart()
  } catch (error) {
    // Si erreur, cart reste null
  }

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="bg-white shadow-lg rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 flex h-16 md:h-20 items-center justify-between">
          {/* Logo + titre NeoBloby */}
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <LocalizedClientLink href="/" className="flex items-center gap-2 md:gap-3">
              <Image
                src="/images/mascotte.png"
                alt="Mascotte Neobloby"
                width={70}
                height={70}
                className="bg-transparent w-[70px] h-[70px]"
                style={{ width: '70px', height: '70px' }}
                unoptimized
              />
              <Image
                src="/images/neobloby-logo-gradient.png"
                alt="Logo Neobloby"
                width={200}
                height={60}
                className="h-10 md:h-14 w-auto object-contain"
                unoptimized
              />
            </LocalizedClientLink>
          </div>

          {/* Navigation desktop avec design NeoBloby */}
          <nav className="hidden md:flex items-center gap-6 text-base font-medium">
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

          {/* Menu burger mobile */}
          <div className="md:hidden">
            <SideMenu regions={regions} cart={cart} />
          </div>
        </div>
      </header>
    </div>
  )
}
