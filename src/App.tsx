// src/pages/registration/signIn.tsx
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";

type Props = {
  onLogin: () => void;
};

export default function SignIn({ onLogin }: Props) {
  const [form, setForm] = useState({ email: "", password: "", remember: false });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Sign in data:", form);
    onLogin(); // ✅ trigger login state
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      {/* Your full SignIn JSX */}
    </div>
  );
}