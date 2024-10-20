import { GoogleGenerativeAI } from "@google/generative-ai";

import TempChat from "../Models/tempChat.js";
import Chat from "../Models/Chat.logged.js";

const safe = {
  HARM_CATEGORY_HARASSMENT: "BLOCK_NONE",
  HARM_CATEGORY_HATE_SPEECH: "BLOCK_NONE",
  HARM_CATEGORY_SEXUALLY_EXPLICIT: "BLOCK_NONE",
  HARM_CATEGORY_DANGEROUS_CONTENT: "BLOCK_NONE",
};

const GoogleAPI = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(GoogleAPI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safe });

export const promptBasedRun = async (prompt, anonymousUUID) => {
  try {
    let session = await TempChat.findOne({ uuid: anonymousUUID });
    if (!session) {
      return null;
    }

    let history = session.history;

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(prompt);
    const text = await (await result.response).text();
    session.lastUsed = Date.now();
    session.history = history;
    await session.save();

    return text;
  } catch (error) {
    return error.message;
  }
};
export const promptBasedRunLoggedIn = async (prompt, session_UUID, id) => {
  try {
    let session = await Chat.findOne({ uuid: session_UUID });
    if (!session) {
      return null;
    }
    let history = session.history;
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(prompt);
    const text = await (await result.response).text();
    session.lastUsed = Date.now();
    session.history = history;
    await session.save();
    return text;
  } catch (error) {
    return error.message;
  }
};
