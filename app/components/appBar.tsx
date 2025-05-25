"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Camera, Bell, LineChart } from "lucide-react";

const navItems = [
  {
    label: "Home", // Home
    href: "/Dashboard/Home",
    icon: <Home className="w-6 h-6" />,
    match: "/Dashboard/Home",
  },
  {
    label: "Camera", // Disease
    href: "/Dashboard/Camera",
    icon: <Camera className="w-7 h-7" />,
    match: "/Dashboard/Camera",
    highlight: true,
  },
  {
    label: "Analysis", // Analysis
    href: "/Dashboard/Analysis",
    icon: <LineChart className="w-6 h-6" />,
    match: "/Dashboard/Analysis",
  },
];

export default function AppBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xs bg-gradient-to-t from-[#181f27] to-[#232b36] border-t border-[#232b36] flex justify-around items-center h-18 z-20 shadow-xl rounded-t-2xl">
      {navItems.map((item) => {
        const isActive = pathname === item.match;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200
              ${
                isActive && item.highlight
                  ? "relative"
                  : isActive
                  ? "bg-[#232b36] text-[#ffb43a] shadow-md scale-105"
                  : "text-gray-400 hover:text-[#ffb43a] hover:bg-[#232b36]/60"
              }
            `}
            style={{
              minWidth: 70,
            }}
          >
            <span
              className={`mb-0.5 flex items-center justify-center ${
                isActive && item.highlight
                  ? "bg-[#ffb43a] text-[#181f27] rounded-full p-2 shadow-lg"
                  : isActive
                  ? "text-[#ffb43a]"
                  : ""
              }`}
              style={
                isActive && item.highlight
                  ? { boxShadow: "0 0 16px 4px #ffb43a55" }
                  : undefined
              }
            >
              {item.icon}
            </span>
            <span
              className={`text-xs font-semibold tracking-wide ${
                isActive && item.highlight
                  ? "text-[#ffb43a]"
                  : isActive
                  ? "text-[#ffb43a]"
                  : ""
              }`}
            >
              {item.label}
            </span>
            {isActive && !item.highlight && (
              <span className="block w-2 h-2 mt-1 rounded-full bg-[#ffb43a] shadow" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
