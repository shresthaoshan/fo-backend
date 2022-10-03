import { Router } from "express";

import * as controller from "./controller.js";

const router = Router();

router.get("/", controller.getBlogList);

router.post("/", controller.postAddBlog);
router.patch("/:id", controller.updateBlog);

export default router;
