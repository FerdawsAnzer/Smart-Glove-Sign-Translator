import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/Logo.png";
import SideImage from "@/assets/signIn.jpg";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "react-i18next";                    
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn, loading } = useAuthStore();
  const { t } = useTranslation(); 
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">

      {/* Language switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden flex">

        {/* LEFT SIDE */}
        <div className="w-1/2 relative hidden md:block">
          <img src={SideImage} alt="Sign Language" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-white">
            <h2 className="text-2xl font-bold mb-2">
              {t("auth.connectTitle")} 
            </h2>
            <p className="text-lg">
              {t("auth.connectDesc")} 
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-8">
            <img src={Logo} alt="Logo" className="w-20 mb-3" />
            <h1 className="text-xl font-semibold">
              {t("auth.welcomeBack")} 
            </h1>
            <p className="text-gray-500 text-sm">
              {t("auth.signInDesc")}
            </p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder={t("auth.email")} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="password"
              placeholder={t("auth.password")} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white py-3 rounded-md btn-primary transition disabled:opacity-50"
            >
              {loading ? t("auth.signingIn") : t("auth.signIn")} 
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            {t("auth.noAccount")}{" "}
            <Link to="/signUp" className="text-blue-600 hover:underline">
              {t("sign Up")}
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}