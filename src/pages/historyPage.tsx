import { HistoryCard } from "@/features/history/Components/historyCrad";
import type { HistoryItem } from "@/Types/HistoryItems";
import { historyData } from "@/Data/HistoryData";
import { useState } from "react";
import { HistorySearchBar } from "@/features/history/Components/HistorySearshBar";

export function HistoryPage() {
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>(historyData);

  const toggleStar = (id: number) => {
    setHistory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, starred: !item.starred } : item,
      ),
    );
  };

  const deleteItem = (id: number) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const filtered = history.filter(
    (item) =>
      item.aslText.toLowerCase().includes(search.toLowerCase()) ||
      item.translation.toLowerCase().includes(search.toLowerCase()) ||
      item.language.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Translation History
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            View and manage your past translations
          </p>
        </div>

        {/* Search Bar */}
        <HistorySearchBar search={search} onSearch={setSearch} />

        {/* Cards */}
        <div className="flex flex-col gap-3">
          {filtered.map((item) => (
            <HistoryCard
              key={item.id}
              item={item}
              onStar={toggleStar}
              onDelete={deleteItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
