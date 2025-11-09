import { Metadata } from "next"
import UserGuideContent from "@modules/userguide/components/userguide-content"

export const metadata: Metadata = {
  title: "Guide d'utilisation NeoBloby | User Guide",
  description:
    "Guide complet pour élever votre Blob. Complete guide to raising your Blob.",
}

export default async function UserGuidePage({
  params,
}: {
  params: { locale: string; countryCode: string }
}) {
  return (
    <div className="w-full">
      <UserGuideContent />
    </div>
  )
}
