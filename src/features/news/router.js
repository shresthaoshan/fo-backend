import { Router } from "express";

import * as controller from "./controller.js";

const router = Router();

router.get("/", controller.getNewsList);

router.post("/", controller.postAddNews);
router.patch("/:id", controller.updateNews);

export default router;
