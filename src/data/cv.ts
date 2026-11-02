// Todo el contenido del portafolio y del CV. Los componentes solo lo pintan:
// para actualizar el CV basta con editar este archivo.

export type Link = { label: string; href: string };
export type Project = { name: string; summary: string; stack: string; href: string; team: boolean; inProgress?: boolean };
export type TimelineEntry = { period: string; title: string; org: string; description?: string; current: boolean; bullets?: string[]; links?: Link[] };
export type AreaId = 'fluir' | 'cimientos' | 'chispa' | 'horizonte';
export type Area = {
  id: AreaId; label: string; number: string;
  titleLine1: string; titleLine2: string; text: string;
  skills: string[]; projects: Project[]; color: string; color2: string;
};
export type Step = { title: string; text: string };

export const person = {
  name: 'Marco Rojas',
  role: 'Full-stack developer',
  email: 'mvnaranjo1@gmail.com',
  github: 'https://github.com/marcovinir',
  heroTitleStart: 'Construyo software en',
  heroTitleAccent: 'equilibrio.',
  heroText: 'Interfaces que fluyen, bases que no se caen, experiencias en tiempo real y despliegues que llegan lejos.',
  about: [
    'Soy estudiante de Ingeniería en Sistemas y desarrollador full-stack. Me gusta llevar una idea de punta a punta: diseñar la base de datos, construir la API, pulir la interfaz, escribir las pruebas y dejarla desplegada. Trabajo bien en equipo, con ramas, pull requests y revisiones de código.',
    'Uso desarrollo asistido por IA con Claude Code para planificar, implementar y revisar más rápido, sin dejar de lado las pruebas ni la revisión de código.',
  ],
};

export const stats: { value: string; label: string }[] = [
  { value: '700+', label: 'commits en el último año' },
  { value: '5', label: 'proyectos destacados' },
  { value: '6', label: 'lenguajes' },
];

export const education: TimelineEntry[] = [
  {
    period: '2024 — Actualidad',
    title: 'Ingeniería en Sistemas de Información',
    org: 'Universidad Nacional de Costa Rica (UNA)',
    description: 'Bases de datos, programación, ingeniería de software y administración de sistemas.',
    current: true,
  },
];

export const experience: TimelineEntry[] = [
  {
    period: '2026 — Actualidad',
    title: 'SIRA — Sistema de Reportes de Avería',
    org: 'Desarrollador · proyecto en equipo para la Municipalidad de Montes de Oro',
    current: true,
    bullets: [
      'Desarrollado con metodología Scrum (sprints e historias de usuario) usando Azure DevOps.',
      'Stack: Django + React + TypeScript.',
      'Despliegues por SSH en AWS (EC2 y RDS).',
    ],
    links: [
      { label: 'sira.dannyas.dev', href: 'https://sira.dannyas.dev/' },
      { label: 'munimontesdeoro.go.cr', href: 'https://munimontesdeoro.go.cr/' },
    ],
  },
];

export const workflow: Step[] = [
  { title: 'Planificar', text: 'Divido el trabajo en issues y etapas.' },
  { title: 'Implementar', text: 'En ramas, con Claude Code, agentes y servidores MCP para conectar herramientas.' },
  { title: 'Probar', text: 'Pruebas automáticas e integración continua.' },
  { title: 'Integrar', text: 'Pull request con revisión antes de fusionar.' },
];

export const areas: Area[] = [
  {
    id: 'fluir', label: 'Frontend', number: '01',
    titleLine1: 'Interfaces que se', titleLine2: 'mueven contigo.',
    text: 'Frontend rápido, accesible y con animaciones que se sienten naturales.',
    skills: ['React', 'Vue', 'TypeScript', 'Astro', 'Vite'],
    projects: [
      { name: 'PomoPet', summary: 'Plataforma gamificada de gestión del tiempo y estudio', stack: 'Vue 3 + FastAPI + PostgreSQL + Docker', href: 'https://github.com/You9123/PomoPet', team: true },
      { name: 'Gym-LACOBRA', summary: 'App web para la gestión de un gimnasio', stack: 'React + Django', href: 'https://github.com/You9123/Gym-LACOBRA', team: true },
    ],
    color: '#38bdf8', color2: '#6366f1',
  },
  {
    id: 'cimientos', label: 'Backend y datos', number: '02',
    titleLine1: 'Backends que', titleLine2: 'no se mueven.',
    text: 'APIs, modelos de datos y bases de datos diseñadas para crecer sin romperse.',
    skills: ['Spring Boot', 'Django', 'FastAPI', '.NET 8', 'PostgreSQL', 'Oracle', 'Docker'],
    projects: [
      { name: 'OraAdmin XE', summary: 'Consola DBA de escritorio para Oracle 21c', stack: 'C# + .NET 8', href: 'https://github.com/marcovinir/oraadmin-xe', team: false },
    ],
    color: '#34d399', color2: '#a3e635',
  },
  {
    id: 'chispa', label: 'Tiempo real y juegos', number: '03',
    titleLine1: 'Experiencias', titleLine2: 'en tiempo real.',
    text: 'Multijugador, sockets y juegos donde cada milisegundo cuenta.',
    skills: ['Socket.io', 'Express', 'Three.js'],
    projects: [
      { name: 'PokeMiniGames', summary: 'Minijuegos 1 vs 1 en tiempo real', stack: 'React + Socket.io + Prisma', href: 'https://pokeminigames.marcovinir.dev/', team: false },
    ],
    color: '#fb7185', color2: '#f59e0b',
  },
  {
    id: 'horizonte', label: 'Cloud y despliegue', number: '04',
    titleLine1: 'Del código', titleLine2: 'a la nube.',
    text: 'Despliegues automatizados, CI y servicios cloud para que tu proyecto llegue a todos. Conocimientos básicos de AWS.',
    skills: ['AWS EC2', 'AWS RDS', 'SSH', 'Render', 'GitHub Actions', 'GitHub Pages'],
    projects: [
      { name: 'SIRA', summary: 'Sistema de Reportes de Avería para la Municipalidad de Montes de Oro', stack: 'Django + React + TypeScript', href: 'https://sira.dannyas.dev/', team: true, inProgress: true },
    ],
    color: '#e2e8f0', color2: '#a78bfa',
  },
];

/** Herramientas de trabajo que no pertenecen a un área; solo aparecen en el CV. */
export const tools: string[] = ['Git', 'GitHub', 'Claude Code', 'Agentes', 'MCP', 'Vitest', 'Playwright'];

function collect(value: unknown, out: string[]): void {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach(v => collect(v, out));
  else if (value && typeof value === 'object') Object.values(value).forEach(v => collect(v, out));
}

/** Une todos los textos del CV; lo usan las pruebas de reglas de contenido. */
export function allText(): string {
  const out: string[] = [];
  collect({ person, stats, education, experience, workflow, areas, tools }, out);
  return out.join('\n');
}
