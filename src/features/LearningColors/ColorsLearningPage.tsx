import { useState } from "react";
import { QuickAlphReference } from "../learningAlphabet/QuickAlphReference";
import type { Mode } from "@/Types/indexPronouns";
import { useNavigate } from "react-router-dom";
import { ModeSelector } from "../learningAlphabet/ModeSelector";
import { ProgressBar } from "../learningAlphabet/ProgressBar";
import { MainLetterCard } from "../learningAlphabet/MainLetterCard";
import { ColorsData } from "@/Data/ColorsData";
import { useTranslation } from "react-i18next"; 

export function ColorsLearningPage() {
  const { t } = useTranslation(); 
  const [curentIndex, setCurrentIndex] = useState(0);
  const [learnedColors, setLearnedColors] = useState<boolean[]>(new Array(ColorsData.length).fill(false));
  const [currentMode, setCurrentMode] = useState<Mode>("Learn");
  const learnedCount = learnedColors.filter(Boolean).length;
  const navigate = useNavigate();

  const handleNext = () => {
    const updated = [...learnedColors];
    updated[curentIndex] = true;
    setLearnedColors(updated);
    if (curentIndex < ColorsData.length - 1) setCurrentIndex(curentIndex + 1);
  };

  const handleBack = () => { if (curentIndex > 0) setCurrentIndex(curentIndex - 1); };
  const handleSelectLetter = (index: number) => setCurrentIndex(index);

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col gap-6">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">

        <button onClick={() => navigate("/learning/CategoryCardsPage")} className="text-blue-500 text-sm hover:underline self-start">
          {t("learning.backToCategories")} 
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">{t("colors.title")}</h1> 
          <p className="text-gray-500 text-sm">{t("colors.desc")}</p>             
        </div>

        <ModeSelector mode={currentMode} onModeChange={setCurrentMode} />
        <ProgressBar current={curentIndex + 1} total={ColorsData.length} learned={learnedCount} />
        <MainLetterCard currentIndex={curentIndex} onNext={handleNext} onPrevious={handleBack} total={ColorsData.length} data={ColorsData} />

        <div className="max-w-6xl mx-auto w-full">
          <QuickAlphReference currentIndex={curentIndex} learned={learnedColors} onSelect={handleSelectLetter} data={ColorsData} />
        </div>
      </div>
    </div>
  );
}