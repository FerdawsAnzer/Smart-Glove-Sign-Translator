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
      {/* when you clik teh card will navigate you to the learning Greetings Page*/}
      {/* Card Content container */}
      <CardContent className="flex flex-col items-center gap-3 p-4">
        {/* Green box with sparkles icon */}
        <div className="w-full flex items-center justify-center bg-green-500 rounded-xl py-8">
          <Sparkles className="w-14 h-14 text-white" />
        </div>
        {/* middle Title of card*/}
        <p className="text-gray-900 font-bold text-xl">
          {t("cards.essentials")}
        </p>
        {/* Description of card */}
        <p className="text-gray-500 text-sm text-center">
          {t("cards.essentialsDesc")}
        </p>
        {/* Badge */}
        <span className="bg-blue-50 text-blue-500 text-sm font-medium px-4 py-1 rounded-full">
          {t("cards.essentialsBadge")}
        </span>
      </CardContent>
    </Card>
  );
}
