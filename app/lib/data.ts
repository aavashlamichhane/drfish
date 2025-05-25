type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  fishSpecies: string;
};

export const UserData: User[] = [
  {
    id: 1,
    name: "Alice",
    email: "ymanoutube@gmail.com",
    password: "password123",
    fishSpecies: "Trout",
  },
  {
    id: 2,
    name: "Bob",
    email: "hello@gmail.com",
    password: "mypassword",
    fishSpecies: "Carp",
  },
];

export type FishType = "Trout" | "Carp";

interface FishParameters {
  temperature: { min: number; max: number };
  dissolvedOxygen: { min: number; max: number };
  pH: { min: number; max: number };
  turbidity: { min: number; max: number };
}

export const FISH_PARAMETERS: Record<FishType, FishParameters> = {
  Trout: {
    temperature: { min: 10, max: 15 },
    dissolvedOxygen: { min: 8, max: 9.5 },
    pH: { min: 7.0, max: 8.0 },
    turbidity: { min: 80, max: 100 },
  },
  Carp: {
    temperature: { min: 28, max: 32 },
    dissolvedOxygen: { min: 6, max: 9 },
    pH: { min: 7.5, max: 8.5 },
    turbidity: { min: 30, max: 60 },
  },
};

// Generate random data based on fish type
export const generateRandomData = (fishType: FishType = "Trout") => {
  const params = FISH_PARAMETERS[fishType];
  const variation = 0.3; // 30% variation from optimal ranges

  const generateWithVariation = (min: number, max: number) => {
    const range = max - min;
    const extendedMin = min - range * variation;
    const extendedMax = max + range * variation;
    return (Math.random() * (extendedMax - extendedMin) + extendedMin).toFixed(
      2
    );
  };

  return {
    temp: generateWithVariation(params.temperature.min, params.temperature.max),
    dissolvedOxygen: generateWithVariation(
      params.dissolvedOxygen.min,
      params.dissolvedOxygen.max
    ),
    pH: generateWithVariation(params.pH.min, params.pH.max),
    turbidity: generateWithVariation(
      params.turbidity.min,
      params.turbidity.max
    ),
  };
};

export const generateRandomDataInterval = (
  callback: (data: ReturnType<typeof generateRandomData>) => void,
  fishType: FishType
) => {
  // Initial call
  callback(generateRandomData(fishType));

  // Set up interval
  const interval = setInterval(() => {
    const data = generateRandomData(fishType);
    callback(data);
  }, 5000);

  return interval;
};
