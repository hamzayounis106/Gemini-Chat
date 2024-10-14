import mongoose from "mongoose";
const ChatScheema = mongoose.Schema({
  uuid: {
    type: String,
    unique: true,
  },
  history: {
    type: Array,
    default: [],
  },
  lastUsed: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
});
ChatScheema.index({ lastUsed: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });
const Chat = mongoose.model("Chat", ChatScheema);
export default Chat;
