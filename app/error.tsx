"use client";

import { useEffect } from "react";
import ErrorMessage from "@/components/ErrorMessage";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error bound captured:", error);
  }, [error]);

  return (
    <div className="py-12 flex items-center justify-center">
      <ErrorMessage
        message={error.message || "An unexpected error occurred."}
        onRetry={() => reset()}
      />
    </div>
  );
}
