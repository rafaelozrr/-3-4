import { User } from "../models.js";

class UserController {
    async create(req, res) {
        try {
            const { email, first_name, last_name, avatar } = req.body;
            const user = await User.create({ email, first_name, last_name, avatar });
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getOne(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ error: "User not found" });
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export const userController = new UserController();