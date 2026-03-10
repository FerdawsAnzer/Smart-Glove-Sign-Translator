import type { QuickAlphReferenceProps } from "@/Types/QuickAlphReference";

import { Card, CardContent } from "@/components/ui/card";

export function QuickAlphReference({
  currentIndex,
  learned,
  onSelect,
  data,
}: QuickAlphReferenceProps) {
  return (
    <Card className="w-full bg-white rounded-2xl shadow-sm border border-gray-100">
      <CardContent className="p-6">
        {/* Title */}
        <p className="text-base font-bold text-gray-900 mb-4">
          Quick Reference
        </p>

        {/* A-Z grid */}
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: "repeat(13, 1fr)" }}
        >
          {data.map((letter, index) => (
            <button
              key={index}
              className={` h-10 rounded-lg text-sm font-semibold transition-all duration-200
                ${
                  index === currentIndex
                    ? "bg-blue-500 text-white shadow-md"
                    : learned[index]
                      ? "bg-green-100 text-black-500"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
              onClick={() => onSelect(index)}
            >
              {letter.letter}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
