import { BasicsCard } from "./BasicsCard";
import { GreetingsCard } from "./GreetingsCard";
import { CategoryCardWords } from "./CategoryCardSWords";
import { WhyLearnCard } from "./WhyLearncard";
import { useTranslation } from "react-i18next"; 

export function LearnPage() {
  const { t } = useTranslation(); 

  return (
    <div className="w-full bg-blue-50 flex flex-col items-center py-12 px-6 gap-8">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold text-gray-900">{t("cards.learnTitle")}</h1>    
        <p className="text-gray-500 text-sm">{t("cards.learnSubtitle")}</p>              
      </div>
      <div className="grid grid-cols-3 gap-6">
        <BasicsCard />
        <CategoryCardWords />
        <GreetingsCard />
      </div>
      <div className="w-full max-w-7xl">
        <WhyLearnCard />
      </div>
    </div>
  );
}