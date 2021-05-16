import {useCallback, useEffect, useState} from "react";
import alanBtn from '@alan-ai/alan-sdk-web';
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../actions/cartActions";
import {cartReducer} from "../reducers/cartReducers";
import {removeFromCart} from "../actions/cartActions";

const COMMANDS = {
    OPEN_CART: 'open-cart', /* say :  Open the cart */
    CLOSE_CART: 'close-cart', /* say :  Close the cart */
    PRODUCT_DETAILS: 'product-details', /* say :  Product_Name */
    ADD_ITEM: 'add-item', /* say :  add (product_name) to the cart */
    REMOVE_ITEM: 'remove-item', /* say :  remove (product_name) from the cart */
    CHECKOUT: 'check-out', /* say : check out */
    PAYMENT: 'payment', /* say : go to payment or continue */
    PLACE_ORDER: 'place-order', /* say : go to place order or continue */
    MAKE_PLACE_ORDER: 'make-place-order', /* say : place order */
    ORDER_HISTORY: 'order-history', /* say : show order history*/
    USERS: 'users', /* say : show users */
    PRODUCTS: 'products', /* say : show products*/
    ORDERS: 'orders', /* say : show orders*/
    DASHBOARD: 'dashboard', /* say : show dashboard*/
    PROFILE: 'profile', /* show profile */
    SIGNIN: 'sign-in',
    REGISTER:'register',

}
export default function useAlan() {
    const [alan, setAlan] = useState()
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    const productList = useSelector(state => state.productList);
    const {products} = productList


    const openCart = useCallback(() => {
        alan.playText(`You have ${cartItems.length} products in your cart`)
        setTimeout(function(){window.location.href = '/cart'},3000)
    }, [alan])

    const closeCart = useCallback(() => {
        alan.playText('closing ')
        setTimeout(function(){window.location.href = '/'},2000)
    }, [alan, cartItems, window.location.href])

    const checkout = useCallback(() => {
        //alan.playText('OK ')
        //setTimeout(function(){window.location.href = '/signin?redirect=shipping'},2000)
        const checkoutBtn = document.getElementById("checkout-btn");
        checkoutBtn.click();
    }, [])

    const payment = useCallback(() => {
        //alan.playText('OK ')
        //setTimeout(function(){window.location.href = '/payment'},2000)
        const shippingBtn = document.getElementById("ship-btn");
        shippingBtn.click();
    }, [])

    const placeorder = useCallback(() => {
        alan.playText('OK ')
        //setTimeout(function(){window.location.href = '/placeorder'},2000)
        const payBtn = document.getElementById("pay-btn");
        payBtn.click();
    }, [alan])

    const makeplaceorder = useCallback(() => {
        alan.playText('OK ')
        //setTimeout(function(){window.location.href = '/placeorder'},2000)
        const poBtn = document.getElementById("place-order");
        poBtn.click();
    }, [alan])

    const showOrderHistory = useCallback(() => {
        alan.playText('OK ')
        setTimeout(function(){window.location.href = '/orderhistory'},2000)
    }, [alan])

    const showUsers = useCallback(() => {
        alan.playText('OK ')
        setTimeout(function(){window.location.href = '/userlist'},2000)
    }, [alan])

    const showProducts = useCallback(() => {
        alan.playText('OK ')
        setTimeout(function(){window.location.href = '/productlist'},2000)
    }, [alan])
    const showOrders = useCallback(() => {
        alan.playText('OK ')
        setTimeout(function(){window.location.href = '/orderlist'},2000)
    }, [alan])
    const showDashboard = useCallback(() => {
        alan.playText('OK ')
        setTimeout(function(){window.location.href = '/dashboard'},2000)
    }, [alan])
    const showProfile = useCallback(() => {
        alan.playText('OK ')
        setTimeout(function(){window.location.href = '/profile'},2000)
    }, [alan])
    const signin = useCallback(() => {
        alan.playText('OK ')
        setTimeout(function(){window.location.href = '/signin'},2000)
    }, [alan])
    const register = useCallback(() => {
        alan.playText('OK ')
        setTimeout(function(){window.location.href = '/register'},2000)
    }, [alan])

    const ProductDetails = useCallback(({detail: {name}}) => {
        if(products) {
            const item = products.find(i => i.name.toLowerCase() === name.toLowerCase())
            console.log(item)
            try {
                window.location.href = `product/${item._id}`
            } catch (e) {
                console.log(e)
            }
        }
    })

    const addItem = useCallback(({detail: {name, quantity}})=>{
        if(products) {
            const item = products.find(i => i.name.toLowerCase() === name.toLowerCase())
            if (item == null) {
                alan.playText("i cannot find the item")
            } else {
                //cartReducer(cartItems, addToCart(item._id, quantity))
                window.location.href = `/cart/${item._id}?qty=${quantity}`
            }
    }})

    const removeItem = useCallback(({detail: {name}})=>{
        if(cartItems) {
            const item = cartItems.find(i => i.name.toLowerCase() === name.toLowerCase())
            if (item == null) {
                alan.playText("i cannot find the item")
            } else {
                alan.playText('OK Sir')
                //cartItems.filter(x => x.product !== item.product)
                const deleteBtn = document.getElementById("delete-btn");
                deleteBtn.click()


            }
        }})


    useEffect(()=>{

        window.addEventListener(COMMANDS.OPEN_CART, openCart)
        window.addEventListener(COMMANDS.CLOSE_CART, closeCart)
        window.addEventListener(COMMANDS.ADD_ITEM, addItem)
        window.addEventListener(COMMANDS.PRODUCT_DETAILS, ProductDetails)
        window.addEventListener(COMMANDS.REMOVE_ITEM, removeItem)
        window.addEventListener(COMMANDS.CHECKOUT, checkout)
        window.addEventListener(COMMANDS.PAYMENT, payment)
        window.addEventListener(COMMANDS.PLACE_ORDER, placeorder)
        window.addEventListener(COMMANDS.MAKE_PLACE_ORDER, makeplaceorder)
        window.addEventListener(COMMANDS.ORDER_HISTORY, showOrderHistory)
        window.addEventListener(COMMANDS.PRODUCTS, showProducts)
        window.addEventListener(COMMANDS.USERS, showUsers)
        window.addEventListener(COMMANDS.ORDERS, showOrders)
        window.addEventListener(COMMANDS.DASHBOARD, showDashboard)
        window.addEventListener(COMMANDS.PROFILE, showProfile)
        window.addEventListener(COMMANDS.SIGNIN, signin)
        window.addEventListener(COMMANDS.REGISTER, register)









        return () => {
            window.removeEventListener(COMMANDS.OPEN_CART, openCart)
            window.removeEventListener(COMMANDS.CLOSE_CART, closeCart)
            window.removeEventListener(COMMANDS.ADD_ITEM, addItem)
            window.removeEventListener(COMMANDS.PRODUCT_DETAILS, ProductDetails)
            window.removeEventListener(COMMANDS.REMOVE_ITEM, removeItem)
            window.removeEventListener(COMMANDS.PAYMENT, payment)
            window.removeEventListener(COMMANDS.PLACE_ORDER, placeorder)
            window.removeEventListener(COMMANDS.MAKE_PLACE_ORDER, makeplaceorder)
            window.removeEventListener(COMMANDS.ORDER_HISTORY, showOrderHistory)
            window.removeEventListener(COMMANDS.PRODUCTS, showProducts)
            window.removeEventListener(COMMANDS.USERS, showUsers)
            window.removeEventListener(COMMANDS.ORDERS, showOrders)
            window.removeEventListener(COMMANDS.DASHBOARD, showDashboard)
            window.removeEventListener(COMMANDS.PROFILE, showProfile)
            window.removeEventListener(COMMANDS.SIGNIN, signin)
            window.removeEventListener(COMMANDS.REGISTER, register)








        }
    }, [openCart, closeCart, addItem, ProductDetails,  removeItem, checkout, payment, placeorder,makeplaceorder, showOrderHistory,showProducts,showUsers,showOrders, showDashboard, showProfile,signin,register])

    useEffect(()=>{
        if(alan != null) return
        setAlan(
            alanBtn({
            key:'4fe12176484637bed87e382ab6bfed1b2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({command, payload}) => {
                window.dispatchEvent(new CustomEvent(command, {detail: payload}))
            }
        })
        )
    }, [])
    return null
}