"use client"

import { useTranslation } from 'react-i18next'
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function NavLinks() {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-2">
      <LocalizedClientLink 
        href="/store" 
        className="px-4 py-2.5 text-gray-700 hover:text-primary font-semibold transition-all duration-200 rounded-xl hover:bg-primary/5 active:scale-95"
      >
        {t('nav.shop')}
      </LocalizedClientLink>
      
      <LocalizedClientLink 
        href="/search" 
        className="px-4 py-2.5 text-gray-700 hover:text-primary font-semibold transition-all duration-200 rounded-xl hover:bg-primary/5 flex items-center gap-2 active:scale-95"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {t('nav.search')}
      </LocalizedClientLink>
      
      <LocalizedClientLink 
        href="/about" 
        className="px-4 py-2.5 text-gray-700 hover:text-primary font-semibold transition-all duration-200 rounded-xl hover:bg-primary/5 active:scale-95 whitespace-nowrap"
      >
        {t('nav.about')}
      </LocalizedClientLink>
    </div>
  )
}
