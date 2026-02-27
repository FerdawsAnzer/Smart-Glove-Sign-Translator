import { Progress } from "@/components/ui/progress";
import type { ProgressBarProps } from "@/Types/ProgressBar";

export function ProgressBar({ current, learned, total }: ProgressBarProps) {
  return (
    <div className="w-300 flex flex-col gap-2">
      <div className="flex justify-between text-sm text-gray-500">
        <span>
          Progress: {current} / {total}
        </span>
        <span>
          Learned: {learned} / {total}
        </span>
      </div>
      <Progress
        value={(current / total) * 100}
        className="h-3 bg-blue-100 [&>div]:bg-blue-500"
      />
    </div>
  );
}
