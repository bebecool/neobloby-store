'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../lib/i18n'

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const locale = (params?.locale as string) || 'fr'

  useEffect(() => {
    // Changer la langue de manière asynchrone sans bloquer le rendu
    if (locale && locale !== i18n.language) {
      i18n.changeLanguage(locale).catch((error) => {
        console.error('Erreur changement de langue:', error)
      })
    }
  }, [locale])

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  )
}