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
  project: { demo: 'Ver demo', code: 'Ver código', private: 'Código privado', team: 'En equipo', inProgress: 'en desarrollo' },
  contacto: { title: '¿Tienes un proyecto en mente?', lead: 'Cuéntame tu idea y la construimos juntos. Escríbeme y te respondo pronto.', copy: 'Copiar', copied: 'Copiado', linkedin: 'También en LinkedIn' },
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
  project: { demo: 'View demo', code: 'View code', private: 'Private code', team: 'Team project', inProgress: 'in progress' },
  contacto: { title: 'Have a project in mind?', lead: 'Tell me your idea and let’s build it together. Write to me and I’ll get back to you soon.', copy: 'Copy', copied: 'Copied', linkedin: 'Also on LinkedIn' },
  cv: { profile: 'Profile', experience: 'Experience', education: 'Education', certifications: 'Certifications', projects: 'Projects', skills: 'Skills', tools: 'Tools' },
};

export const ui = { es, en };
export type Ui = typeof es;

export function t(lang: Lang): Ui {
  return ui[lang];
}

/** Páginas equivalentes en cada idioma, para hreflang. */
export const alternates = { es: '/', en: '/en/' } as const;
