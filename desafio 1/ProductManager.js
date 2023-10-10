class ProductManager {
    constructor() {
        this.productos = [];
    }
    
    
    getProducts() {
        return this.productos
    }
    
    
    addProduct(title, description, price, thumbnail, code, stock) {
        try {
            this.findProduct(code)
            const id = this.productos.length + 1
            const producto = {
                id: id,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
            };

            this.productos.push(producto)
            return producto
        } catch (error) {
            throw error;
        }    
        
    }

    findProduct(code){
        const find = this.productos.find((item) => item.code === code);
        if (find) {
            throw new Error(`Producto existente: ${JSON.stringify(find)}`)
        }else{
            false
        };
    }

    getProductById(id){
        const find = this.productos.find((item) => item.id === id);
        if (find) {
            return find
        }else{
            throw new Error(`Producto no existe id: ${id}`)
        };
    }
    
}
    
const productManagerInstance = new ProductManager()
let producto
let productoPorId
let productoRepetido
let productoNoExiste

console.log("1 - Agregar Producto:")
// Agrega un producto
try {
    producto = productManagerInstance.addProduct("Nuevo producto", "Producto descripcion generica", 100.00, "noImage", "001", 999)
    console.log(`Producto Agregado ${JSON.stringify(producto)}`)
}
catch (error){
    console.log(error)
}
console.log("-------------------------------\n")

// Obtiene todos los Productos
console.log("2 - Obtener Productos:")
console.log(productManagerInstance.getProducts())
console.log("-------------------------------\n")

// Obtiene el producto por id
console.log("3 - Obtener Producto por Id:")
try {
    productoPorId = productManagerInstance.getProductById(producto.id)
    console.log(`Producto por Id obtenido ${JSON.stringify(productoPorId)}`)
}
catch (error){
    console.log(error)
}
console.log("-------------------------------\n")

// Inserta producto repetido
console.log("4 - Agregar Producto existente:")
try {
    productoRepetido = productManagerInstance.addProduct("Nuevo producto", "Producto descripcion generica", 100.00, "noImage", "001", 999)
    console.log(`Producto Agregado ${JSON.stringify(productoRepetido)}`)
    
} catch (error) {
    console.log(error)
}
console.log("-------------------------------\n")

// Obtiene el producto por id y este no existe
console.log("5 - Obtener Producto por Id que no existe:")
try {
    productoNoExiste = productManagerInstance.getProductById(1000)
    console.log(`Producto por Id obtenido ${JSON.stringify(productoNoExiste)}`)
} catch (error) {
    console.log(error)
}
console.log("-------------------------------\n")