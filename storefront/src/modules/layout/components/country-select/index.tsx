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
    <div className="relative">
      <Listbox
        as="span"
        onChange={handleChange}
        value={current}
      >
        <Listbox.Button className="flex items-center gap-2 rounded-xl bg-white hover:bg-gray-50 px-4 py-2.5 text-primary font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200 hover:border-primary/20">
          <span className="font-medium flex items-center gap-2">
            <span className="flex items-center gap-2">
              {t('shipping.to')}
              {current && (
                <span className="flex items-center gap-2">
                  <ReactCountryFlag
                    svg
                    style={{ width: "20px", height: "15px" }}
                    className="rounded-sm"
                    countryCode={current.country ?? ""}
                  />
                  {current.label}
                </span>
              )}
            </span>
          </span>
        </Listbox.Button>
        <div className="flex relative w-full min-w-[320px]">
          <Transition
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute top-full mt-2 left-0 xsmall:left-auto xsmall:right-0 max-h-[442px] overflow-y-scroll z-[900] bg-white drop-shadow-md text-small-regular uppercase text-black no-scrollbar rounded-rounded w-full"
            >
              {options?.map((o, index) => {
                return (
                  <Listbox.Option
                    key={index}
                    value={o}
                    className="py-2 hover:bg-gray-200 px-3 cursor-pointer flex items-center gap-x-2"
                  >
                    <ReactCountryFlag
                      svg
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                      countryCode={o?.country ?? ""}
                    />{" "}
                    {o?.label}
                  </Listbox.Option>
                )
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CountrySelect
