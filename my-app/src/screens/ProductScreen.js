import Rating from "../components/Rating";
import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {detailsProduct} from "../actions/productActions";


function ProductScreen(props) {
    /* loading products from static files in frontend
    const product = data.products.find(x => x.id === props.match.params.id);
     */
    /* loading products from productsDetails redux store */
    const dispatch = useDispatch();
    const productId= props.match.params.id;
    const productDetails = useSelector(state => state.productDetails)
    const { loading , error, product } = productDetails
    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId])

    return(
        <div>
            {loading ? ( <LoadingBox></LoadingBox> )
                :
                error ? ( <MessageBox variant="danger">{error}</MessageBox> )
                    : (
                        <div>
                            <Link to="/"> Back </Link>

                            <div className='row top'>

                                <div className="col-2">
                                    <img className="large" src={product.image} alt={product.name}/>
                                </div>

                                <div className="col-1">
                                    <ul>
                                        <li> <h1>{product.name}</h1> </li>
                                        <li> <Rating rating={product.rating} numReviews={product.numReviews}/> </li>
                                        <li> Price : {product.price}$</li>
                                        <li> Description : <br/> {product.description} </li>
                                    </ul>
                                </div>


                                <div className="col-1">
                                    <div className="card card-body">
                                        <ul>
                                            <li>
                                                <div className="row">
                                                    <div>Price : </div><div className="price">{product.price}$</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="row">
                                                    <div>Status : </div>
                                                    <div>
                                                        {product.countInStock > 0 ? (
                                                                <span className="success">In Stock ({product.countInStock})</span>)
                                                            : (<span className="danger"> Unavailable ({product.countInStock})</span>)
                                                        }
                                                    </div>
                                                </div>

                                            </li>
                                            <li>
                                                <button className="primary block">Add to cart
                                                    <span></span><span></span><span></span><span></span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )


            }
        </div>

    )
}
export default ProductScreen;