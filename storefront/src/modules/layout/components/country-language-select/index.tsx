"use client"

import { Listbox, Transition } from "@headlessui/react"
import { Fragment, useEffect, useMemo, useState } from "react"
import ReactCountryFlag from "react-country-flag"
import { useTranslation } from 'react-i18next'

import { StateType } from "@lib/hooks/use-toggle-state"
import { useParams, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import '@lib/i18n'

type CountryOption = {
  country: string
  region: string
  label: string
}

type LanguageOption = {
  code: string
  name: string
  flag: string
}

type CountryLanguageSelectProps = {
  toggleState: StateType
  regions: HttpTypes.StoreRegion[]
}

const CountryLanguageSelect = ({ toggleState, regions }: CountryLanguageSelectProps) => {
  const { i18n } = useTranslation()
  const [current, setCurrent] = useState<
    | { country: string | undefined; region: string; label: string | undefined }
    | undefined
  >(undefined)

  const params = useParams()
  const pathname = usePathname()
  const countryCode = params?.countryCode as string | undefined
  const locale = params?.locale as string | undefined
  
  const currentPath = pathname?.split(`/${countryCode}`)[1] || ""

  const { state, close } = toggleState
  const { t } = useTranslation()

  const languages: LanguageOption[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' }
  ]

  // Synchroniser i18n avec la locale de l'URL
  useEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale, i18n])

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const options = useMemo(() => {
    return regions
      ?.map((r) => {
        return r.countries?.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }))
      })
      .flat()
      .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""))
  }, [regions])

  useEffect(() => {
    if (countryCode) {
      const option = options?.find((o) => o?.country === countryCode)
      setCurrent(option)
    }
  }, [options, countryCode])

  const handleCountryChange = (option: CountryOption) => {
    updateRegion(option.country, currentPath)
    close()
  }

  const handleLanguageChange = (langCode: string) => {
    // Sauvegarder la langue dans un cookie
    document.cookie = `NEXT_LOCALE=${langCode}; path=/; max-age=${60 * 60 * 24 * 365}`
    
    // Construire la nouvelle URL en remplaçant la locale actuelle
    const pathSegments = window.location.pathname.split("/").filter(Boolean)
    
    // Si on a déjà une structure /{locale}/{countryCode}/..., on remplace juste la locale
    if (pathSegments.length >= 2) {
      pathSegments[0] = langCode // Remplacer la locale (premier segment)
      const newPath = `/${pathSegments.join("/")}`
      window.location.href = newPath + window.location.search
    } else {
      // Sinon construire l'URL de base
      window.location.href = `/${langCode}/${countryCode}` + window.location.search
    }
  }

  return (
    <div>
      <Transition
        show={state}
        as={Fragment}
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options
          static
          className="absolute bottom-full left-0 xsmall:left-auto xsmall:right-0 max-h-[442px] overflow-auto bg-white drop-shadow-md rounded-rounded text-[14px] w-[280px] px-2"
        >
          {/* Section Langue */}
          <div className="px-3 py-2 border-b border-gray-200">
            <div className="text-xs font-medium text-gray-500 mb-2">LANGUE</div>
            <div className="space-y-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center gap-2 px-2 py-1 text-left rounded hover:bg-gray-50 ${
                    i18n.language === language.code ? 'bg-gray-100' : ''
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span>{language.name}</span>
                  {i18n.language === language.code && (
                    <span className="ml-auto text-xs text-green-600">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Section Pays */}
          <div className="px-3 py-2">
            <div className="text-xs font-medium text-gray-500 mb-2">{t('shipping.shippingTo')}</div>
            <div className="space-y-1 max-h-64 overflow-auto">
              {options?.map((option, index) => {
                return (
                  <Listbox.Option
                    key={index}
                    value={option}
                    className="cursor-pointer"
                  >
                    <button
                      className="w-full flex items-center gap-2 px-2 py-1 text-left rounded hover:bg-gray-50"
                      onClick={() => option && handleCountryChange(option as CountryOption)}
                    >
                      {option?.country && (
                        <ReactCountryFlag
                          svg
                          style={{
                            width: "16px",
                            height: "12px",
                          }}
                          countryCode={option.country}
                        />
                      )}
                      <span>{option?.label}</span>
                      {option?.country === current?.country && (
                        <span className="ml-auto text-xs text-green-600">✓</span>
                      )}
                    </button>
                  </Listbox.Option>
                )
              })}
            </div>
          </div>
        </Listbox.Options>
      </Transition>
      <div className="flex items-center gap-x-2">
        <span className="text-small-regular">
          {currentLanguage.flag} {current?.label || "Choose location"}
        </span>
      </div>
    </div>
  )
}

export default CountryLanguageSelect
