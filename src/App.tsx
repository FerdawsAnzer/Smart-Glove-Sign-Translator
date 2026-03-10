import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route, Navigate } from "react-router-dom";
import { SideBar } from "./components/Layout/SideBar";
import { Header } from "./components/Layout/Header";
import { DashboardPage } from "./features/dashboard/components/dashboardPage";
import { LearnPage } from "./features/learningsP/learnPage";
import { AlphabetLearningPage } from "./features/learningAlphabet/AlphabetLearningPage";
import { CategoryCardsPage } from "./features/learningsP/CategoryCardsPage";
import { NumberLearningPage } from "./features/LearningNumbers/NumberLearningPage";
import { LearningGreetingsPage } from "./features/LearningGreetings/LearningGreetingsPage";
import { ColorsLearningPage } from "./features/LearningColors/ColorsLearningPage";
import { HistoryPage } from "./pages/historyPage";
import SignIn from "@/pages/registration/signIn";
import SignUp from "@/pages/registration/signUp";
import SplashScreen from "@/components/SplashScreen/SplashScreen";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [splashFinished, setSplashFinished] = useState(false);
  const handleLogout = () => setIsLoggedIn(false);

  if (!splashFinished)
  return <SplashScreen onFinish={() => setSplashFinished(true)} />;

  return (
    <TooltipProvider>
      <Routes>
        {/* AUTH ROUTES */}
        <Route path="/signIn" element={<SignIn onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/signUp" element={<SignUp onLogin={() => setIsLoggedIn(true)} />} />

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
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/learning" element={<LearnPage />} />
                      <Route path="/learning/alphabet" element={<AlphabetLearningPage />} />
                      <Route path="/learning/numbers" element={<NumberLearningPage />} />
                      <Route path="/learning/CategoryCardsPage" element={<CategoryCardsPage />} />
                      <Route path="/learning/Greetings" element={<LearningGreetingsPage />} />
                      <Route path="/learning/Colors" element={<ColorsLearningPage />} />
                      <Route path="/history" element={<HistoryPage />} />
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
    </TooltipProvider>
  );
}

export default App;
