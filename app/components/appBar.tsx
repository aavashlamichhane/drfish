export default function AppBar() {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xs bg-[#181f27] border-t border-[#232b36] flex justify-around items-center h-16 z-10">
      <a
        href="/analysis"
        className="flex flex-col items-center text-gray-400 hover:text-[#ffb43a] text-xs transition-colors"
      >
        <span className="text-xl mb-1">📈</span>
        Analysis
      </a>
      <a
        href="/"
        className="flex flex-col items-center text-[#ffb43a] text-xs transition-colors"
      >
        <span className="text-xl mb-1">🏠</span>
        Home
      </a>
      <a
        href="/camera"
        className="flex flex-col items-center text-gray-400 hover:text-[#ffb43a] text-xs transition-colors"
      >
        <span className="text-xl mb-1">📷</span>
        Camera
      </a>
    </nav>
  );
}
