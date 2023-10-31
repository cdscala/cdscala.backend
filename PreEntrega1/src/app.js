import express from 'express'
import {productRouter} from './router/products.router.js'
import {cartRouter} from './router/cart.router.js'

const app = express()
const port = 8080;
const hostname = "127.0.0.1";

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(port, hostname, function () {
    console.log(`Server corriendo en http://${hostname}:${port}/`);
})