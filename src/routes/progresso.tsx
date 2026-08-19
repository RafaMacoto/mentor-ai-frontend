import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Flame, Target, Trophy } from "lucide-react";
import { AppShell } from "@/components/mentor/AppShell";
import { useMentor } from "@/lib/mentor/store";
export const Route = createFileRoute("/progresso")({ component: Progresso });
function Progresso() {
  const { profile, plan, loading, stats } = useMentor();
  const completedTasks = plan?.phases.flatMap((phase) => phase.tasks).filter((task) => task.done) ?? [];

  if (loading)
    return (
      <AppShell>
        <p className="text-muted-foreground">Carregando seu progresso...</p>
      </AppShell>
    );

  return (
    <AppShell>
      <div>
        <p className="text-sm font-semibold text-primary">Sua evolução</p>
        <h1 className="mt-1 text-3xl font-semibold">Progresso</h1>
        <p className="mt-2 text-muted-foreground">
          Acompanhe o quanto você já avançou no seu plano.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Target, "Progresso geral", `${stats.progress}%`],
            [CheckCircle2, "Tarefas concluídas", `${stats.doneTasks} / ${stats.totalTasks}`],
            [Trophy, "Skills cadastradas", String(stats.skillsDeveloped)],
            [Flame, "Dias ativos", "Indisponível"],
          ].map(([Icon, label, value]) => {
            const I = Icon as typeof Target;
            return (
              <div key={label as string} className="surface-card p-5">
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <I className="size-5" />
                </span>
                <p className="mt-4 text-xs text-muted-foreground">{label as string}</p>
                <p className="mt-1 font-display text-2xl font-semibold">{value as string}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="surface-card p-6">
            <h2 className="font-semibold">Skills cadastradas</h2>
            <p className="mt-1 text-sm text-muted-foreground">Dados carregados do seu perfil.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span key={skill.id} className="rounded-full bg-accent px-3 py-1.5 text-sm font-medium">
                  {skill.name}
                </span>
              ))}
              {!profile.skills.length && <p className="text-sm text-muted-foreground">Nenhuma skill cadastrada.</p>}
            </div>
          </div>
        </div>
        <div className="mt-6 surface-card p-6">
          <h2 className="font-semibold">Histórico recente</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {completedTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 rounded-xl border border-border p-4">
                <CheckCircle2 className="size-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-xs text-muted-foreground">Concluído no plano atual</p>
                </div>
              </div>
            ))}
            {!completedTasks.length && <p className="text-sm text-muted-foreground">Nenhuma tarefa concluída ainda.</p>}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
