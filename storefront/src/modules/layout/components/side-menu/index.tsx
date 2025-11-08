"use client"

import { Popover, Transition } from "@headlessui/react"
import { XMark } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import { Fragment } from "react"
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
          badgeClassName="absolute -right-1 -top-1 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white font-bold shadow-sm"
        />

        {/* Menu hamburger */}
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
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
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm text-ui-fg-on-color m-2 backdrop-blur-2xl">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-gradient-to-br from-primary/95 to-purple-600/95 rounded-3xl justify-between p-6 shadow-2xl"
                  >
                    {/* Header avec bouton fermer */}
                    <div className="flex justify-between items-center mb-8">
                      <div className="text-white">
                        <h2 className="text-2xl font-bold">Menu</h2>
                      </div>
                      <button 
                        data-testid="close-menu-button" 
                        onClick={close}
                        className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200"
                      >
                        <XMark className="text-white" />
                      </button>
                    </div>

                    {/* Navigation principale */}
                    <ul className="flex flex-col gap-4 items-start justify-start flex-1">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name} className="w-full">
                            <LocalizedClientLink
                              href={href}
                              className="text-2xl font-semibold leading-relaxed text-white hover:text-accent transition-all duration-300 flex items-center gap-3 p-3 rounded-xl hover:bg-white/10"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              <span className="text-accent">▶</span>
                              {name}
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>

                    {/* Paramètres - Langue et Pays */}
                    <div className="flex flex-col gap-4 border-t border-white/20 pt-6 mb-6">
                      <div className="text-white font-semibold mb-2 text-sm uppercase tracking-wide">
                        {t('settings.preferences')}
                      </div>
                      
                      {/* Sélecteur de langue */}
                      <div className="w-full">
                        <LanguageSwitcher />
                      </div>

                      {/* Sélecteur de pays */}
                      <div className="w-full">
                        <CountrySelect regions={regions || []} />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col gap-y-4">
                      <Text className="text-white/70 text-xs text-center">
                        © {new Date().getFullYear()} Neobloby Store. All rights reserved.
                      </Text>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
