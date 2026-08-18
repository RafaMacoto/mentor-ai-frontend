const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";
export interface TokenResponse { token: string; email: string; expiresInMinutes: number; }
export interface UserResponse { id: number; name: string; email: string; createdAt: string; }
export interface SkillResponse { id: number; name: string; userName: string; }
export interface PlanningItemResponse { id: number; description: string; completed: boolean; }
export interface PlanningResponse { id: number; goal: string; recommendation: string; createdAt: string; userId: number; items: PlanningItemResponse[]; }

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("mentorai_token");
  const headers = new Headers(options.headers); headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (!response.ok) { let message = `Erro ${response.status}`; try { const body = await response.json(); if (body.message) message = body.message; } catch {} throw new Error(message); }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
function tokenSubject(): number | null { const token = localStorage.getItem("mentorai_token"); if (!token) return null; try { const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))); return Number(payload.sub) || null; } catch { return null; } }
export const api = {
  login: (login: string, password: string) => request<TokenResponse>("/login", { method: "POST", body: JSON.stringify({ login, password }) }),
  register: (name: string, email: string, password: string) => request<UserResponse>("/user/register", { method: "POST", body: JSON.stringify({ name, email, password }) }),
  getCurrentUser: () => { const id = tokenSubject(); if (!id) throw new Error("Sessão inválida"); return request<UserResponse>(`/user/${id}`); },
  updateUser: (id: number, name: string, email: string) => request<UserResponse>(`/user/${id}`, { method: "PUT", body: JSON.stringify({ name, email }) }),
  getSkills: () => request<SkillResponse[]>("/skills"),
  createSkill: (name: string) => request<SkillResponse>("/skills", { method: "POST", body: JSON.stringify({ name }) }),
  updateSkill: (id: number, name: string) => request<SkillResponse>(`/skills/${id}`, { method: "PUT", body: JSON.stringify({ name }) }),
  deleteSkill: (id: number) => request<void>(`/skills/${id}`, { method: "DELETE" }),
  getPlannings: () => request<PlanningResponse[]>("/planning"),
  getPlanning: (id: number) => request<PlanningResponse>(`/planning/${id}`),
  createPlanning: (goal: string, skills: string[]) => request<PlanningResponse>("/planning", { method: "POST", body: JSON.stringify({ goal, skills }) }),
  updatePlanningItem: (planningId: number, itemId: number, description: string, completed: boolean) => request<PlanningResponse>(`/planning/${planningId}/item/${itemId}`, { method: "PUT", body: JSON.stringify({ description, completed }) }),
  deletePlanning: (id: number) => request<void>(`/planning/${id}`, { method: "DELETE" }),
  deletePlanningItem: (planningId: number, itemId: number) => request<void>(`/planning/${planningId}/item/${itemId}`, { method: "DELETE" }),
};
export function setAuth(response: TokenResponse) { localStorage.setItem("mentorai_token", response.token); localStorage.setItem("mentorai_email", response.email); localStorage.setItem("mentorai_expires_at", String(Date.now() + response.expiresInMinutes * 60_000)); }
export function clearAuth() { localStorage.removeItem("mentorai_token"); localStorage.removeItem("mentorai_email"); localStorage.removeItem("mentorai_expires_at"); }
export function isAuthenticated() { const token = localStorage.getItem("mentorai_token"); const expiresAt = Number(localStorage.getItem("mentorai_expires_at")); return Boolean(token && (!expiresAt || Date.now() < expiresAt)); }
