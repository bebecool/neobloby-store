import { useTranslation } from "react-i18next"

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage("fr")}
        className={`px-2 py-1 rounded text-sm font-medium border transition-colors ${i18n.language === "fr" ? "bg-yellow-400 text-white border-yellow-400" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
      >
        FR
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className={`px-2 py-1 rounded text-sm font-medium border transition-colors ${i18n.language === "en" ? "bg-yellow-400 text-white border-yellow-400" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
      >
        EN
      </button>
    </div>
  )
}

export default LanguageSwitcher
