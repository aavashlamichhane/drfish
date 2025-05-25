export type Parameter = {
  name: string;
  unit: string;
  optimal: { min: number; max: number };
  good: { min: number; max: number };
  poor: { min: number; max: number };
  critical: { min: number; max: number };
};

export type FishParameters = {
  [key: string]: {
    temperature: Parameter;
    dissolvedOxygen: Parameter;
    pH: Parameter;
    turbidity: Parameter;
  };
};

export type ParameterStatus = "optimal" | "good" | "poor" | "critical";

export const FISH_PARAMETERS: FishParameters = {
  Trout: {
    temperature: {
      name: "Temperature",
      unit: "°C",
      optimal: { min: 10, max: 15 },
      good: { min: 5, max: 18 },
      poor: { min: 2, max: 22 },
      critical: { min: -Infinity, max: Infinity },
    },
    dissolvedOxygen: {
      name: "Dissolved Oxygen",
      unit: "mg/L",
      optimal: { min: 8, max: 9.5 },
      good: { min: 5.8, max: 8 },
      poor: { min: 4, max: 5.8 },
      critical: { min: -Infinity, max: 4 },
    },
    pH: {
      name: "pH",
      unit: "",
      optimal: { min: 7.0, max: 8.0 },
      good: { min: 6.5, max: 8.5 },
      poor: { min: 6.0, max: 9.0 },
      critical: { min: -Infinity, max: 6.0 },
    },
    turbidity: {
      name: "Turbidity",
      unit: "cm",
      optimal: { min: 100, max: Infinity },
      good: { min: 25, max: 100 },
      poor: { min: 15, max: 25 },
      critical: { min: -Infinity, max: 15 },
    },
  },
  Carp: {
    temperature: {
      name: "Temperature",
      unit: "°C",
      optimal: { min: 28, max: 32 },
      good: { min: 24, max: 35 },
      poor: { min: 20, max: 38 },
      critical: { min: -Infinity, max: 20 },
    },
    dissolvedOxygen: {
      name: "Dissolved Oxygen",
      unit: "mg/L",
      optimal: { min: 6, max: 9 },
      good: { min: 5, max: 6 },
      poor: { min: 3, max: 5 },
      critical: { min: -Infinity, max: 3 },
    },
    pH: {
      name: "pH",
      unit: "",
      optimal: { min: 7.5, max: 8.5 },
      good: { min: 6.5, max: 9.0 },
      poor: { min: 6.0, max: 9.5 },
      critical: { min: -Infinity, max: 6.0 },
    },
    turbidity: {
      name: "Turbidity",
      unit: "cm",
      optimal: { min: 30, max: 60 },
      good: { min: 25, max: 80 },
      poor: { min: 15, max: 100 },
      critical: { min: -Infinity, max: 15 },
      },
    },
};

export function getParameterStatus(
  value: number,
  parameter: Parameter
): ParameterStatus {
  if (value >= parameter.optimal.min && value <= parameter.optimal.max) {
    return "optimal";
  }
  if (value >= parameter.good.min && value <= parameter.good.max) {
    return "good";
  }
  if (value >= parameter.poor.min && value <= parameter.poor.max) {
    return "poor";
  }
  return "critical";
}

export function getOverallStatus(
  readings: {
    temperature: number;
    dissolvedOxygen: number;
    pH: number;
    turbidity: number;
  },
  fishType: "Trout" | "Carp"
): {
  status: ParameterStatus;
  warnings: string[];
} {
  const parameters = FISH_PARAMETERS[fishType];
  const statuses = {
    temperature: getParameterStatus(
      readings.temperature,
      parameters.temperature
    ),
    dissolvedOxygen: getParameterStatus(
      readings.dissolvedOxygen,
      parameters.dissolvedOxygen
    ),
    pH: getParameterStatus(readings.pH, parameters.pH),
    turbidity: getParameterStatus(readings.turbidity, parameters.turbidity),
  };

  const warnings: string[] = [];
  Object.entries(statuses).forEach(([param, status]) => {
    if (status === "critical" || status === "poor") {
      warnings.push(`${param} is in ${status} condition`);
    }
  });

  // Get the worst status
  if (Object.values(statuses).includes("critical"))
    return { status: "critical", warnings };
  if (Object.values(statuses).includes("poor"))
    return { status: "poor", warnings };
  if (Object.values(statuses).includes("good"))
    return { status: "good", warnings };
  return { status: "optimal", warnings };
}
