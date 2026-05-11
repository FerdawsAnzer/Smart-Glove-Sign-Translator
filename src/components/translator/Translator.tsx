import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { saveHistory } from "@/lib/supabase/history";

export default function Translator() {
  const [output, setOutput] = useState("");

  // This runs when a gesture is detected
  const handleGesture = async (gesture: string) => {
    
    // 1. Get meaning from database
    const { data } = await supabase
      .from("gestures")
      .select("meaning")
      .eq("gesture", gesture)
      .single();

    const meaning = data?.meaning || "Unknown";

    // 2. Show result on screen
    setOutput(meaning);

    // 3. Get current logged-in user
    const { data: userData } = await supabase.auth.getUser();

    // 4. Save to history table
    if (userData.user) {
      await saveHistory(
        userData.user.id,
        gesture,
        meaning
      );
    }
  };

  return (
    <div>
      <h1>Smart Glove Translator</h1>

      {/* Output display */}
      <h2>Result: {output}</h2>

      {/* TEST BUTTON (replace later with real glove input) */}
      <button onClick={() => handleGesture("✋")}>
        Test Gesture ✋
      </button>
    </div>
  );
}