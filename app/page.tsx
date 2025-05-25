"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserData } from "./data";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    const user = UserData.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      setError("Invalid email or password.");
      return;
    }
    setError("");
    // Pass email as query param to Home
    router.push(`/home?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#181f27]">
      <form
        onSubmit={handleLogin}
        className="bg-[#232b36] p-8 rounded-2xl shadow-lg w-full max-w-xs flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center text-[#ffb43a] mb-2">
          Login
        </h1>
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded bg-[#181f27] text-white border border-[#232b36] focus:outline-none focus:ring-2 focus:ring-[#ffb43a]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 rounded bg-[#181f27] text-white border border-[#232b36] focus:outline-none focus:ring-2 focus:ring-[#ffb43a]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <div className="text-red-400 text-sm text-center">{error}</div>
        )}
        <button
          type="submit"
          className="bg-[#ffb43a] text-[#181f27] font-semibold py-2 rounded hover:bg-[#ffcb6b] transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
