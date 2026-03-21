import { Worker } from "bullmq";
import { redisConnection } from "../Config/redis.js";
import fs from "fs";
import { getStream } from "../Services/Extractor/youtube.service.js";
import ffmpeg from "../Config/ffmpeg.js";

const dir = "downloads";
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

new Worker(
  "media",
  async (job) => {
    const {
      url,
      quality = "128",
      format = "mp3",
      start,
      end,
    } = job.data;

    const filePath = `${dir}/${job.id}.${format}`;
    const stream = getStream(url);

    return new Promise((resolve, reject) => {
      let process = ffmpeg(stream)
        .audioBitrate(parseInt(quality))
        .format(format);

      // TRIM FEATURE
      if (start) {
        process = process.setStartTime(start);
      }

      if (end && start) {
        process = process.setDuration(end - start);
      }

      process
        .on("progress", (p) => {
          const percent = Math.floor(p.percent || 0);
          job.updateProgress(percent);
        })
        .on("end", () => {
            setTimeout(() => {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error("Delete error:", err.message);
                    } else {
                        console.log("File deleted:", filePath);
                    }
                });
            }, 60000);
            resolve({ filePath });
        })
        .on("error", (err) => {
          console.error(err);
          reject(err);
        })
        .save(filePath);
    });
  },{ connection: redisConnection }
);