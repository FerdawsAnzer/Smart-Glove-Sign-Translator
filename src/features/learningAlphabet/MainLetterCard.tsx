import { Card } from "@/components/ui/card";
import { AlpahbetData } from "@/Data/alphabetData";
import { ChevronLeft, ChevronRight, Lightbulb, Check } from "lucide-react";
import type { MainLetterCardProps } from "@/Types/MainCardProps";
{
  /* import the mainCardProps from teh type file MainCardProps from the types folder */
}
export function MainLetterCard({
  currentIndex,
  onNext,
  onPrevious,
  total,
}: MainLetterCardProps) {
  const currentLetter = AlpahbetData[currentIndex];

  return (
    <Card className="w-full flex flex-col items-center gap-5 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* the hand  sign animation will be displayed here  */}
      <div className="flex flex-col items-center gap-3">
        <img
          src={currentLetter.image}
          alt={currentLetter.letter}
          className="w-44 h-44 object-contain"
        />
        {/* Hold Position badge */}
        <span className="bg-blue-100 text-blue-500 text-xs font-medium px-4 py-1 rounded-full">
          Hold Position
        </span>
      </div>

      {/* the letter that the user is currently learning will be displayed here*/}
      <p className="text-4xl font-bold text-gray-900">{currentLetter.letter}</p>

      {/* the description  of how to do the letter in signLanguage */}
      <p className="text-gray-500 text-sm text-center">
        {currentLetter.description}
      </p>

      {/* Tips will be displayed here to explain to user what shoudl be done */}
      <div className="w-full bg-yellow-50 border border-yellow-100 rounded-xl p-4">
        <p className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-yellow-500" />
          Tips for Success
        </p>
        <ul className="flex flex-col gap-2">
          {currentLetter.tips.map((tip, index) => (
            <li
              key={index}
              className="text-sm text-gray-600 flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-green-500 shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer:will display the Next and Previous buttons and the dots that represent the alphabetpage(pagination) */}
      <div className="flex justify-between w-full items-center mt-2">
        {/* Previous button */}
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {/* Pagination dots */}
        <div className="flex gap-1 flex-wrap justify-center max-w-xs">
          {Array.from({ length: total }).map((_, index) => (
            <div
              key={index}
              className={`rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "w-4 h-2 bg-blue-500"
                  : "w-2 h-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={onNext}
          className="flex items-center gap-1 text-sm text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
}
