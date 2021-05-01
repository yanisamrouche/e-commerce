import express from 'express';
import mongoose from 'mongoose';
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";

const app = express();

mongoose.connect('mongodb://localhost/projectdb',
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("Connected to the Database. Yayzow!");
})
.catch(err => {
        console.log(err);
});
/* products & users route */
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
    res.send("server");
});

/* middlewar error catcher */
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
});


const port = process.env.PORT || 4321;

app.listen(port, () => {
    console.log(`Server is running : http://localhost:${port}`);
});
