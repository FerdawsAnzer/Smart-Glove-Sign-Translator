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
