import { Heading } from "@medusajs/ui"
import { getServerTranslation } from "@lib/server-i18n"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummaryHeading from "@modules/order/components/order-summary-heading"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
  isOnboarding?: boolean
  locale: string
}

export default function OrderCompletedTemplate({
  order,
  isOnboarding = false,
  locale,
}: OrderCompletedTemplateProps) {
  const t = (key: string) => getServerTranslation(locale, key)
  
  return (
    <div className="py-6 min-h-[calc(100vh-64px)]">
      <div className="content-container flex flex-col justify-center items-center gap-y-10 max-w-4xl h-full w-full">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div
          className="flex flex-col gap-4 max-w-4xl h-full bg-white w-full py-10"
          data-testid="order-complete-container"
        >
          <OrderDetails 
            order={order} 
            locale={locale}
            translations={{
              thankYou: t('order.thankYou'),
              placedSuccessfully: t('order.placedSuccessfully'),
              confirmationSent: t('order.confirmationSent'),
              orderDate: t('order.orderDate'),
              orderNumber: t('order.orderNumber'),
            }}
          />
          <Heading level="h2" className="flex flex-row text-3xl-regular">
            {t('order.summary')}
          </Heading>
          <Items items={order.items} />
          <CartTotals 
            totals={order}
            translations={{
              subtotal: t('cart.subtotal'),
              discount: t('cart.discount'),
              shipping: t('cart.shipping'),
              taxes: t('cart.taxes'),
              total: t('cart.total'),
              giftCard: t('cart.giftCard'),
            }}
          />
          <ShippingDetails 
            order={order}
            translations={{
              delivery: t('order.delivery'),
              shippingAddress: t('order.shippingAddress'),
              contact: t('order.contact'),
              method: t('order.method'),
            }}
          />
          <PaymentDetails 
            order={order}
            translations={{
              title: t('payment.title'),
              method: t('payment.method'),
              details: t('payment.details'),
              paidAt: t('payment.paidAt'),
            }}
          />
          <Help 
            translations={{
              needHelp: t('help.needHelp'),
              contact: t('help.contact'),
              returns: t('help.returns'),
            }}
          />
        </div>
      </div>
    </div>
  )
}
