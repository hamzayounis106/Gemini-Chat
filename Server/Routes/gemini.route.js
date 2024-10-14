import express from "express";
import {
  getHistory,
  sendPrompt,
  test,
} from "../Controllers/gemini.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import { verifyTokenConditional } from "../Middleware/verifyTokenConditional.js";
const router = express.Router();
router.get("/test", test);
router.post("/sendPrompt",verifyTokenConditional, sendPrompt);
router.post("/getHistory", verifyTokenConditional, getHistory);
// router.post("/get-user-chats", verifyToken, getUserChats);
export default router;
