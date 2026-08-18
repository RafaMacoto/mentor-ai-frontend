import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  GraduationCap,
  ListChecks,
  Lightbulb,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/mentor/Logo";
import { DashboardPreview } from "@/components/mentor/DashboardPreview";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mentor AI — Requalificação e recolocação profissional com IA" },
      {
        name: "description",
        content:
          "Transforme sua experiência em novas oportunidades: a IA do Mentor AI analisa seu perfil e cria um plano personalizado para voltar ao mercado.",
      },
      { property: "og:title", content: "Mentor AI — Seu mentor de carreira com IA" },
      {
        property: "og:description",
        content:
          "Descubra seus próximos passos, desenvolva novas habilidades e siga um plano de carreira criado por inteligência artificial.",
      },
    ],
  }),
  component: Landing,
});

const steps = [
  {
    icon: UserRound,
    title: "Conte sua experiência",
    text: "Informe suas habilidades, experiência e objetivos em poucos minutos.",
  },
  {
    icon: BrainCircuit,
    title: "A IA analisa seu perfil",
    text: "O Mentor AI identifica oportunidades e habilidades que precisam ser desenvolvidas.",
  },
  {
    icon: ListChecks,
    title: "Receba seu plano",
    text: "Tenha uma trilha personalizada com estudos e tarefas práticas.",
  },
];

const benefits = [
  { icon: Target, title: "Plano personalizado", text: "Uma trilha construída a partir do seu objetivo real de carreira." },
  { icon: Sparkles, title: "Recomendações com IA", text: "Saiba exatamente quais habilidades destravam as vagas que você quer." },
  { icon: GraduationCap, title: "Desenvolvimento de habilidades", text: "Estudos e práticas na ordem certa, sem desperdício de tempo." },
  { icon: BarChart3, title: "Acompanhamento de progresso", text: "Veja sua evolução por fase, tarefa concluída e dias ativos." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#como-funciona" className="transition-colors hover:text-foreground">
              Como funciona
            </a>
            <a href="#beneficios" className="transition-colors hover:text-foreground">
              Benefícios
            </a>
            <a href="#ia" className="transition-colors hover:text-foreground">
              A IA
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link to="/cadastro">Começar agora</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="bg-gradient-hero relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="animate-rise-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">
              <Sparkles className="size-3.5" /> Carreira guiada por inteligência artificial
            </span>
            <h1 className="mt-6 text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-6xl">
              Transforme sua experiência em{" "}
              <span className="text-gradient-ai">novas oportunidades.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Use inteligência artificial para descobrir seus próximos passos, desenvolver novas
              habilidades e construir um plano personalizado para voltar ao mercado de trabalho.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/cadastro">
                  Começar agora <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#como-funciona">Conhecer a plataforma</a>
              </Button>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {[
                ["+12 mil", "planos gerados"],
                ["78%", "avançaram de fase"],
                ["4 min", "para começar"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-2xl font-semibold">{value}</dt>
                  <dd className="text-xs text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="animate-rise-in lg:pl-6">
            <DashboardPreview />
          </div>
        </div>
      </section>

      <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-primary">Como funciona</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Três passos entre onde você está e onde quer chegar
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <div key={title} className="surface-card p-6 transition-all hover:-translate-y-1 hover:shadow-card">
              <div className="flex items-center justify-between">
                <span className="bg-gradient-ai flex size-11 items-center justify-center rounded-2xl">
                  <Icon className="size-5 text-primary-foreground" />
                </span>
                <span className="font-display text-3xl font-semibold text-border">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="beneficios" className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary">Benefícios</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Um mentor que acompanha cada etapa da sua transição
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div key={title} className="surface-card p-6 transition-all hover:-translate-y-1 hover:shadow-card">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ia" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-primary">Inteligência artificial</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              A IA cruza tudo que importa para gerar seu plano
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              O Mentor AI combina o seu objetivo profissional, o histórico de experiências e o mapa
              de habilidades atuais para encontrar lacunas e priorizar o que estudar primeiro — com
              a explicação do porquê de cada recomendação.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Identifica lacunas comparando seu perfil com vagas reais",
                "Prioriza habilidades por impacto na empregabilidade",
                "Reorganiza a trilha conforme você conclui tarefas",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-card p-6 sm:p-8">
            <div className="grid gap-3 sm:grid-cols-3">
              {["Objetivo", "Experiência", "Skills"].map((label) => (
                <div
                  key={label}
                  className="rounded-2xl border border-border bg-muted/50 px-4 py-5 text-center text-sm font-semibold"
                >
                  {label}
                </div>
              ))}
            </div>
            <div className="my-6 flex items-center justify-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="bg-gradient-ai flex size-12 items-center justify-center rounded-2xl shadow-glow">
                <BrainCircuit className="size-6 text-primary-foreground" />
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="rounded-2xl border border-primary/25 bg-accent/60 p-5 text-center">
              <p className="text-xs font-semibold tracking-wide text-accent-foreground uppercase">
                Resultado
              </p>
              <p className="font-display mt-2 text-xl font-semibold">Plano de Desenvolvimento</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Fases, tarefas práticas, tempo estimado e prioridade de cada skill.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="bg-gradient-ai relative overflow-hidden rounded-3xl px-6 py-16 text-center shadow-glow sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-primary-foreground sm:text-4xl">
            Pronto para dar o próximo passo na sua carreira?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/80 sm:text-base">
            Leva poucos minutos para gerar seu primeiro plano de desenvolvimento.
          </p>
          <Button size="lg" variant="secondary" asChild className="mt-9">
            <Link to="/cadastro">
              Criar meu plano <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <Logo />
          <p>© 2026 Mentor AI. Requalificação e recolocação profissional.</p>
        </div>
      </footer>
    </div>
  );
}
