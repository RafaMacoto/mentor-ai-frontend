import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function SkillChip({
  label,
  level,
  onRemove,
  onClick,
  active,
  className,
}: {
  label: string;
  level?: string;
  onRemove?: () => void;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}) {
  const base = cn(
    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
    active
      ? "border-primary/30 bg-accent text-accent-foreground"
      : "border-border bg-card text-foreground hover:border-primary/30 hover:bg-accent",
    className,
  );

  const content = (
    <>
      <span>{label}</span>
      {level ? <span className="text-xs text-muted-foreground">{level}</span> : null}
      {onRemove ? (
        <button
          type="button"
          aria-label={`Remover ${label}`}
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
          className="text-muted-foreground transition-colors hover:text-destructive"
        >
          <X className="size-3.5" />
        </button>
      ) : null}
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={base}>
        {content}
      </button>
    );
  }

  return <span className={base}>{content}</span>;
}
