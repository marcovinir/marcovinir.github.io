import { person, stats, education, experience, workflow, areas, allText } from './cv';

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
  expect(areas[1].projects[1].href).toBe('https://zagala.marcovinir.dev/');
  expect(areas[2].projects.map(p => p.name)).toEqual(['Rivalmon']);
  expect(areas[2].projects[0].href).toBe('https://rivalmon.marcovinir.dev/');
  expect(areas[3].projects.map(p => p.name)).toEqual(['SIRA']);
});
test('etiqueta En equipo solo en proyectos de equipo', () => {
  const team = areas.flatMap(a => a.projects).filter(p => p.team).map(p => p.name).sort();
  expect(team).toEqual(['Gym-LACOBRA', 'PomoPet', 'SIRA']);
});
test('Scrum y Azure DevOps solo en SIRA', () => {
  const fuera = JSON.stringify({ person, stats, education, workflow, areas });
  expect(fuera).not.toMatch(/Scrum|Azure DevOps/);
  expect(JSON.stringify(experience)).toMatch(/Scrum/);
  expect(JSON.stringify(experience)).toMatch(/Azure DevOps/);
});
test('educación solo UNA desde 2024', () => {
  expect(education).toHaveLength(1);
  expect(education[0]).toMatchObject({ period: '2024 — Actualidad', title: 'Ingeniería en Sistemas de Información', current: true });
});
test('experiencia SIRA como desarrollador', () => {
  expect(experience[0].title).toMatch(/SIRA/);
  expect(experience[0].org).toMatch(/Desarrollador/);
  expect(experience[0].org).toMatch(/Municipalidad de Montes de Oro/);
  expect(experience[0].links?.map(l => l.href)).toEqual(['https://sira.dannyas.dev/', 'https://munimontesdeoro.go.cr/']);
});
test('AWS básico con EC2, RDS y SSH', () => {
  const nube = areas.find(a => a.id === 'horizonte')!;
  expect(nube.text).toMatch(/básic/i);
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
  expect(person.email).toBe('mvnaranjo1@gmail.com');
  expect(person.github).toBe('https://github.com/marcovinir');
});
test('cifras', () => expect(stats.map(s => s.value)).toEqual(['700+', '6', '6']));
test('Claude Code aparece en el perfil y en el flujo', () => {
  expect(person.about.join(' ')).toMatch(/Claude Code/);
  expect(JSON.stringify(workflow)).toMatch(/Claude Code/);
});
test('Neon en datos y Cloudinary en la nube', () => {
  expect(areas.find(a => a.id === 'cimientos')!.skills).toContain('Neon');
  expect(areas.find(a => a.id === 'horizonte')!.skills).toContain('Cloudinary');
});
test('LinkedIn', () => expect(person.linkedin).toBe('https://www.linkedin.com/in/marco-vinicio-rojas-pe%C3%B1a-89497a416/'));
