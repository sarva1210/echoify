import ffmpeg from "../../Config/ffmpeg.js";

export const convertToAudio = (stream, quality, outputPath) => {
    return new Promise((resolve, reject) => {
        ffmpeg(stream)
          .audioBitrate(parseInt(quality))
          .format("mp3")
          .on("end", () => resolve(outputPath))
          .on("error", reject)
          .save(outputPath);
    });
};