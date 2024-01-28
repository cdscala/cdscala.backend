import CartModel from "../models/cart.model.js";

export default class Cart {
    constructor() { }

    getCart = async (cid) => {
        try {
            const cart = await CartModel.findById(cid).populate('products.product')
            if (!cart) {
                throw ({ message: 'Carro no encontrado' })
            }
            return (cart)
        } catch (error) {
            throw ({ message: error.message });
        }
    };

    createCart = async (cart) => {
        const carto = new CartModel(req.body);
        try {
            const nuevoCart = await carto.save()
            return (nuevoCart)
        } catch (error) {
            throw ({ message: error.message })
        }
    };

    updateCart = async (cid, modcart) => {
        try {
            const cart = await CartModel.findByIdAndUpdate(cid, modcart, { new: true });
            if (!cart) {
                throw ({ message: 'Carro no encontrado' });
            }
            return (cart);
        } catch (error) {
            throw ({ message: error.message })
        }
    }

    deleteProductInCart = async (cid, pid) => {
        try {
            const cart = await CartModel.findOneAndUpdate({ _id: cid},{ $pull: { products: { id: pid } } },{ new: true });
            if (!cart) {
                throw ({ message: 'Carro no encontrado' })
            }
            
            return (cart);
          } catch (error) {
            throw ({ message: error.message });
          }
    }

    deleteCart = async (cid) => {
        try {
            const cart = await CartModel.findByIdAndDelete(cid)
            if (!cart) {
                throw ({ message: 'Carro no encontrado' })
            }
            return ({ message: 'Carro eliminado exitosamente' })
        } catch (error) {
            throw ({ message: error.message })
        }
    }
}