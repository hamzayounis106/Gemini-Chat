// let sessions = [];

// export const addSession = (uu_session_id) => {
//   if (uu_session_id) {
//     sessions.push({ uu_session_id, history: [] });
//   }
// };

// export const getAllSessions = () => {
//   return sessions;
// };
import TempChat from "../Models/tempChat.js";

export const addSession = async (uu_session_id) => {
  try {
    if (uu_session_id) {
      const session = new TempChat({ uuid: uu_session_id });
      await session.save();
    }
  } catch (error) {
    console.log("Error creating session" + error);
  }
};

export const getAllSessions = async () => {
  let sessions;
  try {
    sessions = await TempChat.find();
    console.log(sessions);
  } catch (error) {
    console.log("Error getting sessions" + error);
  }
  return sessions;
};
