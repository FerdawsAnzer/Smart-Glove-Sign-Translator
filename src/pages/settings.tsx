import { useState } from "react";
import {
  User,
  Languages,
  HelpCircle,
  Camera,
  Hand,
  Settings as SettingsIcon,
  LogOut,
  Smartphone,
  Monitor,
  Zap,
  ChevronDown,
  Star,
  Sun,
} from "lucide-react";

type Tab = "profile" | "language" | "help";

export function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [firstName, setFirstName] = useState("Killian");
  const [lastName, setLastName] = useState("James");
  const [email, setEmail] = useState("killianjames@gmail.com");
  const [language, setLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSave = () => {
    // Save logic would go here
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600">
          <Hand className="w-6 h-6 text-white" />
        </div>

        <nav className="flex-1 flex flex-col gap-2 mt-4">
          <button className="p-3 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900">
            <Monitor className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900">
            <Smartphone className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900">
            <Zap className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-lg bg-blue-600 text-white">
            <SettingsIcon className="w-5 h-5" />
          </button>
        </nav>

        <div className="flex flex-col gap-2">
          <button className="p-3 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900">
            <Sun className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-red-600">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-16 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header Banner */}
          <div className="relative h-48 rounded-t-2xl overflow-hidden mb-8">
            <img
              src="https://images.unsplash.com/photo-1611923973164-e0e5f7f69872?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWduJTIwbGFuZ3VhZ2UlMjBoYW5kcyUyMGNvbW11bmljYXRpb258ZW58MXx8fHwxNzcyODE1NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Sign Language"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50" />
            <div className="absolute bottom-4 left-6 text-white">
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-sm mt-1 opacity-90">
                Customize your sign language translator experience
              </p>
            </div>
          </div>

          {/* Settings Container */}
          <div className="bg-white rounded-b-2xl shadow-sm">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex gap-8 px-6">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`py-4 border-b-2 transition-colors ${
                    activeTab === "profile"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("language")}
                  className={`py-4 border-b-2 transition-colors ${
                    activeTab === "language"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4" />
                    <span>Languages</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("help")}
                  className={`py-4 border-b-2 transition-colors ${
                    activeTab === "help"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    <span>Help</span>
                  </div>
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                        {firstName[0]}
                        {lastName[0]}
                      </div>
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Profile Picture
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Upload a photo to personalize your account
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Languages Tab */}
              {activeTab === "language" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Translation Settings
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                      Configure your preferred sign language and translation
                      language
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sign Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="asl">American Sign Language (ASL)</option>
                      <option value="bsl">British Sign Language (BSL)</option>
                      <option value="lsf">French Sign Language (LSF)</option>
                      <option value="dgs">German Sign Language (DGS)</option>
                      <option value="jsl">Japanese Sign Language (JSL)</option>
                      <option value="csl">Chinese Sign Language (CSL)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Translation Language
                    </label>
                    <select
                      value={targetLanguage}
                      onChange={(e) => setTargetLanguage(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="ja">Japanese</option>
                      <option value="zh">Chinese</option>
                      <option value="ar">Arabic</option>
                    </select>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex gap-3">
                      <Hand className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">
                          Translation Tip
                        </h4>
                        <p className="text-sm text-blue-700">
                          For best results, ensure your glove is properly connected via Bluetooth and fitted snugly on your hand for accurate gesture recognition.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Help Tab */}
              {activeTab === "help" && (
                <div className="grid grid-cols-2 gap-8">
                  {/* FAQ Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      FAQ
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          question: "How do I connect the glove?",
                          answer:
                            "To connect the glove, turn on Bluetooth on your device, then press the power button on the glove for 3 seconds until the LED blinks blue. Select 'SignGlove' from your device's Bluetooth menu.",
                        },
                        {
                          question: "What if the gesture is not recognized?",
                          answer:
                            "Ensure good lighting and that your hands are fully visible. Try repositioning your hand or recalibrating the glove in settings. Make sure the glove is properly fitted and charged.",
                        },
                        {
                          question: "How can I change the language?",
                          answer:
                            "Go to the Languages tab in Settings and select your preferred sign language and translation language from the dropdown menus.",
                        },
                        {
                          question:
                            "How do I enable or disable voice output?",
                          answer:
                            "Voice output can be toggled in the main translator screen by tapping the speaker icon, or you can set it as default in the Notifications settings.",
                        },
                      ].map((faq, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            setExpandedFaq(expandedFaq === index ? null : index)
                          }
                          className="w-full text-left"
                        >
                          <div className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">
                                {faq.question}
                              </span>
                              <ChevronDown
                                className={`w-4 h-4 text-gray-500 transition-transform ${
                                  expandedFaq === index ? "rotate-180" : ""
                                }`}
                              />
                            </div>
                            {expandedFaq === index && (
                              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Help/Feedback Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Help / Feedback
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-4">
                          Share your experience in auditing
                        </p>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setRating(star)}
                              className="transition-transform hover:scale-110"
                            >
                              <Star
                                className={`w-8 h-8 ${
                                  star <= rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <textarea
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          placeholder="Add your comments..."
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-sm"
                        />
                      </div>

                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => {
                            setRating(0);
                            setFeedback("");
                          }}
                          className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            alert("Feedback submitted successfully!");
                            setRating(0);
                            setFeedback("");
                          }}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
              <button className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}