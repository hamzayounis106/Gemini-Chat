import express from "express";
import {
  getHistory,
  sendPrompt,
  test,
} from "../Controllers/gemini.controller.js";
const router = express.Router();
router.get("/test", test);
router.post("/sendPrompt", sendPrompt);
router.get("/getHistory", getHistory);
export default router;
