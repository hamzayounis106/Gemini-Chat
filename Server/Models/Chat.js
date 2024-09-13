import mongoose from "mongoose";
const chatSchema = mongoose.Schema({
  history: {
    type: String,
    require: true,
  },
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
