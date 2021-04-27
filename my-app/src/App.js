import {BrowserRouter, Link, Route} from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import {useSelector} from "react-redux";
function App() {
  const cart = useSelector((state => state.cart))
  const {cartItems} = cart;

  return (
      <BrowserRouter >
      <div className="grid-container">

            <header className="row">
                <div>
                    <Link className="website-brand" to="/">MorningStar.</Link>

                </div>
                <div>
                    <Link to="/cart">
                        {
                            cartItems.length > 0 && (
                                <span className="badge">{cartItems.length}</span>
                            )
                        }
                        <br/>
                        Cart<i className='fas fa-shopping-basket'></i>

                    </Link>
                    <Link to="/signin">Sign in <i className='fas fa-user-circle'></i></Link>
                </div>
            </header>





            <main>
                <Route path="/cart/:id?" component={CartScreen}></Route>
                <Route path="/product/:id" component={ProductScreen}></Route>
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
