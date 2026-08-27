"use client";
import NextError from "@/components/next-files/NextError";

// Error boundaries must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <NextError error={error} reset={reset} />
    </div>
  );
}
