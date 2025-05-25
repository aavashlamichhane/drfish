"use client";
import React, { useEffect, useState } from "react";
import { generateRandomDataInterval } from "../../lib/data";
import { getOverallStatus } from "../../lib/fishMonitoring";
import Weather from "../../components/Weather";
import Welcome from "@/app/components/Welcome";

const Page = () => {
  const [fishType, setFishType] = useState<"Trout" | "Carp" | null>(null);

  const [readings, setReadings] = useState({
    temp: "0",
    dissolvedOxygen: "0",
    pH: "0",
    turbidity: "0",
  });
  const [status, setStatus] = useState<{
    status: string;
    warnings: string[];
    recommendations: string[];
    alerts: any[]; // Replace 'any' with the actual AlertType if available
  }>({
    status: "optimal",
    warnings: [],
    recommendations: [],
    alerts: [],
  });

  useEffect(() => {
    // Get fishType from localStorage on mount
    if (typeof window !== "undefined") {
      const storedFishType = localStorage.getItem("fishType");
      if (storedFishType === "Trout" || storedFishType === "Carp") {
        setFishType(storedFishType);
      }
    }
  }, []);

  useEffect(() => {
    if (!fishType) return;
    const interval = generateRandomDataInterval((newData) => {
      setReadings(newData);

      const numericReadings = {
        temperature: parseFloat(newData.temp),
        dissolvedOxygen: parseFloat(newData.dissolvedOxygen),
        pH: parseFloat(newData.pH),
        turbidity: parseFloat(newData.turbidity),
      };

      const newStatus = getOverallStatus(numericReadings, fishType);
      setStatus(newStatus);
    }, fishType);

    return () => clearInterval(interval);
  }, [fishType]);

  if (!fishType) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-400">
        Fish type not selected. Please go back and select a fish species.
      </div>
    );
  }

  // Monitoring dashboard
  return (
    <div className="p-4 flex flex-col gap-4">
      <Welcome />
      <div className="rounded-2xl bg-[#1e2630] p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-[#ffb43a]">{fishType} Parameters</h2>
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
      <Weather />
    </div>
  );
};

export default Page;
