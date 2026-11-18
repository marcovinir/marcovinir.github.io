import { detalles } from './detalles';
import { areas } from './cv';

const EMOJI = /\p{Extended_Pictographic}/u;
const SLUGS = ['coffee-tour-pura-vista', 'rivalmon', 'oraadmin-xe', 'pomopet', 'gym-lacobra'];

test('los cinco proyectos tienen detalle en los dos idiomas', () => {
  expect(Object.keys(detalles.es)).toEqual(SLUGS);
  expect(Object.keys(detalles.en)).toEqual(SLUGS);
});

test('las dos versiones usan las mismas galerías, capturas y tecnologías', () => {
  for (const slug of SLUGS) {
    const es = detalles.es[slug];
    const en = detalles.en[slug];
    expect(en.galleries.map(g => [g.id, g.shots.map(s => s.file)])).toEqual(es.galleries.map(g => [g.id, g.shots.map(s => s.file)]));
    expect(en.features).toHaveLength(es.features.length);
    expect(en.challenges?.length).toBe(es.challenges?.length);
    expect(en.stack).toEqual(es.stack);
    expect([en.demo, en.code]).toEqual([es.demo, es.code]);
  }
});

test('galerías esperadas por proyecto', () => {
  const g = (slug: string) => detalles.es[slug].galleries.map(x => [x.id, x.shots.length]);
  expect(g('coffee-tour-pura-vista')).toEqual([['panel', 10], ['site', 2]]);
  expect(g('rivalmon')).toEqual([['juego', 6]]);
  expect(g('oraadmin-xe')).toEqual([['app', 10]]);
  expect(g('pomopet')).toEqual([['mascota', 4]]);
  expect(g('gym-lacobra')).toEqual([['app', 8]]);
});

test('Rivalmon y OraAdmin XE explican sus retos técnicos', () => {
  for (const slug of ['rivalmon', 'oraadmin-xe', 'pomopet']) {
    for (const lang of ['es', 'en'] as const) {
      const c = detalles[lang][slug].challenges ?? [];
      expect(c.length).toBeGreaterThanOrEqual(3);
      for (const r of c) expect(r.text.split(' ').length).toBeGreaterThan(10);
    }
  }
});

test('OraAdmin XE deja claro qué hizo Marco en el equipo', () => {
  expect(detalles.es['oraadmin-xe'].role).toMatch(/Seguridad/);
  expect(detalles.es['oraadmin-xe'].role).toMatch(/Inicio/);
  expect(detalles.es['oraadmin-xe'].role).toMatch(/equipo/i);
});

test('cada captura tiene texto alternativo y pie de foto', () => {
  for (const lang of ['es', 'en'] as const) {
    for (const d of Object.values(detalles[lang])) {
      for (const s of d.galleries.flatMap(g => g.shots)) {
        expect(s.alt.length).toBeGreaterThan(10);
        expect(s.caption.length).toBeGreaterThan(10);
        expect(s.file).toMatch(/\.(png|jpg|gif)$/);
      }
    }
  }
});

test('las tarjetas enlazan al detalle', () => {
  const conDetalle = areas.flatMap(a => a.projects).filter(p => p.detail).map(p => p.detail).sort();
  expect(conDetalle).toEqual([...SLUGS].sort());
});

test('sin emojis ni datos confidenciales', () => {
  const text = JSON.stringify(detalles);
  expect(text).not.toMatch(EMOJI);
  expect(text).not.toMatch(/dannyas|Montes de Oro/i);
});

test('PomoPet y Gym-LACOBRA dejan claro qué hizo Marco en el equipo', () => {
  const pomo = detalles.es['pomopet'].role;
  expect(pomo).toMatch(/equipo/i);
  expect(pomo).toMatch(/temporizador/i);
  expect(pomo).toMatch(/Gemini/);
  const gym = detalles.es['gym-lacobra'].role;
  expect(gym).toMatch(/equipo/i);
  expect(gym).toMatch(/coach/i);
  expect(gym).toMatch(/Django/);
});
