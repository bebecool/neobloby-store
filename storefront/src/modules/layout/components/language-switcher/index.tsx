'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, usePathname } from 'next/navigation'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [currentLang, setCurrentLang] = useState('fr')
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const params = useParams()
  const pathname = usePathname()
  
  const locale = params?.locale as string | undefined
  const countryCode = params?.countryCode as string | undefined

  const languages = [
    { 
      code: 'fr', 
      name: 'Français', 
      flag: (
        <svg width="24" height="18" viewBox="0 0 24 18" className="rounded shadow-sm">
          <rect width="8" height="18" fill="#002654"/>
          <rect x="8" width="8" height="18" fill="#FFFFFF"/>
          <rect x="16" width="8" height="18" fill="#CE1126"/>
        </svg>
      )
    },
    { 
      code: 'en', 
      name: 'English', 
      flag: (
        <svg width="24" height="18" viewBox="0 0 24 18" className="rounded shadow-sm">
          <rect width="24" height="18" fill="#012169"/>
          <path d="M0 0L24 18M24 0L0 18" stroke="#FFFFFF" strokeWidth="2"/>
          <path d="M0 0L24 18M24 0L0 18" stroke="#C8102E" strokeWidth="1"/>
          <path d="M12 0V18M0 9H24" stroke="#FFFFFF" strokeWidth="3"/>
          <path d="M12 0V18M0 9H24" stroke="#C8102E" strokeWidth="2"/>
        </svg>
      )
    },
    { 
      code: 'de', 
      name: 'Deutsch', 
      flag: (
        <svg width="24" height="18" viewBox="0 0 24 18" className="rounded shadow-sm">
          <rect width="24" height="6" fill="#000000"/>
          <rect y="6" width="24" height="6" fill="#DD0000"/>
          <rect y="12" width="24" height="6" fill="#FFCE00"/>
        </svg>
      )
    },
    { 
      code: 'es', 
      name: 'Español', 
      flag: (
        <svg width="24" height="18" viewBox="0 0 24 18" className="rounded shadow-sm">
          <rect width="24" height="18" fill="#AA151B"/>
          <rect y="4.5" width="24" height="9" fill="#F1BF00"/>
        </svg>
      )
    },
    { 
      code: 'it', 
      name: 'Italiano', 
      flag: (
        <svg width="24" height="18" viewBox="0 0 24 18" className="rounded shadow-sm">
          <rect width="8" height="18" fill="#009246"/>
          <rect x="8" width="8" height="18" fill="#FFFFFF"/>
          <rect x="16" width="8" height="18" fill="#CE2B37"/>
        </svg>
      )
    },
    { 
      code: 'nl', 
      name: 'Nederlands', 
      flag: (
        <svg width="24" height="18" viewBox="0 0 24 18" className="rounded shadow-sm">
          <rect width="24" height="6" fill="#AE1C28"/>
          <rect y="6" width="24" height="6" fill="#FFFFFF"/>
          <rect y="12" width="24" height="6" fill="#21468B"/>
        </svg>
      )
    },
  ]

  useEffect(() => {
    setMounted(true)
    if (locale) {
      setCurrentLang(locale)
    } else if (i18n.language) {
      setCurrentLang(i18n.language.toLowerCase())
    }
  }, [locale, i18n.language])

  const toggleLanguage = async (lang: string) => {
    if (lang === currentLang) {
      setIsOpen(false)
      return
    }
    
    try {
      setCurrentLang(lang)
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('i18nextLng', lang)
        document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`
      }
      
      const pathSegments = pathname?.split("/").filter(Boolean) || []
      const pathAfterLocaleAndCountry = pathSegments.slice(2).join("/")
      const newPath = `/${lang}/${countryCode}${pathAfterLocaleAndCountry ? `/${pathAfterLocaleAndCountry}` : ''}`
      
      window.location.href = newPath
    } catch (error) {
      console.warn('Erreur changement langue:', error)
    }
  }

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-1 shadow-sm">
        <div className="w-11 h-11 bg-gray-100 rounded-xl animate-pulse"></div>
        <div className="w-11 h-11 bg-gray-100 rounded-xl animate-pulse hidden sm:block"></div>
      </div>
    )
  }

  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0]

  return (
    <>
      {/* Desktop: Dropdown */}
      <div className="relative hidden lg:block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm"
          aria-label="Changer de langue"
        >
          <span className="flex-shrink-0">{currentLanguage.flag}</span>
          <span className="text-sm font-medium text-gray-700">{currentLanguage.name}</span>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => toggleLanguage(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    currentLang === lang.code ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700'
                  }`}
                >
                  <span className="flex-shrink-0">{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                  {currentLang === lang.code && (
                    <svg className="w-4 h-4 ml-auto text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Mobile/Tablet: Inline flags */}
      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-1 shadow-sm lg:hidden">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => toggleLanguage(lang.code)}
            className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 ${
              currentLang === lang.code
                ? 'bg-primary shadow-md scale-110 ring-2 ring-primary/20'
                : 'bg-transparent hover:bg-gray-100 active:scale-95'
            }`}
            aria-label={lang.name}
            title={lang.name}
          >
            <span className="flex-shrink-0">{lang.flag}</span>
          </button>
        ))}
      </div>
    </>
  )
}

export default LanguageSwitcher
