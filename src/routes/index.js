import { Router } from "express";

// features
import auth from "../features/auth/index.js";
import user from "../features/user/index.js";
import blog from "../features/blog/index.js";
import highlights from "../features/highlights/index.js";
import sports from "../features/sport/index.js";

const router = Router();

// assignments
router.use("/auth", auth.router);
router.use("/users", user.router);
router.use("/highlights", highlights.router);
router.use("/sports", sports.router);
router.use("/blogs", blog.router);

export default router;
