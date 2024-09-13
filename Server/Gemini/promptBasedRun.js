import { GoogleGenerativeAI } from "@google/generative-ai";
const safe = {
  HARM_CATEGORY_HARASSMENT: "BLOCK_NONE",
  HARM_CATEGORY_HATE_SPEECH: "BLOCK_NONE",
  HARM_CATEGORY_SEXUALLY_EXPLICIT: "BLOCK_NONE",
  HARM_CATEGORY_DANGEROUS_CONTENT: "BLOCK_NONE",
};

const GoogleAPI = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(GoogleAPI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safe });

export let history = [];
export const promptBasedRun = async (prompt) => {
  const chat = model.startChat({ history });

  try {
    const result = await chat.sendMessage(prompt);
    const res = await result.response;
    const text = await res.text();
    return text;
  } catch (error) {
    return error.message;
  }
};
