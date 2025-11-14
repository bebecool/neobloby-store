"use client"

import { useTranslation } from 'react-i18next'
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function AboutLink() {
  const { t } = useTranslation()

  return (
    <LocalizedClientLink
      href="/about"
      className="hover:text-ui-fg-base"
    >
      {t('footer.about')}
    </LocalizedClientLink>
  )
}
