import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import OrdersHeader from "@modules/account/components/orders-header"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
}

export default async function Orders() {
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <OrdersHeader />
      <div>
        <OrderOverview orders={orders} />
      </div>
    </div>
  )
}
