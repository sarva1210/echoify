import { Queue } from "bullmq";
import { redisConnection } from "../Config/redis.js";

export const mediaQueue = new Queue("media", {
    connection: redisConnection,
});