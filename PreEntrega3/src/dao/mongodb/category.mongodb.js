import CategoryModel from "../models/category.model.js";

export default class Category {
    constructor() { }

    getCategory = async () => {
        try {
            const categorias = await CategoryModel.find();
            return (categorias);
        } catch (error) {
            throw (error.message);
        }
    };

    createCategory = async (category) => {
        const cat = new CategoryModel(category);
        try {
            const nuevaCategoria = await cat.save();
            return (nuevaCategoria);
        } catch (error) {
            throw (error.message);
        }
    };

    updateCategory = async (cid, modcategory) => {
        try {
            const categoria = await CategoryModel.findByIdAndUpdate(cid, modcategory, { new: true });
            if (!categoria) {
                return ('Categoría no encontrada');
            }
            return (categoria);
        } catch (error) {
            throw (error.message);
        }
    }

    deleteCategory = async (cid) => {
        try {
            const categoria = await CategoryModel.findByIdAndDelete(cid);
            if (!categoria) {
                return ('Categoría no encontrada');
            }
            return('Categoría eliminada exitosamente');
        } catch (error) {
            throw (error.message);
        }
    }
}