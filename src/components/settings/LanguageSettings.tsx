import { Hand } from "lucide-react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { LanguageSettingsProps } from "@/Types/LanguageSettings";

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

      <div className="space-y-2">
        <Label htmlFor="signLanguage">Sign Language</Label>
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger id="signLanguage">
            <SelectValue placeholder="Select sign language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asl">American Sign Language (ASL)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 mt-1">
          Currently, only American Sign Language is supported
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetLanguage">Translation Language</Label>
        <Select value={targetLanguage} onValueChange={onTargetLanguageChange}>
          <SelectTrigger id="targetLanguage">
            <SelectValue placeholder="Select translation language" />
          </SelectTrigger>
          <SelectContent className="bg-white text-gray-900">
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="de">German</SelectItem>
            <SelectItem value="ja">Japanese</SelectItem>
            <SelectItem value="zh">Chinese</SelectItem>
            <SelectItem value="ar">Arabic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <Hand className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Translation Tip</h4>
            <p className="text-sm text-blue-700">
              For best results, ensure your glove is properly connected via Wifi
              and fitted snugly on your hand for accurate gesture recognition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
