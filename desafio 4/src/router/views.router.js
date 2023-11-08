import express from 'express';
import { ProductManager } from '../controllers/ProductManager.js';

const viewRouter = express.Router();
// crear un manager de producto
const productManagerInstance = new ProductManager("../productos.json")

viewRouter.get('/', async (req, res)=>{
    let prod = await productManagerInstance.getProducts()
    res.render('index',{
        title:"HANDLEBARS",
        products: prod
    });
});

viewRouter.get('/realtimeproducts', async (req, res)=>{
    res.render('realtimeproducts',{
        title:"realtimeproducts",
        
    });
});

export {viewRouter};