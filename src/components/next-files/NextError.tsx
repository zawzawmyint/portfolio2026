import BaseContainer from "@/components/global/base-container/BaseContainer";
import { Button } from "@/components/ui/button";
import { HomeIcon, RefreshCwIcon } from "lucide-react";
import Link from "next/link";
import { CardSpotlight } from "../ui/aceternity/card-spotlight";

// Error boundaries must be Client Components

export default function NextError({
  error,
  reset,
  children,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  children?: React.ReactNode;
}) {
  return (
    <BaseContainer>
      <div className="flex min-h-[60vh] items-center justify-center">
        <CardSpotlight className="w-full max-w-xl p-8 text-center sm:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-brand">Unexpected error</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Something went wrong</h2>
          <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
          <div>{children}</div>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button onClick={() => reset()}>
            <RefreshCwIcon /> Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/"><HomeIcon /> Go Home</Link>
          </Button>
        </div>
        </CardSpotlight>
      </div>
    </BaseContainer>
  );
}
