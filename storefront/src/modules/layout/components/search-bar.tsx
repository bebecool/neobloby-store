"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import SearchLoupeIcon from "@modules/common/icons/search-loupe"

export default function SearchBar() {
  const { t } = useTranslation()
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center border rounded-full px-3 py-1 bg-white shadow-sm focus-within:ring-2 focus-within:ring-primary">
      <SearchLoupeIcon className="w-5 h-5 text-gray-400 mr-2" />
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={t('search.placeholder')}
        className="outline-none bg-transparent text-base w-32 md:w-48"
        aria-label={t('search.placeholder')}
      />
    </form>
  )
}
