import { tavily as Tavily } from "@tavily/core";

const client = Tavily({ apiKey: process.env.TAVILY_API_KEY });

export const searchContext = async (query) => {
    const res = await client.search({ query });
    return res.results;
};