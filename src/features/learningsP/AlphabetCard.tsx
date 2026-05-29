import { Card, CardContent } from "@/components/ui/card";
import { Hand } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function AlphabetCard() {
  const navigate = useNavigate();
  const { t } = useTranslation(); 

  return (
    <Card className="border border-gray-200 shadow-sm w-92 rounded-2xl cursor-pointer hover:shadow-md transition-shadow duration-300" onClick={() => navigate("/learning/alphabet")}>
      <CardContent className="flex flex-col items-center gap-3 p-4">
        <div className="w-full flex items-center justify-center bg-blue-500 rounded-xl py-8">
          <Hand className="w-14 h-14 text-white" />
        </div>
        <p className="text-gray-900 font-bold text-xl">{t("cards.alphabet")}</p>        
        <p className="text-gray-500 text-sm text-center">{t("cards.alphabetDesc")}</p>  
        <span className="bg-blue-50 text-blue-500 text-sm font-medium px-4 py-1 rounded-full">
          {t("cards.alphabetBadge")} 
        </span>
      </CardContent>
    </Card>
  );
}