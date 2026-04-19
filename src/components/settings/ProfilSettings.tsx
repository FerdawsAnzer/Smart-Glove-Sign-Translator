import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { supabase } from "@/lib/supabase/client";

export function ProfileSettings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // LOAD USER
  const loadProfile = async () => {
    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) return;

    setUserId(user.id);
    setEmail(user.email || "");

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle();

    const fullName =
      profile?.full_name ||
      user.user_metadata?.full_name ||
      "";

    const parts = fullName.split(" ");

    setFirstName(parts[0] || "");
    setLastName(parts.slice(1).join(" ") || "");
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // SAVE
  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    const full_name = `${firstName} ${lastName}`.trim();

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: userId,
        full_name,
      });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Profile updated successfully ✅");

      
      await loadProfile();
    }

    setLoading(false);
  };

  const initials =
    (firstName?.[0] || "") + (lastName?.[0] || "") || "U";

  return (
    <div className="space-y-6">

      {/* AVATAR */}
      <div className="flex items-start gap-6">

        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            {initials}
          </div>

          <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Profile Picture</h3>
          <p className="text-sm text-gray-500">
            Upload a photo to personalize your account
          </p>
        </div>

      </div>

      {/* NAME */}
      <div className="grid grid-cols-2 gap-4">

        <div className="space-y-2">
          <Label>First name</Label>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Last name</Label>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

      </div>

      {/* EMAIL */}
      <div className="space-y-2">
        <Label>Email</Label>
        <Input value={email} disabled />
      </div>

      {/* MESSAGE */}
      {message && (
        <p className="text-sm text-gray-600">{message}</p>
      )}

   
     

    </div>
  );
}