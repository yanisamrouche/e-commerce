import {BrowserRouter, Route} from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
function App() {
  return (
      <BrowserRouter >
      <div className="grid-container">

            <header className="row">
                <div>
                    <a className="website-brand" href="/">MorningStar.</a>
                </div>
                <div>
                    <a href="/cart">Cart</a>
                    <a href="/signin">Sign in</a>
                </div>
            </header>




            <main>
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
