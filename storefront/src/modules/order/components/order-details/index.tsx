import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
  locale: string
  translations: {
    thankYou: string
    placedSuccessfully: string
    confirmationSent: string
    orderDate: string
    orderNumber: string
  }
}

const OrderDetails = ({ order, showStatus, translations, locale }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div>
      <Heading
        level="h1"
        className="flex flex-col gap-y-3 text-ui-fg-base text-3xl mb-4"
      >
        <span>{translations.thankYou}</span>
        <span>{translations.placedSuccessfully}</span>
      </Heading>
      <Text>
        {translations.confirmationSent}{" "}
        <span
          className="text-ui-fg-medium-plus font-semibold"
          data-testid="order-email"
        >
          {order.email}
        </span>
        .
      </Text>
      <Text className="mt-2">
        {translations.orderDate}{" "}
        <span data-testid="order-date">
          {new Date(order.created_at).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
            {" "}
          {new Date(order.created_at).toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </Text>
      <Text className="mt-2 text-ui-fg-interactive">
        {translations.orderNumber} <span data-testid="order-id">{order.display_id}</span>
      </Text>

      <div className="flex items-center text-compact-small gap-x-4 mt-4">
        {showStatus && (
          <>
            <Text>
              Order status:{" "}
              <span className="text-ui-fg-subtle " data-testid="order-status">
                {/* TODO: Check where the statuses should come from */}
                {/* {formatStatus(order.fulfillment_status)} */}
              </span>
            </Text>
            <Text>
              Payment status:{" "}
              <span
                className="text-ui-fg-subtle "
                sata-testid="order-payment-status"
              >
                {/* {formatStatus(order.payment_status)} */}
              </span>
            </Text>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
