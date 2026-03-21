import { addMediaJob } from "../Services/Queue/job.service.js";
import { mediaQueue } from "../Queues/media.queue.js";
import { streamPreview } from "../Services/Converter/preview.service.js";
import { getVideoInfo } from "../Services/Extractor/youtube.service.js";

export const convertMedia = async (req, res) => {
  try {
    const { url, quality = "128", format = "mp3", start, end } = req.query;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const job = await addMediaJob({
      url,
      quality,
      format,
      start: start ? Number(start) : null,
      end: end ? Number(end) : null,
    });

    res.json({ jobId: job.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getJobStatus = async (req, res) => {
  const job = await mediaQueue.getJob(req.params.id);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  res.json({
    state: await job.getState(),
    progress: job.progress || 0,
    result: job.returnvalue || null,
  });
};

export const getMetadata = async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "URL required" });
    }

    const data = await getVideoInfo(url);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const previewAudio = (req, res) => {
  const { url, quality = "128" } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL required" });
  }

  streamPreview(url, quality, res);
};