import { Router } from "express";
import { postRouter } from "./postRouter.js";
import { userRouter } from "./userRouter.js";

const router = new Router();


router.use(userRouter);
router.use(postRouter);

export { router };
