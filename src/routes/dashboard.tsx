import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Clock3, Sparkles, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/mentor/AppShell";
import { useMentor } from "@/lib/mentor/store";
export const Route = createFileRoute("/dashboard")({ component: Dashboard });
function Dashboard() {
  const { profile, stats, nextTask, plan, loading } = useMentor();
  return (
    <AppShell>
      {loading ? (
        <p className="text-muted-foreground">Carregando sua jornada...</p>
      ) : (
        <div>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-primary">Sua jornada</p>
              <h1 className="mt-1 text-3xl font-semibold">
                Olá, {profile.name.split(" ")[0] || ""} 👋
              </h1>
              <p className="mt-2 text-muted-foreground">
                Vamos continuar construindo seu próximo passo profissional.
              </p>
            </div>
            <Button asChild>
              <Link to="/mentor-ai">
                Consultar Mentor AI <Sparkles />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="surface-card p-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="size-4 text-primary" /> Objetivo atual
              </div>
              <p className="mt-4 font-semibold">
                {profile.goal || "Complete o onboarding para definir seu objetivo."}
              </p>
            </div>
            <div className="surface-card p-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="size-4 text-primary" /> Progresso
              </div>
              <div className="mt-4 flex items-end justify-between">
                <span className="font-display text-3xl font-semibold">{stats.progress}%</span>
                <span className="text-xs text-muted-foreground">
                  {stats.doneTasks}/{stats.totalTasks} tarefas
                </span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-ai"
                  style={{ width: `${stats.progress}%` }}
                />
              </div>
            </div>
            <div className="surface-card p-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="size-4 text-primary" /> Skills cadastradas
              </div>
              <p className="mt-4 font-display text-3xl font-semibold">{stats.skillsDeveloped}</p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
            <div className="surface-card p-6">
              <p className="text-sm font-semibold text-primary">Próxima ação</p>
              <h2 className="mt-1 text-xl font-semibold">
                {nextTask?.title ?? "Seu plano ainda não possui tarefas"}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {nextTask?.description ??
                  "Complete o onboarding para gerar um plano personalizado."}
              </p>
              <div className="mt-5">
                <Button asChild>
                  <Link to={nextTask ? "/plano" : "/onboarding"}>
                    {nextTask ? "Abrir meu plano" : "Criar meu plano"} <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="surface-card p-6">
              <div className="flex items-center gap-2">
                <Sparkles className="size-5 text-primary" />
                <h2 className="font-semibold">Mentor AI</h2>
              </div>
              <p className="mt-4 whitespace-pre-line text-sm text-muted-foreground">
                {plan?.phases[0]?.summary ??
                  "A IA vai analisar seu objetivo e skills para criar sua trilha."}
              </p>
              <Button variant="outline" className="mt-5 w-full" asChild>
                <Link to="/mentor-ai">Ver recomendação</Link>
              </Button>
            </div>
          </div>
          <div className="mt-8 rounded-2xl border border-primary/20 bg-accent/50 p-5">
            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 size-5 text-primary" />
              <div>
                <p className="font-semibold">Seu progresso é baseado nos dados reais do plano.</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ao concluir tarefas, o dashboard é atualizado automaticamente.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
