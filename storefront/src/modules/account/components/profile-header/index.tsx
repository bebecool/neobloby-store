"use client"

import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

export default function ProfileHeader() {
  const { t, i18n } = useTranslation()
  const [currentLang, setCurrentLang] = useState(i18n.language)

  useEffect(() => {
    setCurrentLang(i18n.language)
  }, [i18n.language])
  
  return (
    <div className="mb-8 flex flex-col gap-y-4">
      <h1 className="text-2xl-semi">{t('account.profileTitle')}</h1>
      <p className="text-base-regular">
        {t('account.profileDescription')}
      </p>
    </div>
  )
}
