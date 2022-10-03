import { Router } from "express";

import * as controller from "./controller.js";

const router = Router();

router.get("/", controller.getSportsList);

router.post("/", controller.postAddSport);
router.patch("/:sport_id", controller.updateLiveUrl);

export default router;
