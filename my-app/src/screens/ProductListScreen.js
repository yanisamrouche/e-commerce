import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {listProducts} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function ProductListScreen(props){
    const productList = useSelector(state => state.productList)
    const { loading, e, products } = productList
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(listProducts());

    },[dispatch])
    //delete function
    const deleteHandler = () => {
        //TODO
    }

    return(
        <div>
            <h1>Products</h1>
            { loading ? (<LoadingBox></LoadingBox>)
                : e? (<MessageBox variant="danger">{e}</MessageBox>)
                :
                    (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th>STOCK</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                            {products.map((product) =>(
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.countInStock}</td>
                                    <td>
                                        <button className="primary block" type="button" onClick={()=> props.history.push(`/product/${product._id}/edit`)} >
                                            Edit
                                            <span></span><span></span><span></span><span></span>
                                        </button>
                                    </td>
                                    <td>
                                        <button className="primary block" type="button" onClick={()=>deleteHandler(product)} >
                                            Delete
                                            <span></span><span></span><span></span><span></span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
        </div>
    )
}