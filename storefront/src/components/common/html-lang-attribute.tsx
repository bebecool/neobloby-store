'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function HtmlLangAttribute() {
  const params = useParams()
  const locale = params?.locale as string | undefined

  useEffect(() => {
    if (locale && typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])

  return null
}
