"use client";
import Image from "next/image";
import { useState } from "react";
import CartButton from "@modules/layout/components/cart-button";
import LanguageSwitcher from "@modules/layout/components/language-switcher";
import CountrySelect from "@modules/layout/components/country-select";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import NavLinks from "@modules/layout/components/nav-links";
import { useTranslation } from 'react-i18next';

import { StoreRegion } from "@medusajs/types";

type NeoBlobyHeaderProps = {
  regions: StoreRegion[];
};

export default function NeoBlobyHeader({ regions }: NeoBlobyHeaderProps) {
  const [currentLang, setCurrentLang] = useState('FR');
  const { t } = useTranslation();

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100 sticky top-0 z-50">
      <div className="container flex h-20 items-center justify-between px-4">
        {/* Logo + titre */}
        <div className="flex items-center gap-3 min-w-0">
          <Image
            src="/images/mascotte.png"
            alt="Mascotte Neobloby"
            width={70}
            height={70}
            className="bg-transparent w-[70px] h-[70px]"
            quality={100}
            priority
            style={{ width: '70px', height: '70px' }}
          />
          <Image
            src="/images/neobloby-logo-gradient.png"
            alt="Logo Neobloby"
            width={270}
            height={90}
            className="h-[90px] w-auto object-contain"
            priority
          />
        </div>
        
        {/* Menu desktop moderne */}
        <nav className="flex items-center gap-3">
          <div className="hidden sm:block">
            <NavLinks />
          </div>
          
          <div className="flex items-center gap-1 ml-2 pl-2 border-l border-gray-200">
            {/* Sélecteur de langue moderne */}
            <div className="scale-95">
              <LanguageSwitcher />
            </div>
            
            {/* Sélecteur de pays d'expédition */}
            <div className="scale-95">
              <CountrySelect regions={regions} />
            </div>
            
            {/* Bouton compte */}
            <LocalizedClientLink 
              href="/account" 
              className="relative p-2 text-gray-600 hover:text-primary transition-all duration-300 rounded-xl hover:bg-primary/5 group"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </LocalizedClientLink>
            
            {/* Bouton panier Medusa avec design moderne */}
            <CartButton 
              buttonClassName="relative rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 px-2.5 md:px-4 py-2 text-white font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
              badgeClassName="absolute -right-1 -top-1 rounded-full bg-accent px-1.5 py-0.5 text-xs text-black font-bold shadow-md min-w-[20px] text-center"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
