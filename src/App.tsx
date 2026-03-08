import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "@/pages/registration/signIn";
import SignUp from "@/pages/registration/signUp";
import { Header } from "@/components/Layout/Header";
import { SideBar } from "@/components/Layout/SideBar";
import { DashboardPage } from "@/features/dashboard/components/dashboardPage";
import { LearnPage } from "@/features/learningsP/learnPage";
import SplashScreen from "@/components/SplashScreen/SplashScreen"; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [splashFinished, setSplashFinished] = useState(false);

  function handleLogout() {
    setIsLoggedIn(false);
  }

  return (
    <>
      {!splashFinished ? (
        <SplashScreen onFinish={() => setSplashFinished(true)} />
      ) : (
        <Routes>
          {/* AUTH ROUTEs */}
          <Route
            path="/signIn"
            element={<SignIn onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/signUp"
            element={<SignUp onLogin={() => setIsLoggedIn(true)} />}
          />

          {/* PROTECTED ROUTES */}
          {isLoggedIn ? (
            <Route
              path="/*"
              element={
                <div style={{ display: "flex", minHeight: "100vh" }}>
                  <SideBar onLogout={handleLogout} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Header />
                    <main style={{ flex: 1 }}>
                      <Routes>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/learning" element={<LearnPage />} />
                        <Route path="/history" element={<div>History Page</div>} />
                        <Route
                          path="/"
                          element={<Navigate to="/dashboard" replace />}
                        />
                      </Routes>
                    </main>
                  </div>
                </div>
              }
            />
          ) : (
            <Route path="*" element={<Navigate to="/signIn" replace />} />
          )}
        </Routes>
      )}
    </>
  );
}

export default App;