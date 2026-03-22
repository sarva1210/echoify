import { timeAgo } from "../../Utils/timeAgo";

export default function FileCard({ file }) {
  return (
    <div className="bg-card p-4 rounded-xl">
      <img src={file.thumbnail} className="rounded mb-2" />
      <p>{file.title}</p>
      <p className="text-sm opacity-60">
        {timeAgo(file.createdAt)}
      </p>
      <audio controls src={file.url} />
    </div>
  );
}