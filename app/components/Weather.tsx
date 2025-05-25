"use client";
import React, { useState, useEffect } from "react";
import {
  Cloud,
  CloudRain,
  Sun,
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";

interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    wind_speed: number;
    wind_deg: number;
    weather: Array<{ main: string; description: string; icon: string }>;
    visibility: number;
  };
  daily: Array<{
    dt: number;
    temp: { min: number; max: number };
    weather: Array<{ main: string }>;
    humidity: number;
    wind_speed: number;
  }>;
}

interface Suggestion {
  type: "warning" | "success" | "info";
  title: string;
  message: string;
  icon: React.ReactNode;
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fishType, setFishType] = useState<"Trout" | "Carp">("Trout");

  useEffect(() => {
    // Get fishType from localStorage
    if (typeof window !== "undefined") {
      const storedFishType = localStorage.getItem("fishType");
      if (storedFishType === "Trout" || storedFishType === "Carp") {
        setFishType(storedFishType);
      }
    }

    // Mock weather data for demonstration
    const fetchWeatherData = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockWeatherData: WeatherData = {
          current: {
            temp: 18.5,
            feels_like: 17.2,
            humidity: 72,
            pressure: 1015,
            wind_speed: 3.2,
            wind_deg: 230,
            weather: [
              { main: "Clouds", description: "scattered clouds", icon: "03d" },
            ],
            visibility: 10000,
          },
          daily: [
            {
              dt: Date.now() / 1000,
              temp: { min: 12, max: 22 },
              weather: [{ main: "Clouds" }],
              humidity: 75,
              wind_speed: 2.8,
            },
            {
              dt: Date.now() / 1000 + 86400,
              temp: { min: 14, max: 24 },
              weather: [{ main: "Rain" }],
              humidity: 85,
              wind_speed: 4.2,
            },
            {
              dt: Date.now() / 1000 + 172800,
              temp: { min: 16, max: 26 },
              weather: [{ main: "Clear" }],
              humidity: 65,
              wind_speed: 2.1,
            },
          ],
        };

        setWeatherData(mockWeatherData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition?.toLowerCase()) {
      case "clear":
        return <Sun className="w-6 h-6 text-yellow-400" />;
      case "rain":
        return <CloudRain className="w-6 h-6 text-blue-400" />;
      case "snow":
        return <CloudSnow className="w-6 h-6 text-blue-200" />;
      default:
        return <Cloud className="w-6 h-6 text-gray-400" />;
    }
  };

  const generateFishFarmingSuggestions = (
    weather: WeatherData
  ): Suggestion[] => {
    const suggestions: Suggestion[] = [];
    const temp = weather.current.temp;
    const humidity = weather.current.humidity;
    const windSpeed = weather.current.wind_speed;

    // Fish-type specific temperature ranges
    const tempRanges = {
      Trout: { min: 10, max: 18, optimal: { min: 12, max: 16 } },
      Carp: { min: 15, max: 30, optimal: { min: 20, max: 25 } },
    };

    const range = tempRanges[fishType];

    // Temperature-based suggestions
    if (temp < range.min) {
      suggestions.push({
        type: "warning",
        title: "Cold Temperature Alert",
        message: `Temperature below optimal range for ${fishType}. Consider reducing feeding frequency as metabolism slows.`,
        icon: <AlertTriangle className="w-4 h-4" />,
      });
    } else if (temp > range.max) {
      suggestions.push({
        type: "warning",
        title: "Warm Temperature Alert",
        message: `Temperature above optimal range for ${fishType}. Monitor oxygen levels closely and increase aeration.`,
        icon: <AlertTriangle className="w-4 h-4" />,
      });
    } else if (temp >= range.optimal.min && temp <= range.optimal.max) {
      suggestions.push({
        type: "success",
        title: "Optimal Temperature",
        message: `Current temperature is ideal for ${fishType} growth and feeding.`,
        icon: <CheckCircle className="w-4 h-4" />,
      });
    }

    // Wind-based suggestions
    if (windSpeed > 5) {
      suggestions.push({
        type: "info",
        title: "High Wind Activity",
        message:
          "Strong winds can increase water oxygenation but may stress fish. Monitor behavior closely.",
        icon: <Info className="w-4 h-4" />,
      });
    }

    // Humidity-based suggestions
    if (humidity > 80) {
      suggestions.push({
        type: "info",
        title: "High Humidity",
        message:
          "Good conditions for maintaining water levels. Check for potential algae growth.",
        icon: <Info className="w-4 h-4" />,
      });
    }

    // Weather pattern suggestions
    const upcomingRain = weather.daily.some(
      (day) => day.weather[0].main === "Rain"
    );
    if (upcomingRain) {
      suggestions.push({
        type: "info",
        title: "Rain Expected",
        message:
          "Prepare for potential water level changes and runoff that may affect water quality.",
        icon: <Info className="w-4 h-4" />,
      });
    }

    return suggestions;
  };

  if (loading) {
    return (
      <div className="bg-[#1e2630] rounded-2xl p-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-600 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-600 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-600 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="bg-[#1e2630] rounded-2xl p-4">
        <div className="text-red-400 text-center">
          <p className="text-lg font-semibold mb-2">Weather data unavailable</p>
          <p className="text-sm text-gray-400">
            {error || "Unable to load weather information"}
          </p>
        </div>
      </div>
    );
  }

  const suggestions = generateFishFarmingSuggestions(weatherData);

  return (
    <div className="space-y-4 pb-20">
      {/* Weather Section */}
      <div className="bg-[#1e2630] rounded-2xl p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg text-blue-400 font-semibold">
            Weather Conditions
          </h2>
          <div className="flex items-center space-x-2">
            {getWeatherIcon(weatherData.current.weather[0].main)}
            <span className="text-sm text-gray-400 capitalize">
              {weatherData.current.weather[0].description}
            </span>
          </div>
        </div>

        {/* Current Weather Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <Thermometer className="w-5 h-5 text-orange-400" />
            <div>
              <p className="text-gray-400 text-sm">Temperature</p>
              <p className="text-xl text-white font-bold">
                {weatherData.current.temp}°C
              </p>
              <p className="text-gray-500 text-xs">
                Feels like {weatherData.current.feels_like}°C
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Droplets className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Humidity</p>
              <p className="text-xl text-white font-bold">
                {weatherData.current.humidity}%
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Wind className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-gray-400 text-sm">Wind Speed</p>
              <p className="text-xl text-white font-bold">
                {weatherData.current.wind_speed} m/s
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Eye className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-gray-400 text-sm">Visibility</p>
              <p className="text-xl text-white font-bold">
                {(weatherData.current.visibility / 1000).toFixed(1)} km
              </p>
            </div>
          </div>
        </div>

        {/* 3-day forecast */}
        <div className="border-t border-gray-600 pt-4 ">
          <h3 className="text-gray-300 font-medium mb-3">3-Day Forecast</h3>
          <div className="space-y-3">
            {weatherData.daily.slice(0, 3).map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getWeatherIcon(day.weather[0].main)}
                  <span className="text-sm text-gray-400">
                    {index === 0 ? "Today" : index === 1 ? "Tomorrow" : "Day 3"}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-400">
                    {day.temp.min}°/{day.temp.max}°
                  </span>
                  <span className="text-blue-400">{day.humidity}%</span>
                  <span className="text-gray-500">{day.wind_speed}m/s</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fish Farming Suggestions */}
      <div className="bg-[#1e2630] rounded-2xl p-4">
        <h2 className="text-lg text-green-400 font-semibold mb-4">
          Farm Management Suggestions
        </h2>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                suggestion.type === "warning"
                  ? "bg-yellow-900/20 border-yellow-400"
                  : suggestion.type === "success"
                  ? "bg-green-900/20 border-green-400"
                  : "bg-blue-900/20 border-blue-400"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`mt-0.5 ${
                    suggestion.type === "warning"
                      ? "text-yellow-400"
                      : suggestion.type === "success"
                      ? "text-green-400"
                      : "text-blue-400"
                  }`}
                >
                  {suggestion.icon}
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">
                    {suggestion.title}
                  </h3>
                  <p className="text-gray-300 text-sm ">
                    {suggestion.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
