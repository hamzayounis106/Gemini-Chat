import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAllSessions } from "../Utils/sessions.js";
import TempChat from "../Models/tempChat.js";
import Chat from "../Models/Chat.logged.js";
import { creatChatTitle } from "./titleCreation.js";
import User from "../Models/User.model.js";

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
  // let sessions = getAllSessions();
  // let session = sessions.find((ses) => ses.uu_session_id === anonymousUUID);
  let session = await TempChat.findOne({ uuid: anonymousUUID });
  if (!session) {
    return null;
  }
  // console.log(anonymousUUID);
  let history = session.history;

  const chat = model.startChat({ history });

  try {
    const result = await chat.sendMessage(prompt);
    const res = await result.response;
    const text = await res.text();
    session.lastUsed = Date.now();
    session.history = history;
    await session.save();
    // console.log(history);
    return text;
  } catch (error) {
    return error.message;
  } finally {
    // console.log(anonymousUUID);
    // console.log(history);
  }
};
export const promptBasedRunLoggedIn = async (prompt, session_UUID, id) => {
  // let sessions = getAllSessions();
  // let session = sessions.find((ses) => ses.uu_session_id === session_UUID);
  let session = await Chat.findOne({ uuid: session_UUID });
  if (!session) {
    return null;
  }
  // console.log(session_UUID);

  let history = session.history;
  // if (history.length === 0) {
  //   const user = await User.findById(id);
  //   if (!user) {
  //     throw new Error(
  //       "User not found in userLoggedSessions while creating session"
  //     );
  //   }
  //   const titleChat = await creatChatTitle(prompt);

  //   user.chats.forEach((chat) => {
  //     if (chat.chatID === session_UUID) {
  //       console.log("Found chat:", chat);
  //       console.log("Generated title:", titleChat);
  //       chat.title = titleChat;
  //     }
  //   });

  //   await user.save();
  //   console.log("User saved with updated chat title.");

  //   session.title = titleChat;
  // }
  const chat = model.startChat({ history });

  try {
    const result = await chat.sendMessage(prompt);
    const res = await result.response;
    const text = await res.text();
    session.lastUsed = Date.now();
    session.history = history;
    await session.save();
    // console.log(history);
    return text;
  } catch (error) {
    return error.message;
  } finally {
    // console.log(session_UUID);
    // console.log(history);
  }
};
