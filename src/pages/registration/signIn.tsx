import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "@/assets/Logo.png";
import SideImage from "@/assets/signIn.jpg";
import { supabase } from "@/lib/supabase/client";

type SignInForm = {
  email: string;
  password: string;
};

type Props = {
  onLogin: () => void;
};

export default function SignIn({ onLogin }: Props) {
  const [form, setForm] = useState<SignInForm>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    console.log("LOGIN DATA:", data);
    console.log("LOGIN ERROR:", error);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      onLogin();
      navigate("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden flex">

        {/* LEFT SIDE */}
        <div className="w-1/2 relative hidden md:block">

          <img
            src={SideImage}
            alt="Sign Language"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-white">

            <h2 className="text-2xl font-bold mb-2">
              Connect Without Barriers
            </h2>

            <p className="text-lg">
              Join thousands of users communicating freely with our sign language translation tools.
            </p>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">

          {/* LOGO */}
          <div className="flex flex-col items-center mb-8">

            <img src={Logo} alt="Logo" className="w-20 mb-3" />

            <h1 className="text-xl font-semibold">
              Welcome Back
            </h1>

            <p className="text-gray-500 text-sm">
              Sign in to access your dashboard
            </p>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* EMAIL */}
            <input
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* PASSWORD */}
            <input
              name="password"
              type="password"
              placeholder="Enter Your Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          {/* SIGN UP LINK */}
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/signUp" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}