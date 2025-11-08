'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../lib/i18n'

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState('fr')
  const params = useParams()
  const locale = (params?.locale as string) || 'fr'

  useEffect(() => {
    if (locale !== i18n.language) {
      i18n.changeLanguage(locale).then(() => {
        setCurrentLang(locale)
      })
    } else {
      setCurrentLang(locale)
    }
  }, [locale])

  return (
    <I18nextProvider i18n={i18n} key={currentLang}>
      {children}
    </I18nextProvider>
  )
}