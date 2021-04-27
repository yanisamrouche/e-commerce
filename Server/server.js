import express from 'express'
import data from './data.js';

const app = express();
const port = process.env.PORT || 8080;


app.get('/', (req, res) => {
    res.send("hello from server");
});

/* products route */
app.get('/api/products', (req, res) => {
   res.send(data.products);
});
/* details product route */
app.get('/api/products/:id', (req, res) => {
    const product = data.products.find(x => x.id === req.params.id);
    if (product){
        res.send(product);
    }else {
        res.status(404).send({message: 'product not found'})
    }
});


app.listen(port, () => {
    console.log(`Server is running : http://localhost:${port}`);
});
