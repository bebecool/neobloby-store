import { HttpTypes } from "@medusajs/types"
import { notFound } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"
const DEFAULT_LOCALE = "fr" // Langue par défaut

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
}

async function getRegionMap() {
  const { regionMap, regionMapUpdated } = regionMapCache

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    // Fetch regions from Medusa. We can't use the JS client here because middleware is running on Edge and the client needs a Node environment.
    const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
      headers: {
        "x-publishable-api-key": PUBLISHABLE_API_KEY!,
      },
      next: {
        revalidate: 3600,
        tags: ["regions"],
      },
    }).then((res) => res.json())

    if (!regions?.length) {
      notFound()
    }

    // Create a map of country codes to regions.
    regions.forEach((region: HttpTypes.StoreRegion) => {
      region.countries?.forEach((c) => {
        regionMapCache.regionMap.set(c.iso_2 ?? "", region)
      })
    })

    regionMapCache.regionMapUpdated = Date.now()
  }

  return regionMapCache.regionMap
}

/**
 * Fetches regions from Medusa and sets the region cookie.
 * @param request
 * @param response
 */
async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion | number>
) {
  try {
    let countryCode

    const vercelCountryCode = request.headers
      .get("x-vercel-ip-country")
      ?.toLowerCase()

    // Avec la structure /{locale}/{countryCode}/, le countryCode est au 2ème segment (index 2)
    const pathSegments = request.nextUrl.pathname.split("/").filter(Boolean)
    const urlCountryCode = pathSegments[1]?.toLowerCase() // Index 1 = 2ème segment

    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      countryCode = urlCountryCode
    } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      countryCode = vercelCountryCode
    } else if (regionMap.has(DEFAULT_REGION)) {
      countryCode = DEFAULT_REGION
    } else if (regionMap.keys().next().value) {
      countryCode = regionMap.keys().next().value
    }

    return countryCode
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "Middleware.ts: Error getting the country code. Did you set up regions in your Medusa Admin and define a NEXT_PUBLIC_MEDUSA_BACKEND_URL environment variable?"
      )
    }
  }
}

/**
 * Middleware to handle region selection and onboarding status.
 */
export async function middleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const isOnboarding = searchParams.get("onboarding") === "true"
  const cartId = searchParams.get("cart_id")
  const checkoutStep = searchParams.get("step")
  const onboardingCookie = request.cookies.get("_medusa_onboarding")
  const cartIdCookie = request.cookies.get("_medusa_cart_id")

  const regionMap = await getRegionMap()
  const countryCode = regionMap && (await getCountryCode(request, regionMap))

  // Extraire locale et countryCode de l'URL
  const pathSegments = request.nextUrl.pathname.split("/").filter(Boolean)
  const urlLocale = pathSegments[0] // Premier segment = locale (fr/en/de/es/it/nl)
  const urlCountryCode = pathSegments[1] // Deuxième segment = countryCode (fr/dk/etc)

  // Vérifier si locale et countryCode sont dans l'URL
  const validLocales = ["fr", "en", "de", "es", "it", "nl"]
  const urlHasLocale = validLocales.includes(urlLocale)
  const urlHasCountryCode = countryCode && urlCountryCode === countryCode

  // Si l'URL a déjà locale + countryCode corrects, continuer
  if (
    urlHasLocale &&
    urlHasCountryCode &&
    (!isOnboarding || onboardingCookie) &&
    (!cartId || cartIdCookie)
  ) {
    return NextResponse.next()
  }

  // Déterminer la locale (depuis cookie ou défaut)
  const savedLocale = request.cookies.get("NEXT_LOCALE")?.value
  const locale = savedLocale && validLocales.includes(savedLocale) ? savedLocale : DEFAULT_LOCALE

  // Calculer le chemin après /{locale}/{countryCode}
  // Si l'URL a déjà locale et countryCode, extraire le reste
  let redirectPath = ""
  if (urlHasLocale && urlCountryCode) {
    // Chemin après les 2 premiers segments
    const remainingSegments = pathSegments.slice(2)
    redirectPath = remainingSegments.length > 0 ? `/${remainingSegments.join("/")}` : ""
  } else if (urlLocale && !urlHasLocale) {
    // Si le premier segment n'est pas une locale valide, c'est peut-être un countryCode
    redirectPath = request.nextUrl.pathname
  } else {
    // Sinon, prendre tout le chemin
    redirectPath = request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname
  }

  const queryString = request.nextUrl.search ? request.nextUrl.search : ""

  let redirectUrl = request.nextUrl.href

  let response = NextResponse.redirect(redirectUrl, 307)

  // Si locale ou countryCode manquants, rediriger vers /{locale}/{countryCode}/...
  if ((!urlHasLocale || !urlHasCountryCode) && countryCode) {
    redirectUrl = `${request.nextUrl.origin}/${locale}/${countryCode}${redirectPath}${queryString}`
    response = NextResponse.redirect(`${redirectUrl}`, 307)
  }

  // If a cart_id is in the params, we set it as a cookie and redirect to the address step.
  if (cartId && !checkoutStep) {
    redirectUrl = `${redirectUrl}&step=address`
    response = NextResponse.redirect(`${redirectUrl}`, 307)
    response.cookies.set("_medusa_cart_id", cartId, { maxAge: 60 * 60 * 24 })
  }

  // Set a cookie to indicate that we're onboarding. This is used to show the onboarding flow.
  if (isOnboarding) {
    response.cookies.set("_medusa_onboarding", "true", { maxAge: 60 * 60 * 24 })
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|.*\\.png|.*\\.jpg|.*\\.gif|.*\\.svg).*)"], // prevents redirecting on static files
}
