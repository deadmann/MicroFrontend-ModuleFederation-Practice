import React, { useState, useEffect } from 'react'

// import MiniCart from './MiniCart'
// import Login from './Login'
// import { jwt, login } from './cart'
import { cart, clearCart } from 'cart/cart'
import { currency } from 'home/products'

export default function CartContent() {
    // const [token, setToken] = useState('')

    // // useEffect expect we return a cleanup function (here subscribe returns unsubscribe in which we are returning)
    // useEffect(()=>{
    //     // remove this auto-login as we need user to login manually
    //     // login('sally', '123')
    //     return jwt.subscribe((val) => setToken(val ?? '')) // subscribe in rxjs returns an unsubscribe
    // }, [])

    // return <div>
    //     <div></div>JWT: {token}
    //     <br/>
    //     <Login />
    //     <MiniCart />
    // </div>

    const [items, setItems] = useState([])

    useEffect(
        () => cart.subscribe((value) => setItems(value?.cartItems ?? [])),
        [])

    return (
        <>
            <div className="my-10 grid grid-cols-4 gap-5">
                {items.map(item => (
                    <React.Fragment key={item.id}>
                        <div>{item.quantity}</div>
                        <img src={item.image} alt={item.name} className="max-h-6" />
                        <div>{item.name}</div>
                        <div className="text-right">
                            {currency.format(item.quantity * item.price)}
                        </div>
                    </React.Fragment>
                ))}
                <div></div>
                <div></div>
                <div></div>
                <div className="text-right" id="grand_total">
                    {currency.format(
                        items.reduce((a, v) => a + v.quantity * v.price, 0)
                    )}
                </div>
            </div>
            {items.length > 0 && (
                <div className="flex mb-10">
                    <div className="flex-grow">
                        <button
                            id="clearcart"
                            type="button"
                            className="bg-white border border-green-800 text-green-800 py-2 px-5 rounded-md text-sm"
                            onClick={clearCart}
                        >
                            Clear Cart
                        </button>
                    </div>
                    <div className="flex-end">
                        <button
                            type="button"
                            className="bg-green-800 text-white py-2 px-5 rounded-md text-sm"
                            onClick={clearCart}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}