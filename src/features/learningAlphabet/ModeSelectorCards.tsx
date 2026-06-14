import { Card, CardContent } from "@/components/ui/card";
import type { ModeSelectorCardProps } from "@/Types/modeSelectorProps";

export function ModeSelectorCard({
  icon: Icon,
  title,
  description,
  isActive,
  iconColor,
  onClick,
}: ModeSelectorCardProps) {
  return (
    <Card
      className={`shadow-sm rounded-2xl cursor-pointer hover:shadow-md transition-shadow duration-300 border-2 ${
        isActive ? "border-blue-500" : "border-gray-200"
      }`}
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center gap-2 p-4">
        <Icon className={`w-10 h-10 ${iconColor}`} />
        <p className="text-gray-900 font-bold text-base">{title}</p>
        <p className="text-gray-500 text-sm text-center">{description}</p>
      </CardContent>
    </Card>
  );
}
/*  <div className="grid grid-cols-3 gap-4">
      <ModeSelectorCard
        icon={BookOpen}
        title="Learn Mode"
        description="Study at your own pace with animations"
        iconColor="text-blue-500"
        isActive={currentMode === "Learn"}
        onClick={() => setCurrentMode("Learn")}
      />
      <ModeSelectorCard
        icon={RefreshCw}
        title="Practice Mode"
        description="Review and reinforce your knowledge"
        iconColor="text-green-500"
        isActive={currentMode === "Practice"}
        onClick={() => setCurrentMode("Practice")}
      />
      <ModeSelectorCard
        icon={Trophy}
        title="Quiz Mode"
        description="Test your skills with a challenge"
        iconColor="text-purple-500"
        isActive={currentMode === "Quiz"}
        onClick={() => setCurrentMode("Quiz")}
      />
    </div> */
