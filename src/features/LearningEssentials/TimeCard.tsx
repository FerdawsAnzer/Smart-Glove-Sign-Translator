import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function TimeCard() {
  const navigate = useNavigate();
  return (
    <Card
      className="border border-gray-200 shadow-sm w-92 rounded-2xl cursor-pointer hover:shadow-md transition-shadow duration-300"
      onClick={() => navigate("/learning/essentials/time")}
    >
      <CardContent className="flex flex-col items-center gap-3 p-4">
        <div className="w-full flex items-center justify-center bg-orange-400 rounded-xl py-8">
          <Clock className="w-14 h-14 text-white" />
        </div>
        <p className="text-gray-900 font-bold text-xl">Time & Quantity</p>
        <p className="text-gray-500 text-sm text-center">Learn the American Sign Language time signs</p>
        <span className="bg-blue-50 text-blue-500 text-sm font-medium px-4 py-1 rounded-full">9 Signs</span>
      </CardContent>
    </Card>
  );
}