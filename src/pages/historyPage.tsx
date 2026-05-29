import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; 
import { HistoryCard } from "@/features/history/Components/historyCrad";
import { HistorySearchBar } from "@/features/history/Components/HistorySearshBar";
import { useHistoryStore } from "@/store/historyStore";
import { useAuthStore } from "@/store/authStore";
import type { HistoryItem } from "@/Types/HistoryItems";

export function HistoryPage() {
  const [search, setSearch] = useState("");
  const { t } = useTranslation(); 
  const { user } = useAuthStore();
  const { entries, loading, fetchHistory, toggleStar, deleteEntry } = useHistoryStore();

  useEffect(() => {
    if (user) fetchHistory(user.id);
  }, [user]);

  const filtered = entries.filter(
    (item: HistoryItem) =>
      item.aslText.toLowerCase().includes(search.toLowerCase()) ||
      item.translation.toLowerCase().includes(search.toLowerCase()) ||
      item.language.toLowerCase().includes(search.toLowerCase())
  );
  

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("history.title")}</h1>
          <p className="text-gray-500 text-sm mt-1">{t("history.subtitle")}</p>
        </div>

        <HistorySearchBar search={search} onSearch={setSearch} />

        {loading && <p className="text-gray-400 text-sm text-center">{t("history.loading")}</p>}
        {!loading && filtered.length === 0 && <p className="text-gray-400 text-sm text-center">{t("history.noResults")}</p>}

        <div className="flex flex-col gap-3">
          {filtered.map((item: HistoryItem) => (
            <HistoryCard
              key={item.id}
              item={item}
              onStar={(id) => toggleStar(id, item.starred)}
              onDelete={deleteEntry}
            />
          ))}
        </div>
      </div>
    </div>
  );
}