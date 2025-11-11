import { Metadata } from "next"
import { notFound } from "next/navigation"

import ProductTemplate from "@modules/products/templates"
import { getRegion, listRegions } from "@lib/data/regions"
import { getProductByHandle, getProductsList } from "@lib/data/products"

type Props = {
  params: { locale: string; countryCode: string; handle: string }
}

export async function generateStaticParams() {
  try {
    const locales = ['fr', 'en', 'de', 'es', 'it', 'nl']
    const countryCodes = await listRegions().then(
      (regions) =>
        regions
          ?.map((r) => r.countries?.map((c) => c.iso_2))
          .flat()
          .filter(Boolean) as string[]
    )

    if (!countryCodes) {
      return []
    }

    const products = await Promise.all(
      countryCodes.map((countryCode) => {
        return getProductsList({ countryCode }).catch(() => ({ response: { products: [], count: 0 }, nextPage: null }))
      })
    ).then((responses) =>
      responses.map(({ response }) => response.products).flat()
    )

    const staticParams = locales
      .map((locale) =>
        countryCodes
          ?.map((countryCode) =>
            products.map((product) => ({
              locale,
              countryCode,
              handle: product.handle,
            }))
          )
          .flat()
      )
      .flat()

    return staticParams
  } catch (error) {
    console.error('Error generating static params for products:', error)
    // Return empty array to allow build to continue - pages will be generated on-demand
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await getProductByHandle(handle, region.id)

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} | Neobloby Store`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Neobloby Store`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const pricedProduct = await getProductByHandle(params.handle, region.id)
  if (!pricedProduct) {
    notFound()
  }

  return (
    <ProductTemplate
      product={pricedProduct}
      region={region}
      countryCode={params.countryCode}
    />
  )
}
