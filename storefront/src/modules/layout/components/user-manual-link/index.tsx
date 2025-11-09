'use client'

import { useTranslation } from 'react-i18next'
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function UserManualLink() {
  const { t } = useTranslation()
  
  return (
    <LocalizedClientLink
      href="/userguide"
      className="hover:text-ui-fg-base"
    >
      {t('footer.userManual')}
    </LocalizedClientLink>
  )
}
