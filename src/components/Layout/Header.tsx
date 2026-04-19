import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { supabase } from "@/lib/supabase/client";

export function Header() {
  const [name, setName] = useState("User");

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();

      const user = data.user;

      if (!user) {
        setName("User");
        return;
      }

      // 1. try profiles table
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();

      // 2. fallback to auth metadata (IMPORTANT FIX)
      const fullName =
        profile?.full_name ||
        user.user_metadata?.full_name ||
        "User";

      setName(fullName);
    };

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      () => {
        loadUser();
      }
    );

    return () => {
      listener.subscription.unsubscribe();
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
    <header className="w-full h-20 border rounded-xl px-4 flex items-center justify-between bg-white">
      <h1 className="text-xl font-semibold ml-8">
        Welcome Back, {name}
      </h1>

      <div className="flex items-center gap-2">
        <Avatar className="w-12 h-12">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <ChevronDown className="w-5 h-5 text-gray-400" />
      </div>
    </header>
  );
}