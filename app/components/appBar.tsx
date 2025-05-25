"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function AppBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fishType = searchParams.get("fish");

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xs bg-[#181f27] border-t border-[#232b36] flex justify-around items-center h-16 z-10">
      <Link
        href={`/Analysis?fish=${fishType}`}
        className={`flex flex-col items-center ${
          pathname === "/Analysis" ? "text-[#ffb43a]" : "text-gray-400"
        } hover:text-[#ffb43a] text-xs transition-colors`}
      >
        <span className="text-xl mb-1">📈</span>
        Analysis
      </Link>
      <Link
        href={`/home?fish=${fishType}`}
        className={`flex flex-col items-center ${
          pathname === "/home" ? "text-[#ffb43a]" : "text-gray-400"
        } hover:text-[#ffb43a] text-xs transition-colors`}
      >
        <span className="text-xl mb-1">🏠</span>
        Home
      </Link>
      <Link
        href={`/camera?fish=${fishType}`}
        className={`flex flex-col items-center ${
          pathname === "/camera" ? "text-[#ffb43a]" : "text-gray-400"
        } hover:text-[#ffb43a] text-xs transition-colors`}
      >
        <span className="text-xl mb-1">📷</span>
        Camera
      </Link>
    </nav>
  );
}
