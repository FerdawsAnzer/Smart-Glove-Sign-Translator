import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function WordsCard() {
  const navigate = useNavigate();

  return (
    <Card
      className="border border-gray-200 shadow-sm w-92 rounded-2xl cursor-pointer hover:shadow-md transition-shadow duration-300 "
      onClick={() => navigate("/learning/SocialWordLearningPage")}
    >
      {/* when you clik teh card will navigate you to the learning Greetings Page*/}

      {/* Card Content container */}
      <CardContent className="flex flex-col items-center gap-3 p-4">
        {/* purple box with MessageCircle  icon */}
        <div className="w-full flex items-center justify-center bg-purple-400 rounded-xl py-8">
          <MessageCircle className="w-14 h-14 text-white" />
        </div>

        {/* middle Title of card*/}
        <p className="text-gray-900 font-bold text-xl">Words</p>

        {/* Description of card */}
        <p className="text-gray-500 text-sm text-center">
          Learn Everyday Social Words in American Sign Language
        </p>

        {/* Badge */}
        <span className="bg-blue-50 text-blue-500 text-sm font-medium px-4 py-1 rounded-full">
          10 Words
        </span>
      </CardContent>
    </Card>
  );
}
