import express from 'express';
import { CartManager } from '../controllers/CartManager.js';

 const cartRouter = express.Router();

// crear un manager de carrito
const cartManagerInstance = new CartManager("../cart.json")

// Obtener lista de productos del carrito por ID (GET)
cartRouter.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const productos = await cartManagerInstance.getCartById(id)
  if (!productos) {
    res.status(404).json({ mensaje: 'El carrito no tiene productos' })
  } else {
    res.status(200).json(productos)
  }
});

// Crear un carrito (POST)
cartRouter.post('/', async (req, res) => {
    const productos = null
    const cart = await cartManagerInstance.addCart(productos)
    res.status(200).json(cart)
});

// Agregar un nuevo producto en el carrito (POST)
cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const nuevoProducto = await cartManagerInstance.addProductToCart(cid,pid,1)
    if (nuevoProducto.mensaje){
        res.status(404).json(nuevoProducto)
    } else{
        res.status(201).json(nuevoProducto)
    }
});
// Eliminar un carrito (DELETE)
cartRouter.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const cart = await cartManagerInstance.getCartById(id)
    if (!cart) {
        res.status(404).json({ mensaje: 'Carrito no encontrado' })
    } else {
        cartManagerInstance.deleteCart(id)
        res.status(200).json({ mensaje: `Carrito ${id} eliminado` })
    }
});

export {cartRouter}
