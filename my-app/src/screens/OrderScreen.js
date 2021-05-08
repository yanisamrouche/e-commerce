import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {detailsOrder, payOrder} from "../actions/orderActions";
import Axios from 'axios'
import {PayPalButton} from "react-paypal-button-v2";
import {ORDER_PAY_RESET} from "../constants/orderConstans";

export default function OrderScreen(props) {
    /* to show the order details */
    const orderId = props.match.params.id
    const [ready, setReady] = useState(false)
    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, e}= orderDetails;

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, e: errorPay, success: successPay} = orderPay;

    const dispatch = useDispatch();
    useEffect(()=>{
        const addPaypalScript = async () => {
            const {data} = await Axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = "text/javascript"
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
            script.async = true;
            script.onload = () => {
                setReady(true)
            }
            document.body.appendChild(script)
        }
        if(!order || successPay || (order && order._id !== orderId)){
            dispatch({type: ORDER_PAY_RESET})
            dispatch(detailsOrder(orderId))
        }else {
            if(!order.isPaid){
                if(!window.paypal){
                    addPaypalScript();
                }else {
                    setReady(true);
                }
            }
        }

    }, [dispatch,order, orderId, ready, successPay])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult))
    }

    return loading ? (<LoadingBox></LoadingBox>): e? (<MessageBox variant="danger"></MessageBox>) : (
        <div>
            <h1>Order {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name : </strong> {order.shippingAddress.fullName} <br/>
                                    <strong>Address : </strong> {order.shippingAddress.address},
                                    {order.shippingAddress.city}, {order.shippingAddress.postalCode},{order.shippingAddress.country}
                                </p>
                                {order.isDelivered ?
                                    <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>
                                :   <MessageBox variant="danger">Not Delivered</MessageBox>}
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method : </strong> {order.paymentMethod}
                                </p>
                                {order.isPaid ?
                                    <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
                                    :   <MessageBox variant="danger">Not Paid</MessageBox>}
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        [...Array(order.orderItems.length).keys()].map(x => (
                                            <>
                                                <div className="card-item">
                                                    <li className='oneline'>
                                                        <div>
                                                            <Link to={`/product/${order.orderItems[x].product}`}><img className="img-shoppingcart" key={x} src={order.orderItems[x].image} alt={order.orderItems[x].name}/></Link>
                                                        </div>
                                                        <div className="item-title">
                                                            <Link key={x} to={`/product/${order.orderItems[x].product}`}>{order.orderItems[x].name}</Link>
                                                        </div>
                                                        <div className="item-price">{order.orderItems[x].qty}x{order.orderItems[x].price}$ = {order.orderItems[x].price * order.orderItems[x].qty}</div>



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
                                <div>{order.itemsPrice.toFixed(2)}$</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Shipping</div>
                                <div>{order.shippingPrice.toFixed(2)}$</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Tax</div>
                                <div>{order.taxPrice.toFixed(2)}$</div>
                            </div>
                        </li>

                        <li>
                            <div className="row">
                                <div> <strong>Order Total</strong></div>
                                <div><strong>{order.totalPrice.toFixed(2)}$ </strong></div>
                            </div>
                        </li>
                        {
                            !order.isPaid && (
                                <li>
                                    {
                                        !ready ? (<LoadingBox></LoadingBox>) :
                                            (
                                                <>
                                                    {errorPay && (<MessageBox variant="danger">{errorPay}</MessageBox>)}
                                                    {loadingPay && <LoadingBox></LoadingBox>}
                                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>
                                                </>
                                            )
                                    }
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}