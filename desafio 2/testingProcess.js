import { ProductManager } from "./ProductManager.js"

///PROCESO DE TESTING
const productManagerInstance = new ProductManager("productos.json")
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

// Agrega un producto
producto = await  productManagerInstance.addProduct("Producto prueba 2", "Este es un producto prueba 2", 200, "Sin imagen", "abc124", 25)
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

console.log("7 - Eliminar Producto:")
// eliminar un producto
producto = await productManagerInstance.deleteProduct("abc123")
if (producto){
    console.log('Producto eliminado')
    console.log(producto)
}

console.log("8 - Modificar Producto no existente:")
// Modificar un producto
producto = await productManagerInstance.updateProduct("Producto prueba", "Este es un producto prueba modificado", 200, "Sin imagen", "abc123", 25)
if (producto){
    console.log('Producto modificado')
    console.log(producto)
}

console.log("9 - Modificar Producto:")
// Modificar un producto
producto = await productManagerInstance.updateProduct("Producto prueba 2", "Este es un producto prueba 2 modificado", 200, "Sin imagen", "abc124", 25)
if (producto){
    console.log('Producto modificado')
    console.log(producto)
}

console.log("10 - Agregar Producto:")
// Agrega un producto
producto = await  productManagerInstance.addProduct("Producto prueba 3", "Este es un producto prueba 3", 200, "Sin imagen", "abc125", 25)
if (producto){
    console.log('Producto Agregado')
    console.log(producto)
}
// Obtiene todos los Productos
console.log("11 - Obtener Productos:")
console.log(await productManagerInstance.getProducts())