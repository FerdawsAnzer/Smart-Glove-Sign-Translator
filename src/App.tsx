import { useState, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import { useAuthStore } from "./store/authStore";
import { supabase } from "@/lib/supabase/client";

function App() {
  const { user, loading, fetchUser, signOut } = useAuthStore();
  const [splashFinished, setSplashFinished] = useState(false);
  const { i18n } = useTranslation();

  // ✅ restore session on load
  useEffect(() => {
    fetchUser();
  }, []);

  // ✅ switch RTL for Arabic
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // ✅ restore saved language preference on login
  useEffect(() => {
    const restoreLanguage = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("user_settings")
        .select("output_language")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data?.output_language) {
        i18n.changeLanguage(data.output_language);
      }
    };
    restoreLanguage();
  }, [user]);

  const handleLogout = async () => {
    await signOut();
  };

  if (!splashFinished) {
    return <SplashScreen onFinish={() => setSplashFinished(true)} />;
  }

  if (loading) return null;

  return (
    <TooltipProvider>
      <Routes>
        {/* AUTH ROUTES */}
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />

        {/* PROTECTED ROUTES */}
        {user ? (
          <Route
            path="/*"
            element={
              <div style={{ display: "flex", minHeight: "100vh" }}>
                <SideBar onLogout={handleLogout} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowX: "hidden" }}>
                  <Header />
                  <main style={{ flex: 1, overflowX: "hidden" }}>
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