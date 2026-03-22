import ConverterCard from "../Components/converter/ConverterCard";
import StatCard from "../Components/ui/StatCard";
import { useApp } from "../Context/AppContext";

export default function Dashboard() {
  const { saved, history, downloads } = useApp();

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <ConverterCard />
      </div>

      <div className="space-y-4">
        <StatCard title="Downloads" value={downloads.length} />
        <StatCard title="Saved" value={saved.length} />
        <StatCard title="History" value={history.length} />
      </div>
    </div>
  );
}