import express from 'express';
import { ProductManager } from "../../controllers/ProductManager.js"


 const productRouter = express.Router();

// crear un manager de producto
const productManagerInstance = new ProductManager("../productos.json")

// Obtener todos los productos (GET)
productRouter.get('/', async (req, res) => {
    const limitQuery = req.query.limit
    if (limitQuery<0){
        res.status(404).json({ mensaje: 'Query en limite debe ser igual o mayor a 0' });
    } else{
        productManagerInstance.getProducts().then((value)=>res.status(200).json(value.slice(0,limitQuery)))
    }
    
});

// Obtener un producto por ID (GET)
productRouter.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const producto = await productManagerInstance.getProductById(id)
  if (!producto) {
    res.status(404).json({ mensaje: 'Producto no encontrado' })
  } else {
    res.status(200).json(producto)
  }
});

// Crear un nuevo producto (POST)
productRouter.post('/', async (req, res) => {
  const nuevoProducto = await productManagerInstance.addProduct(req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.stock,req.body.status,req.body.category)
  if (nuevoProducto.mensaje){
    res.status(404).json(nuevoProducto)
  } else{
    res.status(201).json(nuevoProducto)
  }
  
});

// Actualizar un producto por ID (PUT)
productRouter.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const producto = await productManagerInstance.getProductById(id)
  if (!producto) {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  } else {
    const productoModificado = await productManagerInstance.updateProduct(req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.stock,req.body.status,req.body.category)
    res.status(200).json(productoModificado)
  }
});

// Eliminar un producto por ID (DELETE)
productRouter.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const producto = await productManagerInstance.getProductById(id)
  if (!producto) {
    res.status(404).json({ mensaje: 'Producto no encontrado' })
  } else {
    productManagerInstance.deleteProduct(id)
    res.status(200).json({ mensaje: `Producto ${id} eliminado` })
  }
});

export {productRouter}
