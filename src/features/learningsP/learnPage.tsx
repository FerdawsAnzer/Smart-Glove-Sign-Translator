import { BasicsCard } from "./BasicsCard";
import { EssentialsCard } from "./EssentialsCard";
import { CategoryCardWords } from "./CategoryCardSWords";
import { WhyLearnCard } from "./WhyLearncard";
import { useTranslation } from "react-i18next";

export function LearnPage() {
  const { t } = useTranslation();
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center py-12 px-6 gap-8">
      {/* Main container with light blue background and centered content */}
      {/* Title */}
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold text-gray-900">
          {t("cards.learnTitle")}
        </h1>
        <p className="text-gray-500 text-sm">
          {t("cards.learnSubtitle")}
        </p>
      </div>

      {/* The 3 cards container*/}
      <div className="grid grid-cols-3 gap-6">
        <BasicsCard />
        <CategoryCardWords />
        <EssentialsCard />
      </div>

      {/* Why Learn card container */}
      <div className="w-full max-w-7xl">
        <WhyLearnCard />
      </div>
    </div>
  );
}