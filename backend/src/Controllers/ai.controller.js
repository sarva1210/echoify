import { aiQueue } from "../Queues/ai.queue.js";

export const processAI = async (req, res) => {
    const job = await aiQueue.add("ai", req.body);
    res.json({ jobId: job.id });
};