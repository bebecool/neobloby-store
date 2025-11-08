'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, usePathname } from 'next/navigation'
import { updateRegion } from "@lib/data/cart"

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [currentLang, setCurrentLang] = useState('fr')
  const [mounted, setMounted] = useState(false)
  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1]

  useEffect(() => {
    setMounted(true)
    if (i18n.language) {
      setCurrentLang(i18n.language.toLowerCase())
    }
  }, [i18n.language])

  // SVG flags
  const FrenchFlag = () => (
    <svg width="24" height="18" viewBox="0 0 24 18" className="rounded">
      <rect width="8" height="18" fill="#002654"/>
      <rect x="8" width="8" height="18" fill="#FFFFFF"/>
      <rect x="16" width="8" height="18" fill="#CE1126"/>
    </svg>
  )

  const BritishFlag = () => (
    <svg width="24" height="18" viewBox="0 0 24 18" className="rounded">
      <rect width="24" height="18" fill="#012169"/>
      <path d="M0 0L24 18M24 0L0 18" stroke="#FFFFFF" strokeWidth="2"/>
      <path d="M0 0L24 18M24 0L0 18" stroke="#C8102E" strokeWidth="1"/>
      <path d="M12 0V18M0 9H24" stroke="#FFFFFF" strokeWidth="3"/>
      <path d="M12 0V18M0 9H24" stroke="#C8102E" strokeWidth="2"/>
    </svg>
  )

  const toggleLanguage = async (lang: string) => {
    if (lang === currentLang) return
    
    try {
      // Changer la langue dans i18n
      if (i18n && typeof i18n.changeLanguage === 'function') {
        await i18n.changeLanguage(lang)
        setCurrentLang(lang)
        window.dispatchEvent(new Event('languageChanged'))
      }
      
      // Changer le countryCode dans l'URL pour correspondre à la langue
      await updateRegion(lang, currentPath || '/')
    } catch (error) {
      console.warn('Erreur changement langue:', error)
    }
  }

  // Ne pas render pendant l'hydratation
  if (!mounted) {
    return (
      <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-2xl p-1.5">
        <div className="w-14 h-10 bg-white/30 rounded-xl"></div>
        <div className="w-14 h-10 bg-white/30 rounded-xl"></div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-2xl p-1.5">
      <button
        onClick={() => toggleLanguage('fr')}
        className={`flex items-center justify-center w-14 h-10 rounded-xl transition-all duration-300 ${
          currentLang === 'fr'
            ? 'bg-white shadow-lg scale-105'
            : 'bg-transparent hover:bg-white/10'
        }`}
        aria-label="Français"
      >
        <FrenchFlag />
      </button>
      <button
        onClick={() => toggleLanguage('en')}
        className={`flex items-center justify-center w-14 h-10 rounded-xl transition-all duration-300 ${
          currentLang === 'en'
            ? 'bg-white shadow-lg scale-105'
            : 'bg-transparent hover:bg-white/10'
        }`}
        aria-label="English"
      >
        <BritishFlag />
      </button>
    </div>
  )
}

export default LanguageSwitcher
