import React, {useEffect} from "react";
import {addToCart, removeFromCart} from "../actions/cartActions";
import {useDispatch, useSelector} from "react-redux";
import MessageBox from "../components/MessageBox";
import {Link} from "react-router-dom";

 export default function CartScreen(props) {
     const productId = props.match.params.id;
     const qty = props.location.search ?
         Number(props.location.search.split('=')[1])
         : 1;

     const cart = useSelector((state => state.cart))
     const {cartItems} = cart
     const dispatch = useDispatch();
     useEffect(() => {
         if (productId){
             dispatch(addToCart(productId,qty))
         }
     },[dispatch,productId, qty])

      const removeFromCartHandler = (id) => {
         dispatch(removeFromCart(id))
     }

     const checkoutHandler = ()=>{
         props.history.push(`/signin?redirect=shipping`)
     }

     return(
         <>
             <h1>Shopping Cart</h1>
             <div className="oneline">
             <div className="col-2">
                 {
                     cartItems.length === 0 ?
                         <MessageBox> Cart is empty <br/>
                             <Link to="/">Shop now</Link>
                         </MessageBox>
                             : (
                                 <ul>
                                     {
                                         [...Array(cartItems.length).keys()].map(x => (
                                             <>
                                                 <div className="card-item">
                                                     <li className='oneline'>
                                                         <div>
                                                            <Link to={`/product/${cartItems[x].product}`}><img className="img-shoppingcart" key={x} src={cartItems[x].image} alt={cartItems[x].name}/></Link>
                                                         </div>
                                                             <div className="item-title">
                                                                <Link key={x} to={`/product/${cartItems[x].product}`}>{cartItems[x].name}</Link>
                                                             </div>

                                                                 <div key={x} className="item-qty" >
                                                                     <select key={x} value={cartItems[x].qty} onChange={e => dispatch(addToCart(cartItems[x].product,Number(e.target.value)))}>
                                                                         {

                                                                             [...Array(cartItems[x].countInStock).keys()].map(x => (
                                                                                 <option key={x+1} value={x+1}>{x+1}</option>
                                                                             ))
                                                                         }
                                                                     </select>
                                                                 </div>
                                                             <br/>
                                                             <div className="item-price">{cartItems[x].price}$</div>
                                                             <button id="delete-btn" className="item-button-del" type="button" onClick={() => removeFromCartHandler(cartItems[x].product)}>
                                                                 Delete
                                                                 <span></span><span></span><span></span><span></span>

                                                             </button>


                                                     </li>
                                                 </div>
                                             </>
                                         ))
                                     }

                                 </ul>
                     )
                 }

             </div>
              <div className="col-1">
                  <div className="card card-body">
                     <ul>
                         <li>
                             <h2>
                                 Number of items : {cartItems.reduce((acc , current)=> acc + current.qty, 0 )} items
                             </h2>
                             <h2>
                                 Total price : {cartItems.reduce((acc, currentItem) => acc + currentItem.qty*currentItem.price, 0)}$
                             </h2>
                         </li>
                         <li>
                             <button id="checkout-btn" className="primary block" type="button" onClick={checkoutHandler} disabled={cartItems.length === 0}>
                                 Checkout
                                 <span></span><span></span><span></span><span></span>
                             </button>
                         </li>
                     </ul>
                  </div>
               </div>

         </div>


        </>
     )

 }