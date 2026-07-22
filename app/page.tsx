"use client";

import { useState, useEffect, useCallback } from "react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { getCurrentWeather, get5DayForecast } from "@/lib/weather";
import { CurrentWeather, ForecastItem } from "@/types/weather";
import { Sparkles, Info } from "lucide-react";

export default function Home() {
  const [currentCity, setCurrentCity] = useState<string>("Chennai");
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Parallel data fetching for optimal performance
      const [currentData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        get5DayForecast(city),
      ]);

      setWeather(currentData);
      setForecast(forecastData);
      setCurrentCity(currentData.city);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch weather data. Please try again.");
      }
      setWeather(null);
      setForecast([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load for default city
  useEffect(() => {
    fetchWeatherData(currentCity);
  }, [fetchWeatherData, currentCity]);

  const handleSearch = (searchedCity: string) => {
    fetchWeatherData(searchedCity);
  };

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Top Banner / Landing Headline */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-2 sm:pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold tracking-wide uppercase shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Live Weather Analytics</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Real-Time <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">Weather Dashboard</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Stay ahead of the weather. Search current conditions, temperature details, atmospheric metrics, and 5-day daily forecasts for any city worldwide.
        </p>
      </section>

      {/* Search Bar Component */}
      <section>
        <SearchBar
          onSearch={handleSearch}
          isLoading={isLoading}
          currentCity={currentCity}
        />
      </section>

      {/* Main Content Area: Loading / Error / Weather Dashboard */}
      <section className="min-h-[400px]">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage
            message={error}
            onRetry={() => fetchWeatherData(currentCity)}
          />
        ) : weather ? (
          <div className="space-y-10 animate-fadeIn">
            {/* Current Weather Card */}
            <WeatherCard weather={weather} />

            {/* 5-Day Forecast Grid */}
            <ForecastCard forecast={forecast} />
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400 flex flex-col items-center gap-3">
            <Info className="w-8 h-8 text-cyan-400" />
            <p>Enter a city name above to view weather data.</p>
          </div>
        )}
      </section>
    </div>
  );
}
