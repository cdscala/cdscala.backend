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
    constructor(path) {
        this.productos = []
        this.path = path
    }
    
    async getProducts() {
        if (this.productos.length == 0){
            let fileExists = fs.existsSync(this.path)
            if(fileExists){
                const data = await fs.promises.readFile(this.path);
                this.productos = JSON.parse(data);
            }
            
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

    async deleteProduct(code) {
        this.productos = this.productos.filter((item)=>item.code !== code)
        await fs.promises.writeFile(this.path, JSON.stringify(this.productos));
        return this.productos
    }
}

