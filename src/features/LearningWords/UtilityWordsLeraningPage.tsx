import { useState } from "react";
import { QuickAlphReference } from "../learningAlphabet/QuickAlphReference";

import type { Mode } from "@/Types/indexPronouns";
import { useNavigate } from "react-router-dom";
import { ModeSelector } from "../learningAlphabet/ModeSelector";
import { ProgressBar } from "../learningAlphabet/ProgressBar";
import { MainLetterCard } from "../learningAlphabet/MainLetterCard";

import { utilityWords } from "@/Data/UtilityWords";

export function UtilityWordLearningPage() {
  const [curentIndex, setCurrentIndex] = useState(0);
  const [learnedUtilityWords, setLearnedUtilityWords] = useState<boolean[]>(
    new Array(utilityWords.length).fill(false),
  );
  const [currentMode, setCurrentMode] = useState<Mode>("Learn");
  // to bring the current utility word from utilityWords.ts based on the current index
  const currentUtilityWord = utilityWords[curentIndex];
  //this variable to store how many true boolean value we have (depedns on teh learned utility words ) so we will display it in teh progress bar
  const learnedCount = learnedUtilityWords.filter(Boolean).length;
  const navigate = useNavigate();
  //teh function will handle teh state of lerend utilityWords to set it to true when the user has learned the word and clicked next button and also will update teh currentIndex to move to the next word
  const handleNext = () => {
    const updated = [...learnedUtilityWords];
    updated[curentIndex] = true;
    setLearnedUtilityWords(updated);
    if (curentIndex < utilityWords.length - 1) {
      setCurrentIndex(curentIndex + 1);
    }
  };
  //The function will handle the back button to change teh value of the currentIndex to move to the previous utility word
  const handleBack = () => {
    if (curentIndex > 0) {
      setCurrentIndex(curentIndex - 1);
    }
  };
  //the function  will set the currentIndex to which social word the user has selected using teh LetterGrid in the buttom
  const handleSelectLetter = (index: number) => {
    setCurrentIndex(index);
  };
  // just to test everything works before building UI
  console.log("current utility word:", currentUtilityWord);
  console.log("learned count:", learnedCount);
  console.log("mode:", currentMode);

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col gap-6">
      {/* Back button to retun to categories cards */}
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">
        <button
          onClick={() => navigate("/learning/CategoryCardsWordPage")}
          className="text-blue-500 text-sm hover:underline self-start"
        >
          ← Back to Categories
        </button>

        {/* Title + description */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            ASL Utility Words
          </h1>
          <p className="text-gray-500 text-sm">
            Master the American Sign Language utility words
          </p>
        </div>

        {/* Mode Selector , to select which mode you want learn,Practice,quiz using the 3 cards  */}
        <ModeSelector mode={currentMode} onModeChange={setCurrentMode} />
        {/* Progress Bar  will show the progerss of the user whil elearning or practicing or doing a test*/}
        <ProgressBar
          current={curentIndex + 1}
          total={utilityWords.length}
          learned={learnedCount}
        />

        {/* Main content of number learning goes here */}
        <MainLetterCard
          currentIndex={curentIndex}
          onNext={handleNext}
          onPrevious={handleBack}
          total={utilityWords.length}
          data={utilityWords}
        />
        {/* QuickReference goes here after */}
        <div className="max-w-6xl mx-auto w-full">
          <QuickAlphReference
            currentIndex={curentIndex}
            learned={learnedUtilityWords}
            onSelect={handleSelectLetter}
            data={utilityWords}
          />
        </div>
      </div>
    </div>
  );
}
