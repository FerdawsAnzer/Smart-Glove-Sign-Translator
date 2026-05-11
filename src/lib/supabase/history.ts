<<<<<<< HEAD
import { supabase } from "./client"; 

export const saveTranslation = async (
  userId: string,
  input: string,
  output: string
) => {
  return await supabase.from("history").insert([
    {
      user_id: userId,
      input,
      output,
    },
  ]);
};

export const getHistory = async (userId: string) => {
  return await supabase
=======
import { supabase } from "./client";
import type { HistoryItem } from "@/Types/HistoryItems";

// Save a new translation
export const saveHistory = async (
  userId: string,
  input: string,
  output: string,
  language: string = "ASL"
) => {
  return await supabase.from("history").insert([
    { user_id: userId, input, output, language, starred: false },
  ]);
};

// Fetch all history for a user — mapped to HistoryItem shape
export const fetchHistory = async (userId: string): Promise<HistoryItem[]> => {
  const { data, error } = await supabase
>>>>>>> supabase
    .from("history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
<<<<<<< HEAD
=======

  if (error || !data) return [];

  // ✅ Map Supabase columns → HistoryItem fields your UI expects
  return data.map((row) => ({
    id: row.id,
    aslText: row.input,
    translation: row.output,
    language: row.language ?? "ASL",
    starred: row.starred ?? false,
    date: new Date(row.created_at).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));
};

// Toggle starred
export const toggleStarred = async (id: string, starred: boolean) => {
  return await supabase
    .from("history")
    .update({ starred })
    .eq("id", id);
};

// Delete a history entry
export const deleteHistory = async (id: string) => {
  return await supabase.from("history").delete().eq("id", id);
>>>>>>> supabase
};