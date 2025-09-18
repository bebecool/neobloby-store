"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import { useTranslation } from 'react-i18next'

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const { t } = useTranslation()

  const sortOptions = [
    {
      value: "created_at",
      label: t('sort.latest'),
    },
    {
      value: "price_asc",
      label: t('sort.priceAsc'),
    },
    {
      value: "price_desc",
      label: t('sort.priceDesc'),
    },
  ]

  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <FilterRadioGroup
      title={t('sort.by')}
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default SortProducts
