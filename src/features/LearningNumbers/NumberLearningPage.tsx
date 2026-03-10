import { useState } from "react";
import { QuickAlphReference } from "../learningAlphabet/QuickAlphReference";

import type { Mode } from "@/Types/indexPronouns";
import { useNavigate } from "react-router-dom";
import { ModeSelector } from "../learningAlphabet/ModeSelector";
import { ProgressBar } from "../learningAlphabet/ProgressBar";
import { MainLetterCard } from "../learningAlphabet/MainLetterCard";
import { NumbersData } from "@/Data/NumbersData";

export function NumberLearningPage() {
  const [curentIndex, setCurrentIndex] = useState(0);
  const [learnedNumbers, setLearnedNumbers] = useState<boolean[]>(
    new Array(NumbersData.length).fill(false),
  );
  const [currentMode, setCurrentMode] = useState<Mode>("Learn");
  // to bring the current number from NumbersData.ts based on the current index
  const currentNumber = NumbersData[curentIndex];
  //this variable to store how many true boolean value we have (depedns on teh learned numbers ) so we will display it in teh progress bar
  const learnedCount = learnedNumbers.filter(Boolean).length;
  const navigate = useNavigate();
  //teh function will handle teh state of lerend numbers to set it to true when the user has learned the number and clicked next button and also will update teh currentIndex to move to the next number
  const handleNext = () => {
    const updated = [...learnedNumbers];
    updated[curentIndex] = true;
    setLearnedNumbers(updated);
    if (curentIndex < NumbersData.length - 1) {
      setCurrentIndex(curentIndex + 1);
    }
  };
  //The function will handle the back button to change teh value of the currentIndex to move to the previous number
  const handleBack = () => {
    if (curentIndex > 0) {
      setCurrentIndex(curentIndex - 1);
    }
  };
  //the function  will set the currentIndex to which number the user has selected using teh LetterGrid in the buttom
  const handleSelectLetter = (index: number) => {
    setCurrentIndex(index);
  };
  // just to test everything works before building UI
  console.log("current number:", currentNumber);
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
          <h1 className="text-3xl font-bold text-gray-900">ASL Numbers</h1>
          <p className="text-gray-500 text-sm">
            Master the American Sign Language numbers from 0 to 10
          </p>
        </div>

        {/* Mode Selector , to select which mode you want learn,Practice,quiz using the 3 cards  */}
        <ModeSelector mode={currentMode} onModeChange={setCurrentMode} />
        {/* Progress Bar  will show the progerss of the user whil elearning or practicing or doing a test*/}
        <ProgressBar
          current={curentIndex + 1}
          total={NumbersData.length}
          learned={learnedCount}
        />

        {/* Main content of number learning goes here */}
        <MainLetterCard
          currentIndex={curentIndex}
          onNext={handleNext}
          onPrevious={handleBack}
          total={NumbersData.length}
          data={NumbersData}
        />
        {/* QuickReference goes here after */}
        <div className="max-w-6xl mx-auto w-full">
          <QuickAlphReference
            currentIndex={curentIndex}
            learned={learnedNumbers}
            onSelect={handleSelectLetter}
            data={NumbersData}
          />
        </div>
      </div>
    </div>
  );
}
