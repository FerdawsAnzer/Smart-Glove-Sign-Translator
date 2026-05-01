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
    .from("history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
};