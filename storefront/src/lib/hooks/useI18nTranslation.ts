"use client"

import { useEffect, useState } from "react"

// Fallbacks statiques pour le SSR
const fallbacks: Record<string, string> = {
  "hero_title": "Kits & sclérotes de blob",
  "hero_subtitle": "Des blobo (Physarum polycephalum) pour vos expériences scientifiques !",
  "hero_button": "Acheter",
  "nav_home": "Accueil",
  "nav_store": "Boutique", 
  "nav_search": "Recherche",
  "nav_account": "Compte",
  "nav_cart": "Panier"
}

// Hook personnalisé qui gère l'hydratation SSR
export const useI18nTranslation = () => {
  const [isClient, setIsClient] = useState(false)
  const [i18nInstance, setI18nInstance] = useState<any>(null)

  useEffect(() => {
    setIsClient(true)
    // Initialise i18n côté client
    import("@lib/i18n").then((i18nModule) => {
      setI18nInstance(i18nModule.default)
    })
  }, [])

  // Fonction de traduction sécurisée
  const safeT = (key: string) => {
    if (!isClient || !i18nInstance) {
      return fallbacks[key] || key
    }
    return i18nInstance.t(key) || fallbacks[key] || key
  }

  const changeLanguage = (lng: string) => {
    if (i18nInstance) {
      i18nInstance.changeLanguage(lng)
    }
  }

  return { 
    t: safeT, 
    i18n: i18nInstance,
    changeLanguage,
    isClient: isClient && !!i18nInstance 
  }
}
