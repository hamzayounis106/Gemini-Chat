// let sessions = [];

// export const addSession = (uu_session_id) => {
//   if (uu_session_id) {
//     sessions.push({ uu_session_id, history: [] });
//   }
// };

// export const getAllSessions = () => {
//   return sessions;
// };
import { creatChatTitle } from "../Gemini/titleCreation.js";
import Chat from "../Models/Chat.logged.js";
import TempChat from "../Models/tempChat.js";
import User from "../Models/User.model.js";

export const addSession = async (uu_session_id) => {
  try {
    if (uu_session_id) {
      const session = new TempChat({ uuid: uu_session_id });
      await session.save();
    }
  } catch (error) {
    console.log("Error creating temp chat session : " + error);
  }
};

export const getAllSessions = async () => {
  let sessions;
  try {
    sessions = await TempChat.find();
    // console.log(sessions);
  } catch (error) {
    console.log("Error getting all sessions:  " + error);
  }
  return sessions;
};
export const addUserloggedSessions = async (uu_session_id, userId, prompt) => {
  const titleChat = await creatChatTitle(prompt);
  // console.log(titleChat);
  if (!userId) {
    throw new Error(
      "User Id not found in userLoggedSessions while creating session"
    );
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(
      "User not found in userLoggedSessions while creating session"
    );
  }
  if (!uu_session_id) {
    throw new Error(
      "uu_session_id not found in userLoggedSessions while creating session"
    );
  }

  try {
    if (uu_session_id) {
      console.log(user._id);
      const loggedInSession = new Chat({
        uuid: uu_session_id,
        user: user._id,
        title: titleChat,
      });
      // console.log(loggedInSession);
      await loggedInSession.save();
      // user.chats.unshift({ chatID: uu_session_id, title: titleChat });
      // await user.save();
    }
  } catch (error) {
    console.log("Error creating logged in session: " + error);
  }
};
