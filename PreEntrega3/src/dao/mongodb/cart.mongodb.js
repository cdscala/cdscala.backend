import { now } from "mongoose";
import TicketDTO from "../DTOs/ticket.dto.js"
import CartModel from "../models/cart.model.js"
import ProductModel from "../models/product.model.js"
import { v4 as uuidV4 } from 'uuid'

export default class Cart {
    constructor() { }

    getCarts = async (uid) => {
        try {
            const cart = await CartModel.find({ user: uid});
            if (!cart) {
                throw ('Carro no encontrado')
            }
            return (cart)
        } catch (error) {
            throw (error.message);
        }
    };

    getCart = async (cid) => {
        try {
            const cart = await CartModel.findById(cid).populate('products.product')
            if (!cart) {
                throw ('Carro no encontrado')
            }
            return (cart)
        } catch (error) {
            throw (error.message);
        }
    };

    createCart = async (cart) => {
        const carto = new CartModel(cart);
        try {
            const nuevoCart = await carto.save()
            return (nuevoCart)
        } catch (error) {
            throw (error.message)
        }
    };

    updateCart = async (cid, modcart) => {
        try {
            const cart = await CartModel.findByIdAndUpdate(cid, modcart, { new: true });
            if (!cart) {
                return ('Carro no encontrado');
            }
            return (cart);
        } catch (error) {
            throw (error.message)
        }
    }

    deleteProductInCart = async (cid, pid) => {
        try {
            const cart = await CartModel.findOneAndUpdate({ _id: cid},{ $pull: { products: { _id: pid } } },{ new: true });
            if (!cart) {
                return ('Carro no encontrado')
            }
            
            return (cart);
          } catch (error) {
            throw (error.message);
          }
    }

    deleteCart = async (cid) => {
        try {
            const cart = await CartModel.findByIdAndDelete(cid)
            if (!cart) {
                return ('Carro no encontrado')
            }
            return ('Carro eliminado exitosamente')
        } catch (error) {
            throw (error.message)
        }
    }

    purchaseCart = async (cid) => {
        try {
            var totalPrice = 0
            const cart = await CartModel.findById(cid).populate('products.product')
            if (!cart) {
                throw ('Carro no encontrado')
            }
            await Promise.all(cart.products.map(async (item) => {
                    let product
                    if (item.product?.stock >= item.quantity){
                        item.product.stock = item.product.stock - item.quantity
                        product = await ProductModel.findByIdAndUpdate(item.product?._id,{stock:item.product.stock}, {new: true})
                        const updated = await CartModel.findByIdAndUpdate({ _id: cid},{ $pull: { products: { _id: item._id } } }, {new: true}).populate('products.product');
                        console.log(updated)
                        totalPrice += item.quantity * item.product.price
                    }
                })
            )
            const ticket = new TicketDTO({
                number : uuidV4(),
                user : cart.user,
                purchase_datetime : now(),
                products : cart.products,
                totalPrice : totalPrice,
                status : 'sold'
            })
            return (ticket)
        } catch (error) {
            throw (error.message);
        }
    };
}