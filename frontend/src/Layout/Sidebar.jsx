import { useState } from "react";

export default function Sidebar({ setPage }) {
  const [open, setOpen] = useState(true);

  return (
    <div className={`bg-sidebar h-screen ${open ? "w-60" : "w-16"} transition`}>
      <button onClick={() => setOpen(!open)} className="p-3"> ☰ </button>

      {["dashboard", "saved", "history", "downloads"].map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className="block p-3 w-full text-left"
        >
          {open ? p.toUpperCase() : "•"}
        </button>
      ))}
    </div>
  );
}