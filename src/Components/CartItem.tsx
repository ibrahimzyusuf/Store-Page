import React from 'react'
import { useShoppingCart } from "../Context/ShoppingCartContext"
import storeItems from "../Data/items.json"
import { formatCurrency } from "../Utilities/formatCurrency"

type CartItemProps={
    id:number
    quantity:number
}

const CartItem = ({id,quantity}:CartItemProps) => {
    const { removeFromCart } = useShoppingCart()
    const item = storeItems.find(i => i.id === id)
    if (item == null) return null


return (
    <div className="cart-item">
        <img
        src={item.imgUrl}
        alt={item.name}
        className="cart-item-img"
        />
        <div className="cart-item-info">
            <div className="cart-item-name">
                {item.name}{" "}
                {quantity > 1 && (
                <span className="cart-item-quantity">x {quantity}</span>
                )}
            </div>
            <div className="cart-item-price">{formatCurrency(item.price)}</div>
        </div>
        <div className="cart-item-total">{formatCurrency(item.price * quantity)}</div>
        <button
        className="cart-item-remove"
        onClick={() => removeFromCart(item.id)}
        >
        &times;
        </button>
    </div>
)
}

export default CartItem