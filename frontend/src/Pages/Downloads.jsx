import { useApp } from "../Context/AppContext";
import FileCard from "../Components/file/FileCard";

export default function Downloads() {
  const { downloads } = useApp();

  return (
    <div className="grid grid-cols-3 gap-4">
      {downloads.map((f) => <FileCard key={f.id} file={f} />)}
    </div>
  );
}