import express from 'express';
import ProductModel from '../../models/product.model.js';
import CartModel from '../../models/cart.model.js';

const viewRouter = express.Router();

viewRouter.get('/', async (req, res)=>{
    res.render('main',{
        title:"Login Buttons",
        layout: "index",

    })
})

viewRouter.get('/productList', async (req, res)=>{
    let prod = await ProductModel.find()
    let objectProd = []
    prod.forEach(element => {
        objectProd.push(element.toObject())
    });
    res.render('home',{
        title:"HANDLEBARS",
        products: objectProd,
        layout: "index",

    })
})

viewRouter.get('/realTimeProducts', async (req, res)=>{
    res.render('realTimeProducts',{
        title:"realtimeproducts",
    })
})

viewRouter.get('/products', async (req, res)=>{
    res.render('index',{
        title:"products",
        layout: "products",
    })
})

viewRouter.get('/carts/:cid', async (req, res)=>{
    let cart = await CartModel.findById(req.params.cid).populate('products.product')
    let objectProd = []
    cart.products.forEach(element => {
        objectProd.push(element.toObject())
    });
    console.log(objectProd)
    res.render('index',{
        title:"cart",
        layout: 'carts',
        products: objectProd,
        carrito: req.params.cid
    });
});

export default viewRouter