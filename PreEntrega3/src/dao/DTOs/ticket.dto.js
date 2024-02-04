export default class TicketDTO {
  constructor(ticket) {
    this.number = ticket.number;
    this.user = ticket.user;
    this.purchase_datetime = ticket.purchase_datetime;
    this.products = ticket.products;
    this.totalPrice = ticket.totalPrice;
    this.status = ticket.status;
  }
}

