import express from 'express'
import { db } from './config/database.js'
import {createServer} from 'http'
import handlebars from "express-handlebars"
import {Server} from "socket.io"
import {productRouter} from './router/productsMongo.router.js'
import {cartRouter} from './router/cartMongo.router.js'
import {viewRouter} from "./router/views.router.js"
import __dirname from './utils.js'
import { categoryRouter } from './router/categoryMongo.router.js'
import ProductModel from './models/product.model.js'

const app = express()
const port = process.env.PORT || 8080
const hostname = "127.0.0.1"

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')


// const httpServer = app.listen(port, hostname,  () => { console.log(`Server corriendo en http://${hostname}:${port}/`) })
const httpServer = createServer(app)

const io = new Server(httpServer)

io.on('connection', async (socket) => {
    let prods = await ProductModel.find()
    console.log('Un cliente se ha conectado');
    socket.join('sala1');
    socket.emit('lista',prods)
    socket.on('delete-product',async (value) =>{
        console.log(value)
        await ProductModel.findByIdAndDelete(value)
        prods = await ProductModel.find()
        socket.emit('lista',prods)
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


httpServer.listen(port, hostname,  () => { console.log(`Server corriendo en http://${hostname}:${port}/`) })


