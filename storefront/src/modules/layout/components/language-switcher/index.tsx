'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation()
  const [currentLang, setCurrentLang] = useState('FR')
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Synchroniser avec la langue actuelle d'i18n uniquement côté client
    if (i18n.language) {
      setCurrentLang(i18n.language.toUpperCase())
    }
  }, [i18n.language])

  // SVG flags identiques à l'ancien front
  const FrenchFlag = () => (
    <svg width="20" height="15" viewBox="0 0 20 15" className="rounded-sm">
      <rect width="6.67" height="15" fill="#002654"/>
      <rect x="6.67" width="6.67" height="15" fill="#FFFFFF"/>
      <rect x="13.33" width="6.67" height="15" fill="#CE1126"/>
    </svg>
  );

  const BritishFlag = () => (
    <svg width="20" height="15" viewBox="0 0 20 15" className="rounded-sm">
      <rect width="20" height="15" fill="#012169"/>
      <path d="M0 0L20 15M20 0L0 15" stroke="#FFFFFF" strokeWidth="2"/>
      <path d="M0 0L20 15M20 0L0 15" stroke="#C8102E" strokeWidth="1"/>
      <path d="M10 0V15M0 7.5H20" stroke="#FFFFFF" strokeWidth="3"/>
      <path d="M10 0V15M0 7.5H20" stroke="#C8102E" strokeWidth="2"/>
    </svg>
  );

  const toggleLanguage = async () => {
    const newLang = currentLang === 'FR' ? 'EN' : 'FR'
    const newLangCode = newLang.toLowerCase()
    
    try {
      if (i18n && typeof i18n.changeLanguage === 'function') {
        await i18n.changeLanguage(newLangCode)
        setCurrentLang(newLang)
        // Forcer un re-render pour s'assurer que tous les composants se mettent à jour
        window.dispatchEvent(new Event('languageChanged'))
      }
    } catch (error) {
      console.warn('Erreur changement langue:', error)
    }
  }

  // Ne pas render pendant l'hydratation
  if (!mounted) {
    return (
      <div className="relative">
        <button className="flex items-center gap-2 rounded-xl bg-white hover:bg-gray-50 px-4 py-2.5 text-primary font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200 hover:border-primary/20">
          <div className="w-5 h-4 bg-gray-200 rounded-sm"></div>
          <span className="font-medium">FR</span>
          <svg className="w-3 h-3 ml-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <button 
        onClick={toggleLanguage}
        className="flex items-center gap-2 rounded-xl bg-white hover:bg-gray-50 px-4 py-2.5 text-primary font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200 hover:border-primary/20"
      >
        {currentLang === 'FR' ? <FrenchFlag /> : <BritishFlag />}
        <span className="font-medium">{currentLang}</span>
        <svg className="w-3 h-3 ml-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  )
}

export default LanguageSwitcher
