import { useState, useEffect } from "react";
import { User, Languages, HelpCircle } from "lucide-react";

import { ProfileSettings } from "../components/settings/ProfilSettings";
import { LanguageSettings } from "../components/settings/LanguageSettings";
import { HelpSettings } from "../components/settings/HelpSettings";
import { Button } from "../components/ui/button";
import { toast, Toaster } from "sonner";
import { supabase } from "@/lib/supabase/client";

type Tab = "profile" | "language" | "help";

export function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // Profile / Language state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("asl");
  const [targetLanguage, setTargetLanguage] = useState("en");

  // Help / Feedback state
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  // ✅ FIX: move loadProfile OUTSIDE useEffect so it can be reused
  const loadProfile = async () => {
    const { data: authData } = await supabase.auth.getUser();
    const user = authData.user;

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle();

    if (data?.full_name) {
      const [first, ...last] = data.full_name.split(" ");
      setFirstName(first);
      setLastName(last.join(" "));
    } else {
      setFirstName("");
      setLastName("");
    }
  };

  // ✅ load on page open
  useEffect(() => {
    loadProfile();
  }, []);

  // Handlers
  const handleSave = async () => {
    setLoading(true);

    const { data: authData } = await supabase.auth.getUser();
    const user = authData.user;

    if (!user) {
      toast.error("No user found");
      setLoading(false);
      return;
    }

    const full_name = `${firstName} ${lastName}`.trim();

    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          full_name,
        },
        {
          onConflict: "id",
        }
      );

    if (error) {
      console.log("SAVE ERROR:", error);
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Saved successfully ✅");

    // ✅ refresh UI everywhere
    window.dispatchEvent(new Event("profileUpdated"));

    setLoading(false);
  };

  // ✅ FIX: reload real data instead of clearing inputs
  const handleCancel = () => {
    loadProfile();

    toast.info("Changes cancelled", {
      description: "All changes have been reverted.",
      duration: 3000,
    });
  };

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      toast.error("Please select a rating", {
        description: "You need to rate your experience before submitting.",
        duration: 3000,
      });
      return;
    }

    toast.success("Feedback submitted successfully!", {
      description: "Thank you for your feedback.",
      duration: 3000,
    });

    setRating(0);
    setFeedback("");
  };

  const handleCancelFeedback = () => {
    setRating(0);
    setFeedback("");

    toast.info("Feedback cleared", {
      description: "Your feedback has been reset.",
      duration: 3000,
    });
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
              <ProfileSettings
                firstName={firstName}
                lastName={lastName}
                email={email}
                onFirstNameChange={setFirstName}
                onLastNameChange={setLastName}
                onEmailChange={setEmail}
              />
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

          {/* Footer */}
          {activeTab !== "help" && (
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