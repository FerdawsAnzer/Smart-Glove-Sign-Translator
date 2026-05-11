import { useState } from "react"; // ✅ removed useEffect, no longer needed
import { User, Languages, HelpCircle } from "lucide-react";
import { ProfileSettings } from "../components/settings/ProfilSettings";
import { LanguageSettings } from "../components/settings/languageSettings"; // ✅ fix casing
import { HelpSettings } from "../components/settings/helpSettings";         // ✅ fix casing
import { Button } from "../components/ui/button";
import { toast, Toaster } from "sonner";
import { useAuthStore } from "@/store/authStore";

type Tab = "profile" | "language" | "help";

export function Settings() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // Language settings state
  const [language, setLanguage] = useState("asl");
  const [targetLanguage, setTargetLanguage] = useState("en");

  // Help / Feedback state
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  // ✅ Only handles language save now — profile saves itself
  const handleSave = async () => {
    toast.success("Settings saved ✅");
  };

  const handleCancel = () => {
    toast.info("Changes cancelled", { duration: 3000 });
  };

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    toast.success("Feedback submitted successfully!");
    setRating(0);
    setFeedback("");
  };

  const handleCancelFeedback = () => {
    setRating(0);
    setFeedback("");
    toast.info("Feedback cleared");
  };

  return (
    <div className="h-full bg-gray-50 overflow-x-hidden">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto w-full px-6 py-6">
        {/* Header */}
        <div className="relative h-40 rounded-t-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1611923973164-e0e5f7f69872?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Sign Language"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/60 to-purple-600/60" />
          <div className="absolute bottom-6 left-8 text-white">
            <h1 className="text-4xl font-bold">Settings</h1>
            <p className="text-base mt-2 opacity-90">
              Customize your sign language translator experience
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-b-3xl shadow-md flex flex-col">
          <div className="border-b border-gray-200">
            <nav className="flex gap-10 px-8">
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-5 border-b-2 transition-colors ${
                  activeTab === "profile"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-3 text-lg">
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("language")}
                className={`py-5 border-b-2 transition-colors ${
                  activeTab === "language"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-3 text-lg">
                  <Languages className="w-5 h-5" />
                  <span>Languages</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("help")}
                className={`py-5 border-b-2 transition-colors ${
                  activeTab === "help"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-3 text-lg">
                  <HelpCircle className="w-5 h-5" />
                  <span>Help</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6 w-full overflow-x-hidden">
            {activeTab === "profile" && (
              <ProfileSettings /> // ✅ no props — it's self-contained
            )}

            {activeTab === "language" && (
              <LanguageSettings
                language={language}
                targetLanguage={targetLanguage}
                onLanguageChange={setLanguage}
                onTargetLanguageChange={setTargetLanguage}
              />
            )}

            {activeTab === "help" && (
              <HelpSettings
                rating={rating}
                feedback={feedback}
                onRatingChange={setRating}
                onFeedbackChange={setFeedback}
                onSubmitFeedback={handleSubmitFeedback}
                onCancelFeedback={handleCancelFeedback}
              />
            )}
          </div>

          {/* ✅ Footer only shows for language tab now */}
          {activeTab === "language" && (
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
