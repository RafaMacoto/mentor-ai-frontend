// Tipos alinhados ao futuro contrato da API REST (Spring Boot).
// Substituir os mocks por chamadas HTTP mantendo estes tipos.

export type SkillLevel = "Iniciante" | "Intermediário" | "Avançado";
export type TaskCategory = "Prática" | "Estudo" | "Projeto" | "Revisão";
export type TaskDifficulty = "Fácil" | "Intermediário" | "Avançado";
export type PhaseStatus = "CONCLUIDO" | "EM_ANDAMENTO" | "BLOQUEADO";
export type Priority = "Alta" | "Média" | "Baixa";

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  area: string;
  yearsOfExperience: string;
  situation: string;
  goal: string;
  skills: Skill[];
  experiences: Experience[];
  createdAt: string;
}

export interface PlanTask {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  difficulty: TaskDifficulty;
  estimatedTime: string;
  done: boolean;
}

export interface PlanPhase {
  id: string;
  title: string;
  summary: string;
  status: PhaseStatus;
  tasks: PlanTask[];
}

export interface DevelopmentPlan {
  id: string;
  title: string;
  goal: string;
  phases: PlanPhase[];
}

export interface Recommendation {
  id: string;
  skill: string;
  priority: Priority;
  reason: string;
  estimatedTime: string;
  added: boolean;
}

export interface WeeklyProgress {
  week: string;
  tasks: number;
  hours: number;
}
