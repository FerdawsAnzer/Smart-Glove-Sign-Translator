import { AslInputCard } from "./AslInputCard";
import { QuickTipCard } from "./QuickTipCard";
import { TranslationCard } from "./translationCard";

export function DashboardPage() {
  return (
    <div className="flex-1 p-6">
      <div className=" grid gap-6 md:grid-cols-2">
        <AslInputCard />
        <TranslationCard />
      </div>
      <div className="mt-9">
        <QuickTipCard />
      </div>
    </div>
  );
}
