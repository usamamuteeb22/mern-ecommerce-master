import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkoutSuccess, createCheckoutSession } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/checkout",protectRoute, createCheckoutSession);
router.post("/success", protectRoute, checkoutSuccess);

export default router;
