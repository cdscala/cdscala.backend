export default class CartDTO {
    constructor(cart) {
        this.user = cart.user._id
        this.productos = cart.productos? cart.productos : []
    }
}
