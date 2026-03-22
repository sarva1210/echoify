export default function ProgressBar({ progress }) {
  return (
    <div className="bg-white h-3 rounded-full overflow-hidden">
      <div
        className="bg-primary h-3 transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}