import ProductModel from "../models/product.model.js";

export default class Product {
    constructor() { }

    getProducts = async (query, sort, limit, page) => {
        var query = query ? JSON.parse(query) : {}
        var options = {
            sort: sort ? JSON.parse(sort) : {},
            limit: limit || 20,
            page: page || 1
        }
        try {
            const productos = await ProductModel.paginate(query, options)
            return (productos)
        } catch (error) {
            throw (error.message)
        }
    };
    getProduct = async (pid) => {
        try {
            const producto = await ProductModel.findById(pid);
            if (!producto) {
                return ( 'Producto no encontrado' );
            }
            return (producto);
        } catch (error) {
            throw (error.message);
        }
    }

    createProduct = async (product) => {
        const producto = new ProductModel(product);
        try {
            const nuevoProducto = await producto.save();
            return (nuevoProducto);
        } catch (error) {
            throw (error.message );
        }
    };

    updateProduct = async (pid, modproduct) => {
        try {
            const producto = await ProductModel.findByIdAndUpdate(pid, modproduct, { new: true });
            if (!producto) {
                return ( 'Producto no encontrado' );
            }
            return (producto);
        } catch (error) {
            throw (error.message);
        }
    }

    deleteProduct = async (pid) => {
        try {
            const producto = await ProductModel.findByIdAndDelete(pid);
            if (!producto) {
                return ( 'Producto no encontrado');
            }
            return ('Producto eliminado exitosamente' );
        } catch (error) {
            throw ( error.message );
        }
    }
}