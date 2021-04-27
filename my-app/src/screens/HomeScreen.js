import React, { useEffect } from 'react';
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import LandingPage from "../LandingPage";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";


function HomeScreen() {
    /*
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

     */
    const productList = useSelector(state => state.productList);
    const {loading, error, products} = productList;
    const dispatch = useDispatch();

    useEffect(() =>{
        /*
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('/api/products');
                setLoading(false);
                setProducts(data);
            }catch (e) {
                setError(e.message);
                setLoading(false);
            }

        };
        fetchData();
         */
        dispatch(listProducts())
    }, [dispatch])
    return(
        <>
            <div>
                {loading ? ( <LoadingBox></LoadingBox> )
                :
                error ? ( <MessageBox variant="danger">{error}</MessageBox> )
                : (
                    <>
                    <LandingPage/>
                    <div className="row centre">

                    {
                        products.map((product) => (
                            <Product key={product.id} product = {product} />
                        ))
                    }
                    </div>
                    </>
                    )


                }
            </div>


        </>
    )
}

export default HomeScreen;