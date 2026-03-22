import { motion } from "framer-motion";

export default function DropZone({ setUrl }) {
  const handleDrop = (e) => {
    e.preventDefault();
    const text = e.dataTransfer.getData("text");
    setUrl(text);
  };

  return (
    <motion.div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      whileHover={{ scale: 1.02 }}
      className="border-2 border-dashed p-4 rounded-lg text-center"
    >
      Drag & drop YouTube URL here
    </motion.div>
  );
}