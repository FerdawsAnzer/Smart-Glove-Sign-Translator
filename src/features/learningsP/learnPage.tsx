import { BasicsCard } from "./BasicsCard";
import { GreetingsCard } from "./GreetingsCard";
import { CategoryCardWords } from "./CategoryCardSWords";
import { WhyLearnCard } from "./WhyLearncard";

export function LearnPage() {
  return (
    <div className=" w-full bg-blue-50 flex flex-col items-center py-12 px-6 gap-8 ">
      {/* Main container with light blue background and centered content */}
      {/* Title */}
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold text-gray-900">
          Learn Sign Language
        </h1>
        <p className="text-gray-500 text-sm">
          Choose what you'd like to learn today
        </p>
      </div>

      {/* The 3 cards container*/}
      <div className="grid grid-cols-3 gap-6 ">
        <BasicsCard />
        <CategoryCardWords />
        <GreetingsCard />
      </div>

      {/* Why Learn card container */}
      <div className="w-full max-w-7xl">
        <WhyLearnCard />
      </div>
    </div>
  );
}
