import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
mongoose.connect('mongodb://localhost/projectdb',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(()=>{
    console.log("Connected to the Database. Yay!");
})
    .catch(err => {
        console.log(err);
    });
/* products & users route */
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => {
    res.send("server");
});

/* middlewar error catcher */
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
});


const port = process.env.PORT || 1235;

app.listen(port, () => {
    console.log(`Server is running : http://localhost:${port}`);
});
