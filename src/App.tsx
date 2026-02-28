import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "@/pages/registration/signIn"; // your beautiful SignIn
import { Header } from "@/components/Layout/Header";
import { SideBar } from "@/components/Layout/SideBar";
import { DashboardPage } from "@/features/dashboard/components/dashboardPage";
import { LearnPage } from "@/features/learningsP/learnPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Show SignIn page first
  if (!isLoggedIn) return <SignIn onLogin={() => setIsLoggedIn(true)} />;

  // After login, show dashboard layout
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/learning" element={<LearnPage />} />
            <Route path="/history" element={<div>History Page</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;