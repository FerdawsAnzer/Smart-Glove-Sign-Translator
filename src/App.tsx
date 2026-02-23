import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route, Navigate } from "react-router-dom";

import SignUp from "./pages/registration/SignUp";
// import SignIn from "./pages/registration/SignIn";

import { SideBar } from "./components/Layout/SideBar";
import { Header } from "./components/Layout/Header";

import { DashboardPage } from "./features/dashboard/components/dashboardPage";
import { LearnPage } from "./features/learningsP/learnPage";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header className="flex items-center gap-4 p-4">
          <Header />
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Routes>
        {/* Signup page WITHOUT sidebar */}
        <Route path="/" element={<SignUp />} />

        {/* Dashboard pages WITH sidebar */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <DashboardPage />
            </Layout>
          }
        />

        <Route
          path="/learning"
          element={
            <Layout>
              <LearnPage />
            </Layout>
          }
        />

        <Route
          path="/history"
          element={
            <Layout>
              <div>History Page</div>
            </Layout>
          }
        />

        {/* redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </TooltipProvider>
  );
}

export default App;