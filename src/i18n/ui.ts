// Textos fijos de la interfaz en cada idioma. El contenido del CV vive en src/data/.
import type { Lang } from '../data';

const es = {
  meta: {
    title: 'Marco Rojas · Desarrollador full-stack (React, Spring Boot, Django y AWS)',
    description: 'Portafolio y CV de Marco Rojas, desarrollador full-stack: frontend, backend, tiempo real y despliegue.',
    cvTitle: 'CV · Marco Rojas',
    cvDescription: 'Currículum de Marco Rojas, desarrollador full-stack.',
  },
  home: '/',
  cvPdf: '/cv-marco-rojas.pdf',
  rail: { label: 'Secciones', hero: 'Inicio', perfil: 'Sobre mí', experiencia: 'Experiencia', comoTrabajo: 'Cómo trabajo', contacto: 'Contacto' },
  switch: { href: '/en/', text: 'EN', label: 'English version', hreflang: 'en' },
  hero: { download: 'Descargar CV' },
  perfil: { kicker: 'Perfil', about: 'Sobre mí', formation: 'Formación', education: 'Educación', certifications: 'Certificaciones' },
  experiencia: { kicker: 'Trayectoria', title: 'Experiencia' },
  comoTrabajo: { kicker: 'Proceso', title: 'Cómo trabajo', example: 'Ejemplo' },
  areasIntro: { kicker: 'Habilidades y proyectos', titleStart: 'Cuatro áreas,', titleAccent: 'un mismo equilibrio.' },
  project: { demo: 'Ver demo', code: 'Ver código', details: 'Ver detalles', detailsHint: 'Incluye capturas del panel y lo que construí.', private: 'Código privado', team: 'En equipo', inProgress: 'en desarrollo' },
  detail: { back: 'Volver al portafolio', site: 'El sitio público', panel: 'El panel de la familia', built: 'Lo que construí', stack: 'Tecnologías', role: 'Mi rol' },
  contacto: {
    title: '¿Tienes un puesto o un proyecto en mente? Escríbeme.',
    lead: 'Cuéntame tu idea y la construimos juntos. Te respondo pronto.',
    copy: 'Copiar', copied: 'Copiado', linkedin: 'LinkedIn',
    name: 'Nombre', email: 'Correo', message: 'Mensaje', send: 'Enviar mensaje', sending: 'Enviando…',
    success: 'Gracias, {name}. Tu mensaje llegó; te respondo pronto.',
    error: 'No se pudo enviar el mensaje. Escríbeme directo a {email}.',
    cardTitle: 'Desarrollador full-stack',
    cardText: 'Disponible para proyectos y empleo.',
  },
  cv: { profile: 'Perfil', experience: 'Experiencia', education: 'Educación', certifications: 'Certificaciones', projects: 'Proyectos', skills: 'Habilidades', tools: 'Herramientas' },
};

const en: typeof es = {
  meta: {
    title: 'Marco Rojas · Full-stack developer (React, Spring Boot, Django and AWS)',
    description: 'Portfolio and CV of Marco Rojas, full-stack developer: frontend, backend, real time and deployment.',
    cvTitle: 'CV · Marco Rojas',
    cvDescription: 'Resume of Marco Rojas, full-stack developer.',
  },
  home: '/en/',
  cvPdf: '/cv-marco-rojas-en.pdf',
  rail: { label: 'Sections', hero: 'Home', perfil: 'About me', experiencia: 'Experience', comoTrabajo: 'How I work', contacto: 'Contact' },
  switch: { href: '/', text: 'ES', label: 'Versión en español', hreflang: 'es' },
  hero: { download: 'Download CV' },
  perfil: { kicker: 'Profile', about: 'About me', formation: 'Background', education: 'Education', certifications: 'Certifications' },
  experiencia: { kicker: 'Track record', title: 'Experience' },
  comoTrabajo: { kicker: 'Process', title: 'How I work', example: 'Example' },
  areasIntro: { kicker: 'Skills and projects', titleStart: 'Four areas,', titleAccent: 'one balance.' },
  project: { demo: 'View demo', code: 'View code', details: 'View details', detailsHint: 'Includes dashboard screenshots and what I built.', private: 'Private code', team: 'Team project', inProgress: 'in progress' },
  detail: { back: 'Back to portfolio', site: 'The public site', panel: 'The family dashboard', built: 'What I built', stack: 'Tech stack', role: 'My role' },
  contacto: {
    title: 'Have a role or a project in mind? Write to me.',
    lead: 'Tell me your idea and let’s build it together. I’ll get back to you soon.',
    copy: 'Copy', copied: 'Copied', linkedin: 'LinkedIn',
    name: 'Name', email: 'Email', message: 'Message', send: 'Send message', sending: 'Sending…',
    success: 'Thank you, {name}. Your message arrived; I’ll reply soon.',
    error: 'The message could not be sent. Write to me directly at {email}.',
    cardTitle: 'Full-stack developer',
    cardText: 'Open to projects and jobs.',
  },
  cv: { profile: 'Profile', experience: 'Experience', education: 'Education', certifications: 'Certifications', projects: 'Projects', skills: 'Skills', tools: 'Tools' },
};

export const ui = { es, en };
export type Ui = typeof es;

export function t(lang: Lang): Ui {
  return ui[lang];
}

/** Páginas equivalentes en cada idioma, para hreflang. */
export const alternates = { es: '/', en: '/en/' } as const;
