import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function VerbsCard() {
  const navigate = useNavigate();
  return (
    <Card
      className="border border-gray-200 shadow-sm w-92 rounded-2xl cursor-pointer hover:shadow-md transition-shadow duration-300"
      onClick={() => navigate("/learning/words/verbs")}
    >
      <CardContent className="flex flex-col items-center gap-3 p-4">
        <div className="w-full flex items-center justify-center bg-orange-300 rounded-xl py-8">
          <Zap className="w-14 h-14 text-white" />
        </div>
        <p className="text-gray-900 font-bold text-xl">Verbs</p>
        <p className="text-gray-500 text-sm text-center">Learn and Master Basic Verbs in American Sign Language</p>
        <span className="bg-blue-50 text-blue-500 text-sm font-medium px-4 py-1 rounded-full">5 Verbs</span>
      </CardContent>
    </Card>
  );
}