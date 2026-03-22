import { useApp } from "../Context/AppContext";
import FileCard from "../Components/FileCard";

export default function History() {
  const { history } = useApp();

  return (
    <div>
      <h1 className="text-xl mb-4">History</h1>

      <div className="grid grid-cols-3 gap-4">
        {history.map((file, i) => (
          <FileCard key={i} url={file} />
        ))}
      </div>
    </div>
  );
}