import env from "dotenv";
import cors from "cors";
import express from "express";
import { connectDb } from "./db/connectionsdb.js";
import authRoutes from "./Routes/auth.route.js";
import geminiRoutes from "./Routes/gemini.route.js";
import cookieParser from "cookie-parser";

import { verifyToken } from "./Middleware/verifyToken.js";
import sessionRoutes from "./Routes/sessions.route.js";
env.config();

const app = express();
//Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://gemini-chat-theta-two.vercel.app",
      process.env.CLIENT_URL,
    ],
    credentials: true, // Allow sending cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // Allow headers for preflight
  })
);

//Routes
app.use("/authRoutes", authRoutes);
app.use("/geminiRoutes", geminiRoutes);
app.use("/sessions", sessionRoutes);

app.get("/", (req, res) => {
  res.send("This is the sever /");
});

app.listen(3000, () => {
  connectDb();
  console.log("Server is running on port 3000");
});
