"use client";
import React, { useEffect, useState } from "react";
import Welcome from "../components/Welcome";
import { useSearchParams } from "next/navigation";
import { UserData, generateRandomDataInterval } from "../data";
import { getOverallStatus } from "../lib/fishMonitoring";

const Page = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const userData = UserData.find((user) => user.email === email);

  const [readings, setReadings] = useState({
    temp: "0",
    dissolvedOxygen: "0",
    pH: "0",
    turbidity: "0",
  });
  const [status, setStatus] = useState<{ status: string; warnings: string[] }>({ status: "optimal", warnings: [] });

  useEffect(() => {
    const interval = generateRandomDataInterval((newData) => {
      setReadings(newData);
      if (userData) {
        // Convert string values to numbers for monitoring
        const numericReadings = {
          temperature: parseFloat(newData.temp),
          dissolvedOxygen: parseFloat(newData.dissolvedOxygen),
          pH: parseFloat(newData.pH),
          turbidity: parseFloat(newData.turbidity),
        };

        // Get status based on fish species
        const newStatus = getOverallStatus(
          numericReadings,
          userData.fishSpecies as "Trout" | "Carp"
        );
        setStatus(newStatus);
      }
    });

    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [userData]);

  if (!userData) {
    return <div className="text-white p-4">User not found</div>;
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <Welcome userEmail={email} />

      {/* Simple Status Display */}
      <div className="rounded-2xl bg-[#1e2630] p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-[#ffb43a]">
            {userData.fishSpecies} Parameters
          </h2>
          <span
            className={`px-3 py-1 rounded-full ${
              status.status === "optimal"
                ? "bg-green-500/20 text-green-400"
                : status.status === "good"
                ? "bg-blue-500/20 text-blue-400"
                : status.status === "poor"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {status.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Readings Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-[#1e2630] rounded-2xl">
          <p className="text-gray-400 mb-1">Temperature</p>
          <p className="text-2xl text-white">{readings.temp}°C</p>
        </div>
        <div className="p-4 bg-[#1e2630] rounded-2xl">
          <p className="text-gray-400 mb-1">Oxygen</p>
          <p className="text-2xl text-white">{readings.dissolvedOxygen} mg/L</p>
        </div>
        <div className="p-4 bg-[#1e2630] rounded-2xl">
          <p className="text-gray-400 mb-1">pH Level</p>
          <p className="text-2xl text-white">{readings.pH}</p>
        </div>
        <div className="p-4 bg-[#1e2630] rounded-2xl">
          <p className="text-gray-400 mb-1">Turbidity</p>
          <p className="text-2xl text-white">{readings.turbidity} cm</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
