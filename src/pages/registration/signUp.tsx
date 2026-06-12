import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authImage from "@/assets/signUP.jpg";
import Logo from "@/assets/Logo.png";
import { supabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "react-i18next";                  
import { LanguageSwitcher } from "@/components/LanguageSwitcher";  

export default function SignUp() {
  const navigate = useNavigate();
  const { t } = useTranslation(); 

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isWeakPassword = password.length > 0 && password.length < 6;
  const { updateFullName } = useAuthStore();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(t("auth.passwordsNoMatch")); 
      return;
    }
    if (password.length < 6) {
      setError(t("auth.passwordTooShort")); 
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const { data: sessionData } = await supabase.auth.getSession();

    if (sessionData.session) {
      await supabase.from("profiles").upsert({
        id: sessionData.session.user.id,
        full_name: name,
        avatar_url: null,
      });
      await useAuthStore.getState().fetchUser();
      updateFullName(name);
      setLoading(false);
      navigate("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">

      {/* Language switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden flex">

        {/* LEFT */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="w-full max-w-md">

            <div className="flex flex-col items-center mb-6">
              <img src={Logo} className="w-20 mb-2" />
              <h1 className="text-2xl font-semibold">
                {t("auth.welcomeTo")} <span className="text-blue-600 font-bold">SignBridge</span> {/* ✅ */}
              </h1>
            </div>

            <h2 className="text-2xl font-semibold mb-1">
              {t("auth.createAccount")} {/* ✅ */}
            </h2>
            <p className="text-gray-500 mb-6">
              {t("auth.startTranslating")} {/* ✅ */}
            </p>

            {error && (
              <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder={t("auth.fullName")} 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-md p-3 input-gradient"
              />
              <input
                type="email"
                placeholder={t("auth.email")} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md p-3 input-gradient"
              />
              <input
                type="password"
                placeholder={t("auth.password")} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full border rounded-md p-3  input-gradient ${isWeakPassword ? "border-red-500" : ""}`}
              />
              {isWeakPassword && (
                <p className="text-red-500 text-sm">
                  {t("auth.passwordTooShort")} 
                </p>
              )}
              <input
                type="password"
                placeholder={t("auth.confirmPassword")} 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-md p-3 input-gradient"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white py-3 rounded-md btn-primary transition disabled:opacity-50"
              >
                {loading ? t("auth.creating") : t("auth.signUp")} 
              </button>
              <p className="text-sm text-gray-500 mt-4 text-center">
                {t("auth.hasAccount")}{" "}
                <span
                  className="text-blue-600 cursor-pointer ml-1"
                  onClick={() => navigate("/signIn")} 
                >
                  {t("auth.signIn")}
                </span>
              </p>
            </form>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-1/2 hidden md:block relative">
          <img src={authImage} className="absolute w-full h-full object-cover" />
          <div className="absolute bottom-6 left-6 text-white max-w-sm">
            <p className="text-lg font-semibold leading-snug">
              {t("auth.breakBarriers")} 
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}