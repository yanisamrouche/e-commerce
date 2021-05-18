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
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import useAlan from "./AlanAI/useAlan";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen"

function App() {
  useAlan()
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
                   <Route render={({history}) => (
                       <SearchBox history={history}></SearchBox>
                   )}></Route>
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
                    {
                        userInfo && userInfo.isAdmin && (
                            <div className="dropdown">
                                <Link to="#admin">Admin {' '} <i className="fa fa-caret-down"></i> </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>

                                    <li>
                                        <Link to="/productlist">Products</Link>
                                    </li>

                                    <li>
                                        <Link to="/orderlist">Orders</Link>
                                    </li>

                                    <li>
                                        <Link to="/userlist">Users</Link>
                                    </li>

                                </ul>
                            </div>
                        )
                    }
                </div>
            </header>


            <main>
                <Route path="/cart/:id?" component={CartScreen} ></Route>
                <Route path="/product/:id" component={ProductScreen} exact></Route>
                <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
                <Route path="/signin" component={SigninScreen} ></Route>
                <Route path="/register" component={RegisterScreen} ></Route>
                <Route path="/shipping" component={ShippingAddressScreen} ></Route>
                <Route path="/payment" component={PaymentMethodScreen} ></Route>
                <Route path="/placeorder" component={PlaceOrderScreen} ></Route>
                <Route path="/order/:id" component={OrderScreen} ></Route>
                <Route path="/orderhistory" component={OrderHistoryScreen} ></Route>
                <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
                <PrivateRoute path="/profile" component={ProfileScreen} ></PrivateRoute>
                <AdminRoute path="/productlist"component={ProductListScreen}></AdminRoute>
                <AdminRoute path="/orderlist" component={OrderListScreen} ></AdminRoute>
                <AdminRoute path="/userlist" component={UserListScreen} ></AdminRoute>
                <AdminRoute path="/user/:id/edit" component={UserEditScreen} ></AdminRoute>
                <Route path="/" component={HomeScreen} exact></Route>

            </main>

            <footer className="row centre">
                <div>
                     <a href="http://copyright.be" target="_blank">Copyright © 2020-2021</a>
                </div>


            </footer>
        </div>
      </BrowserRouter>


);
}

export default App;
