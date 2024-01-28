import express from 'express'
import passport from 'passport'
import { Product } from '../../dao/factory.js'
import ProductDTO from '../../dao/DTOs/product.dto.js'
import { authorization } from '../../utils.js'

const productRouter = express.Router()
const productService = new Product()


// Obtener todos los productos (GET)
productRouter.get('/',
  authorization('USER'),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = await productService.getProducts(req.query.query, req.query.sort, req.query.limit, req.query.page)
      res.json({ status: "success", message: result })
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
  });

// Obtener un producto por ID (GET)
productRouter.get('/:id',
  authorization('USER'),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = await productService.getProduct(req.params.id);
      res.json({ status: "success", message: result })
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
  });

// Crear un nuevo producto (POST)
productRouter.post(
  '/',
  authorization('ADMIN'),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const product = new ProductDTO(req.body)
      const result = await productService.createProduct(product);
      res.json({ status: "success", message: result })
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
  });

// Actualizar un producto por ID (PUT)
productRouter.put(
  '/:id',
  authorization('ADMIN'),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = await productService.updateProduct(req.params.id, req.body);
      res.json({ status: "success", message: result })
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
  });

// Eliminar un producto por ID (DELETE)
productRouter.delete(
  '/:id',
  authorization('ADMIN'),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = await productService.deleteProduct(req.params.id);
      res.json({ status: "success", message: result })
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
  });

export default productRouter
