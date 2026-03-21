import ytdl from "@distube/ytdl-core";

export const getVideoInfo = async (url) => {
  const info = await ytdl.getInfo(url);

  return {
    title: info.videoDetails.title,
    thumbnail: info.videoDetails.thumbnails?.[0]?.url,
    duration: info.videoDetails.lengthSeconds,
    author: info.videoDetails.author?.name,
  };
};

export const getStream = (url, type = "audio") => {
  if (type === "video") {
    return ytdl(url, { quality: "highestvideo" });
  }
  return ytdl(url, {
    quality: "highestaudio",
    filter: "audioonly",
  });
};