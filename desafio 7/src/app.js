import express from 'express'
import { db } from './config/database.js'
import {createServer} from 'http'
import handlebars from "express-handlebars"
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import {Server} from "socket.io"
import {productRouter} from './routes/api/productsMongo.router.js'
import {cartRouter} from './routes/api/cartMongo.router.js'
import {viewRouter} from "./routes/views/views.router.js"
import __dirname from './utils.js'
import { categoryRouter } from './routes/api/categoryMongo.router.js'
import ProductModel from './models/product.model.js'
import CartModel from './models/cart.model.js'
import sessionRouter from './routes/api/session.router.js'
import loginRouter from './routes/views/login.router.js'
import profileRouter from './routes/views/profile.router.js'


const app = express()
const port = process.env.PORT || 8080
const hostname = "127.0.0.1"

app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use(cookieParser())

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use(session({
    secret: 'CoderSecret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://carlosdscala:TEmmhXWGwrX7MUQ3@cluster0.eybydfo.mongodb.net/?retryWrites=true&w=majority',
        ttl: 2*60,
    })
}))

// const httpServer = app.listen(port, hostname,  () => { console.log(`Server corriendo en http://${hostname}:${port}/`) })
const httpServer = createServer(app)

const io = new Server(httpServer)

let carrito = null

io.on('connection', async (socket) => {
    let prods = await ProductModel.find()
    console.log('Un cliente se ha conectado');
    socket.join('sala1');
    socket.emit('lista',prods)
    socket.on('delete-product',async (value) =>{
        await ProductModel.findByIdAndDelete(value)
        prods = await ProductModel.find()
        socket.emit('lista',prods)
    }) 
    socket.on('add-product-cart',async (value) =>{
        if (!carrito){
            const newCarrito = new CartModel()
            carrito = newCarrito._id
        }
        
        var query ={ _id: carrito },
        update = {$addToSet:{ products: { product: value , quantity: 1 } } },
        options = { upsert: true };

        const result = await CartModel.findByIdAndUpdate(query, update, options)
        
        socket.emit('add-product-cart-alert',{carrito: carrito, producto: value}) 
    })   
});
app.use((req, res, next) => {
    req.io = io;
    return next();
  });
app.use('/',express.static(__dirname + '/public'))
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/categories', categoryRouter)
app.use('/', viewRouter)

app.use('/api/sessions', sessionRouter)
app.use("/login", loginRouter);
app.use("/profile", profileRouter)
app.use('/logout', sessionRouter)

app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send('Algo salio mal')
})


httpServer.listen(port, hostname,  () => { console.log(`Server corriendo en http://${hostname}:${port}/`) })


