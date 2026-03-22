import { useApp } from "../Context/AppContext";
import FileCard from "../Components/file/FileCard";

export default function Saved() {
  const { saved } = useApp();

  return (
    <div className="grid grid-cols-3 gap-4">
      {saved.map((f) => <FileCard key={f.id} file={f} />)}
    </div>
  );
}