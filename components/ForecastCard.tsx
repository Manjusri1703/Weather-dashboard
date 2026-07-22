import Image from "next/image";
import { ForecastItem } from "@/types/weather";
import { Calendar, Droplets, Wind } from "lucide-react";

interface ForecastCardProps {
  forecast: ForecastItem[];
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="w-full space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-400" />
          5-Day Weather Forecast
        </h3>
        <span className="text-xs text-slate-400 font-medium">
          Daily outlook
        </span>
      </div>

      {/* Grid of Daily Forecast Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {forecast.map((dayItem, idx) => {
          const iconUrl = `https://openweathermap.org/img/wn/${dayItem.icon}@2x.png`;

          return (
            <div
              key={`${dayItem.date}-${idx}`}
              className="relative flex flex-col justify-between p-5 rounded-2xl bg-slate-900/50 border border-white/10 backdrop-blur-xl hover:bg-slate-800/60 hover:border-cyan-500/30 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
            >
              {/* Day & Date */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {dayItem.day}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    {dayItem.formattedDate}
                  </p>
                </div>
                <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:animate-ping"></div>
              </div>

              {/* Weather Icon & Description */}
              <div className="my-4 flex flex-col items-center justify-center">
                <div className="relative w-16 h-16 filter drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={iconUrl}
                    alt={dayItem.description}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <p className="text-xs text-slate-300 font-medium capitalize text-center mt-1 line-clamp-1">
                  {dayItem.description}
                </p>
              </div>

              {/* Temperature Range & Metrics */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                {/* Min / Max Temp Bar */}
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-blue-300">{dayItem.minTemp}°C</span>
                  {/* Subtle bar indicator */}
                  <div className="flex-1 mx-2 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-amber-400"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(20, (dayItem.maxTemp - dayItem.minTemp) * 10)
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-rose-300">{dayItem.maxTemp}°C</span>
                </div>

                {/* Sub metrics */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-blue-400" />
                    {dayItem.humidity}%
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="w-3 h-3 text-cyan-400" />
                    {dayItem.windSpeed} km/h
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
