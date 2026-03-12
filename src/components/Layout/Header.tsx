import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Header() {
  return (
    <header className="w-full max-w-full h-20 border border-blue-200 rounded-xl px-4 py-3 flex items-center justify-between bg-white">
      {
        /* Left side -here we need teh userName depends on teh authentication  */
        <h1 className="text-xl font-semibold ml-8"> Welcome Back , User</h1>
      }
      <div />

      {/* Right side - avatar + chevron */}
      <div className="flex items-center gap-2">
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </div>
    </header>
  );
}
