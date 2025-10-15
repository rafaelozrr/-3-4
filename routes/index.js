import { Router } from "express";
import { postRouter } from "./postRouter.js";
import { userRouter } from "./userRouter.js";

const router = new Router();

// подключаем роутеры без /api — префикс добавляется в сервере
router.use(userRouter);
router.use(postRouter);

export { router };