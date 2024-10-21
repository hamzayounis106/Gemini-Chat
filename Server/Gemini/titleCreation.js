import { GoogleGenerativeAI } from "@google/generative-ai";

const GoogleAPI = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(GoogleAPI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const creatChatTitle = async (prompt) => {
  let title = "";

  let history = [];
  const chat = model.startChat({ history });
  try {
    const promptMessage = `Generate a short, positive conversation title with exactly 2-3 words, based on the following content: "${prompt}". Avoid using quotation marks or extra words.`;

    const result = await chat.sendMessage(promptMessage);

    const res = await result.response;
    title = await res.text();
    history = [];
    return title;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
