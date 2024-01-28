import express from 'express';
import { Category } from '../../dao/factory.js';
import passport from 'passport'
import { authorization } from '../../utils.js';

const categoryRouter = express.Router();
const categoryService = new Category();

categoryRouter.get('/',
	authorization('USER'),
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			const result = await categoryService.getCategory()
			res.json({ status: "success", message: result })
		} catch (error) {
			console.log(error)
			res.status(500).json({ status: "error", message: "Internal Server Error" })
		}
	});

categoryRouter.post('/',
	authorization('ADMIN'),
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			const result = await categoryService.createCategory(req.body)
			res.json({ status: "success", message: result })
		} catch (error) {
			console.log(error)
			res.status(500).json({ status: "error", message: "Internal Server Error" })
		}
	});

categoryRouter.put('/:id',
	authorization('ADMIN'),
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			const result = await categoryService.updateCategory(req.params.id, req.body)
			res.json({ status: "success", message: result })
		} catch (error) {
			console.log(error)
			res.status(500).json({ status: "error", message: "Internal Server Error" })
		}
	});

categoryRouter.delete('/:id',
	authorization('ADMIN'),
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			const result = await categoryService.deleteCategory(req.params.id)
			res.json({ status: "success", message: result })
		} catch (error) {
			console.log(error)
			res.status(500).json({ status: "error", message: "Internal Server Error" })
		}
	});

export default categoryRouter