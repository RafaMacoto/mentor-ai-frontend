import type {
  DevelopmentPlan,
  Recommendation,
  UserProfile,
  WeeklyProgress,
} from "./types";

// Camada de dados mockada. Futuro: GET /api/profile, /api/plan, /api/recommendations
export const mockProfile: UserProfile = {
  id: "usr_1",
  name: "Rafael",
  email: "rafael@mentorai.com",
  area: "Tecnologia da Informação",
  yearsOfExperience: "3-5 anos",
  situation: "Quero mudar de carreira",
  goal: "Conseguir minha primeira vaga em desenvolvimento backend",
  skills: [
    { id: "sk1", name: "Java", level: "Intermediário" },
    { id: "sk2", name: "Spring Boot", level: "Iniciante" },
    { id: "sk3", name: "SQL", level: "Avançado" },
    { id: "sk4", name: "Git", level: "Intermediário" },
    { id: "sk5", name: "Excel", level: "Avançado" },
    { id: "sk6", name: "Comunicação", level: "Avançado" },
  ],
  experiences: [
    {
      id: "ex1",
      role: "Analista de Suporte Técnico",
      company: "TecnoSol Sistemas",
      period: "2021 — 2024",
      description:
        "Atendimento a clientes corporativos, análise de logs, consultas SQL em bases Oracle e documentação de incidentes.",
    },
    {
      id: "ex2",
      role: "Assistente Administrativo",
      company: "Grupo Andrade",
      period: "2018 — 2021",
      description:
        "Controle de rotinas administrativas, automação de planilhas e apoio à gestão de indicadores da operação.",
    },
  ],
  createdAt: "2026-03-02",
};

export const mockPlan: DevelopmentPlan = {
  id: "plan_1",
  title: "Trilha Backend Java",
  goal: mockProfile.goal,
  phases: [
    {
      id: "ph1",
      title: "Fase 1 — Fundamentos",
      summary: "Consolidar a base de Java e lógica orientada a objetos.",
      status: "CONCLUIDO",
      tasks: [
        {
          id: "t1",
          title: "Revisar fundamentos de Java",
          description: "Tipos, controle de fluxo, exceções e boas práticas de código.",
          category: "Estudo",
          difficulty: "Fácil",
          estimatedTime: "3h",
          done: true,
        },
        {
          id: "t2",
          title: "Revisar orientação a objetos",
          description: "Herança, composição, interfaces e princípios SOLID aplicados.",
          category: "Estudo",
          difficulty: "Intermediário",
          estimatedTime: "4h",
          done: true,
        },
        {
          id: "t3",
          title: "Praticar Collections",
          description: "List, Map, Set, Streams e exercícios de manipulação de dados.",
          category: "Prática",
          difficulty: "Intermediário",
          estimatedTime: "3h",
          done: true,
        },
      ],
    },
    {
      id: "ph2",
      title: "Fase 2 — Backend",
      summary: "Construir APIs reais com Spring Boot, segurança e testes.",
      status: "EM_ANDAMENTO",
      tasks: [
        {
          id: "t4",
          title: "Criar uma API REST utilizando Spring Boot",
          description:
            "Modelar entidades, criar controllers, services e repositórios com Spring Data JPA.",
          category: "Prática",
          difficulty: "Intermediário",
          estimatedTime: "2h",
          done: false,
        },
        {
          id: "t5",
          title: "Trabalhar com Spring Boot na prática",
          description: "Configuração, profiles, validação de dados e tratamento de erros.",
          category: "Prática",
          difficulty: "Intermediário",
          estimatedTime: "4h",
          done: true,
        },
        {
          id: "t6",
          title: "Implementar autenticação",
          description: "Spring Security com JWT, roles e proteção de endpoints.",
          category: "Projeto",
          difficulty: "Avançado",
          estimatedTime: "5h",
          done: false,
        },
        {
          id: "t7",
          title: "Criar testes automatizados",
          description: "JUnit 5 e Mockito para camadas de service e controller.",
          category: "Prática",
          difficulty: "Intermediário",
          estimatedTime: "4h",
          done: false,
        },
      ],
    },
    {
      id: "ph3",
      title: "Fase 3 — Cloud e DevOps",
      summary: "Colocar sua aplicação no ar e dominar o ciclo de entrega.",
      status: "BLOQUEADO",
      tasks: [
        {
          id: "t8",
          title: "Docker",
          description: "Containerizar a API e orquestrar banco de dados local.",
          category: "Prática",
          difficulty: "Intermediário",
          estimatedTime: "3h",
          done: false,
        },
        {
          id: "t9",
          title: "CI/CD",
          description: "Pipeline de build, testes e deploy automatizado.",
          category: "Projeto",
          difficulty: "Avançado",
          estimatedTime: "4h",
          done: false,
        },
        {
          id: "t10",
          title: "Cloud",
          description: "Publicar a aplicação e monitorar logs em ambiente cloud.",
          category: "Projeto",
          difficulty: "Avançado",
          estimatedTime: "5h",
          done: false,
        },
      ],
    },
  ],
};

export const mockRecommendations: Recommendation[] = [
  {
    id: "rec1",
    skill: "Spring Security",
    priority: "Alta",
    reason:
      "Quase todas as vagas de backend júnior pedem autenticação e autorização. Como você já domina Java e está construindo APIs, este é o próximo salto natural.",
    estimatedTime: "6h",
    added: false,
  },
  {
    id: "rec2",
    skill: "Docker",
    priority: "Média",
    reason:
      "Containerizar sua API mostra maturidade técnica em processos seletivos e facilita subir projetos de portfólio.",
    estimatedTime: "4h",
    added: false,
  },
  {
    id: "rec3",
    skill: "Testes automatizados",
    priority: "Média",
    reason:
      "Empresas valorizam quem entrega código confiável. JUnit e Mockito aparecem em 7 de cada 10 descrições de vaga que analisamos.",
    estimatedTime: "5h",
    added: false,
  },
];

export const mockAnalysis =
  "Você já possui uma boa base em Java e bancos relacionais. Para aumentar sua empregabilidade em backend, recomendamos fortalecer conhecimentos em APIs REST, Spring Security, testes automatizados e Docker.";

export const mockWeeklyProgress: WeeklyProgress[] = [
  { week: "Sem 1", tasks: 2, hours: 4 },
  { week: "Sem 2", tasks: 3, hours: 6 },
  { week: "Sem 3", tasks: 1, hours: 3 },
  { week: "Sem 4", tasks: 4, hours: 8 },
  { week: "Sem 5", tasks: 2, hours: 5 },
];

export const goalSuggestions = [
  "Conseguir minha primeira vaga como desenvolvedor backend.",
  "Migrar da área administrativa para dados e análise.",
  "Voltar ao mercado após período sabático em uma vaga de TI.",
  "Ser promovido para uma posição de liderança técnica.",
];

export const skillSuggestions = [
  "Java",
  "Spring Boot",
  "Python",
  "SQL",
  "Excel",
  "Gestão",
  "Comunicação",
  "Docker",
  "Git",
];

export const aiProcessingSteps = [
  "Analisando seu perfil...",
  "Identificando suas principais habilidades...",
  "Encontrando competências que podem acelerar sua carreira...",
  "Construindo seu plano personalizado...",
];
