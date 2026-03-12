import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "@/assets/Logo.png"; 
import SideImage from "@/assets/signIn.jpg"; 

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
  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

 function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  console.log("Sign in data:", form);

  onLogin(); // update login state
  navigate("/dashboard"); // redirect to dashboard
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">

      {/* Container */}
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

            <p className="text-1.5xl leading-relaxed">
              Join thousands of users communicating freely with our advanced
              sign language translation tools.
            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">

          {/* Logo */}
          <div className="flex flex-col items-center mb-40">

            <img src={Logo} alt="Logo" className="w-20 mb-1" />

            <h1 className="text-xl font-semibold ">
              Welcome Back
            </h1>

            <p className="text-gray-500 text-sm ">
              Sign in to access your dashboard
            </p>

          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>

              <label className="block text-sm mb-1">
                Email Address
              </label>

              <input
                name="email"
                type="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm mb-1">
                Password
              </label>

              <input
                name="password"
                type="password"
                placeholder="Enter Your Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>


            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
              Sign In
            </button>

          </form>

          {/* Sign up to link */}
          <p className="text-center text-sm mt-4">

            Don't have an account?{" "}

            <Link
              to="/signUp"
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}