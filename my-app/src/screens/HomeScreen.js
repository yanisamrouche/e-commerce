import React, {useEffect, useState} from 'react';
import Product from "../components/Product.js";
import LoadingBox from "../components/LoadingBox.js";
import MessageBox from "../components/MessageBox.js";
import Categories from "../components/Categories.js"
import LandingPage from "../LandingPage.js";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions.js";


function HomeScreen() {
    /*
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

     */
    const productList = useSelector(state => state.productList);
    const {loading, error, products} = productList;
    const [activeCategory, setActiveCategory] = useState('')
    let categories;
    if(products){
         categories = products.reduce(
            (acc, product)=>
                acc.includes(product.category) ? acc : acc.concat(product.category), [])
    }

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
                            <Categories categories={categories}
                                        setActiveCategory={setActiveCategory}
                                        activeCategory={activeCategory} />
                        </div>
                    <div className="row centre">

                    {
                        products.map((product) => !activeCategory || activeCategory === product.category ? (

                            <Product key={product.id} product = {product} />
                        ): null)
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