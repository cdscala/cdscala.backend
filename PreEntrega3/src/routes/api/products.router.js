import express from 'express'
import passport from 'passport'
import { Product } from '../../dao/factory.js';

import { authorization } from '../../utils.js';

const productRouter = express.Router();
const productService = new Product();


// Obtener todos los productos (GET)
productRouter.get('/', async (req, res) => {
  try {
    const result = await productService.getProducts(req.query.query,req.query.sort,req.query.limit,req.query.page)
    res.json({ status: "success", message: result })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ status: "error", message: "Internal Server Error" })
  }
});

// Obtener un producto por ID (GET)
productRouter.get('/:id', async (req, res) => {
  try {
    const result = await productService.getProduct(req.params.id);
    res.json({ status: "success", message: result })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ status: "error", message: "Internal Server Error" })
  }
});

// Crear un nuevo producto (POST)
productRouter.post(
  '/',
  authorization('ADMIN'),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const product = new ProductModel(req.body);
    try {
      const nuevoProducto = await product.save();
      let prods = await ProductModel.find()
      req.io.emit('lista', prods)
      res.status(201).json(nuevoProducto);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Actualizar un producto por ID (PUT)
productRouter.put(
  '/:id',
  authorization('ADMIN'),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const producto = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      let prods = await ProductModel.find()
      req.io.emit('lista', prods)
      res.json(producto);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Eliminar un producto por ID (DELETE)
productRouter.delete(
  '/:id',
  authorization('ADMIN'),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const producto = await ProductModel.findByIdAndDelete(req.params.id);
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      let prods = await ProductModel.find()
      req.io.emit('lista', prods)
      res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default productRouter
