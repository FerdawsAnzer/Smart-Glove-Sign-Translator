import { Card, CardContent } from "@/components/ui/card";

const reasons = [
  {
    emoji: "🤝",
    bg: "bg-blue-100",
    title: "Connect with Others",
    description: "Communicate with the deaf and hard-of-hearing community",
  },
  {
    emoji: "🧠",
    bg: "bg-green-100",
    title: "Boost Your Brain",
    description: "Learning sign language improves memory and cognitive skills",
  },
  {
    emoji: "💼",
    bg: "bg-purple-100",
    title: "Career Benefits",
    description: "Valuable skill for many professional fields",
  },
];

export function WhyLearnCard() {
  return (
    <Card className="border border-gray-200 shadow-sm rounded-2xl">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Why Learn Sign Language?
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
