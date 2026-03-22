import { useApp } from "../Context/AppContext";
import FileCard from "../Components/FileCard";

export default function Saved() {
  const { saved } = useApp();

  return (
    <div>
      <h1 className="text-xl mb-4">Saved</h1>

      <div className="grid grid-cols-3 gap-4">
        {saved.map((file, i) => (
          <FileCard key={i} url={file} />
        ))}
      </div>
    </div>
  );
}