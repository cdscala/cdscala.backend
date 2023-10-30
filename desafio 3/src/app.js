import express from 'express'
import { ProductManager } from "./ProductManager.js"

const app = express()
const port = 8080;
const hostname = "127.0.0.1";

// crear un manager de producto
const productManagerInstance = new ProductManager("productos.json")

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Obtener todos los productos (GET)
app.get('/api/products', async (req, res) => {
    const limitQuery = req.query.limit
    if (limitQuery<0){
        res.status(404).json({ mensaje: 'Query en limite debe ser igual o mayor a 0' });
    } else{
        productManagerInstance.getProducts().then((value)=>res.status(200).json(value.slice(0,limitQuery)))
    }
    
});

// Obtener un producto por ID (GET)
app.get('/api/products/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const producto = await productManagerInstance.getProductById(id)
  if (!producto) {
    res.status(404).json({ mensaje: 'Producto no encontrado' })
  } else {
    res.status(200).json(producto)
  }
});

// Crear un nuevo producto (POST)
app.post('/api/products', async (req, res) => {
  const nuevoProducto = await productManagerInstance.addProduct(req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.stock)
  if (nuevoProducto.mensaje){
    res.status(404).json(nuevoProducto)
  } else{
    res.status(201).json(nuevoProducto)
  }
  
});

// Actualizar un producto por ID (PUT)
app.put('/api/products/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const producto = await productManagerInstance.getProductById(id)
  if (!producto) {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  } else {
    const productoModificado = await productManagerInstance.updateProduct(req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.stock)
    res.status(200).json(productoModificado)
  }
});

// Eliminar un producto por ID (DELETE)
app.delete('/api/products/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const producto = await productManagerInstance.getProductById(id)
  if (!producto) {
    res.status(404).json({ mensaje: 'Producto no encontrado' })
  } else {
    productManagerInstance.deleteProduct(id)
    res.status(200).json({ mensaje: `Producto ${id} eliminado` })
  }
});

app.listen(port, hostname, function () {
    console.log(`Server corriendo en http://${hostname}:${port}/`);
})