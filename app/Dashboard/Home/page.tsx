"use client";
import React, { useEffect, useState } from "react";
import { generateRandomDataInterval } from "../../lib/data";
import { getOverallStatus } from "../../lib/fishMonitoring";
import Weather from "../../components/Weather";
import Welcome from "@/app/components/Welcome";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

const API_URL_READINGS = "https://simple-hf-api-server.onrender.com/random-int"

// Fetch sensor readings from the API and return the data as JSON.
// If the fetch fails, log the error and return null.
const getReadings = async () => {
  try {
    const response = await fetch(API_URL_READINGS);
    if (!response.ok) {
      throw new Error("Failed to fetch readings");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

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
    const fetchAndUpdate = async () => {
      const data = await getReadings();
      if (data) {
        setReadings({
          temp: data.temperature?.toString() ?? "0",
          dissolvedOxygen: data.oxygen?.toString() ?? "0",
          pH: data.ph?.toString() ?? "0",
          turbidity: data.turbidity?.toString() ?? "0",
        });

        const numericReadings = {
          temperature: parseFloat(data.temperature),
          dissolvedOxygen: parseFloat(data.oxygen),
          pH: parseFloat(data.ph),
          turbidity: parseFloat(data.turbidity),
        };
        const newStatus = getOverallStatus(numericReadings, fishType);
        setStatus(newStatus);
      }
    };
    fetchAndUpdate(); // Initial fetch
    const interval = setInterval(fetchAndUpdate, 5000);
    return () => clearInterval(interval);
  }, [fishType]);

  const getParamStatus = (
    param: "temperature" | "dissolvedOxygen" | "pH" | "turbidity",
    value: number,
    fishType: "Trout" | "Carp"
  ) => {
    // Define optimal ranges for each fish type
    const ranges = {
      Trout: {
        temperature: { min: 10, max: 18 },
        dissolvedOxygen: { min: 5, max: 10 },
        pH: { min: 6.5, max: 8 },
        turbidity: { min: 0, max: 100 },
      },
      Carp: {
        temperature: { min: 15, max: 30 },
        dissolvedOxygen: { min: 4, max: 10 },
        pH: { min: 6.5, max: 9 },
        turbidity: { min: 0, max: 120 },
      },
    };

    const range = ranges[fishType][param];
    if (value < range.min || value > range.max) {
      return {
        icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
        status: "warning",
      };
    }
    // You can add more status levels if needed
    return {
      icon: <CheckCircle className="w-5 h-5 text-green-400" />,
      status: "ok",
    };
  };

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
        <div className="p-4 bg-[#1e2630] rounded-2xl flex items-center gap-3">
          {
            getParamStatus("temperature", parseFloat(readings.temp), fishType)
              .icon
          }
          <div>
            <p className="text-gray-400 mb-1">Temperature</p>
            <p className="text-2xl text-white">{readings.temp}°C</p>
          </div>
        </div>
        <div className="p-4 bg-[#1e2630] rounded-2xl flex items-center gap-3">
          {
            getParamStatus(
              "dissolvedOxygen",
              parseFloat(readings.dissolvedOxygen),
              fishType
            ).icon
          }
          <div>
            <p className="text-gray-400 mb-1">Oxygen</p>
            <p className="text-2xl text-white">
              {readings.dissolvedOxygen} mg/L
            </p>
          </div>
        </div>
        <div className="p-4 bg-[#1e2630] rounded-2xl flex items-center gap-3">
          {getParamStatus("pH", parseFloat(readings.pH), fishType).icon}
          <div>
            <p className="text-gray-400 mb-1">pH Level</p>
            <p className="text-2xl text-white">{readings.pH}</p>
          </div>
        </div>
        <div className="p-4 bg-[#1e2630] rounded-2xl flex items-center gap-3">
          {
            getParamStatus(
              "turbidity",
              parseFloat(readings.turbidity),
              fishType
            ).icon
          }
          <div>
            <p className="text-gray-400 mb-1">Turbidity</p>
            <p className="text-2xl text-white">{readings.turbidity} cm</p>
          </div>
        </div>
      </div>
      <Weather />
    </div>
  );
};

export default Page;
