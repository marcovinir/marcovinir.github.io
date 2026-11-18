import * as es from './cv';
import * as en from './cv.en';
import { cvData } from './index';

const EMOJI = /\p{Extended_Pictographic}/u;
const ELEMENTOS = /\b(agua|tierra|fuego|aire|water|earth|fire|air)\b/i;
const sinUniversidad = (t: string) => t.replaceAll('Universidad Nacional de Costa Rica', '');

test('cvData elige el idioma', () => {
  expect(cvData('es')).toBe(es);
  expect(cvData('en')).toBe(en);
});

describe('inglés: mismas reglas de contenido', () => {
  test('sin emojis', () => expect(en.allText()).not.toMatch(EMOJI));
  test('sin nombres de elementos', () => expect(en.allText()).not.toMatch(ELEMENTOS));
  test('sin ubicación', () => expect(sinUniversidad(en.allText())).not.toMatch(/Alajuela|Costa Rica/i));
  test('nada confidencial de SIRA', () => expect(en.allText()).not.toMatch(/dannyas|Montes de Oro|munimontesdeoro/i));
  test('Scrum y Azure DevOps solo en SIRA', () => {
    expect(JSON.stringify({ p: en.person, e: en.education, w: en.workflow, a: en.areas })).not.toMatch(/Scrum|Azure DevOps/);
    expect(JSON.stringify(en.experience)).toMatch(/Scrum/);
  });
});

describe('inglés: misma estructura que español', () => {
  const projects = (d: typeof es) => d.areas.flatMap(a => a.projects.map(p => ({ name: p.name, demo: p.demo, code: p.code, team: p.team, inProgress: p.inProgress })));
  test('áreas, colores y tecnologías', () => {
    expect(en.areas.map(a => [a.id, a.number, a.color, a.color2, a.skills])).toEqual(es.areas.map(a => [a.id, a.number, a.color, a.color2, a.skills]));
  });
  test('proyectos y enlaces', () => expect(projects(en)).toEqual(projects(es)));
  test('educación, experiencia, flujo y certificaciones', () => {
    expect(en.education.map(e => e.current)).toEqual(es.education.map(e => e.current));
    expect(en.experience.map(e => [e.current, e.bullets?.length])).toEqual(es.experience.map(e => [e.current, e.bullets?.length]));
    expect(en.workflow).toHaveLength(es.workflow.length);
    expect(en.certifications.map(c => [c.name, c.issuer, c.href])).toEqual(es.certifications.map(c => [c.name, c.issuer, c.href]));
    expect(en.tools).toHaveLength(es.tools.length);
    expect(en.tools).toContain('Agents');
  });
  test('contacto igual', () => {
    expect([en.person.email, en.person.github, en.person.linkedin, en.person.name]).toEqual([es.person.email, es.person.github, es.person.linkedin, es.person.name]);
  });
});

describe('inglés: textos clave', () => {
  test('rol y tagline', () => {
    expect(en.person.role).toBe('Full-stack developer');
    expect(en.person.headline).toBe('Diplomado in Application Programming (UNA)');
    expect(en.person.heroTitleStart + ' ' + en.person.heroTitleAccent).toBe('Full-stack developer.');
    expect(en.person.heroText).toBe('I build end-to-end web applications with React, Spring Boot and Django, and deploy them to the cloud.');
  });
  test('categorías de las áreas', () => {
    expect(en.areas.map(a => a.label)).toEqual(['Frontend', 'Backend & data', 'Real-time & games', 'Cloud & deployment']);
  });
  test('SIRA: historias completas y entorno de desarrollo', () => {
    expect(en.experience[0].org).toMatch(/^Full-stack developer/);
    expect(en.experience[0].bullets!.join(' ')).toMatch(/end-to-end user stories/i);
    expect(en.experience[0].bullets!.join(' ')).toMatch(/development environment/i);
  });
  test('la IA con criterio propio', () => {
    expect(en.person.about[1]).toMatch(/Claude Code/);
    expect(en.person.about[1]).toMatch(/review/i);
    expect(en.person.about[1]).toMatch(/tests/i);
  });
  test('el diplomado conserva su nombre oficial y lo explica', () => {
    expect(en.education[1].title).toMatch(/Diplomado/);
    expect(en.education[1].title).toMatch(/Application Programming/i);
  });
});

test('inglés: el resumen de herramientas tiene las mismas tecnologías', () => {
  expect(en.toolbox.map(r => r.label)).toEqual(['Languages', 'Frontend', 'Backend', 'Data', 'Cloud & deployment', 'Tools']);
  expect(en.toolbox.map(r => r.items.length)).toEqual(es.toolbox.map(r => r.items.length));
});
