type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export default function LocaleLayout({ children }: Props) {
  return <>{children}</>
}
