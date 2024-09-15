import express from "express";
import {
  login,
  checkAuth,
  log_out,
  google_callback,
} from "../Controllers/auth.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";

const router = express.Router();

router.get("/login", login);
router.post("/check-auth", verifyToken, checkAuth);
router.post("/log-out", log_out);
router.post("/auth/google/callback", google_callback);

export default router;
