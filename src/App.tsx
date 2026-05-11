import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route, Navigate } from "react-router-dom";
import { SideBar } from "./components/Layout/SideBar";
import { Header } from "./components/Layout/Header";
import { DashboardPage } from "./features/dashboard/components/dashboardPage";
import { LearnPage } from "./features/learningsP/learnPage";
import { AlphabetLearningPage } from "./features/learningAlphabet/AlphabetLearningPage";
import { CategoryCardsPage } from "./features/learningsP/CategoryCardsPage";
import { CategoryCardsWordPage } from "./features/LearningWords/CategoryCardsWordPage";
import { NumberLearningPage } from "./features/LearningNumbers/NumberLearningPage";
import { LearningGreetingsPage } from "./features/LearningGreetings/LearningGreetingsPage";
import { ColorsLearningPage } from "./features/LearningColors/ColorsLearningPage";
import { HistoryPage } from "./pages/historyPage";
import SignIn from "@/pages/registration/signIn";
import SignUp from "@/pages/registration/signUp";
import SplashScreen from "@/components/SplashScreen/SplashScreen";
import { Settings } from "./pages/settings";
import { Toaster } from "sonner";
import { SocialWordLearningPage } from "./features/LearningWords/SocialWordLearningPage";
import { VerbsLearningPage } from "./features/LearningWords/VerbsLearningPage";
import { UtilityWordLearningPage } from "./features/LearningWords/UtilityWordsLeraningPage";
import { CategoryCradPageEss } from "./features/LearningEssentials/CategoryCradPageEss";
import { PronounsLearningPage } from "./features/LearningEssentials/PronounsLearningPage";
import { TimeLearningPage } from "./features/LearningEssentials/TimeLearningPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [splashFinished, setSplashFinished] = useState(false);
  const handleLogout = () => setIsLoggedIn(false);

  if (!splashFinished)
    return <SplashScreen onFinish={() => setSplashFinished(true)} />;

  return (
    <TooltipProvider>
      <Toaster position="top-right" />
      <Routes>
        {/* AUTH ROUTES */}
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
              <div className="flex min-h-screen">
                <SideBar onLogout={handleLogout} />
                <div
                  style={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  {""}
                  {/** <Header /> */}

                  <main className="flex-1 overflow-auto">
                    <Routes>
                      <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                      />
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/learning" element={<LearnPage />} />
                      <Route
                        path="/learning/alphabet"
                        element={<AlphabetLearningPage />}
                      />
                      <Route
                        path="/learning/numbers"
                        element={<NumberLearningPage />}
                      />
                      <Route
                        path="/learning/CategoryCardsPage"
                        element={<CategoryCardsPage />}
                      />
                      <Route
                        path="/learning/Greetings"
                        element={<LearningGreetingsPage />}
                      />
                      <Route
                        path="/learning/CategoryCardsWordPage"
                        element={<CategoryCardsWordPage />}
                      />
                      <Route
                        path="/learning/SocialWordLearningPage"
                        element={<SocialWordLearningPage />}
                      />
                      <Route
                        path="/learning/Colors"
                        element={<ColorsLearningPage />}
                      />
                      <Route
                        path="/learning/VerbsLearningPage"
                        element={<VerbsLearningPage />}
                      />
                      <Route
                        path="/learning/UtilityWordLearningPage"
                        element={<UtilityWordLearningPage />}
                      />
                      <Route
                        path="/learning/CategoryCradPageEss"
                        element={<CategoryCradPageEss />}
                      />
                      <Route
                        path="/learning/PronounsLearningPage"
                        element={<PronounsLearningPage />}
                      />
                      <Route
                        path="/learning/TimeLearningPage"
                        element={<TimeLearningPage />}
                      />
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
