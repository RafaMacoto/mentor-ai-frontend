import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  mockPlan,
  mockProfile,
  mockRecommendations,
  mockWeeklyProgress,
} from "./mock-data";
import type {
  DevelopmentPlan,
  PlanTask,
  Recommendation,
  UserProfile,
} from "./types";

interface MentorState {
  profile: UserProfile;
  plan: DevelopmentPlan | null;
  recommendations: Recommendation[];
  weekly: typeof mockWeeklyProgress;
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
  updateProfile: (patch: Partial<UserProfile>) => void;
  toggleTask: (taskId: string) => boolean;
  addRecommendationToPlan: (recommendationId: string) => void;
  generatePlan: () => void;
  clearPlan: () => void;
}

const MentorContext = createContext<MentorState | null>(null);

export function MentorProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [plan, setPlan] = useState<DevelopmentPlan | null>(mockPlan);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(mockRecommendations);

  const updateProfile = useCallback((patch: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...patch }));
  }, []);

  const toggleTask = useCallback((taskId: string) => {
    let becameDone = false;
    setPlan((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        phases: prev.phases.map((phase) => ({
          ...phase,
          tasks: phase.tasks.map((task) => {
            if (task.id !== taskId) return task;
            becameDone = !task.done;
            return { ...task, done: !task.done };
          }),
        })),
      };
    });
    return becameDone;
  }, []);

  const addRecommendationToPlan = useCallback((recommendationId: string) => {
    setRecommendations((prev) =>
      prev.map((rec) => (rec.id === recommendationId ? { ...rec, added: true } : rec)),
    );
    setPlan((prev) => {
      if (!prev) return prev;
      const rec = mockRecommendations.find((r) => r.id === recommendationId);
      if (!rec) return prev;
      const newTask: PlanTask = {
        id: `task_${rec.id}`,
        title: `Estudar ${rec.skill}`,
        description: rec.reason,
        category: "Estudo",
        difficulty: "Intermediário",
        estimatedTime: rec.estimatedTime,
        done: false,
      };
      return {
        ...prev,
        phases: prev.phases.map((phase, index) =>
          index === 1 && !phase.tasks.some((t) => t.id === newTask.id)
            ? { ...phase, tasks: [...phase.tasks, newTask] }
            : phase,
        ),
      };
    });
  }, []);

  const generatePlan = useCallback(() => setPlan(mockPlan), []);
  const clearPlan = useCallback(() => setPlan(null), []);

  const value = useMemo<MentorState>(() => {
    const tasks = plan?.phases.flatMap((p) => p.tasks) ?? [];
    const doneTasks = tasks.filter((t) => t.done).length;
    const totalTasks = tasks.length;
    const nextTask = tasks.find((t) => !t.done) ?? null;

    return {
      profile,
      plan,
      recommendations,
      weekly: mockWeeklyProgress,
      hasPlan: Boolean(plan),
      stats: {
        totalTasks,
        doneTasks,
        pendingTasks: totalTasks - doneTasks,
        progress: totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0,
        skillsDeveloped: 5,
        activeDays: 8,
      },
      nextTask,
      updateProfile,
      toggleTask,
      addRecommendationToPlan,
      generatePlan,
      clearPlan,
    };
  }, [
    profile,
    plan,
    recommendations,
    updateProfile,
    toggleTask,
    addRecommendationToPlan,
    generatePlan,
    clearPlan,
  ]);

  return <MentorContext.Provider value={value}>{children}</MentorContext.Provider>;
}

export function useMentor() {
  const ctx = useContext(MentorContext);
  if (!ctx) throw new Error("useMentor deve ser usado dentro de MentorProvider");
  return ctx;
}
