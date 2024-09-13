import { mongoose } from "mongoose";
export const connectDb = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo DB connected : " + con.connection.host);
  } catch (error) {
    console.log("Mongo DB connection error : " + error.message);
  }
};
