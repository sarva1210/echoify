import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "../Pages/Dashboard";
import Saved from "../Pages/Saved";
import History from "../Pages/History";
import Downloads from "../Pages/Downloads";

export default function DashboardLayout() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="flex h-screen bg-background">
      <Sidebar setPage={setPage} />

      <div className="flex-1 p-6 overflow-y-auto">
        {page === "dashboard" && <Dashboard />}
        {page === "saved" && <Saved />}
        {page === "history" && <History />}
        {page === "downloads" && <Downloads />}
      </div>
    </div>
  );
}