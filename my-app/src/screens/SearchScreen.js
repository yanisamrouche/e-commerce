import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {listProducts} from "../actions/productActions";
import { useParams } from 'react-router-dom';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";

export default function SearchScreen(props) {
    const { name = 'all' } = useParams();
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList)
    const { loading, e, products } = productList
    useEffect(()=> {
        dispatch(listProducts({name: name !== 'all' ? name : ''}))
    }, [dispatch, name])
    return (
        <div>
            <div className="row">
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : e ? (
                    <MessageBox variant="danger">{e}</MessageBox>
                ) : (
                    <>
                        {products.length===0 && (
                            <MessageBox>No Product Found</MessageBox>
                        )}
                        <div className="row centre">
                            {products.map((product) => (
                                <Product key={product._id} product={product}></Product>
                            ))}

                        </div>
                    </>
                )}

            </div>
        </div>
    )


}