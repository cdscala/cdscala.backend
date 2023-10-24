import * as fs from "fs"
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    constructor(newpath) {
        this.path = path.resolve(__dirname,newpath)
        if(fs.existsSync(this.path)){
            const data = fs.readFileSync(this.path)
            this.productos = JSON.parse(data)
        }
        else{
            this.productos = []
        }
    }
    
    async getProducts() {
        return this.productos
    }
    
    async addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock){
            const producto = {mensaje: 'Todos los campos son obligatorios'}
            return producto
        }
        const find = this.productos.find((item) => item.code === code)
        if (!find){
            let id = 0
            for (let i=0; i < this.productos.length; i++) {
                if (this.productos[i].id > id) {
                    id = this.productos[i].id
                }
            }
            const producto = new Product(title, description, price, thumbnail, code, stock)
            producto.id = id + 1
            this.productos.push(producto)

            await fs.promises.writeFile(this.path, JSON.stringify(this.productos));

            return producto
        }
        else{
            const producto = {mensaje: `Producto existe id: ${find.id}`}
            return producto
        }
    }

    async getProductById(id){
        const find = this.productos.find((item) => item.id === id);
        return find
    }

    async updateProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.log('Todos los campos son obligatorios')
            return
        }
        const find = this.productos.findIndex((item) => item.code === code)
        if (find !== -1){
            this.productos[find].title = title
            this.productos[find].description = description
            this.productos[find].price = price
            this.productos[find].thumbnail = thumbnail
            this.productos[find].code = code
            this.productos[find].stock = stock
            await fs.promises.writeFile(this.path, JSON.stringify(this.productos));
            return this.productos[find]
        }
        else{
            console.log(`Producto no existe`)
            return
        }
    }

    async deleteProduct(id) {
        this.productos = this.productos.filter((item)=>item.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(this.productos));
        return this.productos
    }
}

