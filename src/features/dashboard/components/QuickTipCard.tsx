import { Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next"; 

export function QuickTipCard() {
  const { t } = useTranslation(); 

  return (
     <div className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 rounded-xl px-5 py-4">
      <p className="flex items-center gap-2 text-white font-semibold text-sm mb-1">
        <Lightbulb className="w-4 h-4" />
        Quick Tip
      </p>
      <p className="text-white/90 text-sm">
        Hold still the sign for half a second until the translation appears. For
        motion signs, complete the full gesture naturally and wait for the
        translation to show before continuing. Visit the learning section to
        gain more knowledge about ASL.
      </p>
    </div>
  );
}