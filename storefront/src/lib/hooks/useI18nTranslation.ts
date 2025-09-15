"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import "@lib/i18n"

// Hook personnalisé qui gère l'hydratation SSR
export const useI18nTranslation = () => {
  const [isClient, setIsClient] = useState(false)
  const { t, i18n } = useTranslation()

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Pendant l'hydratation SSR, on retourne les textes par défaut
  const safeT = (key: string, fallback?: string) => {
    if (!isClient) {
      // Fallbacks en français pour le SSR
      const fallbacks: Record<string, string> = {
        "hero_title": "Kits & sclérotes de blob",
        "hero_subtitle": "Des blobo (Physarum polycephalum) pour vos expériences scientifiques !",
        "hero_button": "Acheter"
      }
      return fallbacks[key] || fallback || key
    }
    return t(key) || fallback || key
  }

  return { t: safeT, i18n, isClient }
}
