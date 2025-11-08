import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import I18nProvider from "../components/providers/i18n-provider"
import { CartProvider } from "@lib/context/cart-context"
import HtmlLangAttribute from "../components/common/html-lang-attribute"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html data-mode="light">
      <body>
        <HtmlLangAttribute />
        <I18nProvider>
          <CartProvider>
            <main className="relative">{props.children}</main>
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
