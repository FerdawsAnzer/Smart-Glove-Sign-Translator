import { useState } from "react";
import { QuickAlphReference } from "../learningAlphabet/QuickAlphReference";
import type { Mode } from "@/Types/indexPronouns";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ModeSelector } from "../learningAlphabet/ModeSelector";
import { ProgressBar } from "../learningAlphabet/ProgressBar";
import { MainLetterCard } from "../learningAlphabet/MainLetterCard";
import { timeData } from "@/Data/TimeData";

export function TimeLearningPage() {
  const [currentindex, setCurrentIndex] = useState(0);
  const [learnedTime, setLearnedTime] = useState<boolean[]>(
    new Array(timeData.length).fill(false),
  );
  const [currentMode, setCurrentMode] = useState<Mode>("Learn");
  // to bring the current time from TimeData.ts based on the current index
  const currentTime = timeData[currentindex];
  //this variable to store how many true boolean value we have (depedns on teh learned times ) so we will display it in teh progress bar
  const learnedCount = learnedTime.filter(Boolean).length;
  const navigate = useNavigate();
  const { t } = useTranslation();
  //teh function will handle teh state of lerend times to set it to true when the user has learned the time and clicked next button and also will update teh currentIndex to move to the next time
  const handleNext = () => {
    const updated = [...learnedTime];
    updated[currentindex] = true;
    setLearnedTime(updated);
    if (currentindex < timeData.length - 1) {
      setCurrentIndex(currentindex + 1);
    }
  };
  //The function will handle the back button to change teh value of the currentIndex to move to the previous Greeting
  const handleBack = () => {
    if (currentindex > 0) {
      setCurrentIndex(currentindex - 1);
    }
  };
  //the function  will set the currentIndex to which number the user has selected using teh LetterGrid in the buttom
  const handleSelectLetter = (index: number) => {
    setCurrentIndex(index);
  };
  // just to test everything works before building UI
  console.log("current time:", currentTime);
  console.log("learned count:", learnedCount);
  console.log("mode:", currentMode);

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col gap-6">
      {/* Back button to retun to categories cards */}
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">
        <button
          onClick={() => navigate("/learning/essentials")}
          className="text-blue-500 text-sm hover:underline self-start"
        >
          {t("learning.backToCategories")}
        </button>

        {/* Title + description */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">{t("essentials.time")}</h1>
          <p className="text-gray-500 text-sm">{t("essentials.timeDesc")}</p>
        </div>

        {/* Mode Selector , to select which mode you want learn,Practice,quiz using the 3 cards  */}
        <ModeSelector mode={currentMode} onModeChange={setCurrentMode} />
        {/* Progress Bar  will show the progerss of the user whil elearning or practicing or doing a test*/}
        <ProgressBar
          current={currentindex + 1}
          total={timeData.length}
          learned={learnedCount}
        />

        {/* Main content of pronoun learning goes here */}
        <MainLetterCard
          currentIndex={currentindex}
          onNext={handleNext}
          onPrevious={handleBack}
          total={timeData.length}
          data={timeData}
        />
        {/* QuickReference goes here after */}
        <div className="max-w-6xl mx-auto w-full">
          <QuickAlphReference
            currentIndex={currentindex}
            learned={learnedTime}
            onSelect={handleSelectLetter}
            data={timeData}
          />
        </div>
      </div>
    </div>
  );
}