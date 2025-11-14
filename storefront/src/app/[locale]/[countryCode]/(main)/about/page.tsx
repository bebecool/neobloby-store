import { Metadata } from "next"
import AboutContent from "@modules/about/components/about-content"

export const metadata: Metadata = {
  title: "À propos de NeoBloby | About Us",
  description:
    "Découvrez l'univers NeoBloby : notre vision, nos valeurs et notre passion pour le blob. Discover the NeoBloby universe: our vision, values and passion for blobs.",
}

export default async function AboutPage({
  params,
}: {
  params: { locale: string; countryCode: string }
}) {
  return (
    <div className="w-full">
      <AboutContent />
    </div>
  )
}
