"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Analysis",
    href: "/Dashboard/Analysis",
    icon: "📈",
    match: "/Dashboard/Analysis",
  },
  {
    label: "Home",
    href: "/Dashboard/Home",
    icon: "🏠",
    match: "/Dashboard/Home",
  },
  {
    label: "Camera",
    href: "/Dashboard/Camera",
    icon: "📷",
    match: "/Dashboard/Camera",
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
                isActive
                  ? "bg-[#232b36] text-[#ffb43a] shadow-md scale-105"
                  : "text-gray-400 hover:text-[#ffb43a] hover:bg-[#232b36]/60"
              }
            `}
            style={{
              minWidth: 70,
            }}
          >
            <span className="text-2xl mb-0.5">{item.icon}</span>
            <span className="text-xs font-semibold tracking-wide">
              {item.label}
            </span>
            {isActive && (
              <span className="block w-2 h-2 mt-1 rounded-full bg-[#ffb43a] shadow" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
