import { useState } from "react";
import { QuickAlphReference } from "../learningAlphabet/QuickAlphReference";

import type { Mode } from "@/Types/indexPronouns";
import { useNavigate } from "react-router-dom";
import { ModeSelector } from "../learningAlphabet/ModeSelector";
import { ProgressBar } from "../learningAlphabet/ProgressBar";
import { MainLetterCard } from "../learningAlphabet/MainLetterCard";
import { ColorsData } from "@/Data/ColorsData";

export function ColorsLearningPage() {
  const [curentIndex, setCurrentIndex] = useState(0);
  const [learnedColors, setLearnedColors] = useState<boolean[]>(
    new Array(ColorsData.length).fill(false),
  );
  const [currentMode, setCurrentMode] = useState<Mode>("Learn");
  // to bring the current color from ColorsData.ts based on the current index
  const currentColor = ColorsData[curentIndex];
  //this variable to store how many true boolean value we have (depedns on teh learned colors ) so we will display it in teh progress bar
  const learnedCount = learnedColors.filter(Boolean).length;
  const navigate = useNavigate();
  //the function will handle the state of learned colors to set it to true when the user has learned the color and clicked next button and also will update the currentIndex to move to the next color
  const handleNext = () => {
    const updated = [...learnedColors];
    updated[curentIndex] = true;
    setLearnedColors(updated);
    if (curentIndex < ColorsData.length - 1) {
      setCurrentIndex(curentIndex + 1);
    }
  };
  //The function will handle the back button to change teh value of the currentIndex to move to the previous color
  const handleBack = () => {
    if (curentIndex > 0) {
      setCurrentIndex(curentIndex - 1);
    }
  };
  //the function  will set the currentIndex to which number the user has selected using the LetterGrid in the buttom
  const handleSelectLetter = (index: number) => {
    setCurrentIndex(index);
  };
  // just to test everything works before building UI
  console.log("current color:", currentColor);
  console.log("learned count:", learnedCount);
  console.log("mode:", currentMode);

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col gap-6">
      {/* Back button to retun to categories cards */}
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">
        <button
          onClick={() => navigate("/learning/CategoryCardsPage")}
          className="text-blue-500 text-sm hover:underline self-start"
        >
          ← Back to Categories
        </button>

        {/* Title + description */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">ASL Colors</h1>
          <p className="text-gray-500 text-sm">
            Master the American Sign Language colors
          </p>
        </div>

        {/* Mode Selector , to select which mode you want learn,Practice,quiz using the 3 cards  */}
        <ModeSelector mode={currentMode} onModeChange={setCurrentMode} />
        {/* Progress Bar  will show the progerss of the user whil elearning or practicing or doing a test*/}
        <ProgressBar
          current={curentIndex + 1}
          total={ColorsData.length}
          learned={learnedCount}
        />

        {/* Main content of colors learning goes here */}
        <MainLetterCard
          currentIndex={curentIndex}
          onNext={handleNext}
          onPrevious={handleBack}
          total={ColorsData.length}
          data={ColorsData}
        />
        {/* QuickReference goes here after */}
        <div className="max-w-6xl mx-auto w-full">
          <QuickAlphReference
            currentIndex={curentIndex}
            learned={learnedColors}
            onSelect={handleSelectLetter}
            data={ColorsData}
          />
        </div>
      </div>
    </div>
  );
}
