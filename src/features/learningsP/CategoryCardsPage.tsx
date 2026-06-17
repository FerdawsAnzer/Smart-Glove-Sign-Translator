import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AlphabetCard } from "./AlphabetCard";
import { NumbersCard } from "./NumberCard";
import { ColorsCard } from "./ColorsCard";

export function CategoryCardsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center py-12 px-6 gap-8">
      {/* Main container with light blue background and centered content */}
      {/* Title */}
      <button
        onClick={() => navigate("/learning")}
        className="text-blue-500 text-sm hover:underline self-start"
      >
        {t("learning.backToCategories")}
      </button>

      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold text-gray-900">
          {t("cards.learnBasics")}
        </h1>
        <p className="text-gray-500 text-sm">{t("cards.learnBasicsDesc")}</p>
      </div>

      {/* The 3 cards container*/}
      <div className="grid grid-cols-3 gap-6">
        <AlphabetCard />
        <NumbersCard />
        <ColorsCard />
      </div>
    </div>
  );
}
