"use client"

import { Listbox, Transition } from "@headlessui/react"
import { Fragment, useEffect, useMemo, useState } from "react"
import ReactCountryFlag from "react-country-flag"
import { useTranslation } from 'react-i18next'

import { useParams, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

type CountryOption = {
  country: string
  region: string
  label: string
}

type CountrySelectProps = {
  regions: HttpTypes.StoreRegion[]
}

const CountrySelect = ({ regions }: CountrySelectProps) => {
  const { t } = useTranslation()
  const [current, setCurrent] = useState<
    | { country: string | undefined; region: string; label: string | undefined }
    | undefined
  >(undefined)

  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1]

  const options = useMemo(() => {
    const allOptions = regions
      ?.map((r) => {
        return r.countries?.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }))
      })
      .flat()
    
    // Trier avec la France en premier, puis par ordre alphabétique
    return allOptions?.sort((a, b) => {
      const aCountry = a?.country?.toLowerCase()
      const bCountry = b?.country?.toLowerCase()
      
      // Mettre la France en premier
      if (aCountry === 'fr') return -1
      if (bCountry === 'fr') return 1
      
      // Ensuite trier par nom de pays
      return (a?.label ?? "").localeCompare(b?.label ?? "")
    })
  }, [regions])

  useEffect(() => {
    if (countryCode) {
      const option = options?.find((o) => o?.country === countryCode)
      setCurrent(option)
    }
  }, [options, countryCode])

  const handleChange = (option: CountryOption) => {
    updateRegion(option.country, currentPath)
  }

  return (
    <div className="relative z-[200]">
      <Listbox
        as="span"
        onChange={handleChange}
        value={current}
      >
        <Listbox.Button className="w-full flex items-center justify-between gap-3 rounded-xl bg-white hover:bg-gray-50 px-4 py-4 text-gray-800 font-medium text-base transition-all duration-300 shadow-sm hover:shadow-md border-2 border-gray-200 hover:border-primary/30 active:scale-98 min-h-[60px]">
          <span className="font-medium flex items-center gap-2.5 flex-1 text-left">
            <span className="flex items-center gap-2.5">
              {t('shipping.to')} :
              {current && (
                <span className="flex items-center gap-2.5 font-semibold">
                  <ReactCountryFlag
                    svg
                    style={{ width: "28px", height: "21px" }}
                    className="rounded-sm shadow-sm"
                    countryCode={current.country ?? ""}
                  />
                  <span className="text-primary">{current.label}</span>
                </span>
              )}
            </span>
          </span>
          <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="absolute top-full mt-2 left-0 right-0 max-h-[320px] overflow-y-auto z-[10000] bg-white drop-shadow-2xl shadow-2xl text-base rounded-xl w-full border-2 border-primary/20"
          >
              {options?.map((o, index) => {
                return (
                  <Listbox.Option
                    key={index}
                    value={o}
                    className="py-3.5 px-4 hover:bg-primary/10 active:bg-primary/20 cursor-pointer flex items-center gap-x-3 transition-colors duration-150 border-b border-gray-100 last:border-0 min-h-[56px]"
                  >
                    <ReactCountryFlag
                      svg
                      style={{
                        width: "24px",
                        height: "18px",
                      }}
                      className="rounded-sm shadow-sm flex-shrink-0"
                      countryCode={o?.country ?? ""}
                    />
                    <span className="font-medium text-gray-800">{o?.label}</span>
                  </Listbox.Option>
                )
              })}
            </Listbox.Options>
          </Transition>
      </Listbox>
    </div>
  )
}
export default CountrySelect
