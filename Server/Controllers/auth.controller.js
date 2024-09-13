import env from "dotenv";
import { OAuth2Client } from "google-auth-library";
import User from "../Models/User.model.js";
env.config();
const GoogleClientId = process.env.GoogleClientId;
const client = new OAuth2Client();

export const login = async (req, res) => {
  res.send("login");
};
export const log_out = async (req, res) => {
  res.send("log out");
};
export const sign_up = async (req, res) => {
  res.send("Sign up");
};
export const google_callback = async (req, res) => {
  // console.log(req.body);
  const { credential } = req.body;
  if (!credential) {
    console.log("Credential not recieved from Client");
    return res.status(400).json({
      success: false,
      message: "Google Login failed - Credential not found",
    });
  }
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: GoogleClientId,
    });
    const payLoad = ticket.getPayload();
    if (!payLoad) {
      throw new Error("No payload found in the ID token");
    }
    const { sub, email, name, picture } = payLoad;
    if (!sub || !email || !name || !picture) {
      throw new Error(
        "Complete data not found in the ID token from google auth"
      );
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "user already exist" });
    }
    try {
      const user = new User({
        name,
        email,
        profile_image: picture,
        googleId: sub,
      });
      const createdUser = await user.save();
      if (createdUser) {
        console.log(createdUser);
      }
    } catch (error) {}
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Google Login failed - Internal Server Error",
      error: error.message,
    });
  }
};
