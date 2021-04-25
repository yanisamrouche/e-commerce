import data from './data'
function App() {
  return (
      <div className="grid-container">
            <header className="row">
                <div>
                    <a className="website-brand" href="home.html">e-commerce</a>
                </div>
                <div>
                    <a href="cart.html">Cart</a>
                    <a href="signin.html">Sign in</a>
                </div>
            </header>

            <main>
                <div className="row centre">

                {
                    data.products.map((product) => (
                        <div key={product.id} className="card">
                            <a href={`/product/${product.id}`}>
                                <img className="medium" src={product.image} alt={product.name}/>
                            </a>
                            <div className="card-body">
                                <a href={`/product/${product.id}`}>
                                    <h2>{product.name}</h2>
                                </a>

                                <div className="rating">
                                    <span><i className="fa fa-star"></i></span>
                                    <span><i className="fa fa-star"></i></span>
                                    <span><i className="fa fa-star"></i></span>
                                    <span><i className="fa fa-star"></i></span>
                                    <span><i className="fa fa-star-o"></i></span>
                                </div>

                                <div className="price">{product.price}</div>
                            </div>
                        </div>


                    ))
                }

                </div>
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


);
}

export default App;
