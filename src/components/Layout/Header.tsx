import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useAuthStore } from "@/store/authStore";

export function Header() {
  const { user } = useAuthStore();

  const name = user?.fullName || user?.email?.split("@")[0] || "User";

  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <header
      className="w-full h-20 px-6 flex items-center justify-between"
      style={{
        borderBottom: "1px solid #e8eaf6",
        boxShadow: "0 2px 12px rgba(99,102,241,0.08)",
        background: "linear-gradient(135deg, #fafbff 0%, #f8f9ff 100%)",
      }}
    >
      <h1 className="text-lg font-semibold text-gray-800 ml-4">
        Welcome Back,{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {name}
        </span>
      </h1>

      <div className="flex items-center gap-3">
        <Avatar
          className="w-12 h-12 text-white shadow-md"
          style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
        >
          <AvatarFallback className="bg-transparent text-white font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <ChevronDown className="w-5 h-5 text-gray-500" />
      </div>
    </header>
  );
}