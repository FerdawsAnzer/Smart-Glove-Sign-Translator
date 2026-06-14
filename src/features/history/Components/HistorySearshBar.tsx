import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { HistorySearchBarProps } from "@/Types/HistorySearshBarProps";
import { Download, Filter, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export function HistorySearchBar({ search, onSearch }: HistorySearchBarProps) {
  const { t } = useTranslation();
  return (
    <Card
      className="rounded-xl border-0"
      style={{ boxShadow: "0 2px 12px rgba(99,102,241,0.08)" }}
    >
      <CardContent className="p-4 flex items-center gap-3">

        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "#8b5cf6" }} 
          />
          <Input
            placeholder={t("history.search")}
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-9 rounded-lg bg-white"
            style={{
              border: "1px solid #e8eaf6",        
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.border = "1px solid #8b5cf6"; 
              e.target.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.1)";
            }}
            onBlur={(e) => {
              e.target.style.border = "1px solid #e8eaf6";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Filter button */}
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-lg"
          style={{
            border: "1px solid #e8eaf6",
            color: "#6366f1",             
            background: "#fafbff",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "linear-gradient(135deg, #eff6ff, #f5f3ff)";
            el.style.borderColor = "#8b5cf6";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = "#fafbff";
            el.style.borderColor = "#e8eaf6";
          }}
        >
          <Filter className="w-4 h-4" /> {t("history.all")}
        
        </Button>

        {/* Export button */}
        <Button
          className="flex items-center gap-2 rounded-lg text-white border-0"
          style={{
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", // ✅ gradient
            boxShadow: "0 2px 8px rgba(99,102,241,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.9";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <Download className="w-4 h-4" />{t("history.export")}
          
        </Button>

      </CardContent>
    </Card>
  );
}