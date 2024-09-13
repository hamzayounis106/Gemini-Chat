import env from "dotenv";
import cors from "cors";
import express from "express";
import {connectDb} from "./db/connectionsdb.js";
import authRoutes from "./Routes/auth.route.js";
import geminiRoutes from "./Routes/gemini.route.js";
env.config();

const app = express();
//Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST"],
  })
);

//Routes
app.use("/api/authRoutes", authRoutes);
app.use("/geminiRoutes", geminiRoutes);

//listening server at a port
app.listen(3000, () => {
  connectDb();
  console.log("Server is running on port 3000");
});
