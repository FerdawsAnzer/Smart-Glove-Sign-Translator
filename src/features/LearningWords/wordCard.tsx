import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function WordsCard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Card
      className="border border-gray-200 shadow-sm w-92 rounded-2xl cursor-pointer hover:shadow-md transition-shadow duration-300"
      onClick={() => navigate("/learning/words/social")}
    >
      <CardContent className="flex flex-col items-center gap-3 p-4">
        <div className="w-full flex items-center justify-center bg-purple-400 rounded-xl py-8">
          <MessageCircle className="w-14 h-14 text-white" />
        </div>
        <p className="text-gray-900 font-bold text-xl">{t("words.wordsCard")}</p>
        <p className="text-gray-500 text-sm text-center">{t("words.wordsCardDesc")}</p>
        <span className="bg-blue-50 text-blue-500 text-sm font-medium px-4 py-1 rounded-full">{t("words.wordsBadge")}</span>
      </CardContent>
    </Card>
  );
}