import CheckOutSteps from "../components/CheckOutSteps";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {createOrder} from "../actions/orderActions.js";
import {ORDER_CREATE_RESET} from "../constants/orderConstans";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
export default function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart)
    if(!cart.paymentMethod){
        props.history.push('/payment')
    }

    const orderCreate = useSelector(state => state.orderCreate)
    const { loading, success, e, order } = orderCreate

    const toPrice = (num) => Number(num.toFixed(2)); // 5.212 -> "5.212" -> 5.21
    /* for the order summary  */
    cart.itemsPrice    = toPrice(cart.cartItems.reduce((acc, c) => acc + c.qty*c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0): toPrice(10);
    cart.taxPrice      = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice    = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        dispatch(createOrder({...cart, orderItems: cart.cartItems}))
    }

    useEffect(()=>{
        if(success){
            props.history.push(`/order/${order._id}`)
            dispatch({type: ORDER_CREATE_RESET})
        }
    }, [dispatch,order,props.history, success])

    return (
        <div>
            <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name : </strong> {cart.shippingAddress.fullName} <br/>
                                    <strong>Address : </strong> {cart.shippingAddress.address},
                                    {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method : </strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        [...Array(cart.cartItems.length).keys()].map(x => (
                                            <>
                                                <div className="card-item">
                                                    <li className='oneline'>
                                                        <div>
                                                            <Link to={`/product/${cart.cartItems[x].product}`}><img className="img-shoppingcart" key={x} src={cart.cartItems[x].image} alt={cart.cartItems[x].name}/></Link>
                                                        </div>
                                                        <div className="item-title">
                                                            <Link key={x} to={`/product/${cart.cartItems[x].product}`}>{cart.cartItems[x].name}</Link>
                                                        </div>
                                                        <div className="item-price">{cart.cartItems[x].qty}x{cart.cartItems[x].price}$ = {cart.cartItems[x].price * cart.cartItems[x].qty}</div>



                                                    </li>
                                                </div>
                                            </>
                                        ))
                                    }

                                </ul>

                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>Order Summary</h2>
                        </li>
                        <li>
                            <div className="row">
                                <div>Items</div>
                                <div>{cart.itemsPrice.toFixed(2)}$</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Shipping</div>
                                <div>{cart.shippingPrice.toFixed(2)}$</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Tax</div>
                                <div>{cart.taxPrice.toFixed(2)}$</div>
                            </div>
                        </li>

                        <li>
                            <div className="row">
                                <div> <strong>Order Total</strong></div>
                                <div><strong>{cart.totalPrice.toFixed(2)}$ </strong></div>
                            </div>
                        </li>

                        <li>
                            <button id="place-order" type="button" onClick={placeOrderHandler}
                                    className="primary block" disabled={cart.cartItems.length ===0}>
                                Place Order
                                <span></span><span></span><span></span><span></span>
                            </button>
                        </li>
                        {
                            loading && <LoadingBox></LoadingBox>
                        }
                        {
                            e && <MessageBox variant="danger"></MessageBox>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}