import * as fs from "fs"
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CartProduct{
    constructor(id,quantity){
        this.id = id
        this.quantity = quantity
    }
}

class Cart {
    constructor(productos){
        this.id = null
        if(productos){
            this.productos = productos
        }
        else{
            this.productos = []
        }
        
    }
}

export class CartManager {
    constructor(newpath) {
        this.path = path.resolve(__dirname,newpath)
        if(fs.existsSync(this.path)){
            const data = fs.readFileSync(this.path)
            this.carts = JSON.parse(data)
        }
        else{
            this.carts = []
        }
    }
    
    async getCarts() {
        return this.carts
    }
    
    async addCart(productos) {
        let id = this.carts?(this.carts[this.carts.length-1]? this.carts[this.carts.length-1].id : 0) :  0
        const cart = new Cart(productos || [])
        cart.id = id + 1
        this.carts.push(cart)
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
        return cart
    }

    async getCartById(id){
        const find = this.carts.find((item) => item.id === id);
        return find
    }

    async addProductToCart(cartId,productId,quantity) {
        if (!cartId){
            console.log('Se necesita un valor de id de carrito')
            return
        }
        if (!productId){
            console.log('Se necesita un valor de id de producto')
            return
        }
        if (quantity <= 0){
            // console.log('La cantidad debe ser mayor que 0')
            // return
            quantity = 1
        }
        const find = this.carts.findIndex((item) => item.id === cartId)
        if (find !== -1){
            const findproduct = this.carts[find].productos?.findIndex((item) => item.id === productId)
            console.log(findproduct)
            if (findproduct !== -1){
                this.carts[find].productos[findproduct].quantity += 1
            }
            else{
                this.carts[find].productos.push(new CartProduct(productId,quantity))
            }
            
            
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
            return this.carts[find]
        }
        else{
            console.log(`Carrito no existe`)
            return
        }
    }

    async deleteCart(id) {
        this.carts = this.carts.filter((item)=>item.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(this.productos));
        return this.productos
    }
}

