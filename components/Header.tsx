"use client";

import { CloudSun, Sparkles, Key, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  hasApiKey: boolean;
}

export default function Header({ hasApiKey }: HeaderProps) {
  const [currentDateStr, setCurrentDateStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentDateStr(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
    };
    updateTime();
  }, []);

  return (
    <header className="w-full border-b border-white/10 bg-slate-900/40 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <CloudSun className="w-7 h-7 text-white animate-float" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-300"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
                Weather<span className="text-cyan-400">Pulse</span>
              </h1>
              <Sparkles className="w-4 h-4 text-cyan-400 hidden sm:inline-block" />
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Next.js 16 • React 19 • Weather Dashboard
            </p>
          </div>
        </div>

        {/* Status indicator & Date */}
        <div className="flex items-center gap-3">
          {currentDateStr && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
              <span>{currentDateStr}</span>
            </div>
          )}

          {hasApiKey ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Live API</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-sm" title="Add NEXT_PUBLIC_WEATHER_API_KEY to .env.local to enable live OpenWeatherMap requests">
              <Key className="w-3.5 h-3.5" />
              <span>Demo Mode</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
