import express from 'express'
import { v4 as uuidV4 } from 'uuid'
import { Ticket } from '../../dao/factory.js'
import TicketDTO from '../../dao/DTOs/ticket.dto.js'
import passport from 'passport'
import { authorization } from '../../utils.js'
import { now } from 'mongoose'

const ticketRouter = express.Router();
const ticketService = new Ticket();

// Obtener lista de productos del carrito por ID (GET)
ticketRouter.get('/:id',
authorization('USER'),
  passport.authenticate('jwt', { session: false }),
async (req, res) => {
  try {
    const result = await ticketService.getTicket(req.params.id)
    res.json({ status: "success", message: result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: "error", message: "Internal Server Error" })
  }
})

// Crear un carrito (POST)
ticketRouter.post('/',
  authorization('USER'),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const ticket = new TicketDTO({
        number : uuidV4(),
        user : product.user,
        purchase_datetime : now(),
        products : product.products,
        totalPrice : product.totalPrice,
        status : product.status
      })
      const result = await ticketService.createTicket(ticket)
      res.json({ status: "success", message: result })
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
  })


// Eliminar un carrito (DELETE)
ticketRouter.delete('/:tid', async (req, res) => {
  try {
    const result = await ticketService.deleteTicket(req.params.yid)
    res.json({ status: "success", message: result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: "error", message: "Internal Server Error" })
  }
})

export default ticketRouter
