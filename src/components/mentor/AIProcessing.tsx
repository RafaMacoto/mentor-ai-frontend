import { useEffect, useState } from "react";
import { Check, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function AIProcessing({
  steps,
  onComplete,
  stepDuration = 1200,
}: {
  steps: string[];
  onComplete?: () => void;
  stepDuration?: number;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= steps.length) {
      onComplete?.();
      return;
    }
    const timer = setTimeout(() => setCurrent((c) => c + 1), stepDuration);
    return () => clearTimeout(timer);
  }, [current, steps.length, stepDuration, onComplete]);

  return (
    <div className="mx-auto max-w-md text-center">
      <div className="relative mx-auto flex size-24 items-center justify-center">
        <span className="bg-gradient-ai absolute inset-0 animate-pulse-ring rounded-full opacity-90" />
        <Sparkles className="relative size-9 animate-float-slow text-primary-foreground" />
      </div>
      <h2 className="font-display mt-8 text-2xl font-semibold">Mentor AI está trabalhando</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Estamos cruzando seu objetivo, sua experiência e suas habilidades.
      </p>
      <ul className="mt-8 space-y-3 text-left">
        {steps.map((step, index) => {
          const done = index < current;
          const active = index === current;
          return (
            <li
              key={step}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all",
                done && "border-success/30 bg-success/10 text-foreground",
                active && "border-primary/30 bg-accent text-accent-foreground",
                !done && !active && "border-border bg-card text-muted-foreground opacity-60",
              )}
            >
              {done ? (
                <Check className="size-4 text-success" />
              ) : active ? (
                <Loader2 className="size-4 animate-spin text-primary" />
              ) : (
                <span className="size-4 rounded-full border border-border" />
              )}
              {step}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
