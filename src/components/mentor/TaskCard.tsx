import { Clock, Gauge, Layers, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PlanTask } from "@/lib/mentor/types";

export function TaskCard({
  task,
  onToggle,
  locked,
  highlighted,
  onStart,
}: {
  task: PlanTask;
  onToggle?: () => void;
  locked?: boolean;
  highlighted?: boolean;
  onStart?: () => void;
}) {
  return (
    <div
      className={cn(
        "surface-card group p-5 transition-all",
        highlighted && "border-primary/30 shadow-card",
        locked && "opacity-60",
        !locked && "hover:-translate-y-0.5 hover:shadow-card",
      )}
    >
      <div className="flex items-start gap-4">
        {onToggle ? (
          <Checkbox
            checked={task.done}
            disabled={locked}
            onCheckedChange={onToggle}
            aria-label={`Concluir ${task.title}`}
            className="mt-1"
          />
        ) : (
          <span className="bg-gradient-ai mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl">
            <Check className="size-4 text-primary-foreground" />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h3
            className={cn(
              "font-display text-base font-semibold",
              task.done && "text-muted-foreground line-through",
            )}
          >
            {task.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{task.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Layers className="size-3.5" /> {task.category}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Gauge className="size-3.5" /> {task.difficulty}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" /> {task.estimatedTime}
            </span>
          </div>
          {onStart ? (
            <Button className="mt-5 w-full sm:w-auto" onClick={onStart}>
              Começar tarefa
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
