import TicketModel from "../models/ticket.model.js";

export default class Ticket {
    constructor() { }

    getTicket = async (tid) => {
        try {
            const ticket = await TicketModel.findById(tid)
            if (!ticket) {
                throw ('Ticket no encontrado')
            }
            return (ticket)
        } catch (error) {
            throw (error.message);
        }
    };

    createTicket = async (ticket) => {
        const tickete = new CartModel(ticket);
        try {
            const nuevoTicket = await tickete.save()
            return (nuevoTicket)
        } catch (error) {
            throw (error.message)
        }
    };

    updateTicket = async (tid, modticket) => {
        
    }

    deleteTicket = async (tid) => {
        
    }
}