import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function PronounsCard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Card
      className="border border-gray-200 shadow-sm w-92 rounded-2xl cursor-pointer hover:shadow-md transition-shadow duration-300"
      onClick={() => navigate("/learning/essentials/pronouns")}
    >
      {/* when you click the card will navigate you to the learning Pronouns Page*/}

      <CardContent className="flex flex-col items-center gap-3 p-4">
        {/* Green box with sparkles icon */}
        <div className="w-full flex items-center justify-center bg-blue-400 rounded-xl py-8">
          <User className="w-14 h-14 text-white" />
        </div>
        {/* middle Title of card*/}
        <p className="text-gray-900 font-bold text-xl">
          {t("essentials.pronouns")}
        </p>
        {/** Description of the pronouns card */}
        <p className="text-gray-500 text-sm text-center">
          {t("essentials.pronounsDesc")}
        </p>
        {/* Badge */}
        <span className="bg-blue-50 text-blue-500 text-sm font-medium px-4 py-1 rounded-full">
          {t("essentials.pronounsBadge")}
        </span>
      </CardContent>
    </Card>
  );
}
