import * as fs from "fs"

class Product {
    constructor(title, description, price, thumbnail, code, stock){
        this.id = null,
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}
export class ProductManager {
    constructor() {
        this.productos = []
    }
    
    
    async getProducts() {
        if (this.productos.length == 0){
            const data = await fs.promises.readFile("productos.json");
            productos = JSON.parse(data);
        }
        return this.productos
    }
    
    async addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.log('Todos los campos son obligatorios')
            return
        }
        const find = this.productos.find((item) => item.code === code)
        if (!find){
            const id = this.productos.length + 1
            const producto = new Product(title, description, price, thumbnail, code, stock)
            producto.id = id
            this.productos.push(producto)

            await fs.promises.writeFile("productos.json", JSON.stringify(this.productos));

            return producto
        }
        else{
            console.log(`Producto existe id: ${find.id}`)
            return
        }
    }

    async getProductById(id){
        const find = this.productos.find((item) => item.id === id);
        if (find) {
            return find
        }else{
            console.log(`Producto no existe id: ${id}`)
            return
        };
    }

    async updateProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.log('Todos los campos son obligatorios')
            return
        }
        if (this.productos.length == 0){
            const data = await fs.promises.readFile("productos.json");
            this.productos = JSON.parse(data);
        }
        const find = this.productos.find((item) => item.code === code)
        if (find){
            find.title = title
            find.description = description
            find.price = price
            find.thumbnail = thumbnail
            find.code = code
            find.stock = stock

            await fs.promises.writeFile("productos.json", JSON.stringify(this.productos));
            
            return find
        }
        else{
            console.log(`Producto no existe id: ${find.id}`)
            return
        }
    }

    async deleteProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.log('Todos los campos son obligatorios')
            return
        }
        const find = this.productos.find((item) => item.code === code)
        if (!find){
            const id = this.productos.length + 1
            const producto = new Product(title, description, price, thumbnail, code, stock)
            producto.id = id
            this.productos.push(producto)

            await fs.promises.writeFile("productos.json", JSON.stringify(this.productos));

            return producto
        }
        else{
            console.log(`Producto existe id: ${find.id}`)
            return
        }
    }
    
}

