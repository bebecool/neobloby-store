import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import HomeContent from "@modules/home/components/home-content"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "NeoBloby - Boutique en ligne moderne | Produits innovants",
  description:
    "Découvrez NeoBloby, votre boutique en ligne moderne avec livraison internationale et garantie qualité. Explorez nos produits uniques et innovants.",
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
