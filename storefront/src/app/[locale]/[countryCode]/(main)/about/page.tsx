import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | NeoBloby Store",
  description: "Learn more about NeoBloby Store and our mission",
}

export default async function AboutPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          À propos de NeoBloby
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Notre Histoire
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              NeoBloby est une boutique en ligne dédiée à vous offrir les meilleurs produits avec un service client exceptionnel. 
              Notre mission est de rendre le shopping en ligne simple, sûr et agréable pour tous nos clients à travers le monde.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Notre Mission
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nous nous engageons à fournir des produits de qualité supérieure avec une livraison rapide et fiable partout dans le monde. 
              La satisfaction de nos clients est au cœur de tout ce que nous faisons.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Pourquoi nous choisir
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">✓</span>
                <span>Livraison internationale rapide et sécurisée</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">✓</span>
                <span>Service client disponible 24/7</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">✓</span>
                <span>Produits de qualité garantie</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">✓</span>
                <span>Paiement 100% sécurisé</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">✓</span>
                <span>Plus de 1400 clients satisfaits</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Nous Contacter
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Pour toute question ou demande, n'hésitez pas à nous contacter à{' '}
              <a href="mailto:hello@neobloby.com" className="text-primary hover:underline font-semibold">
                hello@neobloby.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
