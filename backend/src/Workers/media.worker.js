import { Worker } from "bullmq";
import { redisConnection } from "../Config/redis.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getStream, getVideoInfo } from "../Services/Extractor/youtube.service.js";
import ffmpeg from "../Config/ffmpeg.js";
import Media from "../Models/media.model.js";
import { cleanupYtdlFiles } from "../utils/cleanup.js";

// FIX __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// BACKEND ROOT
const rootDir = path.resolve(__dirname, "../../");

// DOWNLOADS FOLDER
const dir = path.join(rootDir, "downloads");

// CREATE IF NOT EXISTS
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
  console.log("Created downloads folder at:", dir);
}

new Worker(
  "media",
  async (job) => {
    const { url, quality = "128", format = "mp3" } = job.data;

    // SAVE TO DB (START)
    await Media.create({
      jobId: job.id,
      url,
      format,
      quality,
      status: "processing",
    });

    const fileName = `${job.id}.${format}`;
    const filePath = path.join(dir, fileName);

    console.log("Saving file to:", filePath);

    const stream = await getStream(url);
    const meta = await getVideoInfo(url);

    return new Promise((resolve, reject) => {
      ffmpeg(stream)
        .audioBitrate(parseInt(quality))
        .format(format)

        .on("progress", (p) => {
          const percent = Math.floor(p.percent || 0);
          console.log(`Progress: ${percent}%`);
          job.updateProgress(percent);
        })

        .on("end", async () => {
          const fileUrl = `http://localhost:3000/downloads/${fileName}`;

          console.log("Conversion complete:", fileUrl);

          await Media.findOneAndUpdate(
            { jobId: job.id },
            {
              title: meta.title,
              thumbnail: meta.thumbnail,
              fileUrl,
              status: "completed",
            }
          );

          // CLEANUP AFTER COMPLETION (NON-BLOCKING)
          cleanupYtdlFiles();

          resolve({ fileUrl });
        })

        .on("error", (err) => {
          console.error("FFMPEG ERROR:", err.message);
          reject(err);
        })

        .output(filePath)
        .run();
    });
  },
  { connection: redisConnection }
);