import express from "express";
import { login, log_out, sign_up,google_callback } from "../Controllers/auth.controller.js";
const router = express.Router();
router.get("/login", login);
router.get("/log-out", log_out);
router.get("/sign-up", sign_up);
router.post("/auth/google/callback", google_callback);
export default router;
