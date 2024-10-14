import e from "express";
import { newSession } from "../Controllers/sessions.controller.js";
import { verifyTokenConditional } from "../Middleware/verifyTokenConditional.js";
const router = e.Router();
router.post("/new-session", verifyTokenConditional, newSession);
export default router;
