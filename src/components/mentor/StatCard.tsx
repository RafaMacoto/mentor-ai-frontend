import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("surface-card p-5 transition-shadow hover:shadow-card", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
          <Icon className="size-4.5" />
        </span>
      </div>
      <p className="font-display mt-4 text-3xl font-semibold">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
