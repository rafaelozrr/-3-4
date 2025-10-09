import { Category } from "../models.js";

class CategoryController {
    async create(req, res) {
        try {
            const { name } = req.body;
            const category = await Category.create({ name });
            res.status(201).json(category);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const categories = await Category.findAll();
            res.json(categories);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export const categoryController = new CategoryController();