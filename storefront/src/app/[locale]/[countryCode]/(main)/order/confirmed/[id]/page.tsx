import { Metadata } from "next"
import { cookies } from "next/headers"

import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import { notFound } from "next/navigation"
import { enrichLineItems } from "@lib/data/cart"
import { retrieveOrder } from "@lib/data/orders"
import { HttpTypes } from "@medusajs/types"

type Props = {
  params: { locale: string; countryCode: string; id: string }
}

async function getOrder(id: string) {
  const order = await retrieveOrder(id)

  if (!order) {
    return
  }

  const enrichedItems = await enrichLineItems(order.items, order.region_id!)

  return {
    ...order,
    items: enrichedItems,
  } as unknown as HttpTypes.StoreOrder
}

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "You purchase was successful",
}

export default async function OrderConfirmedPage({ params }: Props) {
  const { id, locale } = await params
  const order = await getOrder(id)
  if (!order) {
    return notFound()
  }

  const isOnboarding = (await cookies()).get("_medusa_onboarding")?.value === "true"

  return <OrderCompletedTemplate order={order} isOnboarding={isOnboarding} locale={locale} />
}
