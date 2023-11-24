import express from 'express';
import CartModel from '../models/cart.model';
 const cartMongoRouter = express.Router();

// Obtener lista de productos del carrito por ID (GET)
cartMongoRouter.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const cart = await CartModel.findById(id)
        if (!cart) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// Crear un carrito (POST)
cartMongoRouter.post('/', async (req, res) => {
    
});

// Agregar un nuevo producto en el carrito (POST)
cartMongoRouter.post('/:cid/product/:pid', async (req, res) => {
    
});
// Eliminar un carrito (DELETE)
cartMongoRouter.delete('/:id', async (req, res) => {
    
});

export {cartMongoRouter as cartRouter}
