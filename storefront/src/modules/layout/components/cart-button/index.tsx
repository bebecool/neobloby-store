import { notFound } from "next/navigation"
import CartDropdown from "../cart-dropdown"
import { enrichLineItems, retrieveCart } from "@lib/data/cart"

const fetchCart = async () => {
  const cart = await retrieveCart()

  if (!cart) {
    return null
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart.items, cart.region_id!)
    cart.items = enrichedItems
  }

  return cart
}

type CartButtonProps = {
  buttonClassName?: string
  badgeClassName?: string
}

export default async function CartButton(props: CartButtonProps = {}) {
  const { buttonClassName, badgeClassName } = props
  const cart = await fetchCart()

  return <CartDropdown cart={cart} buttonClassName={buttonClassName} badgeClassName={badgeClassName} />
}
