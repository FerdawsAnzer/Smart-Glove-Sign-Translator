import { TooltipProvider } from "@/components/ui/tooltip";
import { SideBar } from "./components/Layout/SideBar";
import { DashboardPage } from "./features/dashboard/components/dashboardPage";
import { Header } from "./components/Layout/Header";

function App() {
  return (
    <TooltipProvider>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <SideBar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <header className="flex items-center gap-4 p-4">
            {" "}
            <Header />
          </header>
          <div className="p-6">
            <DashboardPage />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default App;
