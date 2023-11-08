import express from 'express'
import {createServer} from 'http'
import handlebars from "express-handlebars";
import {Server} from "socket.io";
import {productRouter} from './router/products.router.js'
import {cartRouter} from './router/cart.router.js'
import {viewRouter} from "./router/views.router.js";
import __dirname from './utils.js';

const app = express()
const port = process.env.PORT || 8080;
const hostname = "127.0.0.1";

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use('/',express.static(__dirname + '/public'));
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewRouter);

// const httpServer = app.listen(port, hostname,  () => { console.log(`Server corriendo en http://${hostname}:${port}/`) })
const httpServer = createServer(app)

const io = new Server(httpServer)


let messages = [];
io.on('connection', (socket) => {
    socket.on('message', (data) => {
        messages.push(data);
        io.emit('messageLogs', messages)
    });

    socket.on("auth", (username) => {
        socket.emit("messageLogs", messages);
        socket.broadcast.emit("userConnected", username);
      });
});
httpServer.listen(port, hostname,  () => { console.log(`Server corriendo en http://${hostname}:${port}/`) })


