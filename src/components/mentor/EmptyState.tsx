import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="surface-card flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
        <Icon className="size-6" />
      </span>
      <h3 className="font-display mt-5 text-xl font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
