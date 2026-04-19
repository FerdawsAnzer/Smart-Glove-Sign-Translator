import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { supabase } from "@/lib/supabase/client";

export function Header() {
  const [name, setName] = useState("User");

  const loadUser = async () => {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    const user = authData.user;

    if (authError || !user) {
      setName("User");
      return;
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("user_id", user.id)
      .single(); // ✅ FIX: ensures correct row

    if (error || !profile) {
      console.log("Profile fetch error:", error);
      setName("User");
      return;
    }

    setName(profile.full_name || "User");
  };

  useEffect(() => {
    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadUser(); // ✅ no timeout needed
    });

    const refresh = () => {
      loadUser();
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
      
      {/* Left text */}
      <h1 className="text-lg font-semibold text-gray-800 ml-4">
        Welcome Back, <span className="text-blue-600">{name}</span>
      </h1>

      {/* Right section */}
      <div className="flex items-center gap-3">

        {/* Avatar (colored + modern) */}
        <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md cursor-pointer hover:scale-105 transition">
          <AvatarFallback className="bg-transparent text-white font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <ChevronDown className="w-5 h-5 text-gray-500 cursor-pointer" />

      </div>

    </header>
  );
}