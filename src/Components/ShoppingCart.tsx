import { useShoppingCart } from '../Context/ShoppingCartContext'
import { formatCurrency } from "../Utilities/formatCurrency"
import CartItem  from "./CartItem"
import storeItems from "../Data/items.json"

type ShoppingCartProps = {
    isOpen: boolean
}

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
    const { closeCart, cartItems } = useShoppingCart()
return (
    <div className={`shopping-cart ${isOpen ? "open" : ""}`}>
      {/* Overlay for clicking outside to close */}
        <div className="shopping-cart-overlay" onClick={closeCart}></div>

        <div className="shopping-cart-panel">
            <div className="shopping-cart-header">
                <h2>Cart</h2>
                <button className="close-btn" onClick={closeCart}>
                    &times;
                </button>
            </div>

            <div className="shopping-cart-body">
                <div className="cart-items">
                    {cartItems.map(item => (
                    <CartItem key={item.id} {...item} />
                    ))}
                </div>

                <div className="cart-total">
                Total{" "}
                {formatCurrency(
                    cartItems.reduce((total, cartItem) => {
                    const item = storeItems.find(i => i.id === cartItem.id)
                    return total + (item?.price || 0) * cartItem.quantity
                    }, 0)
                )}
                </div>
            </div>
        </div>
    </div>
)
}

export default ShoppingCart