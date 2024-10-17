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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

ChatScheema.index({ lastUsed: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });
ChatScheema.pre("save", async function (next) {
  if (this.isNew) {
    await mongoose.model("User").updateOne(
      { _id: this.user },
      {
        $push: {
          chats: {
            $each: [{ id: this._id, uuid: this.uuid, title: this.title }],
            $position: 0,
          },
        },
      }
    );
  }
  next();
});
ChatScheema.post("remove", async function (doc) {
  await mongoose.model("User").updateOne(
    { _id: doc.user },

    { $pull: { chats: { id: doc._id } } }
  );
});
const Chat = mongoose.model("Chat", ChatScheema);
export default Chat;
