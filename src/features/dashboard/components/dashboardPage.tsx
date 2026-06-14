import { useState } from "react";
import { AslInputCard } from "./AslInputCard";
import { QuickTipCard } from "./QuickTipCard";
import { TranslationCard } from "./translationCard";
import { useAuthStore } from "@/store/authStore";
import { useHistoryStore } from "@/store/historyStore";

export function DashboardPage() {
  const [translation, setTranslation] = useState<string>("");
  const { user } = useAuthStore();
  const { addEntry } = useHistoryStore();

  const handlePrediction = async (letter: string) => {
    setTranslation((prev) => prev + " " + letter);

    //  save every real prediction to history
    if (user) {
      await addEntry(user.id, letter, letter);
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <AslInputCard onPrediction={handlePrediction} />
        <TranslationCard translation={translation} />
      </div>
      <div className="mt-9">
        <QuickTipCard />
      </div>
    </div>
  );
}