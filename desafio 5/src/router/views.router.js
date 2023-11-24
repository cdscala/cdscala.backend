import express from 'express';
import ProductModel from '../models/product.model.js';

const viewRouter = express.Router();

viewRouter.get('/', async (req, res)=>{
    let prod = await ProductModel.find()
    let objectProd = []
    prod.forEach(element => {
        objectProd.push(element.toObject())
    });
    res.render('index',{
        title:"HANDLEBARS",
        products: objectProd
    });
});

viewRouter.get('/realTimeProducts', async (req, res)=>{
    res.render('realTimeProducts',{
        title:"realtimeproducts",
    });
});

export {viewRouter};