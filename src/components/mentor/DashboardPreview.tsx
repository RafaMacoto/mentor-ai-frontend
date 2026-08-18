import { Sparkles, TrendingUp, Target, CheckCircle2 } from "lucide-react";

export function DashboardPreview() {
  return (
    <div className="relative">
      <div className="bg-gradient-ai absolute -inset-6 rounded-[2.5rem] opacity-15 blur-2xl" />
      <div className="surface-card relative overflow-hidden rounded-3xl p-5 shadow-card sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Objetivo atual</p>
            <p className="font-display mt-1 text-sm font-semibold">
              Primeira vaga em backend
            </p>
          </div>
          <span className="bg-gradient-ai flex size-9 items-center justify-center rounded-xl">
            <Sparkles className="size-4 text-primary-foreground" />
          </span>
        </div>

        <div className="mt-5 rounded-2xl bg-muted/60 p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progresso do plano</span>
            <span className="font-semibold text-foreground">42%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
            <div className="bg-gradient-ai h-full w-[42%] rounded-full" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {[
            { icon: CheckCircle2, label: "Tarefas", value: "12 / 28" },
            { icon: TrendingUp, label: "Dias ativos", value: "8" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl border border-border p-4">
              <Icon className="size-4 text-primary" />
              <p className="mt-2 text-xs text-muted-foreground">{label}</p>
              <p className="font-display text-lg font-semibold">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {["Java", "Spring Boot", "SQL", "Git"].map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-primary/25 bg-accent/60 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-accent-foreground">
            <Target className="size-3.5" /> Recomendação da IA
          </div>
          <p className="mt-2 text-sm text-foreground">
            Fortaleça <strong>Spring Security</strong> para destravar vagas júnior.
          </p>
        </div>
      </div>

      <div className="surface-card absolute -bottom-6 -left-4 hidden animate-float-slow items-center gap-3 rounded-2xl px-4 py-3 sm:flex">
        <span className="bg-success/15 flex size-9 items-center justify-center rounded-xl">
          <CheckCircle2 className="size-4 text-success" />
        </span>
        <div>
          <p className="text-xs text-muted-foreground">Tarefa concluída</p>
          <p className="text-sm font-semibold">Praticar Collections</p>
        </div>
      </div>
    </div>
  );
}
