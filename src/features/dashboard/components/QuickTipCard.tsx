import { Lightbulb } from "lucide-react";

export function QuickTipCard() {
  return (
    <div className="bg-blue-400 rounded-xl px-5 py-4">
      <p className="flex items-center gap-2 text-white font-semibold text-sm mb-1">
        <Lightbulb className="w-4 h-4" />
        Quick Tip
      </p>
      <p className="text-white/90 text-sm">
        Make sure your glove is properly calibrated before starting a
        translation session. Visit the Learning section to practice common signs
        and improve accuracy.
      </p>
    </div>
  );
}
