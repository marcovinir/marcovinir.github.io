import { detalles } from './detalles';

const EMOJI = /\p{Extended_Pictographic}/u;

test('el Coffee Tour tiene detalle en los dos idiomas', () => {
  expect(Object.keys(detalles.es)).toEqual(['coffee-tour-pura-vista']);
  expect(Object.keys(detalles.en)).toEqual(['coffee-tour-pura-vista']);
});

test('las dos versiones usan las mismas capturas', () => {
  const es = detalles.es['coffee-tour-pura-vista'];
  const en = detalles.en['coffee-tour-pura-vista'];
  expect(en.siteShots.map(s => s.file)).toEqual(es.siteShots.map(s => s.file));
  expect(en.panelShots.map(s => s.file)).toEqual(es.panelShots.map(s => s.file));
  expect(en.features).toHaveLength(es.features.length);
  expect(en.stack).toEqual(es.stack);
});

test('cada captura tiene texto alternativo y pie de foto', () => {
  for (const d of [detalles.es['coffee-tour-pura-vista'], detalles.en['coffee-tour-pura-vista']]) {
    expect(d.siteShots).toHaveLength(2);
    expect(d.panelShots).toHaveLength(10);
    for (const s of [...d.siteShots, ...d.panelShots]) {
      expect(s.alt.length).toBeGreaterThan(10);
      expect(s.caption.length).toBeGreaterThan(10);
    }
  }
});

test('sin emojis ni datos confidenciales', () => {
  const text = JSON.stringify(detalles);
  expect(text).not.toMatch(EMOJI);
  expect(text).not.toMatch(/dannyas|Montes de Oro/i);
});
