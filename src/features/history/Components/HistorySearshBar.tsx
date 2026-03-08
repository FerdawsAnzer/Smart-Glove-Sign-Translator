import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { HistorySearchBarProps } from "@/Types/HistorySearshBarProps";
import { Download, Filter, Search } from "lucide-react";

export function HistorySearchBar({ search, onSearch }: HistorySearchBarProps) {
  return (
    <Card className="border border-gray-200 shadow-sm rounded-xl">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search translations..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-9 border-gray-200 bg-white rounded-lg"
          />
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2 border-gray-200 text-gray-600"
        >
          <Filter className="w-4 h-4" />
          All
        </Button>
        <Button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </CardContent>
    </Card>
  );
}
