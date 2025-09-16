'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@medusajs/ui'

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation('common')
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ]

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="transparent"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm"
      >
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.code.toUpperCase()}</span>
        <span className={`text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white border border-ui-border-base rounded-md shadow-lg z-50 min-w-32">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-ui-bg-subtle flex items-center gap-2 ${
                i18n.language === language.code ? 'bg-ui-bg-subtle' : ''
              }`}
            >
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
