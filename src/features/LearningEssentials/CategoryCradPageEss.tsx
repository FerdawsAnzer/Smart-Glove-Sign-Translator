import { useNavigate } from "react-router-dom";
import { PronounsCard } from "./PronounsCard";
import { TimeCard } from "./TimeCard";

export function CategoryCradPageEss() {
  const navigate = useNavigate();
  return (
    <div className=" w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center py-12 px-6 gap-8 ">
      {/* Main container with light blue background and centered content */}
      {/* Title */}
      <button
        onClick={() => navigate("/learning")}
        className="text-blue-500 text-sm hover:underline self-start"
      >
        ← Back to Categories
      </button>

      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold text-gray-900">
          Learn the Essentials
        </h1>
        <p className="text-gray-500 text-sm">Choose what you'd like to learn</p>
      </div>

      {/* The 2 cards container*/}
      <div className="grid grid-cols-2 gap-6 ">
        <PronounsCard />
        <TimeCard />
      </div>
    </div>
  );
}
