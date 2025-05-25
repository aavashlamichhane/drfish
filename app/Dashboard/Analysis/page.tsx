"use client";
import React, { useEffect, useState } from "react";
import { getAlerts } from "../../lib/fishMonitoring";

type AlertType = {
  id: string;
  title: string;
  description: string;
  type: string;
  severity: "critical" | "warning" | "info";
  icon: string;
  solutions: string[];
};

export default function AnalysisPage() {
  const [fishType, setFishType] = useState<"Trout" | "Carp" | null>(null);
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [loading, setLoading] = useState(true);
  const [readings, setReadings] = useState({
    temperature: 0,
    dissolvedOxygen: 0,
    pH: 0,
    turbidity: 0,
  });

  // Simulate live data updates every 5 seconds
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFishType = localStorage.getItem("fishType");
      if (storedFishType === "Trout" || storedFishType === "Carp") {
        setFishType(storedFishType);
      }
    }
  }, []);

  useEffect(() => {
    if (!fishType) return;

    // Function to generate random readings for demo
    const generateReadings = () => {
      if (fishType === "Trout") {
        return {
          temperature: +(16 + Math.random() * 6).toFixed(1), // 16-22
          dissolvedOxygen: +(4 + Math.random() * 2).toFixed(1), // 4-6
          pH: +(6.5 + Math.random() * 1).toFixed(2), // 6.5-7.5
          turbidity: +(70 + Math.random() * 20).toFixed(0), // 70-90
        };
      } else {
        return {
          temperature: +(28 + Math.random() * 6).toFixed(1), // 28-34
          dissolvedOxygen: +(5 + Math.random() * 2).toFixed(1), // 5-7
          pH: +(7 + Math.random() * 1).toFixed(2), // 7-8
          turbidity: +(80 + Math.random() * 20).toFixed(0), // 80-100
        };
      }
    };

    // Initial and interval update
    const updateData = () => {
      const newReadings = generateReadings();
      setReadings(newReadings);
      setAlerts(getAlerts(newReadings, fishType));
      setLoading(false);
    };

    updateData();
    const interval = setInterval(updateData, 5000);
    return () => clearInterval(interval);
  }, [fishType]);

  if (!fishType) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-400">
        Fish type not selected. Please go back and select a fish species.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-400">
        Loading analysis...
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 min-h-screen bg-gradient-to-b from-[#181f27] to-[#232b36]">
      <div className="max-w-xl mx-auto">
        {/* Small Section to Fill the Gap */}
        <div className="mb-6">
          <div className="bg-[#1e2630] rounded-2xl p-5 flex items-center gap-4 shadow">
            <div className="flex flex-col flex-1">
              <span className="text-[#ffb43a] font-bold text-lg mb-1">
                Real-Time Pond Health Analysis
              </span>
              <span className="text-gray-300 text-sm">
                Below you'll find the latest water quality readings and smart
                suggestions for your{" "}
                <span className="font-semibold text-[#ffb43a]">{fishType}</span>{" "}
                pond. Data updates automatically every few seconds.
              </span>
            </div>
            <span className="text-3xl select-none">
              {fishType === "Trout" ? "🐟" : "🎣"}
            </span>
          </div>
        </div>
        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <div className="bg-[#232b36] rounded-xl p-4 flex flex-col items-center shadow">
            <span className="text-2xl mb-1">🌡️</span>
            <span className="text-white font-bold text-lg">
              {readings.temperature}°C
            </span>
            <span className="text-xs text-gray-400">Temperature</span>
          </div>
          <div className="bg-[#232b36] rounded-xl p-4 flex flex-col items-center shadow">
            <span className="text-2xl mb-1">💧</span>
            <span className="text-white font-bold text-lg">
              {readings.dissolvedOxygen} mg/L
            </span>
            <span className="text-xs text-gray-400">Oxygen</span>
          </div>
          <div className="bg-[#232b36] rounded-xl p-4 flex flex-col items-center shadow">
            <span className="text-2xl mb-1">🧪</span>
            <span className="text-white font-bold text-lg">{readings.pH}</span>
            <span className="text-xs text-gray-400">pH Level</span>
          </div>
          <div className="bg-[#232b36] rounded-xl p-4 flex flex-col items-center shadow">
            <span className="text-2xl mb-1">🌫️</span>
            <span className="text-white font-bold text-lg">
              {readings.turbidity} NTU
            </span>
            <span className="text-xs text-gray-400">Turbidity</span>
          </div>
        </div>
        {/* Alerts & Suggestions */}
        <h2 className="text-2xl font-bold text-[#22d37b] mb-4">
          Farm Management Suggestions
        </h2>
        {alerts.length === 0 ? (
          <div className="bg-[#1e2630] rounded-xl p-6 text-green-400 text-center shadow">
            All parameters are within optimal range. No problems detected!
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-xl px-5 py-4 flex flex-col gap-2 shadow border-l-4
                  ${
                    alert.severity === "critical"
                      ? "border-red-500 bg-red-900/10"
                      : alert.severity === "warning"
                      ? "border-yellow-400 bg-yellow-900/20"
                      : "border-blue-400 bg-blue-900/20"
                  }
                `}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{alert.icon}</span>
                  <span className="font-semibold text-base text-white">
                    {alert.title}
                  </span>
                </div>
                <div className="text-gray-300 text-sm">{alert.description}</div>
                <div>
                  <div className="font-semibold text-white mb-1 text-sm">
                    Recommended Solutions:
                  </div>
                  <ul className="list-disc list-inside text-gray-200 text-xs pl-2">
                    {alert.solutions.map((solution, idx) => (
                      <li key={idx}>{solution}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
