import { supabase } from "./client";
import type { HistoryItem } from "@/Types/HistoryItems";

// Save a new translation
export const saveHistory = async (
  userId: string,
  input: string,
  output: string,
  language: string = "ASL"
) => {
  console.log("saveHistory called:", { userId, input, output, language }); // ✅ debug

  const result = await supabase.from("history").insert([
    { user_id: userId, input, output, language, starred: false },
  ]);

  console.log("supabase insert result:", result); // ✅ debug
  return result;
};

// Fetch all history for a user
export const fetchHistory = async (userId: string): Promise<HistoryItem[]> => {
  const { data, error } = await supabase
    .from("history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  console.log("FETCH HISTORY - userId:", userId); // ✅ debug
  console.log("FETCH HISTORY - data:", data);     // ✅ debug
  console.log("FETCH HISTORY - error:", error);   // ✅ debug

  if (error || !data) return [];

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
};