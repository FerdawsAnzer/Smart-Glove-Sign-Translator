import { useState } from "react";
import { AlpahbetData } from "../../Data/alphabetData";
import type { Mode } from "src/Types/indexAlphabet";
import { useNavigate } from "react-router-dom";
import { ModeSelector } from "./ModeSelector";
import { ProgressBar } from "./ProgressBar";
import { MainLetterCard } from "./MainLetterCard";
import { QuickAlphReference } from "./QuickAlphReference";
export function AlphabetLearningPage() {
  const [curentIndex, setCurrentIndex] = useState(0);
  const [learnedLetters, setLearnedLetters] = useState<boolean[]>(
    new Array(AlpahbetData.length).fill(false),
  );
  const [currentMode, setCurrentMode] = useState<Mode>("Learn");
  // to bring the current letter from AlphabetData.ts based on the current index
  const currentLetter = AlpahbetData[curentIndex];
  //this variable to store how many true boolean value we have (depedns on teh learned alpahbet ) so we will display it in teh progress bar
  const learnedCount = learnedLetters.filter(Boolean).length;
  const navigate = useNavigate();
  //teh function will handle teh state of lerend letters to set it to true when the user has learned the letter and clicked next button and also will update teh currentIndex to move to the next letter
  const handleNext = () => {
    const updated = [...learnedLetters];
    updated[curentIndex] = true;
    setLearnedLetters(updated);
    if (curentIndex < AlpahbetData.length - 1) {
      setCurrentIndex(curentIndex + 1);
    }
  };
  //The function will handle the back button to change teh value of the currentIndex to move to the previous letter
  const handleBack = () => {
    if (curentIndex > 0) {
      setCurrentIndex(curentIndex - 1);
    }
  };
  //the function  will set the currentIndex to which letter the user has selected using teh LetterGrid in the buttom
  const handleSelectLetter = (index: number) => {
    setCurrentIndex(index);
  };
  // just to test everything works before building UI
  console.log("current letter:", currentLetter);
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
          <h1 className="text-3xl font-bold text-gray-900">ASL Alphabet</h1>
          <p className="text-gray-500 text-sm">
            Master the American Sign Language alphabet
          </p>
        </div>

        {/* Mode Selector , to select which mode you want learn,Practice,quiz using the 3 cards  */}
        <ModeSelector mode={currentMode} onModeChange={setCurrentMode} />
        {/* Progress Bar  will show the progerss of the user whil elearning or practicing or doing a test*/}
        <ProgressBar
          current={curentIndex + 1}
          total={AlpahbetData.length}
          learned={learnedCount}
        />

        {/* Main content of alphabet learning goes here */}
        <MainLetterCard
          currentIndex={curentIndex}
          onNext={handleNext}
          onPrevious={handleBack}
          total={AlpahbetData.length}
          data={AlpahbetData}
        />
        {/* QuickReference goes here after */}
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
