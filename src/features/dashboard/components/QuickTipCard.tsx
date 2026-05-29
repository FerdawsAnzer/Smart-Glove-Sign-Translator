import { Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next"; 

export function QuickTipCard() {
  const { t } = useTranslation(); 

  return (
    <div className="bg-blue-400 rounded-xl px-5 py-4"
    style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>
      <p className="flex items-center gap-2 text-white font-semibold text-sm mb-1">
        <Lightbulb className="w-4 h-4" />
        {t("dashboard.quickTip")} 
      </p>
      <p className="text-white/90 text-sm">
        {t("dashboard.tipText")} 
      </p>
    </div>
  );
}