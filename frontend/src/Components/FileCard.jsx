export default function FileCard({ file }) {
  return (
    <div className="bg-[#E8DED2] p-4 rounded-xl shadow">

      <p className="font-semibold">{file.title}</p>

      <audio controls src={file.url} className="w-full mt-2" />

      <p className="text-sm mt-1">
        {file.format} • {file.quality} kbps
      </p>

      <a href={file.url} download className="text-purple-600">
        Download
      </a>
    </div>
  );
}