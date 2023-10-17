import { ProductManager } from "./ProductManager.js"

///PROCESO DE TESTING
const productManagerInstance = new ProductManager()
let producto
let productoPorId
let productoRepetido
let productoNoExiste

console.log("1 - Agregar Producto:")
// Agrega un producto
producto = await  productManagerInstance.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
if (producto){
    console.log('Producto Agregado')
    console.log(producto)
}

// Obtiene todos los Productos
console.log("2 - Obtener Productos:")
console.log(await productManagerInstance.getProducts())

// Obtiene el producto por id
console.log("3 - Obtener Producto por Id:")
productoPorId = await productManagerInstance.getProductById(producto.id)
if (productoPorId){
    console.log('Producto por Id obtenido')
    console.log(productoPorId)
}

// Inserta producto repetido
console.log("4 - Agregar Producto existente:")
productoRepetido = await productManagerInstance.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
if (productoRepetido){
    console.log('Producto Agregado')
    console.log(productoRepetido)
}

// Obtiene el producto por id y este no existe
console.log("5 - Obtener Producto por Id que no existe:")
productoNoExiste = await productManagerInstance.getProductById(1000)
if (productoNoExiste){
    console.log('Producto por Id obtenido')
    console.log(productoNoExiste)
} 

console.log("6 - Agregar Producto sin todos los campos:")
// Agrega un producto
producto = await productManagerInstance.addProduct("Producto prueba", "Este es un producto prueba", null, "Sin imagen", "abc123", 25)
if (producto){
    console.log('Producto Agregado')
    console.log(producto)
}

console.log("7 - Modificar Producto:")
// Agrega un producto
producto = await productManagerInstance.updateProduct("Producto prueba", "Este es un producto prueba modificado", 200, "Sin imagen", "abc123", 25)
if (producto){
    console.log('Producto modificado')
    console.log(producto)
}