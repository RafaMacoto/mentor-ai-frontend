import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  api,
  isAuthenticated,
  type PlanningResponse,
  type SkillResponse,
  type UserResponse,
} from "@/lib/api";
import type { DevelopmentPlan, PlanTask, Recommendation, UserProfile } from "./types";
interface MentorState {
  profile: UserProfile;
  plan: DevelopmentPlan | null;
  recommendations: Recommendation[];
  loading: boolean;
  error: string;
  hasPlan: boolean;
  stats: {
    totalTasks: number;
    doneTasks: number;
    pendingTasks: number;
    progress: number;
    skillsDeveloped: number;
    activeDays: number;
  };
  nextTask: PlanTask | null;
  refresh: () => Promise<void>;
  updateProfile: (patch: Partial<UserProfile>) => Promise<void>;
  toggleTask: (taskId: string) => Promise<boolean>;
  createPlan: (goal: string, skills: string[]) => Promise<void>;
}
const MentorContext = createContext<MentorState | null>(null);
const emptyProfile: UserProfile = {
  id: "",
  name: "",
  email: "",
  area: "",
  yearsOfExperience: "",
  situation: "",
  goal: "",
  skills: [],
  experiences: [],
  createdAt: "",
};
function cleanAiText(value: string): string {
  return value
    .replace(/\*\*/g, "")
    .replace(/__/g, "")
    .replace(/`/g, "")
    .split("\n")
    .map((line) => line.replace(/^\s*[-*_#]+\s*/, "").trim())
    .filter(Boolean)
    .join("\n")
    .trim();
}
function mapPlan(p: PlanningResponse): DevelopmentPlan {
  const tasks = p.items
    .map((i) => {
      const text = cleanAiText(i.description);
      return {
        id: String(i.id),
        title: text,
        description: text,
        category: "Prática" as const,
        difficulty: "Intermediário" as const,
        estimatedTime: "",
        done: i.completed,
      };
    })
    .filter((task) => task.title.length > 0);
  return {
    id: String(p.id),
    title: "Plano de desenvolvimento",
    goal: p.goal,
    phases: [
      {
        id: `planning-${p.id}`,
        title: "Plano personalizado",
        summary: cleanAiText(p.recommendation),
        status: p.items.length && p.items.every((i) => i.completed) ? "CONCLUIDO" : "EM_ANDAMENTO",
        tasks,
      },
    ],
  };
}
function mapProfile(user: UserResponse, skills: SkillResponse[], goal: string): UserProfile {
  return {
    id: String(user.id),
    name: user.name,
    email: user.email,
    area: "",
    yearsOfExperience: "",
    situation: "",
    goal,
    skills: skills.map((s) => ({ id: String(s.id), name: s.name, level: "Intermediário" })),
    experiences: [],
    createdAt: user.createdAt,
  };
}
export function MentorProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState(emptyProfile);
  const [plan, setPlan] = useState<DevelopmentPlan | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const refresh = useCallback(async () => {
    if (!isAuthenticated()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const [userResult, skillsResult, plansResult] = await Promise.allSettled([
        api.getCurrentUser(),
        api.getSkills(),
        api.getPlannings(),
      ]);
      const user = userResult.status === "fulfilled" ? userResult.value : null;
      const skills = skillsResult.status === "fulfilled" ? skillsResult.value : [];
      const plans = plansResult.status === "fulfilled" ? plansResult.value : [];
      const latest =
        [...plans].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))[0] ?? null;
      if (user) {
        setProfile(mapProfile(user, skills, latest?.goal ?? ""));
      } else {
        setProfile((current) => ({ ...current, goal: latest?.goal ?? current.goal, skills: skills.map((skill) => ({ id: String(skill.id), name: skill.name, level: "Intermediário" })) }));
      }
      if (plansResult.status === "fulfilled") setPlan(latest ? mapPlan(latest) : null);
      setRecommendations(
        latest
          ? [
              {
                id: `plan-${latest.id}`,
                skill: "Plano personalizado",
                priority: "Alta",
                reason: latest.recommendation,
                estimatedTime: "",
                added: true,
              },
            ]
          : [],
      );
      const failures = [userResult, skillsResult, plansResult]
        .filter((result): result is PromiseRejectedResult => result.status === "rejected")
        .map((result) => (result.reason instanceof Error ? result.reason.message : "Falha ao carregar dados"));
      if (failures.length) setError(failures.join(" "));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível carregar seus dados.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void refresh();
  }, [refresh]);
  const updateProfile = useCallback(
    async (patch: Partial<UserProfile>) => {
      const user = await api.updateCurrentUser(
        patch.name ?? profile.name,
        patch.email ?? profile.email,
      );
      setProfile((p) => ({ ...p, ...patch, name: user.name, email: user.email }));
    },
    [profile],
  );
  const toggleTask = useCallback(
    async (taskId: string) => {
      if (!plan) return false;
      const task = plan.phases.flatMap((p) => p.tasks).find((t) => t.id === taskId);
      if (!task) return false;
      const updated = await api.updatePlanningItem(
        Number(plan.id),
        Number(taskId),
        task.description,
        !task.done,
      );
      setPlan(mapPlan(updated));
      return !task.done;
    },
    [plan],
  );
  const createPlan = useCallback(
    async (goal: string, skills: string[]) => {
      const created = await api.createPlanning(goal, skills);
      const existing = new Set(profile.skills.map((skill) => skill.name.trim().toLowerCase()));
      const newSkills = skills.filter((name) => !existing.has(name.trim().toLowerCase()));
      await Promise.allSettled(newSkills.map((name) => api.createSkill(name)));
      setPlan(mapPlan(created));
      setProfile((current) => ({ ...current, goal }));
      await refresh();
    },
    [profile.skills, refresh],
  );
  const value = useMemo(() => {
    const tasks = plan?.phases.flatMap((p) => p.tasks) ?? [];
    const done = tasks.filter((t) => t.done).length;
    return {
      profile,
      plan,
      recommendations,
      loading,
      error,
      hasPlan: Boolean(plan),
      stats: {
        totalTasks: tasks.length,
        doneTasks: done,
        pendingTasks: tasks.length - done,
        progress: tasks.length ? Math.round((done / tasks.length) * 100) : 0,
        skillsDeveloped: profile.skills.length,
        activeDays: 0,
      },
      nextTask: tasks.find((t) => !t.done) ?? null,
      refresh,
      updateProfile,
      toggleTask,
      createPlan,
    };
  }, [
    profile,
    plan,
    recommendations,
    loading,
    error,
    refresh,
    updateProfile,
    toggleTask,
    createPlan,
  ]);
  return <MentorContext.Provider value={value}>{children}</MentorContext.Provider>;
}
export function useMentor() {
  const ctx = useContext(MentorContext);
  if (!ctx) throw new Error("useMentor deve ser usado dentro de MentorProvider");
  return ctx;
}
