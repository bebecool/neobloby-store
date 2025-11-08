import I18nProvider from "../../components/providers/i18n-provider"

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export default function LocaleLayout({ children, params }: Props) {
  return (
    <I18nProvider>
      {children}
    </I18nProvider>
  )
}
