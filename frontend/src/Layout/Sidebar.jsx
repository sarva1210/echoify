import { useState } from "react";

export default function Sidebar({ setPage }) {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`h-screen bg-[#EADCF8] shadow-xl flex flex-col
      ${open ? "w-54" : "w-16"}
      transition-all duration-500`}>

      <button
        onClick={() => setOpen(!open)}
        className="p-3 hover:bg-white/40">
        ☰
      </button>

      <div className="flex flex-col gap-4 mt-6 px-3">
        {["dashboard", "saved", "history"].map((item) => (
          <button
            key={item}
            onClick={() => setPage(item)}
            className="text-left px-3 py-2 rounded-lg hover:bg-white/40 hover:translate-x-1">
            {open ? item.toUpperCase() : "•"}
          </button>
        ))}
      </div>
    </div>
  );
}