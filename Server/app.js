import { GoogleGenerativeAI } from "@google/generative-ai";
import env from "dotenv";
import express from "express";
env.config();
const app = express();
app.use(express.json());

const GoogleAPI = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(GoogleAPI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run() {
  const chat = model.startChat({
    history: [
      // {
      //   role: "user",
      //   parts: [{ text: "Hello, i am a developer." }],
      // },
      // {
      //   role: "model",
      //   parts: [{ text: "Hi, how can i help you?" }],
      // },
    ],
  });
  const msg = "What should i learn now a days?";
  const result = await chat.sendMessage(msg);
  const res = await result.response;
  const text = res.text();
  console.log(text);
  return text;
}
let history = [];
async function promptBasedRun(prompt) {
  const chat = model.startChat({ history });

try {
  const result = await chat.sendMessage(prompt);
  const res = await result.response;
  const text = await res.text();

  console.log(history);
  return text;
} catch (error) {
  return error.message;
}
}

app.get("/test", async (req, res) => {
  console.log("API called");
  const text = await run();
  console.log(text);
  res.send(text);
});
app.post("/sendPrompt", async (req, res) => {
  console.log("API called");
  const prompt = req.body.prompt;
  const text = await promptBasedRun(prompt);

  console.log(text);
  res.send({ text, history });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
