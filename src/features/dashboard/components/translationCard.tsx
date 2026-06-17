import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { copy, speak } from "@/utils/speech";
import { Volume2, Copy } from "lucide-react";
import type { TranslationCardProps } from "src/Types/glove";
import { LiveInterpretationBadge } from "./LiveInterpretationBadge";

export function TranslationCard({ translation }: TranslationCardProps) {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Translation
        </CardTitle>
        <span className="mr-8">
          <LiveInterpretationBadge />
        </span>
      </CardHeader>

      <CardContent>
        <div className="min-h-36 bg-blue-50 rounded-xl border border-blue-100 p-4">
          {translation ? (
            <p className="text-gray-800 text-sm">{translation}</p>
          ) : (
            <p className="text-gray-400 text-sm">
              Translation will appear here...
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-3 pt-2">
        <Button
          onClick={() => speak(translation)}
          disabled={!translation}
          className="flex-1 bg-blue-300 hover:bg-blue-400 text-white font-medium rounded-lg flex items-center gap-2"
        >
          <Volume2 className="w-4 h-4" />
          Speak
        </Button>
        <Button
          onClick={() => copy(translation)}
          disabled={!translation}
          variant="outline"
          size="icon"
          className="border border-gray-200 text-gray-500 hover:bg-gray-50 rounded-lg"
        >
          <Copy className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
