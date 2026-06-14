import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function EssentialsCard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Card
      className="border border-gray-200 shadow-sm w-92 rounded-2xl cursor-pointer hover:shadow-md transition-shadow duration-300"
      onClick={() => navigate("/learning/essentials")}
    >
      <CardContent className="flex flex-col items-center gap-3 p-4">
        <div className="w-full flex items-center justify-center bg-green-500 rounded-xl py-8">
          <Sparkles className="w-14 h-14 text-white" />
        </div>
        <p className="text-gray-900 font-bold text-xl">{t("cards.essentials")}</p>
        <p className="text-gray-500 text-sm text-center">{t("cards.essentialsDesc")}</p>
        <span className="bg-blue-50 text-blue-500 text-sm font-medium px-4 py-1 rounded-full">{t("cards.essentialsBadge")}</span>
      </CardContent>
    </Card>
  );
}