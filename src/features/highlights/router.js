import { Router } from "express";

import * as controller from "./controller.js";

const router = Router();

router.get("/", controller.getLatestHighlights);

router.post("/", controller.postMakeHighlight);

export default router;
