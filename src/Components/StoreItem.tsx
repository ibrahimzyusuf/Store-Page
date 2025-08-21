import { formatCurrency } from '../Utilities/formatCurrency'
import { useShoppingCart } from '../Context/ShoppingCartContext'

type StoreItemProps={
    id:number
    name:string
    price:number
    imgUrl:string
}


const StoreItem = ({id,name,price,imgUrl}:StoreItemProps) => {
    const {getItemQuantity,increaseCartQuantity,decreaseCartQuantity,removeFromCart}=useShoppingCart()
    const quantity=getItemQuantity(id);
return (
    <div className='store_item'>
        <img src={imgUrl} alt="item_image" />
        <div className="item_info">
            <span>{name}</span>
            <span>{formatCurrency(price)}</span>
        </div>
        <div className="item_config">
            {quantity===0?(
                <div className="add_to_card_btn" onClick={()=>increaseCartQuantity(id)}>+ Add To Card</div>
            ):
            <div className='item_control'>
                <div className='control_btns'>
                    <button onClick={()=>decreaseCartQuantity(id)}>-</button>
                    <div><span>{quantity}</span> in cart</div>
                    <button onClick={()=>increaseCartQuantity(id)}>+</button>
                </div>
                <button className='remove_btn' onClick={()=>removeFromCart(id)}>Remove</button>
            </div>
            }
        </div>
    </div>
)
}

export default StoreItem