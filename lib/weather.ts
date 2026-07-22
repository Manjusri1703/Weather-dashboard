import {
  CurrentWeather,
  ForecastItem,
  OpenWeatherCurrentResponse,
  OpenWeatherForecastResponse,
  OpenWeatherForecastListItem,
} from "@/types/weather";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Helper to check whether a valid OpenWeatherMap API key is set
 */
export function hasValidApiKey(): boolean {
  return (
    typeof API_KEY === "string" &&
    API_KEY.trim() !== "" &&
    API_KEY !== "YOUR_API_KEY"
  );
}

/**
 * Format unix timestamp and timezone offset into a localized 12-hour time string (e.g., 06:30 AM)
 */
function formatLocalTime(timestamp: number, timezoneOffset: number): string {
  // Convert UTC timestamp to target timezone milliseconds
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
}

/**
 * Format unix timestamp to day name (e.g., Monday)
 */
function getDayName(timestamp: number, timezoneOffset: number): string {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
}

/**
 * Format unix timestamp to short date (e.g., Jul 22)
 */
function getFormattedDate(timestamp: number, timezoneOffset: number): string {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Fetch Current Weather by City Name
 */
export async function getCurrentWeather(city: string): Promise<CurrentWeather> {
  const cleanCity = city.trim();
  if (!cleanCity) {
    throw new Error("Please enter a valid city name.");
  }

  // If no API key is provided, return rich mock data so the app functions seamlessly in demo mode
  if (!hasValidApiKey()) {
    return getMockCurrentWeather(cleanCity);
  }

  const url = `${BASE_URL}/weather?q=${encodeURIComponent(
    cleanCity
  )}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(`City "${cleanCity}" not found. Please check the spelling and try again.`);
      }
      if (res.status === 401) {
        throw new Error("Invalid OpenWeatherMap API key. Please check your NEXT_PUBLIC_WEATHER_API_KEY environment variable.");
      }
      throw new Error(`Failed to fetch weather data (Status ${res.status}).`);
    }

    const data: OpenWeatherCurrentResponse = await res.json();

    const currentWeather: CurrentWeather = {
      city: data.name,
      country: data.sys.country,
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      pressure: data.main.pressure,
      visibility: Math.round(data.visibility / 1000), // Convert meters to km
      sunrise: formatLocalTime(data.sys.sunrise, data.timezone),
      sunset: formatLocalTime(data.sys.sunset, data.timezone),
      condition: data.weather[0]?.main || "Clear",
      description: data.weather[0]?.description || "clear sky",
      icon: data.weather[0]?.icon || "01d",
      tempMin: Math.round(data.main.temp_min),
      tempMax: Math.round(data.main.temp_max),
      updatedAt: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    return currentWeather;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("An unexpected error occurred while fetching weather data.");
  }
}

/**
 * Fetch 5-Day Forecast by City Name
 */
export async function get5DayForecast(city: string): Promise<ForecastItem[]> {
  const cleanCity = city.trim();
  if (!cleanCity) {
    throw new Error("Please enter a valid city name.");
  }

  if (!hasValidApiKey()) {
    return getMockForecast(cleanCity);
  }

  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(
    cleanCity
  )}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(`City "${cleanCity}" not found.`);
      }
      throw new Error(`Failed to fetch forecast data (Status ${res.status}).`);
    }

    const data: OpenWeatherForecastResponse = await res.json();
    const timezone = data.city.timezone;

    // Group 3-hour forecast entries by YYYY-MM-DD
    const groupedByDate: Record<string, OpenWeatherForecastListItem[]> = {};

    data.list.forEach((item) => {
      // Get date string in city local time
      const itemDate = new Date((item.dt + timezone) * 1000)
        .toISOString()
        .split("T")[0];
      if (!groupedByDate[itemDate]) {
        groupedByDate[itemDate] = [];
      }
      groupedByDate[itemDate].push(item);
    });

    const forecastDays = Object.keys(groupedByDate).slice(0, 5);

    const forecast: ForecastItem[] = forecastDays.map((dateStr) => {
      const items = groupedByDate[dateStr];

      // Calculate min and max temp across the day
      let minTemp = Infinity;
      let maxTemp = -Infinity;
      let totalHumidity = 0;
      let totalWind = 0;

      items.forEach((item) => {
        if (item.main.temp_min < minTemp) minTemp = item.main.temp_min;
        if (item.main.temp_max > maxTemp) maxTemp = item.main.temp_max;
        totalHumidity += item.main.humidity;
        totalWind += item.wind.speed;
      });

      // Pick mid-day item (closest to 12:00 PM) for general icon and description
      const middayItem =
        items.find((item) => {
          const hour = new Date((item.dt + timezone) * 1000).getUTCHours();
          return hour >= 11 && hour <= 14;
        }) || items[Math.floor(items.length / 2)];

      const sampleDt = middayItem.dt;

      return {
        date: dateStr,
        day: getDayName(sampleDt, timezone),
        formattedDate: getFormattedDate(sampleDt, timezone),
        icon: middayItem.weather[0]?.icon || "01d",
        condition: middayItem.weather[0]?.main || "Clear",
        description: middayItem.weather[0]?.description || "clear sky",
        minTemp: Math.round(minTemp),
        maxTemp: Math.round(maxTemp),
        humidity: Math.round(totalHumidity / items.length),
        windSpeed: Math.round((totalWind / items.length) * 3.6),
      };
    });

    return forecast;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("An unexpected error occurred while fetching forecast data.");
  }
}

/**
 * High quality Mock Current Weather Generator for Demo Mode
 */
function getMockCurrentWeather(city: string): CurrentWeather {
  const normalized = city.toLowerCase();

  const presets: Record<string, Partial<CurrentWeather>> = {
    chennai: {
      city: "Chennai",
      country: "IN",
      temp: 32,
      feelsLike: 37,
      humidity: 78,
      windSpeed: 18,
      pressure: 1008,
      visibility: 9,
      sunrise: "05:52 AM",
      sunset: "06:38 PM",
      condition: "Haze",
      description: "scattered clouds & humid",
      icon: "02d",
      tempMin: 28,
      tempMax: 34,
    },
    hyderabad: {
      city: "Hyderabad",
      country: "IN",
      temp: 29,
      feelsLike: 32,
      humidity: 68,
      windSpeed: 14,
      pressure: 1012,
      visibility: 10,
      sunrise: "05:56 AM",
      sunset: "06:51 PM",
      condition: "Clouds",
      description: "partly cloudy",
      icon: "03d",
      tempMin: 24,
      tempMax: 31,
    },
    london: {
      city: "London",
      country: "GB",
      temp: 18,
      feelsLike: 17,
      humidity: 62,
      windSpeed: 21,
      pressure: 1016,
      visibility: 10,
      sunrise: "05:08 AM",
      sunset: "09:02 PM",
      condition: "Rain",
      description: "light rain shower",
      icon: "10d",
      tempMin: 14,
      tempMax: 20,
    },
    singapore: {
      city: "Singapore",
      country: "SG",
      temp: 31,
      feelsLike: 36,
      humidity: 82,
      windSpeed: 12,
      pressure: 1009,
      visibility: 10,
      sunrise: "07:05 AM",
      sunset: "07:15 PM",
      condition: "Thunderstorm",
      description: "isolated thunderstorms",
      icon: "11d",
      tempMin: 27,
      tempMax: 33,
    },
    tokyo: {
      city: "Tokyo",
      country: "JP",
      temp: 26,
      feelsLike: 27,
      humidity: 55,
      windSpeed: 16,
      pressure: 1014,
      visibility: 10,
      sunrise: "04:42 AM",
      sunset: "06:53 PM",
      condition: "Clear",
      description: "sunny and clear",
      icon: "01d",
      tempMin: 21,
      tempMax: 28,
    },
  };

  const matched = presets[normalized];
  const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);

  return {
    city: matched?.city || capitalizedCity,
    country: matched?.country || "WORLD",
    temp: matched?.temp ?? 25,
    feelsLike: matched?.feelsLike ?? 27,
    humidity: matched?.humidity ?? 60,
    windSpeed: matched?.windSpeed ?? 15,
    pressure: matched?.pressure ?? 1013,
    visibility: matched?.visibility ?? 10,
    sunrise: matched?.sunrise ?? "06:00 AM",
    sunset: matched?.sunset ?? "06:30 PM",
    condition: matched?.condition ?? "Clear",
    description: matched?.description ?? "clear sky",
    icon: matched?.icon ?? "01d",
    tempMin: matched?.tempMin ?? 20,
    tempMax: matched?.tempMax ?? 28,
    updatedAt: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

/**
 * High quality Mock 5-Day Forecast Generator for Demo Mode
 */
function getMockForecast(city: string): ForecastItem[] {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const conditions = [
    { cond: "Clear", desc: "sunny", icon: "01d", minDelta: -3, maxDelta: 4 },
    { cond: "Clouds", desc: "partly cloudy", icon: "02d", minDelta: -4, maxDelta: 3 },
    { cond: "Rain", desc: "light rain", icon: "10d", minDelta: -5, maxDelta: 1 },
    { cond: "Clouds", desc: "overcast clouds", icon: "04d", minDelta: -4, maxDelta: 2 },
    { cond: "Clear", desc: "mostly sunny", icon: "01d", minDelta: -2, maxDelta: 5 },
  ];

  const now = new Date();
  const baseTemp = city.toLowerCase() === "london" ? 17 : city.toLowerCase() === "chennai" ? 31 : 26;

  return Array.from({ length: 5 }).map((_, index) => {
    const forecastDate = new Date(now);
    forecastDate.setDate(now.getDate() + index + 1);

    const dayName = forecastDate.toLocaleDateString("en-US", { weekday: "long" });
    const formattedDate = forecastDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const dateStr = forecastDate.toISOString().split("T")[0];

    const c = conditions[index % conditions.length];

    return {
      date: dateStr,
      day: dayName,
      formattedDate,
      icon: c.icon,
      condition: c.cond,
      description: c.desc,
      minTemp: Math.round(baseTemp + c.minDelta),
      maxTemp: Math.round(baseTemp + c.maxDelta),
      humidity: 50 + index * 5,
      windSpeed: 12 + index * 2,
    };
  });
}
