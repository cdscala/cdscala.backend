import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  isVisible: { type: Boolean, default: false },
});

const Category = model('Category', categorySchema);

export default Category;