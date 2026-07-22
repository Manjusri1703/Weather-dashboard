import Image from "next/image";
import { CurrentWeather } from "@/types/weather";
import {
  Thermometer,
  Droplets,
  Wind,
  Gauge,
  Eye,
  Sunrise,
  Sunset,
  RefreshCw,
  MapPin,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface WeatherCardProps {
  weather: CurrentWeather;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`;

  return (
    <div className="relative w-full rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-white/15 backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-300">
      {/* Dynamic Background Glow ambient circles */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Bar: Location Badge & Refresh Timestamp */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              {weather.city}
              <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-xs font-semibold text-cyan-300 border border-white/10 uppercase tracking-wide">
                {weather.country}
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-medium capitalize mt-0.5">
              {weather.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Updated: {weather.updatedAt}</span>
        </div>
      </div>

      {/* Main Hero Section: Temperature & Weather Icon */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center mb-8">
        {/* Left Column: Big Temp & Condition */}
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-1">
            <span className="text-6xl sm:text-7xl font-black tracking-tighter text-white drop-shadow-md">
              {weather.temp}°
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-cyan-400">C</span>
          </div>

          <div className="mt-2 flex items-center gap-4 text-sm font-semibold text-slate-300">
            <span className="flex items-center gap-1 text-slate-400">
              Feels like: <strong className="text-white font-bold">{weather.feelsLike}°C</strong>
            </span>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-0.5 text-blue-300">
                <TrendingDown className="w-3.5 h-3.5" />
                {weather.tempMin}°
              </span>
              <span className="flex items-center gap-0.5 text-rose-300">
                <TrendingUp className="w-3.5 h-3.5" />
                {weather.tempMax}°
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: High Quality Icon & Condition Name */}
        <div className="flex flex-col items-center sm:items-end justify-center">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 filter drop-shadow-xl animate-float">
            <Image
              src={iconUrl}
              alt={weather.description}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <span className="text-lg font-bold text-slate-200 capitalize tracking-wide">
            {weather.condition}
          </span>
        </div>
      </div>

      {/* Grid Metrics Section */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-4 border-t border-white/10">
        {/* Metric 1: Humidity */}
        <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
            <Droplets className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-400 mt-2 font-medium">Humidity</span>
          <span className="text-sm sm:text-base font-extrabold text-white mt-0.5">
            {weather.humidity}%
          </span>
        </div>

        {/* Metric 2: Wind Speed */}
        <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
            <Wind className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-400 mt-2 font-medium">Wind Speed</span>
          <span className="text-sm sm:text-base font-extrabold text-white mt-0.5">
            {weather.windSpeed} <span className="text-xs font-normal text-slate-400">km/h</span>
          </span>
        </div>

        {/* Metric 3: Pressure */}
        <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
            <Gauge className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-400 mt-2 font-medium">Pressure</span>
          <span className="text-sm sm:text-base font-extrabold text-white mt-0.5">
            {weather.pressure} <span className="text-xs font-normal text-slate-400">hPa</span>
          </span>
        </div>

        {/* Metric 4: Visibility */}
        <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
            <Eye className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-400 mt-2 font-medium">Visibility</span>
          <span className="text-sm sm:text-base font-extrabold text-white mt-0.5">
            {weather.visibility} <span className="text-xs font-normal text-slate-400">km</span>
          </span>
        </div>

        {/* Metric 5: Sunrise */}
        <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
            <Sunrise className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-400 mt-2 font-medium">Sunrise</span>
          <span className="text-sm sm:text-base font-extrabold text-white mt-0.5">
            {weather.sunrise}
          </span>
        </div>

        {/* Metric 6: Sunset */}
        <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group">
          <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 group-hover:scale-110 transition-transform">
            <Sunset className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-400 mt-2 font-medium">Sunset</span>
          <span className="text-sm sm:text-base font-extrabold text-white mt-0.5">
            {weather.sunset}
          </span>
        </div>
      </div>
    </div>
  );
}
