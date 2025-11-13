"use client"

import { Listbox, Transition } from "@headlessui/react"
import { Fragment, useEffect, useMemo, useState } from "react"
import ReactCountryFlag from "react-country-flag"
import { useTranslation } from 'react-i18next'

import { useParams, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

type CountryOption = {
  country: string | undefined
  region: string
  label: string | undefined
}

type CountrySelectProps = {
  regions: HttpTypes.StoreRegion[]
}

const CountrySelect = ({ regions }: CountrySelectProps) => {
  const { t } = useTranslation()
  const [current, setCurrent] = useState<CountryOption | null>(null)

  const params = useParams()
  const pathname = usePathname()
  
  const locale = params?.locale as string | undefined
  const countryCode = params?.countryCode as string | undefined
  
  // Extraire le chemin après /{locale}/{countryCode}/
  const pathSegments = pathname?.split("/").filter(Boolean) || []
  const currentPath = pathSegments.length > 2 ? `/${pathSegments.slice(2).join("/")}` : ""

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
    if (options && options.length > 0) {
      if (countryCode) {
        const option = options.find((o) => o?.country === countryCode)
        if (option) {
          setCurrent(option)
        }
      }
      // Si pas de current et qu'on a des options, prendre la première
      if (!current && options[0]) {
        setCurrent(options[0])
      }
    }
  }, [options, countryCode, current])

  const handleChange = (option: CountryOption) => {
    if (option.country) {
      updateRegion(option.country, currentPath, locale)
    }
  }

  return (
    <div className="relative z-[9999]">
      <Listbox
        as="span"
        onChange={handleChange}
        value={current || options?.[0]}
      >
        {({ open }) => (
          <>
            <Listbox.Button className="flex items-center justify-between gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm">
              <span className="flex items-center gap-2 flex-1 text-left whitespace-nowrap overflow-hidden">
                <span className="text-sm font-medium text-gray-700 flex-shrink-0">
                  {t('shipping.to')}
                </span>
                {current && (
                  <span className="flex items-center gap-2 font-semibold min-w-0">
                    <ReactCountryFlag
                      svg
                      style={{ width: "24px", height: "18px" }}
                      className="rounded shadow-sm flex-shrink-0"
                      countryCode={current.country ?? ""}
                    />
                    <span className="text-sm text-gray-700 truncate">{current.label}</span>
                  </span>
                )}
              </span>
              <svg 
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute top-full mt-2 left-0 right-0 max-h-[320px] overflow-y-auto z-[10000] bg-white shadow-xl border border-gray-200 rounded-xl w-full">
                {options?.map((o, index) => {
                  return (
                    <Listbox.Option
                      key={index}
                      value={o}
                      className="py-3 px-4 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors duration-150 border-b border-gray-100 last:border-0"
                    >
                      <ReactCountryFlag
                        svg
                        style={{ width: "24px", height: "18px" }}
                        className="rounded shadow-sm flex-shrink-0"
                        countryCode={o?.country ?? ""}
                      />
                      <span className="text-sm text-gray-700 font-medium">{o?.label}</span>
                    </Listbox.Option>
                  )
                })}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  )
}
export default CountrySelect
