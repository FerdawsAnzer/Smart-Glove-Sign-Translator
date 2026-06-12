import { Card, CardContent } from "@/components/ui/card";
import { Hand } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AlphabetCard() {
  const navigate = useNavigate();

  return (
    <Card
      className="border border-gray-200 shadow-sm w-92 rounded-2xl cursor-pointer hover:shadow-md transition-shadow duration-300 "
      onClick={() => navigate("/learning/alphabet")}
    >
      {/* when you clik teh card will navigate you to the learning Greetings Page*/}

      {/* Card Content container */}
      <CardContent className="flex flex-col items-center gap-3 p-4">
        {/* Green box with sparkles icon */}
        <div className="w-full flex items-center justify-center bg-blue-500 rounded-xl py-8">
          <Hand className="w-14 h-14 text-white" />
        </div>

        {/* middle Title of card*/}
        <p className="text-gray-900 font-bold text-xl">Alphabet</p>

        {/* Description of card */}
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
