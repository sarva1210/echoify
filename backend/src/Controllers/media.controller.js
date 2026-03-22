import { addMediaJob } from "../Services/Queue/job.service.js";
import { getVideoInfo } from "../Services/Extractor/youtube.service.js";
import Media from "../Models/media.model.js";

export const convertMedia = async (req, res) => {
  try {
    const { url, quality = "128", format = "mp3" } = req.query;

    if (!url) {
      return res.status(400).json({ error: "URL required" });
    }

    const job = await addMediaJob({
      url,
      quality,
      format,
    });

    res.json({
      jobId: job.id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getHistory = async (req, res) => {
  const data = await Media.find().sort({ createdAt: -1 });
  res.json(data);
};

export const getMediaById = async (req, res) => {
  const data = await Media.findById(req.params.id);
  res.json(data);
};

export const getMetadata = async (req, res) => {
  try {
    const { url } = req.query;

    const data = await getVideoInfo(url);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};