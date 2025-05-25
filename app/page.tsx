"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleFishSelect = (fishType: "Trout" | "Carp") => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fishType", fishType);
    }
    router.push("/Dashboard/Home");
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold text-[#ffb43a]">Select Fish Type</h1>
      <div className="grid gap-4 w-full">
        <button
          onClick={() => handleFishSelect("Trout")}
          className="p-6 bg-[#1e2630] rounded-2xl border border-[#232b36] hover:border-[#ffb43a] transition-colors"
        >
          <h2 className="text-xl font-semibold text-white mb-2">Trout 🐟</h2>
          <p className="text-sm text-gray-400">Optimal temp: 10-15°C</p>
        </button>

        <button
          onClick={() => handleFishSelect("Carp")}
          className="p-6 bg-[#1e2630] rounded-2xl border border-[#232b36] hover:border-[#ffb43a] transition-colors"
        >
          <h2 className="text-xl font-semibold text-white mb-2">Carp 🎣</h2>
          <p className="text-sm text-gray-400">Optimal temp: 28-32°C</p>
        </button>
      </div>
    </div>
  );
}
