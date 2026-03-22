import ConverterCard from "../Components/ConverterCard";

export default function Dashboard() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">HELLO....</h1>

      <div className="grid grid-cols-3 gap-6">

        {/* MAIN CONVERTER */}
        <div className="col-span-2">
          <ConverterCard />
        </div>

        {/* STATS CARDS */}
        <div className="space-y-4">
          <div className="bg-[#E8DED2] p-4 rounded-xl shadow hover:scale-105">
            Downloads
            <div className="text-xl font-bold">12</div>
          </div>

          <div className="bg-[#E8DED2] p-4 rounded-xl shadow hover:scale-105">
            Saved
            <div className="text-xl font-bold">8</div>
          </div>

          <div className="bg-[#E8DED2] p-4 rounded-xl shadow hover:scale-105">
            History
            <div className="text-xl font-bold">20</div>
          </div>
        </div>

      </div>
    </div>
  );
}