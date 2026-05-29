import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Volume2, Copy } from "lucide-react";
import type { TranslationCardProps } from "src/Types/glove";
import { useTranslation } from "react-i18next";
import { translateText } from "@/lib/translate"; // ✅

export function TranslationCard({ translation }: TranslationCardProps) {
  const { t } = useTranslation();
  const [outputLang, setOutputLang] = useState("en");       // ✅ selected output language
  const [translatedText, setTranslatedText] = useState(""); // ✅ translated result
  const [isTranslating, setIsTranslating] = useState(false);

  // ✅ translate whenever glove output OR language changes
  useEffect(() => {
    if (!translation) {
      setTranslatedText("");
      return;
    }

    if (outputLang === "en") {
      setTranslatedText(translation); // no API call needed
      return;
    }

    setIsTranslating(true);
    translateText(translation, outputLang)
      .then((result) => setTranslatedText(result))
      .finally(() => setIsTranslating(false));

  }, [translation, outputLang]);

  const speak = (text: string) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    // ✅ set speech language to match selected output language
    utterance.lang = outputLang;
    window.speechSynthesis.speak(utterance);
  };

  const copy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader
        className="flex flex-row items-center justify-between pb-4"
        style={{ borderBottom: "2px solid transparent", borderImage: "linear-gradient(135deg, #3b82f6, #8b5cf6) 1" }}
      >
        <CardTitle className="text-xl font-semibold text-gray-900">
          {t("dashboard.translation")}
        </CardTitle>

        {/* ✅ language selector — now controlled */}
        <Select value={outputLang} onValueChange={setOutputLang}>
          <SelectTrigger className="w-40 rounded-full border border-gray-300 text-sm text-gray-700 gap-2">
            <Globe className="w-4 h-4 text-gray-500" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-md rounded-lg">
            <SelectItem value="en"> English</SelectItem>
            <SelectItem value="fr"> French</SelectItem>
            <SelectItem value="ar"> Arabic</SelectItem>
            <SelectItem value="tr"> Turkish</SelectItem>
          
           
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <div className="min-h-36 bg-blue-50 rounded-xl border border-blue-100 p-4">
          {isTranslating ? (
            <p className="text-gray-400 text-sm animate-pulse">Translating...</p>
          ) : translatedText ? (
            <p className="text-gray-800 text-sm">{translatedText}</p> 
          ) : (
            <p className="text-gray-400 text-sm">
              {t("dashboard.translationPlaceholder")}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center gap-3 pt-2">
        <Button
          onClick={() => speak(translatedText)} 
          disabled={!translatedText}
          className="flex-1 text-white font-medium rounded-lg flex items-center gap-2 border-0"
          style={{
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            boxShadow: "0 4px 12px rgba(99,102,241,0.25)",
            opacity: !translatedText ? 0.5 : 1,
          }}
        >
          <Volume2 className="w-4 h-4" />
          {t("dashboard.speak")}
        </Button>
        <Button
          onClick={() => copy(translatedText)} 
          variant="outline"
          size="icon"
          className="border border-gray-200 text-gray-500 hover:bg-gray-50 rounded-lg"
        >
          <Copy className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}