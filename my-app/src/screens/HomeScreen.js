import Product from "../components/Product";
import data from "../data"
import LandingPage from "../LandingPage";
function HomeScreen() {
    return(
        <>
            <LandingPage/>

            <div className="row centre">

                {
                    data.products.map((product) => (
                        <Product key={product.id} product = {product} />
                    ))
                }
            </div>
        </>
    )
}

export default HomeScreen;