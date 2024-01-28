import express from 'express';
import { Category } from '../../dao/factory.js';
import passport from 'passport'
import { authorization } from '../../utils.js';

const categoryRouter = express.Router();
const categoryService = new Category();

categoryRouter.get('/', async (req, res) => {
	try {
		const result = await categoryService.getCategory()
		res.json({ status: "success", message: result })
	} catch (error) {
		console.log(error)
		res.status(500).json({ status: "error", message: "Internal Server Error" })
	}
});

categoryRouter.post('/', async (req, res) => {
	try {
		const result = await categoryService.createCategory(req.body)
		res.json({ status: "success", message: result })
	} catch (error) {
		console.log(error)
		res.status(500).json({ status: "error", message: "Internal Server Error" })
	}
});

categoryRouter.put('/:id', async (req, res) => {
	try {
		const result = await categoryService.updateCategory(req.params.id, req.body)
		res.json({ status: "success", message: result })
	} catch (error) {
		console.log(error)
		res.status(500).json({ status: "error", message: "Internal Server Error" })
	}
});

categoryRouter.delete('/:id', async (req, res) => {
	try {
		const result = await categoryService.deleteCategory(req.params.id)
		res.json({ status: "success", message: result })
	} catch (error) {
		console.log(error)
		res.status(500).json({ status: "error", message: "Internal Server Error" })
	}
});

export default categoryRouter