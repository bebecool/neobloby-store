'use client'

import { useTranslation } from 'react-i18next'
import { useParams } from 'next/navigation'

export default function LanguageTest() {
  const { t, i18n } = useTranslation()
  const params = useParams()
  
  console.log('🧪 LanguageTest - params:', params, 'i18n.language:', i18n.language)
  
  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      background: 'black', 
      color: 'white', 
      padding: '20px', 
      borderRadius: '8px',
      zIndex: 999999,
      fontSize: '14px',
      fontFamily: 'monospace'
    }}>
      <div><strong>🧪 Language Test</strong></div>
      <div>URL locale: {params?.locale as string}</div>
      <div>i18n.language: {i18n.language}</div>
      <div>Translation test: {t('nav.home')}</div>
      <div>Expected FR: "Accueil" / EN: "Home"</div>
    </div>
  )
}
