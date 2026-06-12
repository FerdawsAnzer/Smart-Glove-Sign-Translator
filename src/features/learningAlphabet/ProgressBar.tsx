import { Progress } from "@/components/ui/progress";
import type { ProgressBarProps } from "@/Types/ProgressBar";
import { useTranslation } from "react-i18next"; 

export function ProgressBar({ current, learned, total }: ProgressBarProps) {
  const { t } = useTranslation(); 

  return (
    <div className="w-300 flex flex-col gap-2">
      <div className="flex justify-between text-sm text-gray-500">
        <span>{t("learning.progress")}: {current} / {total}</span> 
        <span>{t("learning.learned")}: {learned} / {total}</span>  
      </div>
      <Progress value={(current / total) * 100} className="h-3 bg-blue-100 [&>div]:bg-blue-500" />
    </div>
  );
}