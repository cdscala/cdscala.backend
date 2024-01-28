import express from 'express';
import { Cart } from '../../dao/factory.js';
import CartDTO from '../../dao/DTOs/cart.dto.js';
import passport from 'passport'
import { authorization } from '../../utils.js';

const cartRouter = express.Router();
const cartService = new Cart();

// Obtener lista de productos del carrito por ID (GET)
cartRouter.get('/:id',
authorization('USER'),
  passport.authenticate('jwt', { session: false }),
async (req, res) => {
  try {
    const result = await cartService.getCart(req.params.id)
    res.json({ status: "success", message: result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: "error", message: "Internal Server Error" })
  }
})

// Crear un carrito (POST)
cartRouter.post('/',
  authorization('USER'),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const cart = new CartDTO(req?.body)
      const result = await cartService.createCart(cart)
      res.json({ status: "success", message: result })
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
  })

// Actualizar el carrito (POST)
cartRouter.put('/:cid',
  authorization('USER'),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = await cartService.updateCart(req.params.cid, req.body)
      res.json({ status: "success", message: result })
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
  })

// Eliminar un producto en el carrito (DELETE)
cartRouter.delete('/:cid/product/:pid',
  authorization('USER'),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = await cartService.deleteProductInCart(req.params.cid, req.params.pid)
      res.json({ status: "success", message: result })
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
  })

// Eliminar un carrito (DELETE)
cartRouter.delete('/:cid', async (req, res) => {
  try {
    const result = await cartService.deleteCart(req.params.cid)
    res.json({ status: "success", message: result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: "error", message: "Internal Server Error" })
  }
})

export default cartRouter
