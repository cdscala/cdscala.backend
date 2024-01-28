export default class CartDTO {
    constructor(cart) {
        this.user = cart.user
        this.productos = cart.productos
    }
}
