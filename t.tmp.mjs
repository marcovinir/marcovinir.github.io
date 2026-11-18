import { readFileSync, writeFileSync } from 'node:fs';
function sub(file, pairs) {
  let s = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  for (const [a, b] of pairs) { if (!s.includes(a)) throw new Error(`${file}: ${a}`); s = s.split(a).join(b); }
  writeFileSync(file, s);
}
sub('src/data/cv.test.ts', [[
  `  expect(person.headline).toBe('Desarrollador full-stack · React, Spring Boot, Django y AWS');`,
  `  expect(person.headline).toBe('Diplomado en Programación de Aplicaciones Informáticas (UNA)');\n  expect(person.heroTitleStart + ' ' + person.heroTitleAccent).toBe('Desarrollador full-stack.');\n  expect(person.heroText).toBe('Construyo aplicaciones web de punta a punta con React, Spring Boot y Django, y las despliego en la nube.');`,
]]);
sub('src/data/cv.en.test.ts', [[
  `    expect(en.person.headline).toBe('Full-stack developer · React, Spring Boot, Django and AWS');`,
  `    expect(en.person.headline).toBe('Diplomado in Application Programming (UNA)');\n    expect(en.person.heroTitleStart + ' ' + en.person.heroTitleAccent).toBe('Full-stack developer.');\n    expect(en.person.heroText).toBe('I build end-to-end web applications with React, Spring Boot and Django, and deploy them to the cloud.');`,
]]);
sub('tests/e2e/hero.spec.ts', [
  [`test('portada sin "Trabajemos juntos" y con Descargar CV', async ({ page }) => {`, `test('portada clara para reclutadores: rol, stack, Ver proyectos y Descargar CV', async ({ page }) => {`],
  [`toHaveText(/Construyo software\s*en equilibrio\./);`, `toHaveText('Desarrollador full-stack.');\n  await expect(hero).toContainText('React, Spring Boot y Django');\n  await expect(hero.locator('.kicker')).toContainText('Diplomado en Programación de Aplicaciones Informáticas (UNA)');\n  await expect(hero.getByRole('link', { name: 'Ver proyectos' })).toHaveAttribute('href', '#areas');`],
  [`  await expect(hero.getByRole('link')).toHaveCount(1);`, `  await expect(hero.getByRole('link')).toHaveCount(2);`],
]);
sub('tests/e2e/hero.spec.ts', [[
  `  await expect(page.locator('#hero .kicker')).toContainText('Desarrollador full-stack · React, Spring Boot, Django y AWS');`,
  `  await expect(page.locator('#hero .kicker')).toContainText('Marco Rojas');`,
]]);
sub('tests/e2e/en.spec.ts', [
  [`  await expect(page.locator('#hero .kicker')).toContainText('Full-stack developer · React, Spring Boot, Django and AWS');`,
   `  await expect(page.locator('#hero h1')).toHaveText('Full-stack developer.');\n  await expect(page.locator('#hero .kicker')).toContainText('Diplomado in Application Programming (UNA)');\n  await expect(page.locator('#hero').getByRole('link', { name: 'View projects' })).toHaveAttribute('href', '#areas');`],
]);
console.log('pruebas actualizadas');
