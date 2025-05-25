import { UserData } from "../lib/data";

interface WelcomeProps {
  userEmail: string;
}

export default function Welcome({ userEmail }: WelcomeProps) {
  // Find the user by email
  const user = UserData.find((u) => u.email === userEmail);

  // Hardcoded stats for now
  const alarms = 4;
  const warnings = 1;
  const checks = 3;

  return (
    <div className="rounded-2xl bg-[#1e2630] p-4 mb-4 flex flex-col gap-2 shadow">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-300">Welcome Back</div>
          <div className="text-2xl font-bold text-[#ffb43a]">
            {user ? user.name : "User"}
          </div>
        </div>
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User"
          className="w-10 h-10 rounded-full border-2 border-[#232b36] object-cover"
        />
      </div>
      <div className="flex justify-between mt-2">
        <div className="flex flex-col items-center">
          <span className="text-[#ffb43a] text-lg">
            <svg width="24" height="24" fill="none">
              <path
                d="M12 3v2M6.22 6.22l-1.42 1.42M3 12h2m1.22 5.78l1.42 1.42M12 21v-2m5.78-1.22l1.42-1.42M21 12h-2m-1.22-5.78l-1.42-1.42"
                stroke="#ffb43a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8v4l3 3"
                stroke="#ffb43a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-white text-base font-semibold">{alarms}</span>
          <span className="text-xs text-gray-400">Alarms</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[#ff5e5e] text-lg">
            <svg width="24" height="24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#ff5e5e" strokeWidth="2" />
              <path
                d="M12 8v4"
                stroke="#ff5e5e"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="16" r="1" fill="#ff5e5e" />
            </svg>
          </span>
          <span className="text-white text-base font-semibold">{warnings}</span>
          <span className="text-xs text-gray-400">Warnings</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[#3ecf8e] text-lg">
            <svg width="24" height="24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#3ecf8e" strokeWidth="2" />
              <path
                d="M8 12l3 3 5-5"
                stroke="#3ecf8e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-white text-base font-semibold">{checks}</span>
          <span className="text-xs text-gray-400">Checks</span>
        </div>
      </div>
    </div>
  );
}
