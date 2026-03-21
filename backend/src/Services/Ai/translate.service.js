import { mistral } from "./models.js";

export const translateText = async (text) => {
    const res = await mistral.invoke(`Translate:\n${text}`);
    return res.content;
};