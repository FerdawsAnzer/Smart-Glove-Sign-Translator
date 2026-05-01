import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe, Volume2, Copy } from "lucide-react";
import type { TranslationCardProps } from "src/Types/glove";

export function TranslationCard({ translation }: TranslationCardProps) {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Translation
        </CardTitle>
        <Select defaultValue="english">
          <SelectTrigger className="w-40 rounded-full border border-gray-300 text-sm text-gray-700 gap-2">
            <Globe className="w-4 h-4 text-gray-500" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-md rounded-lg">
            <SelectItem
              value="english"
              className="text-black hover:bg-gray-100"
            >
              English
            </SelectItem>
            <SelectItem
              value="spanish"
              className="text-black hover:bg-gray-100"
            >
              Spanish
            </SelectItem>
            <SelectItem value="french" className="text-black hover:bg-gray-100">
              French
            </SelectItem>
            <SelectItem value="german" className="text-black hover:bg-gray-100">
              German
            </SelectItem>
            <SelectItem value="german" className="text-black hover:bg-gray-100">
              German
            </SelectItem>
            <SelectItem value="german" className="text-black hover:bg-gray-100">
              German
            </SelectItem>
            <SelectItem value="german" className="text-black hover:bg-gray-100">
              German
            </SelectItem>
            <SelectItem value="german" className="text-black hover:bg-gray-100">
              German
            </SelectItem>
            <SelectItem value="german" className="text-black hover:bg-gray-100">
              German
            </SelectItem>
          </SelectContent>
        </Select>
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
        <Button className="flex-1 bg-blue-300 hover:bg-blue-400 text-white font-medium rounded-lg flex items-center gap-2">
          <Volume2 className="w-4 h-4" />
          Speak
        </Button>
        <Button
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
