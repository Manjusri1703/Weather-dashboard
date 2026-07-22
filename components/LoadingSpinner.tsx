import { CloudSun } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* Main Weather Card Skeleton */}
      <div className="w-full rounded-3xl p-6 sm:p-8 bg-slate-900/50 border border-white/10 backdrop-blur-xl space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-white/10 rounded-xl w-48"></div>
          <div className="h-6 bg-white/10 rounded-full w-32"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center my-6">
          <div className="space-y-3">
            <div className="h-16 bg-white/10 rounded-2xl w-36"></div>
            <div className="h-5 bg-white/10 rounded-lg w-48"></div>
          </div>
          <div className="flex justify-center sm:justify-end">
            <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-cyan-500/10 border border-cyan-400/20">
              <CloudSun className="w-12 h-12 text-cyan-400 animate-spin" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 border-t border-white/10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 bg-white/5 rounded-2xl border border-white/5"></div>
          ))}
        </div>
      </div>

      {/* Forecast Section Skeleton */}
      <div className="space-y-4">
        <div className="h-6 bg-white/10 rounded-lg w-44"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-48 bg-slate-900/40 rounded-2xl border border-white/5"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
