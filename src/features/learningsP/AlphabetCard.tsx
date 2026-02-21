import { Card, CardContent } from "@/components/ui/card";
import { Hand } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AlphabetCard() {
  const navigate = useNavigate();

  return (
    <Card
      className="border border-gray-200 shadow-sm w-80 rounded-2xl cursor-pointer hover:shadow-md transition-shadow duration-300 "
      onClick={() => navigate("/")}
    >
      {/* will work on teh navigation for the card when we click it */}
      <CardContent className="flex flex-col items-center gap-3 p-4">
        {/* Blue banner with hand icon */}
        <div className="w-full flex items-center justify-center bg-blue-500 rounded-xl py-8">
          <Hand className="w-14 h-14 text-white" />
        </div>

        {/* Title */}
        <p className="text-gray-900 font-bold text-xl">Alphabet</p>

        {/* Description */}
        <p className="text-gray-500 text-sm text-center">
          Learn the ASL alphabet from A to Z
        </p>

        {/* Badge */}
        <span className="bg-blue-50 text-blue-500 text-sm font-medium px-4 py-1 rounded-full">
          26 Letters
        </span>
      </CardContent>
    </Card>
  );
}
