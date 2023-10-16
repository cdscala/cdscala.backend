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
class ProductManager {
    constructor() {
        this.productos = []
    }
    
    
    getProducts() {
        return this.productos
    }
    
    addProduct(title, description, price, thumbnail, code, stock) {
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
            return producto
        }
        else{
            console.log(`Producto existe id: ${find.id}`)
            return
        }
    }

    getProductById(id){
        const find = this.productos.find((item) => item.id === id);
        if (find) {
            return find
        }else{
            console.log(`Producto no existe id: ${id}`)
            return
        };
    }
    
}

///PROCESO DE TESTING
const productManagerInstance = new ProductManager()
let producto
let productoPorId
let productoRepetido
let productoNoExiste

console.log("1 - Agregar Producto:")
// Agrega un producto
producto = productManagerInstance.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
if (producto){
    console.log('Producto Agregado')
    console.log(producto)
}

// Obtiene todos los Productos
console.log("2 - Obtener Productos:")
console.log(productManagerInstance.getProducts())

// Obtiene el producto por id
console.log("3 - Obtener Producto por Id:")
productoPorId = productManagerInstance.getProductById(producto.id)
if (productoPorId){
    console.log('Producto por Id obtenido')
    console.log(productoPorId)
}

// Inserta producto repetido
console.log("4 - Agregar Producto existente:")
productoRepetido = productManagerInstance.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
if (productoRepetido){
    console.log('Producto Agregado')
    console.log(productoRepetido)
}

// Obtiene el producto por id y este no existe
console.log("5 - Obtener Producto por Id que no existe:")
productoNoExiste = productManagerInstance.getProductById(1000)
if (productoNoExiste){
    console.log('Producto por Id obtenido')
    console.log(productoNoExiste)
} 

console.log("6 - Agregar Producto sin todos los campos:")
// Agrega un producto
producto = productManagerInstance.addProduct("Producto prueba", "Este es un producto prueba", null, "Sin imagen", "abc123", 25)
if (producto){
    console.log('Producto Agregado')
    console.log(producto)
}