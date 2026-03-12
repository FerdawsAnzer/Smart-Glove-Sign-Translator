import { Hand } from "lucide-react";

interface LanguageSettingsProps {
  language: string;
  targetLanguage: string;
  onLanguageChange: (value: string) => void;
  onTargetLanguageChange: (value: string) => void;
}

export function LanguageSettings({
  language,
  targetLanguage,
  onLanguageChange,
  onTargetLanguageChange,
}: LanguageSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Translation Settings
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Configure your preferred sign language and translation language
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sign Language
        </label>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="asl">American Sign Language (ASL)</option>
          
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Translation Language
        </label>
        <select
          value={targetLanguage}
          onChange={(e) => onTargetLanguageChange(e.target.value)}
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
            <h4 className="font-medium text-blue-900 mb-1">Translation Tip</h4>
            <p className="text-sm text-blue-700">
              For best results, ensure your glove is properly connected via
              Wifi and fitted snugly on your hand for accurate gesture
              recognition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
