import {BrowserRouter, Link, Route} from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import CartScreen from "./screens/CartScreen.js";
import {useDispatch, useSelector} from "react-redux";
import SigninScreen from "./screens/SigninScreen";
import {signout} from "./actions/userActions";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
function App() {

  const cart = useSelector((state => state.cart))
  const {cartItems} = cart;
  const userSignin = useSelector(state => state.userSignin)
  const {userInfo} = userSignin;
  const dispatch = useDispatch();
  const signouthandler = () => {
      dispatch(signout());
  }

  return (
      <BrowserRouter >
      <div className="grid-container">

            <header className="row">
                <div>
                    <Link className="website-brand" to="/">Store.</Link>

                </div>
                <div>
                    <Link to="/cart">
                        Cart<i className='fas fa-shopping-basket'></i>
                        {
                            cartItems.length > 0 && (
                                <span className="badge">{cartItems.length}</span>
                            )
                        }

                    </Link>
                    {
                        userInfo ?
                        (
                            <div className="dropdown">
                                <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i> </Link>
                                <ul className="dropdown-content">
                                    <li><Link to={"/profile"}>Profile</Link></li>
                                    <li> <Link to="/orderhistory">Order History</Link> </li>
                                    <li> <Link to="#signout" onClick={signouthandler}>Sign Out</Link> </li>
                                </ul>
                            </div>

                        ):(
                            <Link to="/signin">Sign In <i className='fas fa-user-circle'></i></Link>
                        )
                    }
                </div>
            </header>


            <main>
                <Route path="/cart/:id?" component={CartScreen}></Route>
                <Route path="/product/:id" component={ProductScreen}></Route>
                <Route path="/signin" component={SigninScreen}></Route>
                <Route path="/register" component={RegisterScreen}></Route>
                <Route path="/shipping" component={ShippingAddressScreen} ></Route>
                <Route path="/payment" component={PaymentMethodScreen} ></Route>
                <Route path="/placeorder" component={PlaceOrderScreen} ></Route>
                <Route path="/order/:id" component={OrderScreen} ></Route>
                <Route path="/orderhistory" component={OrderHistoryScreen} ></Route>
                <Route path="/profile" component={ProfileScreen} ></Route>


                <Route path="/" component={HomeScreen} exact></Route>

            </main>

            <footer className="row centre">
                <div>
                     <a href="http://copyright.be" target="_blank">Copyright © 2020-2021</a>
                </div>
                <div>
                    <a href="ContactUs.html" target="_blank">Contact Us </a>
                </div>

            </footer>
        </div>
      </BrowserRouter>


);
}

export default App;
