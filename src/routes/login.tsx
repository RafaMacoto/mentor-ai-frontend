import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BrainCircuit, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/mentor/Logo";
import { api, setAuth } from "@/lib/api";
import { useMentor } from "@/lib/mentor/store";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const { refresh } = useMentor();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = await api.login(email, password);
      setAuth(token);
      await refresh();
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível entrar.");
    } finally {
      setLoading(false);
    }
  }

  return <main className="min-h-screen bg-background lg:grid lg:grid-cols-2"><section className="hidden bg-gradient-ai p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between"><Logo /><div className="max-w-lg pb-16"><span className="flex size-12 items-center justify-center rounded-2xl bg-primary-foreground/15"><BrainCircuit /></span><h1 className="mt-6 text-4xl font-semibold leading-tight">Seu próximo passo profissional começa aqui.</h1><p className="mt-4 text-primary-foreground/80">Acompanhe seu plano, descubra novas habilidades e avance com recomendações personalizadas.</p></div><p className="text-sm text-primary-foreground/60">Mentor AI · Requalificação profissional</p></section><section className="flex min-h-screen items-center justify-center px-5 py-10"><div className="w-full max-w-md"><div className="lg:hidden"><Logo /></div><div className="mt-10 lg:mt-0"><p className="text-sm font-semibold text-primary">Bem-vindo de volta</p><h2 className="mt-2 text-3xl font-semibold">Entre na sua jornada</h2><p className="mt-2 text-sm text-muted-foreground">Continue de onde parou no seu plano de carreira.</p></div><form className="mt-8 space-y-5" onSubmit={handleSubmit}><div className="space-y-2"><Label htmlFor="email">Email</Label><div className="relative"><Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="email" type="email" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" required /></div></div><div className="space-y-2"><div className="flex justify-between"><Label htmlFor="password">Senha</Label><button type="button" className="text-xs font-medium text-primary">Esqueci minha senha</button></div><div className="relative"><Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="password" type="password" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} required /></div></div>{error && <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}<label className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" className="size-4 rounded" /> Lembrar de mim</label><Button disabled={loading} className="w-full" size="lg">{loading ? "Entrando..." : "Entrar"} <ArrowRight className="size-4" /></Button></form><p className="mt-7 text-center text-sm text-muted-foreground">Ainda não possui uma conta? <Link to="/cadastro" className="font-semibold text-primary">Criar conta</Link></p></div></section></main>;
}
