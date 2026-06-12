import { Card, CardContent } from "@/components/ui/card";
import { CircleHelp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function UtilityWordCard() {
  const navigate = useNavigate();
  return (
    <Card
      className="border border-gray-200 shadow-sm w-92 rounded-2xl cursor-pointer hover:shadow-md transition-shadow duration-300"
      onClick={() => navigate("/learning/words/utility")}
    >
      <CardContent className="flex flex-col items-center gap-3 p-4">
        <div className="w-full flex items-center justify-center bg-green-300 rounded-xl py-8">
          <CircleHelp className="w-14 h-14 text-white" />
        </div>
        <p className="text-gray-900 font-bold text-xl">Utility</p>
        <p className="text-gray-500 text-sm text-center">Learn and Master Basic Utility Words in American Sign Language</p>
        <span className="bg-blue-50 text-blue-500 text-sm font-medium px-4 py-1 rounded-full">7 Utility Words</span>
      </CardContent>
    </Card>
  );
}