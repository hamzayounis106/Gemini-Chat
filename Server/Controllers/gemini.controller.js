import { promptBasedRun, promptBasedRunLoggedIn } from "../Gemini/promptBasedRun.js";
import Chat from "../Models/Chat.logged.js";
import TempChat from "../Models/tempChat.js";
import User from "../Models/User.model.js";
import { getAllSessions } from "../Utils/sessions.js";
import { updateLastUsedTempChat } from "../Utils/updateLastUsedTempChat.js";

export const test = async (req, res) => {
  console.log("API called");
  const text = await promptBasedRun("test prompt");
  ``;
  res.send(text);
};
export const sendPrompt = async (req, res) => {
  let session_UUID = req.query.s;
  if (req.id) {
    const { id } = req.id;
    const user = await User.findById(id);
    if (!user) {
      throw new Error(
        "User not found in userLoggedSessions while creating session"
      );
    }
    if (!session_UUID) {
      return res
        .status(400)
        .json({ success: false, message: "No session uid received" });
    }
    const prompt = req.body.prompt;
    const reply = await promptBasedRunLoggedIn(prompt, session_UUID);
    if (!reply) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }
    const data = [
      {
        role: "user",
        message: prompt,
      },
      {
        role: "model",
        message: reply,
      },
    ];

    // console.log(data);
    res.send(data);
    return;
  }
  const prompt = req.body.prompt;
  const reply = await promptBasedRun(prompt, session_UUID);
  if (!reply) {
    return res
      .status(404)
      .json({ success: false, message: "Session not found" });
  }
  const data = [
    {
      role: "user",
      message: prompt,
    },
    {
      role: "model",
      message: reply,
    },
  ];

  // console.log(data);
  res.send(data);
};
export const getHistory = async (req, res) => {
  let session_UUID = req.query.s;
  if (req.id) {
    const { id } = req.id;
    const user = await User.findById(id);
    if (!user) {
      throw new Error(
        "User not found in userLoggedSessions while creating session"
      );
    }
    if (!session_UUID) {
      return res
        .status(400)
        .json({ success: false, message: "No session uid received" });
    }
    try {
      let session = await Chat.findOne({ uuid: session_UUID });
      if (session) {
        updateLastUsedTempChat(session_UUID);
        return res
          .status(200)
          .json({ success: true, history: session.history });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Session not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
    return;
  }

  // console.log(session_UUID);
  if (!session_UUID) {
    return res
      .status(400)
      .json({ success: false, message: "No session uid received" });
  }

  try {
    // let sessions = getAllSessions();
    // let session = sessions.find((ses) => ses.uu_session_id === session_UUID);
    let session = await TempChat.findOne({ uuid: session_UUID });

    if (session) {
      updateLastUsedTempChat(session_UUID);
      return res.status(200).json({ success: true, history: session.history });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
