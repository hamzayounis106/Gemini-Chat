import { promptBasedRun } from "../Gemini/promptBasedRun.js";
import { getAllSessions } from "../Utils/sessions.js";

export const test = async (req, res) => {
  console.log("API called");
  const text = await promptBasedRun("test prompt");
  ``;
  res.send(text);
};
export const sendPrompt = async (req, res) => {
  let session_UUID = req.query.s;

  const prompt = req.body.prompt;
  const reply = await promptBasedRun(prompt, session_UUID);

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

  console.log(session_UUID);
  if (!session_UUID) {
    return res
      .status(400)
      .json({ success: false, message: "No session uid received" });
  }

  try {
    let sessions = getAllSessions(); // Ensure getAllSessions is awaited if it's asynchronous
    let session = sessions.find((ses) => ses.uu_session_id === session_UUID);
    // console.log(session);

    if (session) {
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
