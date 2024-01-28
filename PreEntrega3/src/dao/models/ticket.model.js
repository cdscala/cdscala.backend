import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ticketSchema = new Schema({
    number: {type: String, required: true},
    user: {type: String, required: true},
    purchase_datetime: {type: Date, required: true},
    products: [],
    totalPrice: {type: Number, required: true},
    status: {type: String, required: true},
  });

const TicketModel = model('Ticket', ticketSchema);

export default TicketModel;