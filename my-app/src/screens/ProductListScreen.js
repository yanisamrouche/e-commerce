import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {createProduct, deleteProduct, listProducts} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET} from "../constants/productConstants";

export default function ProductListScreen(props){
    const productList = useSelector(state => state.productList)
    const { loading, e, products } = productList

    const productCreate = useSelector(state => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product:createdProduct
    } = productCreate

    const productDelete = useSelector(state => state.productDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;



    const dispatch = useDispatch();
    useEffect(()=>{
        if(successCreate){
            dispatch({type: PRODUCT_CREATE_RESET});
            props.history.push(`/product/${createdProduct._id}/edit`)
        }
        if(successDelete){
            dispatch({type: PRODUCT_DELETE_RESET});
        }
        dispatch(listProducts({}));

    },[createdProduct,dispatch, props.history, successCreate, successDelete])

    //delete function
    const deleteHandler = (product) => {
        if(window.confirm('Are you sure you want to delete this product ?')){
            dispatch(deleteProduct(product._id));
        }
    }
    // create function
    const createHandler = () => {
        dispatch(createProduct())
    }

    return(
        <div>
            <div className="row">
                <h1>Products</h1>
                <button className="add-btn" type="button"  onClick={createHandler}>
                    add product
                    <span></span><span></span><span></span><span></span>
                </button>
            </div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
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
                                    <th>GENDER</th>
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
                                    <td>{product.gender}</td>
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