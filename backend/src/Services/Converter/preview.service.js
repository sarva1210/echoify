import ytdl from "@distube/ytdl-core";
import ffmpeg from "../../Config/ffmpeg.js";

export const streamPreview = (url, quality, res) => {
  try {
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    const stream = ytdl(url, {
      quality: "highestaudio",
      filter: "audioonly",
      highWaterMark: 1 << 25,
    });

    stream.on("error", (err) => {
      console.error("YTDL ERROR:", err.message);
      if (!res.headersSent) {
        res.status(500).json({
          error: "Preview not available for this video",
        });
      }
    });

    res.setHeader("Content-Type", "audio/mpeg");

    ffmpeg(stream)
      .audioBitrate(parseInt(quality) || 128)
      .format("mp3")
      .on("error", (err) => {
        console.error("FFMPEG ERROR:", err.message);
      })
      .pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Preview failed" });
  }
};