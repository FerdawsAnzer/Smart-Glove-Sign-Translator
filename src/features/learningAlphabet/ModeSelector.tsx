import { BookOpen, RefreshCw } from "lucide-react";
import { ModeSelectorCard } from "./ModeSelectorCards";
import type { Mode } from "@/Types/indexAlphabet";
import { useTranslation } from "react-i18next"; 

type ModeSelectorProps = {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
};

export function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  const { t } = useTranslation(); 

  return (
    <div className="grid grid-cols-2 gap-4">
      <ModeSelectorCard
        icon={BookOpen}
        title={t("learning.learnMode")}           
        description={t("learning.learnModeDesc")} 
        iconColor="text-blue-500"
        isActive={mode === "Learn"}
        onClick={() => onModeChange("Learn")}
      />
      <ModeSelectorCard
        icon={RefreshCw}
        title={t("learning.practiceMode")}           
        description={t("learning.practiceModeDesc")} 
        iconColor="text-green-500"
        isActive={mode === "Practice"}
        onClick={() => onModeChange("Practice")}
      />
    </div>
  );
}