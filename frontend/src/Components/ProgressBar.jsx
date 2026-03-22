export default function ProgressBar({ progress }) {
  return (
    <div className="mt-4">
      <div className="bg-white h-3 rounded-full">
        <div
          className="bg-[#BFA2DB] h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}