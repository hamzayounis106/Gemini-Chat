import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAllSessions } from "../Utils/sessions.js";

const safe = {
  HARM_CATEGORY_HARASSMENT: "BLOCK_NONE",
  HARM_CATEGORY_HATE_SPEECH: "BLOCK_NONE",
  HARM_CATEGORY_SEXUALLY_EXPLICIT: "BLOCK_NONE",
  HARM_CATEGORY_DANGEROUS_CONTENT: "BLOCK_NONE",
};

const GoogleAPI = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(GoogleAPI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safe });

export const promptBasedRun = async (prompt, session_UUID) => {
  let sessions = getAllSessions();
  let session = sessions.find((ses) => ses.uu_session_id === session_UUID);
  if (!session) {
    return res
      .status(404)
      .json({ success: false, message: "Session not found" });
  }
  // console.log(session_UUID);
  let history = session.history;

  const chat = model.startChat({ history });

  try {
    const result = await chat.sendMessage(prompt);
    const res = await result.response;
    const text = await res.text();
    return text;
  } catch (error) {
    return error.message;
  } finally{
    console.log(session_UUID );
    console.log(history)
  }
};
