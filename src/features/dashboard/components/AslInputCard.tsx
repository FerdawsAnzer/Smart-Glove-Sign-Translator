import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGloveConnection } from "@/hooks/useGloveConnection";
import { Hand } from "lucide-react";

export function AslInputCard() {
  const { connected, connect, disconnect } = useGloveConnection();

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-900">
          <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-600">
            <Hand className="w-6 h-6 text-white" />
          </span>
          ASL Input
        </CardTitle>
        <CardAction>
          <Button className="bg-teal-400 hover:bg-teal-500 text-white font-medium px-5 py-2 rounded-lg">
            Start Glove
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center justify-center gap-4 bg-blue-50 rounded-xl py-12 border border-blue-100">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600">
            <Hand className="w-7 h-7 text-white" />
          </div>
          <p className="text-gray-500 text-sm">Ready To start Translating</p>
          <Button
            onClick={connected ? disconnect : connect}
            className={`${
              connected
                ? "bg-red-400 hover:bg-red-500"
                : "bg-teal-400 hover:bg-teal-500"
            } text-white font-medium px-5 py-2 rounded-lg`}
          >
            {connected ? "Disconnect" : "Connect Glove"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
