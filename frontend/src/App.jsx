import { AppProvider } from "./Context/AppContext";
import DashboardLayout from "./Layout/DashboardLayout";

export default function App() {
  return (
    <AppProvider>
      <DashboardLayout />
    </AppProvider>
  );
}