import { Product, Category, User } from "../models.js";

class ProductController {
    async create(req, res) {
        try {
            const { name, flavor, weight, price, country, categoryId, userId } = req.body;
            const product = await Product.create({
                name, flavor, weight, price, country, categoryId, userId
            });
            res.status(201).json(product);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const products = await Product.findAll({
                include: [Category, User]
            });
            res.json(products);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getOne(req, res) {
        try {
            const product = await Product.findByPk(req.params.id, {
                include: [Category, User]
            });
            if (!product) return res.status(404).json({ error: "Product not found" });
            res.json(product);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) return res.status(404).json({ error: "Product not found" });
            await product.destroy();
            res.json({ message: "Deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export const productController = new ProductController();