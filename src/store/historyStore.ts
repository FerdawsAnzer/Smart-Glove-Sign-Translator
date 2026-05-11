import { create } from "zustand";
import {
  fetchHistory,
  saveHistory,
  toggleStarred,
  deleteHistory,
} from "@/lib/supabase/history";
import type { HistoryItem } from "@/Types/HistoryItems";

interface HistoryState {
  entries: HistoryItem[];
  loading: boolean;
  fetchHistory: (userId: string) => Promise<void>;
  addEntry: (userId: string, input: string, output: string, language?: string) => Promise<void>;
  toggleStar: (id: string, current: boolean) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  entries: [],
  loading: false,

  fetchHistory: async (userId) => {
    set({ loading: true });
    const data = await fetchHistory(userId);
    set({ entries: data, loading: false });
  },

  addEntry: async (userId, input, output, language = "ASL") => {
    await saveHistory(userId, input, output, language);
    // Re-fetch to get the real UUID and created_at from Supabase
    const data = await fetchHistory(userId);
    set({ entries: data });
  },

  toggleStar: async (id, current) => {
    await toggleStarred(id, !current);
    // Update locally without re-fetching
    set((state) => ({
      entries: state.entries.map((e) =>
        e.id === id ? { ...e, starred: !current } : e
      ),
    }));
  },

  deleteEntry: async (id) => {
    await deleteHistory(id);
    set((state) => ({
      entries: state.entries.filter((e) => e.id !== id),
    }));
  },
}));