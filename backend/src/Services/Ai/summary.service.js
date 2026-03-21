import { gemini } from "./models.js";

export const generateSummary = async (text) => {
    const res = await gemini.invoke(`Summarize:\n${text}`);
    return res.content;
};