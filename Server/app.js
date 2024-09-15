import env from "dotenv";
import cors from "cors";
import express from "express";
import { connectDb } from "./db/connectionsdb.js";
import authRoutes from "./Routes/auth.route.js";
import geminiRoutes from "./Routes/gemini.route.js";
import cookieParser from "cookie-parser";
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
app.use("/api/authRoutes", authRoutes);
app.use("/geminiRoutes", geminiRoutes);
app.get("/", (req, res) => {
  res.send("This is the sever /");
});
//listening server at a port
app.listen(3000, () => {
  connectDb();
  console.log("Server is running on port 3000");
});
