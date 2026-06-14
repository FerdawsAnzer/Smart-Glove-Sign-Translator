import { useEffect, useState } from "react";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/lib/supabase/client";
import { useTranslation } from "react-i18next"; 
import { toast } from "sonner"; 

export function ProfileSettings() {
  const { user } = useAuthStore();
  const { t } = useTranslation(); 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const loadProfile = async () => {
    if (!user) return;
    setEmail(user.email || "");
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle();
    const fullName = profile?.full_name || "";
    const parts = fullName.split(" ");
    setFirstName(parts[0] || "");
    setLastName(parts.slice(1).join(" ") || "");
  };

  useEffect(() => {
    if (user) loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    const full_name = `${firstName} ${lastName}`.trim();
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, full_name });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t("toast.profileSaved")); 
      window.dispatchEvent(new CustomEvent("profileUpdated", { detail: { full_name } }));
      await loadProfile();
    }
    setLoading(false);
  };

  const handleCancel = () => {
    loadProfile();
    toast.info(t("toast.profileCancelled")); 
  };

  const initials = (firstName?.[0] || "") + (lastName?.[0] || "") || "U";

  return (
    <div className="space-y-6">

      {/* AVATAR */}
      <div className="flex items-start gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            {initials}
          </div>
         
        </div>
        <div>
          <h3 className="text-lg font-semibold"> {t("header.welcome")}, {firstName || user?.email}!</h3> 

        </div>
      </div>

      {/* NAME */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t("profile.firstName")}</Label> 
          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>{t("profile.lastName")}</Label> 
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
      </div>

      {/* EMAIL */}
      <div className="space-y-2">
        <Label>{t("profile.email")}</Label> 
        <Input value={email} disabled />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
        <button
          onClick={handleCancel}
          className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
        >
          {t("profile.cancel")} 
        </button>
        
<button
  onClick={handleSave}
  disabled={loading}
  className="px-4 py-2 text-white rounded-lg disabled:opacity-50 border-0"
  style={{
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
  }}
>
  {loading ? "..." : t("profile.save")}
</button>
      </div>
    </div>
  );
}