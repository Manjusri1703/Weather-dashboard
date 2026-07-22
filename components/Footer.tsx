import { CloudSun, Heart, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-slate-950/60 backdrop-blur-xl mt-auto py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        {/* Left branding */}
        <div className="flex items-center gap-2">
          <CloudSun className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-slate-300">WeatherPulse Dashboard</span>
          <span>•</span>
          <span>Next.js 16 (App Router) & React 19</span>
        </div>

        {/* Right API Credit */}
        <div className="flex items-center gap-4">
          <a
            href="https://openweathermap.org/api"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <span>Powered by OpenWeatherMap</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> for performance
          </span>
        </div>
      </div>
    </footer>
  );
}
