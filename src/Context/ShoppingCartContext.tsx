import { createContext,useContext, useState } from "react";
import type { ReactNode } from "react";
import ShoppingCart from "../Components/ShoppingCart";
import { UseLocalStorage } from "../Hooks/UseLocalStorage";
import type CartItem from "../Components/CartItem";


type ShoppingCartProviderProps={
    children:ReactNode
}

type CartItem={
    id:number
    quantity:number
}

type ShoppingCartContext={
    openCart:()=>void
    closeCart:()=>void
    cartQuantity:number
    cartItems:CartItem[]
    getItemQuantity:(id:number)=>number
    increaseCartQuantity:(id:number)=>void
    decreaseCartQuantity:(id:number)=>void
    removeFromCart:(id:number)=>void
}

const ShoppingCartContext=createContext({} as ShoppingCartContext)

export function ShoppingCartProvider({children}:ShoppingCartProviderProps){

    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = UseLocalStorage<CartItem[]>('shopping-cart',[])

    const openCart=()=>setIsOpen(true)

    const closeCart=()=>setIsOpen(false)

    const cartQuantity=cartItems.reduce((quantity:number,item:CartItem)=>
        item.quantity+quantity,0
    )

    function getItemQuantity(id:number) {
        return cartItems.find((item:CartItem)=>item.id===id)?.quantity||0
    }

    function increaseCartQuantity(id:number) {
        setCartItems((currentItems:CartItem[])=>{
            if (currentItems.find(item=>item.id===id)==null) {
                return [...currentItems,{id,quantity:1}]
            }
            else{
                return currentItems.map(item=>{
                    if (item.id===id) {
                        return {...item,quantity:item.quantity+1}
                    }
                    else return item
                })
            }
        })
    }

    function decreaseCartQuantity(id:number) {
        setCartItems((currentItems:CartItem[])=>{
            if (currentItems.find(item=>item.id===id)?.quantity===1) {
                return currentItems.filter(item=>item.id!==id)
            }
            else{
                return currentItems.map(item=>{
                    if (item.id===id) {
                        return {...item,quantity:item.quantity-1}
                    }
                    else return item
                })
            }
        })
    }

    function removeFromCart(id:number) {
        setCartItems((currentItems:CartItem[])=>{
            return currentItems.filter(item=>item.id!==id)
        })
    }
    return(
        <ShoppingCartContext.Provider value={{getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart}}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}