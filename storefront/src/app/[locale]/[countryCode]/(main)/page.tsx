import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import HomeContent from "@modules/home/components/home-content"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "NeoBloby – Kits d’élevage de Blob ludiques & éducatifs",
  description:
    "NeoBloby, la boutique dédiée au blob vivant (Physarum polycephalum) : kits d’élevage complets, expériences scientifiques fun, ressources pédagogiques et accompagnement pas à pas pour enfants, parents et passionnés de science.",
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string; countryCode: string }>
}) {
  const { countryCode } = await params
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <HomeContent>
      <FeaturedProducts collections={collections} region={region} />
    </HomeContent>
  )
}
