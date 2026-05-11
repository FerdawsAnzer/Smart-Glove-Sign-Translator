import { useState, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/store/authStore";
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
import { Settings } from "@/pages/settings";

function App() {
  const { user, loading, fetchUser, signOut } = useAuthStore(); //  get everything from store
  const [splashFinished, setSplashFinished] = useState(false);

  // ✅ Restore session on app load — replaces your manual checkSession
  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await signOut(); // ✅ store handles everything, no manual supabase call needed
  };

  // Show splash screen first
  if (!splashFinished) {
    return <SplashScreen onFinish={() => setSplashFinished(true)} />;
  }

  // ✅ Show nothing while checking session (prevents flicker to /signIn)
  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <TooltipProvider>
      <Toaster position="top-right" />
      <Routes>
        {/* AUTH ROUTES */}
        <Route
          path="/signIn"
          element={<SignIn />} // ✅ no need to pass onLogin, store handles user state
        />
        <Route
          path="/signUp"
          element={<SignUp />}
        />

        {/* PROTECTED ROUTES */}
        {user ? ( // ✅ user from store instead of isLoggedIn state
          <Route
            path="/*"
            element={
              <div style={{ display: "flex", minHeight: "100vh" }}>
                <SideBar onLogout={handleLogout} />
                <div className="flex flex-col flex-1 min-w-0">
                  <Header />
                  <main className="flex-1 overflow-auto">
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
                      <Route path="/settings" element={<Settings />} />
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