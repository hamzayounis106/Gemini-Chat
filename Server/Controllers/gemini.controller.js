import { history, promptBasedRun } from "../Gemini/promptBasedRun.js";

export const test = async (req, res) => {
  console.log("API called");
  const text = await promptBasedRun("test prompt");
  ``;
  res.send(text);
};
export const sendPrompt = async (req, res) => {
  console.log("API called");
  const prompt = req.body.prompt;
  const reply = await promptBasedRun(prompt);
  const data = [
    {
      role: "user",
      message: prompt,
    },
    {
      role: "model",
      message: reply,
    },
  ];

  console.log(data);
  res.send(data);
};
export const getHistory = async (req, res) => {
  res.send({ history });
};
