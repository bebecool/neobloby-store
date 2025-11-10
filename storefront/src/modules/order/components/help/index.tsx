import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

type HelpProps = {
  translations?: {
    needHelp?: string
    contact?: string
    returns?: string
  }
}

const Help = ({ translations }: HelpProps) => {
  const t = {
    needHelp: translations?.needHelp || 'Besoin d\'aide ?',
    contact: translations?.contact || 'Contact',
    returns: translations?.returns || 'Retours & Échanges',
  }
  
  return (
    <div className="mt-6">
      <Heading className="text-base-semi">{t.needHelp}</Heading>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            <LocalizedClientLink href="/contact">{t.contact}</LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/contact">
              {t.returns}
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
