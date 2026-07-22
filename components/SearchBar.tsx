"use client";

import { useState, FormEvent } from "react";
import { Search, MapPin, Sparkles } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
  currentCity?: string;
}

const POPULAR_CITIES = [
  "Chennai",
  "Hyderabad",
  "London",
  "Singapore",
  "Tokyo",
];

export default function SearchBar({
  onSearch,
  isLoading,
  currentCity,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handlePillClick = (city: string) => {
    setQuery(city);
    onSearch(city);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Main Search Input Form */}
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center w-full group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-70"></div>
        <div className="relative flex items-center w-full bg-slate-900/70 border border-white/15 rounded-2xl backdrop-blur-xl shadow-2xl p-2 focus-within:border-cyan-400/60 focus-within:ring-2 focus-within:ring-cyan-400/20 transition-all duration-300">
          <div className="pl-3 pr-2 text-slate-400">
            <MapPin className="w-5 h-5 text-cyan-400" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city (e.g. Chennai, London, Tokyo)..."
            disabled={isLoading}
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-none disabled:opacity-50 py-2.5 px-1"
            aria-label="Search city weather"
          />

          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-cyan-500/25 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 transition-all duration-200"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Quick City Selection Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2 pt-1">
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
          <Sparkles className="w-3 h-3 text-cyan-400" /> Quick select:
        </span>
        {POPULAR_CITIES.map((city) => {
          const isActive =
            currentCity?.toLowerCase() === city.toLowerCase();
          return (
            <button
              key={city}
              type="button"
              onClick={() => handlePillClick(city)}
              disabled={isLoading}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 active:scale-95 ${
                isActive
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-500/20"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {city}
            </button>
          );
        })}
      </div>
    </div>
  );
}
