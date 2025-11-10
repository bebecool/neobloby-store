"use client"

import { Heading } from "@medusajs/ui"
import { useTranslation } from 'react-i18next'

const OrderSummaryHeading = () => {
  const { t } = useTranslation()
  
  return (
    <Heading level="h2" className="flex flex-row text-3xl-regular">
      {t('order.summary')}
    </Heading>
  )
}

export default OrderSummaryHeading
