import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function SentencesCard() {
  const navigate = useNavigate();

  return (
    <Card
      className="border border-gray-200 shadow-sm w-92 rounded-2xl  cursor-pointer hover:shadow-md transition-shadow duration-300"
      onClick={() => navigate("/learning")}
    >
      {" "}
      {/* will work on the navigation for the card when we click it */}
      {/*Card Content container */}
      <CardContent className="p-0">
        <div className="flex flex-col items-center gap-3 p-4">
          {/* Purple box with message icon */}
          <div className="w-full flex items-center justify-center bg-purple-500 rounded-xl py-8">
            <MessageCircle className="w-14 h-14 text-white" />
          </div>

          {/* middle Title of the card*/}
          <p className="text-gray-900 font-bold text-xl">Sentences</p>

          {/* Description of the card */}
          <p className="text-gray-500 text-sm text-center">
            Useful everyday sentences and expressions
          </p>

          {/* Badge of teh card */}
          <span className="bg-purple-50 text-purple-500 text-sm font-medium px-4 py-1 rounded-full">
            7 Sentences
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
