import { useState } from "react";
import { User, Languages, HelpCircle } from "lucide-react";
import { ProfileSettings } from "../components/settings/ProfilSettings";
import { LanguageSettings } from "../components/settings/languageSettings";
import { HelpSettings } from "../components/settings/helpSettings";
import { Button } from "../components/ui/button";
import { toast, Toaster } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/lib/supabase/client";
import { useTranslation } from "react-i18next";

type Tab = "profile" | "language" | "help";

export function Settings() {
  const { i18n, t } = useTranslation(); 
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [language, setLanguage] = useState("asl");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSave = async () => {
    if (!user) return;
    await supabase.from("user_settings").upsert({
      user_id: user.id,
      output_language: targetLanguage,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
    i18n.changeLanguage(targetLanguage);
    toast.success(t("toast.settingsSaved") + " ✅");
  };

  const handleCancel = () => {
    toast.info(t("settings.cancel"), { duration: 3000 });
  };

  const handleSubmitFeedback = async () => {
if (!user) { toast.error(t("toast.notLoggedIn")); return; }
if (rating === 0) { toast.error(t("toast.pleaseRate")); return; }
   if (feedback.trim() === "") { toast.error(t("toast.pleaseFeedback")); return; }
    const { error } = await supabase.from("feedback").insert([{ user_id: user.id, message: feedback, rating }]);
    if (error) { toast.error(t("toast.feedbackFailed")); return; }
    toast.success(t("toast.feedbackSubmitted"));
    setRating(0);
    setFeedback("");
  };

  const handleCancelFeedback = () => {
    setRating(0);
    setFeedback("");
   toast.info(t("toast.feedbackCleared"));
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
            <h1 className="text-4xl font-bold">{t("settings.title")}</h1>
            <p className="text-base mt-2 opacity-90">{t("settings.subtitle")}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-b-3xl shadow-md flex flex-col">
          <div className="border-b border-gray-200">
            <nav className="flex gap-10 px-8">
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-5 border-b-2 transition-colors ${activeTab === "profile" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-900"}`}
              >
                <div className="flex items-center gap-3 text-lg">
                  <User className="w-5 h-5" />
                  <span>{t("settings.profile")}</span> 
                </div>
              </button>

              <button
                onClick={() => setActiveTab("language")}
                className={`py-5 border-b-2 transition-colors ${activeTab === "language" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-900"}`}
              >
                <div className="flex items-center gap-3 text-lg">
                  <Languages className="w-5 h-5" />
                  <span>{t("settings.languages")}</span> 
                </div>
              </button>

              <button
                onClick={() => setActiveTab("help")}
                className={`py-5 border-b-2 transition-colors ${activeTab === "help" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-900"}`}
              >
                <div className="flex items-center gap-3 text-lg">
                  <HelpCircle className="w-5 h-5" />
                  <span>{t("settings.help")}</span> 
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6 w-full overflow-x-hidden">
            {activeTab === "profile" && <ProfileSettings />}
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

         {activeTab === "language" && (
  <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
    <Button onClick={handleCancel} variant="outline">
      {t("settings.cancel")}
    </Button>
    <Button
      onClick={handleSave}
      className="text-white border-0"
      style={{
        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", 
        boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
      }}
    >
      {t("settings.save")}
    </Button>
  </div>
)}
        </div>
      </div>
    </div>
  );
}