import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const { Schema, model } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    thumbnail: { type: String },
    code: { type: String, required: true },
    stock: { type: Number, default: 0 },
    status: { type: Boolean, default: false },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    isVisible: { type: Boolean, default: false },
});

productSchema.plugin(mongoosePaginate)
const ProductModel = model('Product', productSchema);

export default ProductModel;