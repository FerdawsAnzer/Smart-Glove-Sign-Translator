import { Card, CardContent } from "@/components/ui/card";
import type { HistoryCardProps } from "@/Types/historyCardProps";
import { Calendar, Star, Trash2 } from "lucide-react";

export function HistoryCard({ item, onStar, onDelete }: HistoryCardProps) {
  return (
    <Card className="border border-gray-200 shadow-sm rounded-xl">
      <CardContent className="p-4">
        {/* Top row: language + date + actions */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">
              {item.language}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              {item.date}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onStar(item.id)}
              className="p-1 rounded hover:bg-gray-100 transition-colors"
            >
              <Star
                className={`w-4 h-4 ${
                  item.starred
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-1 rounded hover:bg-gray-100 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
            </button>
          </div>
        </div>

        {/* Translation row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">ASL → English</p>
            <p className="text-sm text-gray-800">{item.aslText}</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <p className="text-xs text-blue-400 mb-1">Translation</p>
            <p className="text-sm text-gray-800">{item.translation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
