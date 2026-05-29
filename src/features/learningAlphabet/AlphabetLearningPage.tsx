import { useState } from "react";
import { AlpahbetData } from "../../Data/alphabetData";
import type { Mode } from "src/Types/indexAlphabet";
import { useNavigate } from "react-router-dom";
import { ModeSelector } from "./ModeSelector";
import { ProgressBar } from "./ProgressBar";
import { MainLetterCard } from "./MainLetterCard";
import { QuickAlphReference } from "./QuickAlphReference";
import { useTranslation } from "react-i18next"; 

export function AlphabetLearningPage() {
  const { t } = useTranslation(); 
  const [curentIndex, setCurrentIndex] = useState(0);
  const [learnedLetters, setLearnedLetters] = useState<boolean[]>(
    new Array(AlpahbetData.length).fill(false)
  );
  const [currentMode, setCurrentMode] = useState<Mode>("Learn");
  const currentLetter = AlpahbetData[curentIndex];
  const learnedCount = learnedLetters.filter(Boolean).length;
  const navigate = useNavigate();

  const handleNext = () => {
    const updated = [...learnedLetters];
    updated[curentIndex] = true;
    setLearnedLetters(updated);
    if (curentIndex < AlpahbetData.length - 1) setCurrentIndex(curentIndex + 1);
  };

  const handleBack = () => {
    if (curentIndex > 0) setCurrentIndex(curentIndex - 1);
  };

  const handleSelectLetter = (index: number) => setCurrentIndex(index);

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col gap-6">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">

        <button
          onClick={() => navigate("/learning/CategoryCardsPage")}
          className="text-blue-500 text-sm hover:underline self-start"
        >
          {t("learning.backToCategories")} 
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("learning.aslAlphabet")} 
          </h1>
          <p className="text-gray-500 text-sm">
            {t("learning.aslAlphabetDesc")}
          </p>
        </div>

        <ModeSelector mode={currentMode} onModeChange={setCurrentMode} />

        <ProgressBar
          current={curentIndex + 1}
          total={AlpahbetData.length}
          learned={learnedCount}
        />

        <MainLetterCard
          currentIndex={curentIndex}
          onNext={handleNext}
          onPrevious={handleBack}
          total={AlpahbetData.length}
          data={AlpahbetData}
        />

        <div className="max-w-6xl mx-auto w-full">
          <QuickAlphReference
            currentIndex={curentIndex}
            learned={learnedLetters}
            onSelect={handleSelectLetter}
            data={AlpahbetData}
          />
        </div>
      </div>
    </div>
  );
}