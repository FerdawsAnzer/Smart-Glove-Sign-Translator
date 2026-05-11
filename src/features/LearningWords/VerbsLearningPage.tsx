import { useState } from "react";
import { QuickAlphReference } from "../learningAlphabet/QuickAlphReference";

import type { Mode } from "@/Types/indexPronouns";
import { useNavigate } from "react-router-dom";
import { ModeSelector } from "../learningAlphabet/ModeSelector";
import { ProgressBar } from "../learningAlphabet/ProgressBar";
import { MainLetterCard } from "../learningAlphabet/MainLetterCard";
import { verbs } from "@/Data/verbs";

export function VerbsLearningPage() {
  const [curentIndex, setCurrentIndex] = useState(0);
  const [learnedVerbs, setLearnedVerbs] = useState<boolean[]>(
    new Array(verbs.length).fill(false),
  );
  const [currentMode, setCurrentMode] = useState<Mode>("Learn");
  // to bring the current verbs from verbs.ts based on the current index
  const currentVerbs = verbs[curentIndex];
  //this variable to store how many true boolean value we have (depedns on teh learned verbs ) so we will display it in teh progress bar
  const learnedCount = learnedVerbs.filter(Boolean).length;
  const navigate = useNavigate();
  //teh function will handle teh state of lerend verbs to set it to true when the user has learned the number and clicked next button and also will update teh currentIndex to move to the next number
  const handleNext = () => {
    const updated = [...learnedVerbs];
    updated[curentIndex] = true;
    setLearnedVerbs(updated);
    if (curentIndex < verbs.length - 1) {
      setCurrentIndex(curentIndex + 1);
    }
  };
  //The function will handle the back button to change teh value of the currentIndex to move to the previous social word
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
  console.log("current verb:", currentVerbs);
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
          <h1 className="text-3xl font-bold text-gray-900">ASL Verbs</h1>
          <p className="text-gray-500 text-sm">
            Master the American Sign Language verbs
          </p>
        </div>

        {/* Mode Selector , to select which mode you want learn,Practice,quiz using the 3 cards  */}
        <ModeSelector mode={currentMode} onModeChange={setCurrentMode} />
        {/* Progress Bar  will show the progerss of the user whil elearning or practicing or doing a test*/}
        <ProgressBar
          current={curentIndex + 1}
          total={verbs.length}
          learned={learnedCount}
        />

        {/* Main content of number learning goes here */}
        <MainLetterCard
          currentIndex={curentIndex}
          onNext={handleNext}
          onPrevious={handleBack}
          total={verbs.length}
          data={verbs}
        />
        {/* QuickReference goes here after */}
        <div className="max-w-6xl mx-auto w-full">
          <QuickAlphReference
            currentIndex={curentIndex}
            learned={learnedVerbs}
            onSelect={handleSelectLetter}
            data={verbs}
          />
        </div>
      </div>
    </div>
  );
}
