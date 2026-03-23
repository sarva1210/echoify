export default function SkeletonCard() {
  
  return (
    <div className="bg-card p-6 rounded-xl animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-10 bg-gray-300 rounded mb-4"></div>
      <div className="h-3 bg-gray-300 rounded w-full"></div>
    </div>
  );
}