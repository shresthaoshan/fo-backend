import { Router } from "express";

import captcha from "../../middlewares/captcha.js";
import * as controller from "./controller.js";

const router = Router();

router.get("/", (_, res) => res.json({ check: true }));

router.get("/token", controller.getTokenRefresh);

router.post("/signin", captcha, controller.postSignin);
router.post("/register", captcha, controller.postRegistration);
router.post("/signout", controller.postSignOut);

export default router;
