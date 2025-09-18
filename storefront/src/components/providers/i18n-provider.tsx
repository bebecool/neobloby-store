'use client'

import { useEffect, useState } from 'react'
import '../../lib/i18n' // Importer la configuration i18n

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // S'assurer que l'initialisation se fait uniquement côté client
    setMounted(true)
    import('../../lib/i18n')
  }, [])

  // Ne pas render pendant l'hydratation pour éviter les différences SSR/client
  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}