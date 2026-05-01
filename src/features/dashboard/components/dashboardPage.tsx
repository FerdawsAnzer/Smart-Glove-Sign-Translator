import { useState } from "react";
import { AslInputCard } from "./AslInputCard";
import { QuickTipCard } from "./QuickTipCard";
import { TranslationCard } from "./translationCard";

export function DashboardPage() {
  const [translation, setTranslation] = useState<string>("");

  const handlePrediction = (letter: string) => {
    setTranslation((prev) => prev + " " + letter);
  };
  return (
    <div className="flex-1 p-6">
      <div className=" grid gap-6 md:grid-cols-2">
        <AslInputCard onPrediction={handlePrediction} />
        <TranslationCard translation={translation} />
      </div>
      <div className="mt-9">
        <QuickTipCard />
      </div>
    </div>
  );
}
