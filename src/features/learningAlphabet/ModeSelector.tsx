// ModeSelector.tsx
import { BookOpen, RefreshCw, Trophy } from "lucide-react";
import { ModeSelectorCard } from "./ModeSelectorCards";
import type { Mode } from "@/Types/indexAlphabet";

type ModeSelectorProps = {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
};

export function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <ModeSelectorCard
        icon={BookOpen}
        title="Learn Mode"
        description="Study at your own pace with animations"
        iconColor="text-blue-500"
        isActive={mode === "Learn"}
        onClick={() => onModeChange("Learn")}
      />
      <ModeSelectorCard
        icon={RefreshCw}
        title="Practice Mode"
        description="Review and reinforce your knowledge"
        iconColor="text-green-500"
        isActive={mode === "Practice"}
        onClick={() => onModeChange("Practice")}
      />
      <ModeSelectorCard
        icon={Trophy}
        title="Quiz Mode"
        description="Test your skills with a challenge"
        iconColor="text-purple-500"
        isActive={mode === "Quiz"}
        onClick={() => onModeChange("Quiz")}
      />
    </div>
  );
}
