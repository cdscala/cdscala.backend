import express from 'express'
import serverConfig from './config/server.config.js'

import {createServer} from 'http'
import handlebars from "express-handlebars"
import cookieParser from 'cookie-parser'

import initializePassport from './config/passport.config.js'
import {Server} from "socket.io"

import __dirname from './utils.js'

import ProductModel from './dao/models/product.model.js'
import CartModel from './dao/models/cart.model.js'

import router from './routes/router.js'
import initializeSession from './config/session.config.js'

 
const app = express()
const port = serverConfig.port
const mode = serverConfig.mode
const hostname = "127.0.0.1"

app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use(cookieParser())

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

initializeSession(app)

initializePassport(app)

// const httpServer = app.listen(port, hostname,  () => { console.log(`Server corriendo en http://${hostname}:${port}/`) })
const httpServer = createServer(app)

const io = new Server(httpServer)

let carrito = null

io.on('connection', async (socket) => {
    let prods = await ProductModel.find()
    console.log('Un cliente se ha conectado')
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
        update = {$addToSet:{ products: { product: value , quantity: 1 } } }
        options = { upsert: true }

        const result = await CartModel.findByIdAndUpdate(query, update, options)
        
        socket.emit('add-product-cart-alert',{carrito: carrito, producto: value}) 
    })   
});
app.use((req, res, next) => {
    req.io = io
    return next()
  });

app.use('/',express.static(__dirname + '/public'))

router(app);


app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send('Algo salio mal')
})


if (port){
    httpServer.listen(port, hostname,  () => { console.log(`Server ${mode} corriendo en http://${hostname}:${port}/`) })
}
else{
    console.error("No hay variables de entorno configuradas");
}


