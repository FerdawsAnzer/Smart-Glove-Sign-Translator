import { useState } from "react";
import { QuickAlphReference } from "../learningAlphabet/QuickAlphReference";
import type { Mode } from "@/Types/indexPronouns";
import { useNavigate } from "react-router-dom";
import { ModeSelector } from "../learningAlphabet/ModeSelector";
import { ProgressBar } from "../learningAlphabet/ProgressBar";
import { MainLetterCard } from "../learningAlphabet/MainLetterCard";
import { GreetingsData } from "@/Data/GreetingsData";
import { useTranslation } from "react-i18next"; 

export function LearningGreetingsPage() {
  const { t } = useTranslation(); 
  const [curentIndex, setCurrentIndex] = useState(0);
  const [learnedGreetings, setLearnedGreetings] = useState<boolean[]>(new Array(GreetingsData.length).fill(false));
  const [currentMode, setCurrentMode] = useState<Mode>("Learn");
  const learnedCount = learnedGreetings.filter(Boolean).length;
  const navigate = useNavigate();

  const handleNext = () => {
    const updated = [...learnedGreetings];
    updated[curentIndex] = true;
    setLearnedGreetings(updated);
    if (curentIndex < GreetingsData.length - 1) setCurrentIndex(curentIndex + 1);
  };

  const handleBack = () => { if (curentIndex > 0) setCurrentIndex(curentIndex - 1); };
  const handleSelectLetter = (index: number) => setCurrentIndex(index);

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col gap-6">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">

        <button onClick={() => navigate("/learning")} className="text-blue-500 text-sm hover:underline self-start">
          {t("learning.backToCategories")} {/* ✅ */}
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">{t("greetings.title")}</h1>
          <p className="text-gray-500 text-sm">{t("greetings.desc")}</p>               
        </div>

        <ModeSelector mode={currentMode} onModeChange={setCurrentMode} />
        <ProgressBar current={curentIndex + 1} total={GreetingsData.length} learned={learnedCount} />
        <MainLetterCard currentIndex={curentIndex} onNext={handleNext} onPrevious={handleBack} total={GreetingsData.length} data={GreetingsData} />

        <div className="max-w-6xl mx-auto w-full">
          <QuickAlphReference currentIndex={curentIndex} learned={learnedGreetings} onSelect={handleSelectLetter} data={GreetingsData} />
        </div>
      </div>
    </div>
  );
}