import ytdl from "@distube/ytdl-core";

// GET VIDEO METADATA
export const getVideoInfo = async (url) => {
  const info = await ytdl.getInfo(url);

  return {
    title: info.videoDetails.title,
    thumbnail: info.videoDetails.thumbnails?.[0]?.url,
    duration: info.videoDetails.lengthSeconds,
    author: info.videoDetails.author?.name,
  };
};

// FIXED STREAM FUNCTION (IMPORTANT)
export const getStream = async (url) => {
  const info = await ytdl.getInfo(url);

  const formats = ytdl.filterFormats(info.formats, "audioonly");

  if (!formats || formats.length === 0) {
    throw new Error("No audio formats found");
  }

  // FILTER ONLY
  const safeFormats = formats.filter(
    (f) =>
      f.container === "webm" ||
      f.container === "mp4"
  );

  if (!safeFormats.length) {
    throw new Error("No safe formats found");
  }

  // PICK BEST AUDIO QUALITY
  const bestFormat = safeFormats.sort(
    (a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0)
  )[0];

  if (!bestFormat) {
    throw new Error("No valid format selected");
  }

  console.log("Using format:", bestFormat.container, bestFormat.audioBitrate);

  return ytdl.downloadFromInfo(info, {
    format: bestFormat,
    highWaterMark: 1 << 25,
  });
};