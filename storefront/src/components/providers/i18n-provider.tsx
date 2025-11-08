'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import i18n from '../../lib/i18n'

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const params = useParams()
  const locale = params?.locale as string | undefined

  useEffect(() => {
    // S'assurer que l'initialisation se fait uniquement côté client
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Charger la langue depuis l'URL (locale), puis localStorage, puis défaut
    const savedLang = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null
    const langToUse = locale || savedLang || 'fr'
    
    console.log('=== I18nProvider Debug ===')
    console.log('locale from URL:', locale)
    console.log('savedLang from localStorage:', savedLang)
    console.log('langToUse:', langToUse)
    console.log('i18n.isInitialized:', i18n.isInitialized)
    console.log('i18n.language:', i18n.language)
    console.log('========================')
    
    // Ne changer la langue QUE si elle est différente
    if (i18n.isInitialized && i18n.language !== langToUse) {
      console.log('Changing language from', i18n.language, 'to', langToUse)
      i18n.changeLanguage(langToUse).then(() => {
        console.log('Language changed successfully to:', i18n.language)
        // Sauvegarder dans localStorage après changement
        if (typeof window !== 'undefined') {
          localStorage.setItem('i18nextLng', langToUse)
        }
      })
    } else if (!i18n.isInitialized) {
      console.log('i18n not initialized yet, waiting...')
      // Attendre que i18n soit initialisé
      const checkInit = setInterval(() => {
        if (i18n.isInitialized) {
          clearInterval(checkInit)
          console.log('i18n initialized, changing language to:', langToUse)
          i18n.changeLanguage(langToUse)
        }
      }, 100)
      return () => clearInterval(checkInit)
    }
  }, [mounted, locale])

  // Ne pas render pendant l'hydratation pour éviter les différences SSR/client
  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}