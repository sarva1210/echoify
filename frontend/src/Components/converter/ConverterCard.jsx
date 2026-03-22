import { useState } from "react";
import { convertMedia, getMetadata } from "../../Services/api";
import { useApp } from "../../Context/AppContext";
import ProgressBar from "./ProgressBar";
import DropZone from "./DropZone";
import SkeletonCard from "./SkeletonCard";
import { useSocket } from "../../Hooks/useSocket";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ConverterCard() {
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState(null);

  const { addToHistory, addToSaved, addToDownloads } = useApp();

  //WebSocket listener
  useSocket("progress", (data) => {
    if (data.jobId === jobId) {
      setProgress(data.progress);

      if (data.state === "completed") {
        handleComplete(data);
      }
    }
  });

  const handleConvert = async () => {
    setLoading(true);

    const metadata = await getMetadata(url);

    const res = await convertMedia({ url, quality: 128 });
    setJobId(res.data.jobId);

    toast.success("Conversion started");
  };

  const handleComplete = (data) => {
    const fileUrl = data.fileUrl;

    const fileData = {
      id: Date.now(),
      url: fileUrl,
      title: data.title,
      thumbnail: data.thumbnail,
      createdAt: new Date().toISOString(),
    };

    addToHistory(fileData);
    addToSaved(fileData);
    addToDownloads(fileData);

    toast.success("Download ready");

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card p-6 rounded-xl shadow-soft space-y-4"
    >
      <input
        placeholder="Paste URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-3 rounded-lg"
      />

      <DropZone setUrl={setUrl} />

      <button
        onClick={handleConvert}
        className="w-full bg-primary py-3 rounded-lg"
      >
        Convert
      </button>

      {loading && <SkeletonCard />}

      {progress > 0 && <ProgressBar progress={progress} />}
    </motion.div>
  );
}