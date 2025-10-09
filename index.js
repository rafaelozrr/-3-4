import express from "express";
import { seq } from "./db.js";
import { router } from "./router.js";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use("/api", router);

seq.authenticate()
    .then(() => console.log(" Connected to database"))
    .catch((err) => console.error(" Database error:", err));

seq.sync({ alter: true })
    .then(() => console.log("🗃️ Database synchronized"))
    .catch((err) => console.error(" Sync error:", err));

app.listen(PORT, () => console.log(` Server started on http://localhost:${PORT}`));