import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export function WhyLearnCard() {
  const { t } = useTranslation();

  const reasons = [
    {
      emoji: "🤝",
      bg: "bg-blue-100",
      title: t("cards.connect"),
      description: t("cards.connectDesc"),
    },
    {
      emoji: "🧠",
      bg: "bg-green-100",
      title: t("cards.boostBrain"),
      description: t("cards.boostBrainDesc"),
    },
    {
      emoji: "💼",
      bg: "bg-purple-100",
      title: t("cards.career"),
      description: t("cards.careerDesc"),
    },
  ];

  return (
    <Card className="border border-gray-200 shadow-sm rounded-2xl">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t("cards.whyLearn")}
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="flex flex-col items-center text-center gap-3"
            >
              {/* Emoji circle */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${reason.bg}`}
              >
                {reason.emoji}
              </div>

              {/* Title */}
              <p className="font-bold text-gray-900">{reason.title}</p>

              {/* Description */}
              <p className="text-gray-500 text-sm">{reason.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}