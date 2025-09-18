"use client"

import { useTranslation } from 'react-i18next'
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function NavLinks() {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-3">
      <LocalizedClientLink 
        href="/store" 
        className="relative px-3 py-2 text-gray-800 hover:text-primary font-bold transition-all duration-300 rounded-lg hover:bg-primary/10 group"
      >
        <span className="relative z-10">{t('nav.shop')}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </LocalizedClientLink>
      
      <LocalizedClientLink 
        href="/search" 
        className="relative px-3 py-2 text-gray-800 hover:text-primary font-bold transition-all duration-300 rounded-lg hover:bg-primary/10 group"
      >
        <span className="relative z-10 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {t('nav.search')}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </LocalizedClientLink>
      
      <LocalizedClientLink 
        href="/about" 
        className="relative px-3 py-2 text-gray-800 hover:text-primary font-bold transition-all duration-300 rounded-lg hover:bg-primary/10 group"
      >
        <span className="relative z-10">{t('nav.about')}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </LocalizedClientLink>
    </div>
  )
}
