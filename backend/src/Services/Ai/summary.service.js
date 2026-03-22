import { geminiModel } from "./models.js";

export const generateSummary = async (text) => {
  const res = await geminiModel.invoke(`Summarize:\n${text}`);
  return res.content;
};