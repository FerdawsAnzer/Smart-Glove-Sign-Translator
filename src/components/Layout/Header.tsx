import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { supabase } from "@/lib/supabase/client";

export function Header() {
  const [name, setName] = useState("User");

  const loadUser = async () => {
    const { data: authData } = await supabase.auth.getUser();
    const user = authData.user;

    if (!user) {
      setName("User");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle();

    const fullName =
      profile?.full_name ||
      user.user_metadata?.full_name ||
      "User";

    setName(fullName);
  };

  useEffect(() => {
    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    // ✅ FIXED: instant update from Settings
    const refresh = (e: any) => {
      if (e.detail?.full_name) {
        // 🔥 instant UI update (no DB call)
        setName(e.detail.full_name);
      } else {
        // fallback
        loadUser();
      }
    };

    window.addEventListener("profileUpdated", refresh);

    return () => {
      listener.subscription.unsubscribe();
      window.removeEventListener("profileUpdated", refresh);
    };
  }, []);

  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <header className="w-full h-20 border rounded-xl px-6 flex items-center justify-between bg-white shadow-sm">
      
      <h1 className="text-lg font-semibold text-gray-800 ml-4">
        Welcome Back, <span className="text-blue-600">{name}</span>
      </h1>

      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md">
          <AvatarFallback className="bg-transparent text-white font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <ChevronDown className="w-5 h-5 text-gray-500" />
      </div>

    </header>
  );
}