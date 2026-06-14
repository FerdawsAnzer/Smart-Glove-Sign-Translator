import { Hand } from "lucide-react";
import { Label } from "../ui/label";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const UI_LANGUAGES = [
  { code: "en", label: "English",  flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ar", label: "العربية",  flag: "🇸🇦" },
  { code: "tr", label: "Türkçe",   flag: "🇹🇷" },
];

interface LanguageSettingsProps {
  language: string;
  targetLanguage: string;
  onLanguageChange: (value: string) => void;
  onTargetLanguageChange: (value: string) => void;
}

export function LanguageSettings({ language, targetLanguage, onLanguageChange, onTargetLanguageChange }: LanguageSettingsProps) {
  const { i18n, t } = useTranslation(); 

  const handleUILanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    onTargetLanguageChange(code);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t("settings.languages")}
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          {t("settings.subtitle")} 
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signLanguage">{t("dashboard.aslInput")}</Label> 
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger id="signLanguage">
            <SelectValue placeholder="Select sign language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asl">American Sign Language (ASL)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 mt-1"> {t("settings.aslOnly")}
          
        </p>
      </div>

      <div className="space-y-3">
        <Label> {t("settings.appLanguage")}</Label>
        <p className="text-xs text-gray-500"> {t("settings.appLanguageDesc")}</p>
        <div className="grid grid-cols-2 gap-3">
          {UI_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleUILanguageChange(lang.code)}
              className="flex items-center gap-3 p-4 rounded-xl transition-all text-left"
              style={{
                border: i18n.language === lang.code ? "2px solid #8b5cf6" : "1px solid #e8eaf6",
                background: i18n.language === lang.code ? "linear-gradient(135deg, #eff6ff, #f5f3ff)" : "white",
              }}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="font-medium text-sm text-gray-800">{lang.label}</span>
              {i18n.language === lang.code && (
                <span className="ml-auto text-xs font-bold" style={{ color: "#8b5cf6" }}>✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-4" style={{ background: "linear-gradient(135deg, #eff6ff, #f5f3ff)", border: "1px solid #e8eaf6" }}>
        <div className="flex gap-3">
          <Hand className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#6366f1" }} />
          <div>
            <h4 className="font-medium mb-1" style={{ color: "#3730a3" }}>
              {t("settings.translationTip")}
            </h4>
            <p className="text-sm" style={{ color: "#4338ca" }}>
             {t("settings.translationTipText")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}