import CheckOutSteps from "../components/CheckOutSteps";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {savePaymentMethod} from "../actions/cartActions";
export default function PaymentMethodScreen(props) {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    if(!shippingAddress.address){
        props.history.push('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/placeorder')
    }

    return (
        <div>
            <CheckOutSteps step1 step2 step3 ></CheckOutSteps>
            <form className="form">
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div >
                    <div className="checkPay">
                        <label htmlFor="paypal">PayPal</label>
                        <input
                            type="radio"
                            id="paypal"
                            value="PayPal"
                            name="paymentMethod"
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}></input>
                    </div>
                </div>
                <div>
                    <button id="pay-btn" className="primary" type="button" onClick={submitHandler}>
                        Continue
                        <span></span><span></span><span></span><span></span>

                    </button>
                </div>
            </form>
        </div>
    )
}