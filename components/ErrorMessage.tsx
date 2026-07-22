import { AlertTriangle, RefreshCw, MapPinOff } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 bg-rose-950/40 border border-rose-500/30 backdrop-blur-2xl shadow-2xl text-center space-y-4">
      <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
        <MapPinOff className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          Weather Search Failed
        </h3>
        <p className="text-sm text-rose-200/80 max-w-md mx-auto leading-relaxed">
          {message}
        </p>
      </div>

      {onRetry && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500/20 border border-rose-400/40 hover:bg-rose-500/30 text-rose-200 text-sm font-semibold transition-all duration-200 active:scale-95 shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
            Try Searching Again
          </button>
        </div>
      )}
    </div>
  );
}
