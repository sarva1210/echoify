import { mediaQueue } from "../../Queues/media.queue.js";
import { v4 as uuidv4 } from "uuid";

export const addMediaJob = async (data) => {
    return await mediaQueue.add("convert", data, {
        jobId: uuidv4(),
    });
};