import { supabase } from "./client";


export const getMeaning = async (gesture: string) => {
  return await supabase
    .from("gestures")
    .select("meaning")
    .eq("gesture", gesture)
    .single();
};