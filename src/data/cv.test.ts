import * as cv from './cv';
import { person, education, experience, workflow, areas, certifications, allText } from './cv';

const EMOJI = /\p{Extended_Pictographic}/u;
const ELEMENTOS = /\b(agua|tierra|fuego|aire)\b/i;
const sinUniversidad = (t: string) => t.replaceAll('Universidad Nacional de Costa Rica', '');

test('sin emojis', () => expect(allText()).not.toMatch(EMOJI));
test('sin nombres de elementos', () => expect(allText()).not.toMatch(ELEMENTOS));
test('sin ubicación', () => {
  expect(sinUniversidad(allText())).not.toMatch(/Alajuela|Costa Rica/i);
});
test('cuatro áreas en orden', () => {
  expect(areas.map(a => a.id)).toEqual(['fluir', 'cimientos', 'chispa', 'horizonte']);
});
test('proyectos por área', () => {
  expect(areas[0].projects.map(p => p.name)).toEqual(['PomoPet', 'Gym-LACOBRA']);
  expect(areas[1].projects.map(p => p.name)).toEqual(['OraAdmin XE', 'Coffee Tour Pura Vista']);
  expect(areas[2].projects.map(p => p.name)).toEqual(['Rivalmon']);
  expect(areas[3].projects.map(p => p.name)).toEqual(['marcovinir.dev']);
});
test('etiqueta En equipo solo en proyectos de equipo', () => {
  const team = areas.flatMap(a => a.projects).filter(p => p.team).map(p => p.name).sort();
  expect(team).toEqual(['Gym-LACOBRA', 'OraAdmin XE', 'PomoPet']);
});
test('Scrum y Azure DevOps solo en SIRA', () => {
  const fuera = JSON.stringify({ person, education, workflow, areas });
  expect(fuera).not.toMatch(/Scrum|Azure DevOps/);
  expect(JSON.stringify(experience)).toMatch(/Scrum/);
  expect(JSON.stringify(experience)).toMatch(/Azure DevOps/);
});
test('educación: ingeniería en curso y diplomado obtenido', () => {
  expect(education).toHaveLength(2);
  expect(education[0]).toMatchObject({ period: '2024 — Actualidad', title: 'Ingeniería en Sistemas de Información', current: true });
  expect(education[1]).toMatchObject({ period: 'Noviembre 2026', title: 'Diplomado en Programación de Aplicaciones Informáticas', org: 'Universidad Nacional de Costa Rica (UNA)', current: false });
});
test('experiencia SIRA como desarrollador', () => {
  expect(experience[0].title).toMatch(/SIRA/);
  expect(experience[0].org).toMatch(/Desarrollador/);
  expect(experience[0].org).toMatch(/institución pública/);
  expect(experience[0].links).toBeUndefined();
});
test('AWS con EC2, RDS y SSH, sin autolimitarse', () => {
  const nube = areas.find(a => a.id === 'horizonte')!;
  expect(nube.text).not.toMatch(/básic/i);
  expect(nube.skills).toEqual(expect.arrayContaining(['AWS EC2', 'AWS RDS', 'SSH']));
  expect(JSON.stringify(experience)).toMatch(/SSH/);
});
test('Godot ya no aparece', () => expect(allText()).not.toMatch(/Godot/i));
test('el flujo menciona agentes y MCP', () => {
  expect(JSON.stringify(workflow)).toMatch(/agentes/i);
  expect(JSON.stringify(workflow)).toMatch(/MCP/);
});
test('las áreas se nombran por su categoría', () => {
  expect(areas.map(a => a.label)).toEqual(['Frontend', 'Backend y datos', 'Tiempo real y juegos', 'Cloud y despliegue']);
});
test('contacto', () => {
  expect(person.email).toBe('marcorojassp@gmail.com');
  expect(person.github).toBe('https://github.com/marcovinir');
});
test('Claude Code aparece en el perfil y en el flujo', () => {
  expect(person.about.join(' ')).toMatch(/Claude Code/);
  expect(JSON.stringify(workflow)).toMatch(/Claude Code/);
});
test('Neon en datos y Cloudinary en la nube', () => {
  expect(areas.find(a => a.id === 'cimientos')!.skills).toContain('Neon');
  expect(areas.find(a => a.id === 'horizonte')!.skills).toContain('Cloudinary');
});
test('LinkedIn', () => expect(person.linkedin).toBe('https://www.linkedin.com/in/marco-vinicio-rojas-pe%C3%B1a-89497a416/'));
test('enlaces de demo y código de cada proyecto', () => {
  const links = Object.fromEntries(areas.flatMap(a => a.projects).map(p => [p.name, { demo: p.demo, code: p.code }]));
  expect(links).toEqual({
    'PomoPet': { demo: undefined, code: 'https://github.com/You9123/PomoPet' },
    'Gym-LACOBRA': { demo: undefined, code: 'https://github.com/You9123/Gym-LACOBRA' },
    'OraAdmin XE': { demo: undefined, code: 'https://github.com/marcovinir/oraadmin-xe' },
    'Coffee Tour Pura Vista': { demo: 'https://zagala.marcovinir.dev/', code: undefined },
    'Rivalmon': { demo: 'https://rivalmon.marcovinir.dev/', code: 'https://github.com/marcovinir/rivalmon' },
    'marcovinir.dev': { demo: 'https://marcovinir.dev/', code: 'https://github.com/marcovinir/marcovinir.github.io' },
  });
});
test('rol en SIRA: historias de usuario completas, backend y frontend', () => {
  expect(experience[0].org).toMatch(/^Desarrollador full-stack/);
  expect(experience[0].bullets!.join(' ')).toMatch(/historias de usuario completas/i);
  expect(experience[0].bullets!.join(' ')).toMatch(/backend.*frontend/i);
});
test('certificaciones de Google y Microsoft', () => {
  expect(certifications).toEqual([
    { name: 'Cloud Computing', issuer: 'Google', date: 'Junio 2026', href: 'https://skillshop.exceedlms.com/student/award/xbT5TszjkaUcbVz9YzWg2Euy' },
    { name: 'AI Skills Fest 2026', issuer: 'Microsoft', date: '2026', href: 'https://www.credly.com/badges/9fe53920-c524-4bfa-9019-586444f4c141' },
  ]);
  expect(allText()).toMatch(/AI Skills Fest/);
});
test('tagline claro y rol en español', () => {
  expect(person.headline).toBe('Diplomado en Programación de Aplicaciones Informáticas (UNA)');
  expect(person.heroTitleStart + ' ' + person.heroTitleAccent).toBe('Desarrollador full-stack.');
  expect(person.heroText).toBe('Construyo aplicaciones web de punta a punta con React, Spring Boot y Django, y las despliego en la nube.');
  expect(person.role).toBe('Desarrollador full-stack');
});
test('el párrafo de IA deja claro que él dirige y revisa', () => {
  const ia = person.about[1];
  expect(ia).toMatch(/Claude Code/);
  expect(ia).toMatch(/reviso/i);
  expect(ia).toMatch(/pruebas/i);
  expect(ia).toMatch(/decisiones/i);
});
test('no se publica el dominio de desarrollo de SIRA (confidencialidad)', () => expect(allText()).not.toMatch(/dannyas/i));
test('los despliegues de SIRA son del entorno de desarrollo', () => expect(experience[0].bullets).toContain('Despliegues del entorno de desarrollo por SSH en AWS (EC2 y RDS).'));
test('no se nombra al cliente de SIRA (confidencialidad)', () => expect(allText()).not.toMatch(/Montes de Oro|munimontesdeoro/i));
test('ya no hay cifras de commits ni proyectos', () => expect('stats' in cv).toBe(false));
test('resumen de herramientas', () => {
  expect(cv.toolbox.map(r => r.label)).toEqual(['Lenguajes', 'Frontend', 'Backend', 'Datos', 'Cloud y despliegue', 'Herramientas']);
  for (const r of cv.toolbox) expect(r.items.length).toBeGreaterThan(2);
  const todo = cv.toolbox.flatMap(r => r.items);
  for (const t of ['React', 'Spring Boot', 'Django', 'PostgreSQL', 'Neon', 'AWS (EC2, RDS)', 'Cloudinary', 'Claude Code']) expect(todo).toContain(t);
  expect(JSON.stringify(cv.toolbox)).not.toMatch(/Scrum|Azure DevOps/);
});
test('SIRA solo aparece en Experiencia, no como proyecto', () => {
  expect(areas.flatMap(a => a.projects).map(p => p.name)).not.toContain('SIRA');
  expect(experience[0].title).toMatch(/SIRA/);
});
test('los ejemplos de Cómo trabajo son frases completas', () => {
  for (const s of workflow) {
    expect(s.example.split(' ').length).toBeGreaterThanOrEqual(7);
    expect(s.example).toMatch(/\.$/);
  }
});

test('SIRA se presenta como proyecto académico desde febrero de 2026', () => {
  expect(experience[0].org).toMatch(/proyecto académico/);
  expect(experience[0].period).toMatch(/^Febrero 2026/);
  expect(experience[0].bullets?.join(' ')).toMatch(/Ingeniería de Sistemas/);
});
