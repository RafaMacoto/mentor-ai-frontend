import { Check, Clock, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Recommendation } from "@/lib/mentor/types";

const priorityStyles: Record<Recommendation["priority"], string> = {
  Alta: "bg-destructive/10 text-destructive",
  Média: "bg-warning/20 text-warning-foreground",
  Baixa: "bg-muted text-muted-foreground",
};

export function RecommendationCard({
  recommendation,
  onAdd,
}: {
  recommendation: Recommendation;
  onAdd?: () => void;
}) {
  return (
    <div className="surface-card flex h-full flex-col p-6 transition-all hover:-translate-y-0.5 hover:shadow-card">
      <div className="flex items-start justify-between gap-3">
        <span className="bg-gradient-ai flex size-10 items-center justify-center rounded-xl">
          <Sparkles className="size-5 text-primary-foreground" />
        </span>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold",
            priorityStyles[recommendation.priority],
          )}
        >
          Prioridade {recommendation.priority}
        </span>
      </div>
      <h3 className="font-display mt-4 text-lg font-semibold">{recommendation.skill}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {recommendation.reason}
      </p>
      <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="size-3.5" /> Estimativa: {recommendation.estimatedTime}
      </div>
      {onAdd ? (
        <Button
          variant={recommendation.added ? "secondary" : "default"}
          disabled={recommendation.added}
          onClick={onAdd}
          className="mt-5"
        >
          {recommendation.added ? (
            <>
              <Check className="size-4" /> Adicionado ao plano
            </>
          ) : (
            <>
              <Plus className="size-4" /> Adicionar ao meu plano
            </>
          )}
        </Button>
      ) : null}
    </div>
  );
}
