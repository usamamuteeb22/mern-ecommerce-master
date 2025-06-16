import express from "express";
import { login, logout, signup, refreshToken, getProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";  
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",protectRoute, logout);
router.post("/refresh-token",protectRoute, refreshToken);
router.get("/profile",protectRoute, getProfile);

export default router;
