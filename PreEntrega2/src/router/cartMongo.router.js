import express from 'express';
import CartModel from '../models/cart.model.js';
 const cartMongoRouter = express.Router();

// Obtener lista de productos del carrito por ID (GET)
cartMongoRouter.get('/:id', async (req, res) => {
    try {
        const cart = await CartModel.findById(req.params.id).populate('products.id')
        if (!cart) {
            return res.status(404).json({ message: 'Carrp no encontrado' });
        }
        res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// Crear un carrito (POST)
cartMongoRouter.post('/', async (req, res) => {
    const cart = new CartModel(req.body);
    try {
      const nuevoCart = await cart.save();
      res.status(201).json(nuevoCart);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// Actualizar el carrito (POST)
cartMongoRouter.put('/:cid', async (req, res) => {
    try {
        const cart = await CartModel.findByIdAndUpdate(req.params.cid, req.body, { new: true });
        if (!cart) {
          return res.status(404).json({ message: 'Carro no encontrado' });
        }
        res.json(cart);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});
// Eliminar un producto en el carrito (DELETE)
cartMongoRouter.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cart = await CartModel.findOneAndUpdate({ _id: req.params.cid},{ $pull: { products: { id: req.params.pid } } },{ new: true });
        if (!cart) {
          return res.status(404).json({ message: 'Carro no encontrado' });
        }
        console.log(cart.products)
        
        res.json(cart);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});
// Eliminar un carrito (DELETE)
cartMongoRouter.delete('/:id', async (req, res) => {
    try {
        const cart = await CartModel.findByIdAndDelete(req.params.id);
        if (!cart) {
          return res.status(404).json({ message: 'Carro no encontrado' });
        }
        res.json({ message: 'Carro eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export {cartMongoRouter as cartRouter}
