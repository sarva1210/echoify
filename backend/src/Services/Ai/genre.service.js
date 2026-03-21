import { mistral } from "./models.js";

export const detectGenre = async (text) => {
    const res = await mistral.invoke(`Genre:\n${text}`);
    return res.content;
};