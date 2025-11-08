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
                    className="flex flex-col h-full bg-gradient-to-br from-primary/95 via-purple-600/95 to-primary/95 rounded-3xl justify-between shadow-2xl overflow-hidden"
                  >
                    {/* Header avec bouton fermer */}
                    <div className="flex justify-between items-center p-6 pb-4 border-b border-white/10">
                      <div className="text-white">
                        <h2 className="text-3xl font-bold tracking-tight">Menu</h2>
                      </div>
                      <button 
                        data-testid="close-menu-button" 
                        onClick={close}
                        className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 hover:scale-110"
                      >
                        <XMark className="text-white w-6 h-6" />
                      </button>
                    </div>

                    {/* Navigation principale */}
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                      <ul className="flex flex-col gap-2">
                        {Object.entries(SideMenuItems).map(([name, href]) => {
                          return (
                            <li key={name}>
                              <LocalizedClientLink
                                href={href}
                                className="group flex items-center gap-4 text-white text-xl font-semibold p-4 rounded-2xl hover:bg-white/10 transition-all duration-300 active:scale-95"
                                onClick={close}
                                data-testid={`${name.toLowerCase()}-link`}
                              >
                                <svg 
                                  className="w-5 h-5 text-accent transition-transform group-hover:translate-x-1" 
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

                    {/* Section Paramètres */}
                    <div className="px-6 py-4 border-t border-white/10 bg-black/10 backdrop-blur-sm">
                      <div className="text-white/80 font-bold mb-4 text-xs uppercase tracking-wider">
                        Paramètres
                      </div>
                      
                      {/* Sélecteur de langue - Style iOS */}
                      <div className="mb-3">
                        <label className="text-white text-sm font-medium mb-2 block">
                          Langue
                        </label>
                        <LanguageSwitcher />
                      </div>

                      {/* Sélecteur de pays */}
                      <div className="w-full">
                        <CountrySelect regions={regions || []} />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-black/20">
                      <Text className="text-white/60 text-xs text-center leading-relaxed">
                        © {new Date().getFullYear()} Neobloby Store<br/>All rights reserved.
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
