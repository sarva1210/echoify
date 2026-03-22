import { useState } from "react";
import { getMetadata, convertMedia, getStatus } from "../Services/api";
import { useApp } from "../Context/AppContext";
import ProgressBar from "./Progressbar";
import Loader from "./Loader";

export default function ConverterCard() {
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const { addToSaved, addToHistory } = useApp();

  const handleConvert = async () => {
    setLoading(true);

    const res = await convertMedia({ url, quality: 128 });

    const interval = setInterval(async () => {
      const status = await getStatus(res.data.jobId);
      setProgress(status.data.progress);

      if (status.data.state === "completed") {
        
        clearInterval(interval);

        const fileUrl = `http://localhost:3000/${status.data.result.filePath}`;

        const fileData = {
          url: fileUrl,
          title: "Converted Audio",
          quality: 128,
          format: "mp3",
        };

        addToHistory(fileData);
        addToSaved(fileData);

        const a = document.createElement("a");
        a.href = fileUrl;
        a.download = "audio.mp3";
        a.click();

        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="bg-[#E8DED2] p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1">

      <input
        placeholder="Paste URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-3 rounded-lg bg-white"
      />

      <button
        onClick={handleConvert}
        className="mt-4 w-full bg-[#BFA2DB] py-2 rounded-lg hover:scale-105"
      >
        Convert
      </button>

      {loading && <Loader />}
      {progress > 0 && <ProgressBar progress={progress} />}
    </div>
  );
}