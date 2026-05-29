import { useNavigate } from "react-router-dom";
import { WordsCard } from "./wordCard";
import { VerbsCard } from "./VerbsCard";
import { useTranslation } from "react-i18next"; 

export function CategoryCardsWordPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(); 

  return (
    <div className="w-full bg-blue-50 flex flex-col items-center py-12 px-6 gap-8">
      <button
        onClick={() => navigate("/learning")}
        className="text-blue-500 text-sm hover:underline self-start"
      >
        {t("learning.backToCategories")} 
      </button>

      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold text-gray-900">
          {t("words.learnWords")} 
        </h1>
        <p className="text-gray-500 text-sm">
          {t("words.learnWordsDesc")} 
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <WordsCard />
        <VerbsCard />
      </div>
    </div>
  );
}