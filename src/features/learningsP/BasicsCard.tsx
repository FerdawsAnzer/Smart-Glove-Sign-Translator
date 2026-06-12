import { Card, CardContent } from "@/components/ui/card";
import { Hand } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BasicsCard() {
  const navigate = useNavigate();

  return (
    <Card
      className="border border-gray-200 shadow-sm w-92 rounded-2xl cursor-pointer hover:shadow-md transition-shadow duration-300"
      onClick={() => navigate("/learning/basics")}
    >
      <CardContent className="flex flex-col items-center gap-3 p-4">
        <div className="w-full flex items-center justify-center bg-blue-500 rounded-xl py-8">
          <Hand className="w-14 h-14 text-white" />
        </div>
        <p className="text-gray-900 font-bold text-xl">Basics</p>
        <p className="text-gray-500 text-sm text-center">Alphabet, Numbers and Colors</p>
        <span className="bg-blue-50 text-blue-500 text-sm font-medium px-4 py-1 rounded-full">3 Categories</span>
      </CardContent>
    </Card>
  );
}