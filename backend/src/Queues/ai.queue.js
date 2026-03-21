import { Queue } from "bullmq";
import { redisConnection } from "../Config/redis.js";

export const aiQueue = new Queue("ai", {
    connection: redisConnection,
});