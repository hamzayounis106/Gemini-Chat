import { mongoose } from "mongoose";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000, 
  socketTimeoutMS: 45000, 
};

export const connectDb = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL, options);
    console.log("Mongo DB connected : " + con.connection.host);
  } catch (error) {
    console.log("Mongo DB connection error : " + error.message);
  }
};
