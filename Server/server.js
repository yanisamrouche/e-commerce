import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import path from 'path'
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";
import bodyParser from 'body-parser';
import uploadRouter from "./routers/uploadRouter.js";
dotenv.config();

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect(process.env.MONGODB_URL,
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
app.use('/api/uploads', uploadRouter)
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/', (req, res) => {
    res.send("server");
});

/* middlewar error catcher */
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
});


const port = process.env.PORT || 1240;

app.listen(port, () => {
    console.log(`Server is running : http://localhost:${port}`);
});
