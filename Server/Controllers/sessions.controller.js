import { generateUUID } from "../Utils/generateUUID.js";
import { addSession, addUserloggedSessions } from "../Utils/sessions.js";

export const newSession = async (req, res) => {
  if (req.id) {
    const { id } = req.id;
    // console.log("the id is " + id);
    const session_id = generateUUID();
    await addUserloggedSessions(session_id, id);
    res.status(200).json({ sessionId: session_id });
    return;
  }
  const session_id = generateUUID();
  await addSession(session_id); 

  res.status(200).json({ anonTokenId: session_id });
};
