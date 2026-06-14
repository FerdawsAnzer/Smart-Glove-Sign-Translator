import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Lightbulb, Check } from "lucide-react";
import type { MainLetterCardProps } from "@/Types/MainCardProps";
import { useTranslation } from "react-i18next";

export function MainLetterCard({
  currentIndex,
  onNext,
  onPrevious,
  total,
  data,
}: MainLetterCardProps) {
  const { t, i18n } = useTranslation();
  const currentItem = data[currentIndex];

  //  detect category by letter content
  const getTranslated = () => {
  const letter = currentItem.letter;

  const isAlphabet = /^[A-Z]$/.test(letter);
  const isNumber = /^\d+$/.test(letter);
  const isColor = ["Red","Blue","Green","Yellow","Black","White","Pink","Purple","Orange"].includes(letter);
  const isSocialWord = ["I Love You","Thank You","Hello","Goodbye","Please","Sorry","No","Yes","Deaf","Hearing Person"].includes(letter);
  const isPronoun = ["Me/I","My/Mine","You","Your/Yours","He/She/It","His/Her/Its","We","Our/Ours","They","Their/Theirs"].includes(letter);
  const isVerb = ["Like","Cut","Drop","Need","Hear","Talk","Eat","Drink","Help","See","Go","Come","Sit","Stand","Wake Up","Sleep","Stop","Clean","Want","Cook","Write","Draw","Read","Cry","Laugh","Walk","Jump","Hug"].includes(letter);
  const isUtility = ["Where","Who","Why","How","What","When","Which"].includes(letter);
  const isTime = ["Later","Again","Done","More","Now"].includes(letter);

  let category = "";
  if (isAlphabet)  category = "alphabet";
  if (isNumber)    category = "numbers";
  if (isColor)     category = "colors";
  if (isSocialWord) category = "socialWords";
  if (isPronoun)   category = "pronouns";
  if (isVerb)      category = "verbs";
  if (isUtility)   category = "utilityWords";
  if (isTime)      category = "timeData";

  if (!category) {
    return {
      description: currentItem.description,
      tips: currentItem.tips,
    };
  }

  const description = t(`data.${category}.${letter}.description`, {
    defaultValue: currentItem.description,
  });

  const tips = t(`data.${category}.${letter}.tips`, {
    returnObjects: true,
    defaultValue: currentItem.tips,
  }) as string[];

  return { description, tips };
};

  const { description, tips } = getTranslated();

  return (
    <Card className="w-full flex flex-col items-center gap-5 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">

      {/* image + hold position badge */}
      <div className="flex flex-col items-center gap-3">
        <img
          src={currentItem.image}
          alt={currentItem.letter}
          className="w-44 h-44 object-contain"
        />
        <span className="bg-blue-100 text-blue-500 text-xs font-medium px-4 py-1 rounded-full">
          {t("learning.holdPosition")}
        </span>
      </div>

      {/* letter stays in English always */}
      <p className="text-4xl font-bold text-gray-900">{currentItem.letter}</p>

      {/* description translated */}
      <p className="text-gray-500 text-sm text-center">{description}</p>

      {/* tips translated */}
      <div className="w-full bg-yellow-50 border border-yellow-100 rounded-xl p-4">
        <p className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-yellow-500" />
          {t("learning.tipsTitle")}
        </p>
        <ul className="flex flex-col gap-2">
          {(Array.isArray(tips) ? tips : []).map((tip: string, index: number) => (
            <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500 shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* navigation */}
      <div className="flex justify-between w-full items-center mt-2">
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          {t("learning.previous")}
        </button>

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

        <button
          onClick={onNext}
          className="flex items-center gap-1 text-sm text-white px-4 py-2 rounded-lg transition-colors border-0"
          style={{
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
          }}
        >
          {t("learning.next")}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
}