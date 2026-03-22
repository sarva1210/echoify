import Sidebar from "./Sidebar";
import { useState } from "react";
import Dashboard from "../Pages/Dashboard";
import Saved from "../Pages/Saved";
import History from "../Pages/History";

export default function DashboardLayout() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar setPage={setPage} />

      <div className="flex-1 p-6 overflow-y-auto animate-fadeIn">
        {page === "saved" && <Saved />}
        {page === "history" && <History />}
        {page === "dashboard" && <Dashboard />}
      </div>
    </div>
  );
}