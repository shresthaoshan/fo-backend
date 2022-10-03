import { Router } from "express";

import * as controller from "./controller.js";

const router = Router();

router.get("/", controller.getUserList);

router.post("/suspend/:id", controller.suspend);
router.patch("/activate/:id", controller.activate);

export default router;
