import express from 'express';
import ProductModel from '../models/product.model.js';

 const productMongoRouter = express.Router();


// Obtener todos los productos (GET)
productMongoRouter.get('/', async (req, res) => {
    try {
        const productos = await ProductModel.find()
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json(error.message)
    }
    
});

// Obtener un producto por ID (GET)
productMongoRouter.get('/:id', async (req, res) => {
    try {
        const producto = await ProductModel.findById(req.params.id);
        if (!producto) {
          return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(producto);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});

// Crear un nuevo producto (POST)
productMongoRouter.post('/', async (req, res) => {
    const product = new ProductModel(req.body);
    try {
        const nuevoProducto = await product.save();
        let prods = await ProductModel.find()
        req.io.emit('lista',prods)
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar un producto por ID (PUT)
productMongoRouter.put('/:id', async (req, res) => {
    try {
        const producto = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!producto) {
          return res.status(404).json({ message: 'Producto no encontrado' });
        }
        let prods = await ProductModel.find()
        req.io.emit('lista',prods)
        res.json(producto);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});

// Eliminar un producto por ID (DELETE)
productMongoRouter.delete('/:id', async (req, res) => {
    try {
        const producto = await ProductModel.findByIdAndDelete(req.params.id);
        if (!producto) {
          return res.status(404).json({ message: 'Producto no encontrado' });
        }
        let prods = await ProductModel.find()
        req.io.emit('lista',prods)
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export {productMongoRouter as productRouter}
