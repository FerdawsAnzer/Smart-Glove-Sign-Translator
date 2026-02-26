import { useState } from "react";
import { AlpahbetData } from "../../Data/alphabetData";
import type { Mode } from "src/Types/indexAlphabet";

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
  //the function  will set the currentIndex to which letter teh user has selected using teh LetterGrid in the buttom
  const handleSelectLetter = (index: number) => {
    setCurrentIndex(index);
  };
  // just to test everything works before building UI
  console.log("current letter:", currentLetter);
  console.log("learned count:", learnedCount);
  console.log("mode:", currentMode);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-900">
        Alphabet Learning Page
      </h1>
    </div>
  );
}
