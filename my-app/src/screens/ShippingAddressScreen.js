import CheckOutSteps from "../components/CheckOutSteps";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveShippingAddress} from "../actions/cartActions";

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart;
    if (!userInfo){
        props.history.push('/signin')
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const sumbitHandler = (e)=>{
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}))
        props.history.push('/payment')

    }
    return(
            <div>
                <CheckOutSteps step1 step2></CheckOutSteps>
                <form className="form" onSubmit={sumbitHandler}>
                    <div>
                        <h1>Shipping Address</h1>
                    </div>
                    <div>
                        <label htmlFor="fullName"> Full name </label> <br/>
                        <input type="text" id="fullName" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required></input>
                    </div>
                    <div>
                        <label htmlFor="address"> Address </label><br/>
                        <input type="text" id="address" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} required></input>
                    </div>
                    <div>
                        <label htmlFor="city"> City </label><br/>
                        <input type="text" id="city" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} required></input>
                    </div>
                    <div>
                        <label htmlFor="postalCode"> Postal code </label><br/>
                        <input type="text" id="postalCode" placeholder="Enter postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required></input>
                    </div>
                    <div>
                        <label htmlFor="country"> Country </label><br/>
                        <input type="text" id="country" placeholder="Enter country" value={country} onChange={(e) => setCountry(e.target.value)} required></input>
                    </div>
                    <div>
                        <label/>
                        <button className="primary" type="sumbit">
                            Continue
                            <span></span><span></span><span></span><span></span>
                        </button>
                    </div>
                </form>
            </div>
    )
}