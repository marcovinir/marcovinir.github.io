// English version of the portfolio and CV. Same structure as cv.ts (the tests keep them in sync):
// only the text changes, never the projects, links or technologies.
import type { Area, Certification, Step, TimelineEntry } from './cv';

export const person = {
  name: 'Marco Rojas',
  role: 'Full-stack developer',
  headline: 'Diplomado in Application Programming (UNA)',
  email: 'marcorojassp@gmail.com',
  github: 'https://github.com/marcovinir',
  linkedin: 'https://www.linkedin.com/in/marco-vinicio-rojas-pe%C3%B1a-89497a416/',
  phone: '+506 8687-7280',
  phoneHref: 'tel:+50686877280',
  /** Formulario de Formspree: los mensajes llegan al correo de Marco. */
  formEndpoint: 'https://formspree.io/f/xjywwleg',
  heroTitleStart: 'Full-stack',
  heroTitleAccent: 'developer.',
  heroText: 'I build end-to-end web applications with React, Spring Boot and Django, and deploy them to the cloud.',
  about: [
    'I am a Systems Engineering student and a full-stack developer. I like taking an idea from start to finish: designing the database, building the API, polishing the interface, writing the tests and shipping it. I work well in teams, with branches, pull requests and code reviews.',
    'I use Claude Code and agents to move faster, but the technical decisions are mine: I define the design, review every change in a pull request and back it with automated tests before merging.',
  ],
};

export const education: TimelineEntry[] = [
  {
    period: '2024 — Present',
    title: 'Systems Engineering (Ingeniería en Sistemas de Información)',
    org: 'Universidad Nacional de Costa Rica (UNA)',
    description: 'Databases, programming, software engineering and systems administration.',
    current: true,
  },
  {
    period: 'November 2026',
    title: 'Diplomado in Application Programming (Programación de Aplicaciones Informáticas)',
    org: 'Universidad Nacional de Costa Rica (UNA)',
    description: 'Degree awarded. School of Exact and Natural Sciences.',
    current: false,
  },
];

export const experience: TimelineEntry[] = [
  {
    period: '2026 — Present',
    title: 'SIRA — Fault Reporting System',
    org: 'Full-stack developer · team project for a public institution',
    current: true,
    bullets: [
      'I deliver end-to-end user stories, from the backend to the frontend.',
      'Built with Scrum (sprints and user stories) using Azure DevOps.',
      'Stack: Django + React + TypeScript.',
      'Deployments of the development environment over SSH on AWS (EC2 and RDS).',
    ],
  },
];

export const workflow: Step[] = [
  { title: 'Understand', text: 'I listen to the need and shape it with mockups before writing any code.', example: 'For Coffee Tour Pura Vista I defined styles and palettes with the family before coding.' },
  { title: 'Design', text: 'I write a design document and a staged plan, with issues.', example: 'Rivalmon and this portfolio started with a design document and a plan.' },
  { title: 'Build', text: 'On branches, with Claude Code, agents and MCP servers to connect tools.', example: 'In Rivalmon, every change went in through a small pull request with CI tests.' },
  { title: 'Test', text: 'Automated tests and continuous integration before merging.', example: 'Rivalmon has more than 200 test files with Vitest and Playwright.' },
  { title: 'Deploy', text: 'I ship it live, on its own domain, and keep it running.', example: 'Rivalmon runs on Render, this portfolio on GitHub Pages and the SIRA development environment on AWS.' },
];

export const areas: Area[] = [
  {
    id: 'fluir', label: 'Frontend', number: '01',
    titleLine1: 'Interfaces that', titleLine2: 'move with you.',
    text: 'Fast, accessible frontends with animations that feel natural.',
    skills: ['React', 'Vue', 'TypeScript', 'Astro', 'Vite'],
    projects: [
      { name: 'PomoPet', summary: 'Gamified platform for time management and studying', stack: 'Vue 3 + FastAPI + PostgreSQL + Docker', code: 'https://github.com/You9123/PomoPet', team: true },
      { name: 'Gym-LACOBRA', summary: 'Web app to manage a gym', stack: 'React + Django', code: 'https://github.com/You9123/Gym-LACOBRA', team: true },
    ],
    color: '#38bdf8', color2: '#6366f1',
  },
  {
    id: 'cimientos', label: 'Backend & data', number: '02',
    titleLine1: 'Backends that', titleLine2: 'stay put.',
    text: 'APIs, data models and databases designed to grow without breaking.',
    skills: ['Spring Boot', 'Django', 'FastAPI', '.NET 8', 'PostgreSQL', 'Neon', 'Oracle', 'Docker'],
    projects: [
      { name: 'OraAdmin XE', summary: 'Desktop DBA console for Oracle 21c', stack: 'C# + .NET 8', code: 'https://github.com/marcovinir/oraadmin-xe', team: true, detail: 'oraadmin-xe' },
      { name: 'Coffee Tour Pura Vista', summary: 'Coffee shop and visit bookings for a family farm', stack: 'React + Spring Boot + PostgreSQL', demo: 'https://zagala.marcovinir.dev/', team: false, detail: 'coffee-tour-pura-vista' },
    ],
    color: '#34d399', color2: '#a3e635',
  },
  {
    id: 'chispa', label: 'Real-time & games', number: '03',
    titleLine1: 'Experiences', titleLine2: 'in real time.',
    text: 'Multiplayer, sockets and games where every millisecond counts.',
    skills: ['Socket.io', 'Express', 'Three.js'],
    projects: [
      { name: 'Rivalmon', summary: 'Real-time 1 vs 1 minigames', stack: 'React + Socket.io + Prisma', demo: 'https://rivalmon.marcovinir.dev/', code: 'https://github.com/marcovinir/rivalmon', team: false, detail: 'rivalmon' },
    ],
    color: '#fb7185', color2: '#f59e0b',
  },
  {
    id: 'horizonte', label: 'Cloud & deployment', number: '04',
    titleLine1: 'From code', titleLine2: 'to the cloud.',
    text: 'Automated deployments, CI and cloud services so your project reaches everyone.',
    skills: ['AWS EC2', 'AWS RDS', 'SSH', 'Render', 'Cloudinary', 'GitHub Actions', 'GitHub Pages'],
    projects: [
      { name: 'marcovinir.dev', summary: 'This portfolio: tests, PDF résumé and automatic publishing on every change', stack: 'Astro + GitHub Actions + GitHub Pages + Playwright', demo: 'https://marcovinir.dev/', code: 'https://github.com/marcovinir/marcovinir.github.io', team: false },
    ],
    color: '#e2e8f0', color2: '#a78bfa',
  },
];

export const certifications: Certification[] = [
  { name: 'Cloud Computing', issuer: 'Google', date: 'June 2026', href: 'https://skillshop.exceedlms.com/student/award/xbT5TszjkaUcbVz9YzWg2Euy' },
  { name: 'AI Skills Fest 2026', issuer: 'Microsoft', date: '2026', href: 'https://www.credly.com/badges/9fe53920-c524-4bfa-9019-586444f4c141' },
];

/** Resumen rápido para reclutadores: con qué trabajo, por categoría. */
export const toolbox: { label: string; items: string[] }[] = [
  { label: 'Languages', items: ['TypeScript', 'JavaScript', 'Java', 'Python', 'C#', 'SQL'] },
  { label: 'Frontend', items: ['React', 'Vue', 'Astro', 'Vite', 'Three.js'] },
  { label: 'Backend', items: ['Spring Boot', 'Django', 'FastAPI', 'Express', 'Socket.io', '.NET 8'] },
  { label: 'Data', items: ['PostgreSQL', 'Neon', 'Oracle', 'Prisma', 'Flyway'] },
  { label: 'Cloud & deployment', items: ['AWS (EC2, RDS)', 'Render', 'Cloudinary', 'Docker', 'GitHub Actions', 'GitHub Pages'] },
  { label: 'Tools', items: ['Git', 'GitHub', 'Claude Code', 'Agents', 'MCP', 'Vitest', 'Playwright'] },
];

/** Work tools that do not belong to an area; shown only in the CV. */
export const tools: string[] = ['Git', 'GitHub', 'Claude Code', 'Agents', 'MCP', 'Vitest', 'Playwright'];

function collect(value: unknown, out: string[]): void {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach(v => collect(v, out));
  else if (value && typeof value === 'object') Object.values(value).forEach(v => collect(v, out));
}

/** Joins every CV text; used by the content rule tests. */
export function allText(): string {
  const out: string[] = [];
  collect({ person, education, experience, workflow, areas, certifications, toolbox, tools }, out);
  return out.join('\n');
}
