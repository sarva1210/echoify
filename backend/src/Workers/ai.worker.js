import { Worker } from "bullmq";
import { redisConnection } from "../Config/redis.js";
import { generateSummary } from "../Services/Ai/summary.service.js";

new Worker(
    "ai",
    async (job) => {
        const { text } = job.data;
        const summary = await generateSummary(text);
        return { summary };
    },{ connection: redisConnection }
);