import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cartProductSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: {type: Number, required: true},
})

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [cartProductSchema],
})

const CartModel = model('Cart', cartSchema);

export default CartModel;