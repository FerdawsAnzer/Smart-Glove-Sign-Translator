import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authImage from "@/assets/signUP.jpg";
import Logo from "@/assets/Logo.png";
import { supabase } from "@/lib/supabase/client";

type Props = {
  onLogin: () => void;
};

export default function SignUp({ onLogin }: Props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isWeakPassword = password.length > 0 && password.length < 6;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    if (user) {
      // upsert prevents duplicates
      await supabase.from("profiles").upsert({
        id: user.id,
        full_name: name,
        avatar_url: null,
      });

      onLogin();
      navigate("/dashboard");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden flex">

        {/* LEFT */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="w-full max-w-md">

            <div className="flex flex-col items-center mb-6">
              <img src={Logo} className="w-20 mb-2" />
              <h1 className="text-2xl font-semibold">
                Welcome to <span className="text-blue-600 font-bold">SignBridge</span>
              </h1>
            </div>

            <h2 className="text-2xl font-semibold mb-1">
              Create an account
            </h2>

            <p className="text-gray-500 mb-6">
              Start translating sign language today
            </p>

            {error && (
              <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-md p-3"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md p-3"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full border rounded-md p-3 ${
                  isWeakPassword ? "border-red-500" : ""
                }`}
              />

              {isWeakPassword && (
                <p className="text-red-500 text-sm">
                  Password must be at least 6 characters
                </p>
              )}

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-md p-3"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-md"
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>

            </form>

          </div>
        </div>

        {/* RIGHT */}
        <div className="w-1/2 hidden md:block relative">
          <img src={authImage} className="absolute w-full h-full object-cover" />
        </div>

      </div>
    </div>
  );
}