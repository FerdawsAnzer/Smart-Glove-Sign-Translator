import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGloveConnection } from "@/hooks/useGloveConnection";
import { Hand } from "lucide-react";
import type { AslInputCardProps } from "src/Types/glove";
import { useTranslation } from "react-i18next"; 

export function AslInputCard({ onPrediction }: AslInputCardProps) {
  const { t } = useTranslation();
  const { connected, isProcessing, startProcessing, stopProcessing, connect, disconnect } =
    useGloveConnection({ onPrediction });

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-900">
          <span className="flex items-center justify-center w-11 h-11 rounded-xl"
            style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>
            <Hand className="w-6 h-6 text-white" />
          </span>
          {t("dashboard.aslInput")}
        </CardTitle>
        <CardAction>
          <Button
            onClick={isProcessing ? stopProcessing : startProcessing}
            disabled={!connected}
            className="text-white font-medium px-6 py-2 rounded-lg flex items-center gap-2 border-0"
      style={{
        background: isProcessing
          ? "linear-gradient(135deg, #ef4444, #dc2626)" 
          : "linear-gradient(135deg, #3b82f6, #8b5cf6)", 
        boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
      }}
    >
            {isProcessing ? t("dashboard.stopGlove") : t("dashboard.startGlove")} 
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center justify-center gap-4 bg-blue-50 rounded-xl py-12 border border-blue-100">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600">
            <Hand className="w-7 h-7 text-white" />
          </div>
          <p className="text-gray-500 text-sm">{t("dashboard.ready")}</p>
          <Button
             onClick={connected ? disconnect : connect}
  className="text-white font-medium px-5 py-2 rounded-lg border-0"
  style={{
    background: connected
      ? "linear-gradient(135deg, #ef4444, #dc2626)"
      : "linear-gradient(135deg, #3b82f6, #8b5cf6)", 
    boxShadow: "0 4px 12px rgba(99,102,241,0.25)",
  }}
>
  {connected ? t("dashboard.disconnect") : t("dashboard.connectGlove")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}