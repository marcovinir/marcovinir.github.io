# Portafolio marcovinir.dev: plan de implementación

> **Para agentes:** SUB-SKILL REQUERIDA: usar superpowers:subagent-driven-development (recomendado) o superpowers:executing-plans para implementar este plan tarea por tarea. Los pasos usan casillas (`- [ ]`) para seguimiento.

**Objetivo:** construir en Astro el portafolio/CV interactivo de Marco Rojas, publicarlo en GitHub Pages y generar su CV en PDF desde los mismos datos.

**Arquitectura:** sitio estático de una sola página en Astro. Todo el contenido vive en `src/data/cv.ts`; los componentes solo lo pintan. Las animaciones son CSS/SVG, y canvas solo para las brasas. Una segunda página `/cv` arma el CV imprimible, y un script con Playwright la convierte en `dist/cv-marco-rojas.pdf` después del build. GitHub Actions compila, genera el PDF, prueba y publica en Pages.

**Stack:** Node 24, Astro 7.4, TypeScript, Vitest 5, @playwright/test 1.64, GitHub Actions + GitHub Pages.

**Diseño:** [`docs/superpowers/specs/2026-10-29-portafolio-design.md`](../specs/2026-10-29-portafolio-design.md). El prototipo aprobado está en [`docs/superpowers/specs/2026-10-29-prototipo-portafolio.html`](../specs/2026-10-29-prototipo-portafolio.html). **Los textos exactos, los colores y las animaciones salen del diseño y del prototipo.** Este plan no los repite salvo donde un test los fija.

## Restricciones globales

- Sin emojis en ningún texto, HTML ni metadato (el favicon tampoco puede ser un emoji).
- Nunca aparecen las palabras "agua", "tierra", "fuego" ni "aire" (como palabra completa, sin importar mayúsculas).
- Sin ubicación: no aparecen "Alajuela" ni "Costa Rica". La **única** excepción es el nombre oficial "Universidad Nacional de Costa Rica".
- "Trabajemos juntos" no aparece en la portada; el llamado a contactar vive solo en `#contacto`.
- Scrum y Azure DevOps solo se mencionan dentro de la experiencia de SIRA.
- Sin material de la serie Avatar: ni personajes, ni logos, ni el símbolo oficial de los elementos. Todos los SVG son originales.
- Correo de contacto: `mvnaranjo1@gmail.com`. GitHub: `https://github.com/marcovinir`.
- Paleta: fondo `#05060a`, texto `#eef0f6`, secundario `#8a90a6`; Fluir `#38bdf8`→`#6366f1`, Cimientos `#34d399`→`#a3e635`, Chispa `#fb7185`→`#f59e0b`, Horizonte `#e2e8f0`→`#a78bfa`.
- `prefers-reduced-motion: reduce` → sin animaciones y todo el contenido visible.
- `site` en `astro.config.mjs` = `https://marcovinir.github.io` (se cambia a `https://marcovinir.dev` en la fase de dominio, fuera de este plan).
- Idioma del sitio: español (`<html lang="es">`).

## Foco de revisión

Casos que el diseño implica pero que ningún flujo normal prueba:
1. **JavaScript desactivado o IntersectionObserver ausente:** el contenido debe verse igual. Lo que se oculta para animarse solo se oculta si el script agregó la clase `js` a `<html>`. Lo prueba la Tarea 3 (`reveal sin JS`).
2. **Usuario con `prefers-reduced-motion`:** nada se queda invisible esperando una animación. Lo prueba la Tarea 3 (`reduced motion`).
3. **Celular de 375 px:** sin scroll horizontal, aunque las ilustraciones animadas se salgan del contenedor. Lo prueba la Tarea 6 (`sin scroll horizontal en móvil`).
4. **Portapapeles no disponible o bloqueado:** el botón Copiar no debe lanzar errores. Debe seleccionar el correo para copiarlo a mano, y el `mailto:` sigue funcionando. Lo prueba la Tarea 7 (`copiar sin clipboard`).
5. **El PDF no se genera:** el despliegue debe fallar, nunca publicar un botón "Descargar CV" roto. Lo prueba la Tarea 8 (`pdf existe y es una página`) y lo exige el workflow de la Tarea 9.

---

## Estructura de archivos

```
astro.config.mjs
package.json
tsconfig.json
vitest.config.ts
playwright.config.ts
.gitignore                      # node_modules, dist, .astro, .superpowers, test-results, playwright-report
public/favicon.svg              # símbolo original de 4 colores
src/data/cv.ts                  # TODO el contenido y sus tipos
src/data/cv.test.ts             # reglas de contenido (Vitest)
src/styles/global.css           # tokens, reset, tipografía, .reveal, .grad, chips, tarjetas
src/scripts/reveal.ts           # IntersectionObserver + barra lateral + clase js
src/layouts/Base.astro          # <html lang="es">, meta, OG, global.css
src/components/Rail.astro
src/components/Hero.astro
src/components/Perfil.astro     # Sobre mí + cifras + Educación
src/components/Timeline.astro   # reutilizado por Educación y Experiencia
src/components/Experiencia.astro
src/components/ComoTrabajo.astro
src/components/AreasIntro.astro
src/components/Area.astro       # sección genérica de área (texto, chips, tarjetas)
src/components/ProjectCard.astro
src/components/visuals/Waves.astro
src/components/visuals/IsoBlocks.astro
src/components/visuals/Embers.astro    # canvas + script
src/components/visuals/Streams.astro
src/components/Contacto.astro
src/components/Footer.astro
src/pages/index.astro
src/pages/cv.astro              # CV imprimible (noindex)
src/pages/404.astro
scripts/generate-cv.mjs         # dist/cv/index.html -> dist/cv-marco-rojas.pdf
scripts/check-dist.mjs          # reglas sobre el HTML compilado + enlaces internos
tests/e2e/*.spec.ts             # Playwright contra `astro preview`
.github/workflows/deploy.yml
```

---

### Tarea 1: Proyecto base, repo y CI de pruebas

**Archivos:**
- Crear: todo lo de la raíz (`package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts`, `.gitignore`), `src/pages/index.astro` (temporal: un `<h1>`), `tests/e2e/smoke.spec.ts`
- Borrar: `marcovinir/README.md` (copia del README del perfil, ya publicado en `marcovinir/marcovinir`)

**Interfaces:**
- Produce: scripts npm `dev`, `build`, `preview`, `test` (vitest run), `test:e2e` (playwright test), `cv` (node scripts/generate-cv.mjs), `check` (node scripts/check-dist.mjs). `playwright.config.ts` levanta `npm run preview` en el puerto `4321` como `webServer` y define dos proyectos, `desktop` (1280×800) y `mobile` (375×812).

- [ ] **Paso 1:** `git init -b main` en la raíz del proyecto. Crear el proyecto Astro con la plantilla mínima, en TypeScript estricto, dentro de la carpeta actual (`npm create astro@latest . -- --template minimal --typescript strict --no-git --install`). Si la carpeta no está vacía, crearlo en una subcarpeta temporal y mover el contenido.
- [ ] **Paso 2:** instalar como dependencias de desarrollo `vitest@5` y `@playwright/test@1.64`, y correr `npx playwright install chromium`. Definir los scripts npm de **Interfaces**. Poner `site: 'https://marcovinir.github.io'` en `astro.config.mjs`. Escribir el `.gitignore` con las entradas de la estructura de archivos y borrar `marcovinir/README.md`.
- [ ] **Paso 3: test de humo** en `tests/e2e/smoke.spec.ts`:

```ts
test('la portada carga', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Marco Rojas/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
});
```

- [ ] **Paso 4:** `npm run build && npm run test:e2e`. Esperado: falla, porque el título todavía no contiene "Marco Rojas".
- [ ] **Paso 5:** poner en el `index.astro` temporal `<html lang="es">` y `<title>Marco Rojas · Full-stack developer</title>`. Correr `npm run build && npm run test:e2e`. Esperado: PASS en los dos proyectos.
- [ ] **Paso 6: commit**

```bash
git add -A
git commit -m "chore: proyecto Astro base con Vitest y Playwright"
```

---

### Tarea 2: Datos del CV y sus reglas

**Archivos:**
- Crear: `src/data/cv.ts`, `src/data/cv.test.ts`

**Interfaces:**
- Produce (desde `src/data/cv.ts`):

```ts
export type Link = { label: string; href: string };
export type Project = { name: string; summary: string; stack: string; href: string; team: boolean; inProgress?: boolean };
export type TimelineEntry = { period: string; title: string; org: string; description?: string; current: boolean; bullets?: string[]; link?: Link };
export type AreaId = 'fluir' | 'cimientos' | 'chispa' | 'horizonte';
export type Area = {
  id: AreaId; label: string; number: string; cvCategory: string;
  titleLine1: string; titleLine2: string; text: string;
  skills: string[]; projects: Project[]; color: string; color2: string;
};
export type Step = { title: string; text: string };
export const person: { name: string; role: string; email: string; github: string; heroTitleStart: string; heroTitleAccent: string; heroText: string; about: string[] };
export const stats: { value: string; label: string }[];
export const education: TimelineEntry[];
export const experience: TimelineEntry[];
export const workflow: Step[];
export const areas: Area[];
export function allText(): string; // concatena todo string exportado, para las reglas
```

- [ ] **Paso 1: tests que fallan** en `src/data/cv.test.ts`:

```ts
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
  expect(areas.map(a => a.label)).toEqual(['Fluir', 'Cimientos', 'Chispa', 'Horizonte']);
  expect(areas.map(a => a.cvCategory)).toEqual(['Frontend', 'Backend y datos', 'Tiempo real y juegos', 'Cloud y despliegue']);
});
test('proyectos por área', () => {
  expect(areas[0].projects.map(p => p.name)).toEqual(['PomoPet', 'Gym-LACOBRA']);
  expect(areas[1].projects.map(p => p.name)).toEqual(['OraAdmin XE']);
  expect(areas[2].projects.map(p => p.name)).toEqual(['Pokémon Minigames']);
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
  expect(experience[0].link?.href).toBe('[sitio de desarrollo confidencial]');
});
test('contacto', () => {
  expect(person.email).toBe('mvnaranjo1@gmail.com');
  expect(person.github).toBe('https://github.com/marcovinir');
});
test('cifras', () => expect(stats.map(s => s.value)).toEqual(['700+', '5', '6']));
test('Claude Code aparece en el perfil y en el flujo', () => {
  expect(person.about.join(' ')).toMatch(/Claude Code/);
  expect(JSON.stringify(workflow)).toMatch(/Claude Code/);
});
```

- [ ] **Paso 2:** `npm test`. Esperado: FAIL, porque `./cv` no existe.
- [ ] **Paso 3:** escribir `src/data/cv.ts` con los tipos de **Interfaces**. Copiar **literalmente** los textos de las secciones 6.1 a 6.6 del diseño: títulos, textos, chips, proyectos y enlaces de la tabla 6.5, los cuatro pasos de 6.4 y los colores de la paleta. `allText()` recorre recursivamente todos los exports y une sus strings.
- [ ] **Paso 4:** `npm test`. Esperado: PASS.
- [ ] **Paso 5: commit:** `git add src/data && git commit -m "feat: datos del CV con reglas de contenido"`

---

### Tarea 3: Layout, estilos base, portada y barra lateral

**Archivos:**
- Crear: `src/layouts/Base.astro`, `src/styles/global.css`, `src/scripts/reveal.ts`, `src/components/Hero.astro`, `src/components/Rail.astro`, `public/favicon.svg`, `tests/e2e/hero.spec.ts`
- Modificar: `src/pages/index.astro`

**Interfaces:**
- Consume: `person` de la Tarea 2.
- Produce:
  - `Base.astro` acepta las props `{ title: string; description: string; noindex?: boolean }`.
  - Clases CSS globales: `.reveal`, `.grad`, `.chip`, `.kicker`, `.cta`, `.inner`.
  - Cada sección de página es un `<section id="..." data-accent="#hex">`.
  - `reveal.ts` hace tres cosas: agrega `js` a `<html>` al cargar; pone `.in` en la sección visible con umbral 0.45; marca el punto de `Rail` cuyo `href` coincide y le asigna `--accent` desde `data-accent`.
  - Ids de sección, en orden: `hero`, `perfil`, `experiencia`, `como-trabajo`, `areas`, `fluir`, `cimientos`, `chispa`, `horizonte`, `contacto`. `Rail` recibe `items: { id: string; color: string }[]`.

- [ ] **Paso 1: tests que fallan** en `tests/e2e/hero.spec.ts`:

```ts
test('portada sin "Trabajemos juntos" y con Descargar CV', async ({ page }) => {
  await page.goto('/');
  const hero = page.locator('#hero');
  await expect(hero.getByRole('heading', { level: 1 })).toHaveText(/Construyo software\s*en equilibrio\./);
  await expect(hero).not.toContainText('Trabajemos juntos');
  const cv = hero.getByRole('link', { name: 'Descargar CV' });
  await expect(cv).toHaveAttribute('href', '/cv-marco-rojas.pdf');
  await expect(hero.getByRole('link')).toHaveCount(1);
});
test('reveal sin JS', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page.locator('#hero h1')).toHaveCSS('opacity', '1');
  await ctx.close();
});
test('reduced motion', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page.locator('#hero h1')).toHaveCSS('opacity', '1');
  const anim = await page.locator('.aurora span').first().evaluate(e => getComputedStyle(e).animationName);
  expect(anim).toBe('none');
  await ctx.close();
});
```

- [ ] **Paso 2:** `npm run build && npx playwright test hero`. Esperado: FAIL.
- [ ] **Paso 3:** implementar `Base`, `global.css` (tokens de las Restricciones globales; `.js .reveal { opacity:0; transform:translateY(30px) }` y `.js .in .reveal { opacity:1; transform:none }` con el escalonado del prototipo; el bloque de reduced motion del prototipo), `reveal.ts`, `Hero` (aurora de 4 luces e indicador de scroll, como el prototipo) y `Rail`. `favicon.svg`: cuatro círculos pequeños con los colores de la paleta en rombo. `index.astro` monta `Base`, `Rail` y `Hero`.
- [ ] **Paso 4:** `npm run build && npx playwright test hero`. Esperado: PASS.
- [ ] **Paso 5: commit:** `git commit -am "feat: layout, portada y barra lateral"` (antes, agregar los archivos nuevos con `git add`).

---

### Tarea 4: Sobre mí, Educación y Experiencia

**Archivos:**
- Crear: `src/components/Perfil.astro`, `src/components/Timeline.astro`, `src/components/Experiencia.astro`, `tests/e2e/perfil.spec.ts`
- Modificar: `src/pages/index.astro`

**Interfaces:**
- Consume: `person`, `stats`, `education`, `experience`.
- Produce: `Timeline.astro` con la prop `{ entries: TimelineEntry[] }`. El elemento con `current: true` lleva la clase `now`, que hace latir su punto.

- [ ] **Paso 1: tests que fallan:**

```ts
test('perfil, educación y experiencia', async ({ page }) => {
  await page.goto('/');
  const perfil = page.locator('#perfil');
  await expect(perfil.getByRole('heading', { name: 'Sobre mí' })).toBeVisible();
  await expect(perfil).toContainText('Claude Code');
  await expect(perfil.locator('.stats b')).toHaveText(['700+', '5', '6']);
  await expect(perfil.getByRole('heading', { name: 'Educación' })).toBeVisible();
  await expect(perfil).toContainText('2024 — Actualidad');
  await expect(perfil).toContainText('Ingeniería en Sistemas de Información');
  const exp = page.locator('#experiencia');
  await expect(exp).toContainText('Desarrollador');
  await expect(exp).toContainText('Scrum');
  await expect(exp.getByRole('link', { name: /sitio confidencial/ })).toHaveAttribute('href', '[sitio de desarrollo confidencial]');
});
```

- [ ] **Paso 2:** correr. Esperado: FAIL.
- [ ] **Paso 3:** implementar según 6.2 y 6.3 del diseño y el `#perfil` del prototipo: dos columnas, que pasan a una por debajo de 900 px. Experiencia es una sección propia (`#experiencia`) con el mismo `Timeline`.
- [ ] **Paso 4:** correr. Esperado: PASS.
- [ ] **Paso 5: commit:** `feat: perfil, educación y experiencia`

---

### Tarea 5: Cómo trabajo

**Archivos:**
- Crear: `src/components/ComoTrabajo.astro`, `tests/e2e/como-trabajo.spec.ts`
- Modificar: `src/pages/index.astro`

**Interfaces:**
- Consume: `workflow`.

- [ ] **Paso 1: test que falla:**

```ts
test('cuatro pasos en orden', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#como-trabajo .step h3')).toHaveText(['Planificar', 'Implementar', 'Probar', 'Integrar']);
  await expect(page.locator('#como-trabajo')).not.toContainText('Scrum');
});
```

- [ ] **Paso 2:** correr. Esperado: FAIL.
- [ ] **Paso 3:** implementar. Son cuatro pasos numerados unidos por una línea con el degradado de los cuatro colores. Al entrar `.in`, se encienden en secuencia con 150 ms de retraso entre uno y otro. En fila desde 900 px; en columna por debajo.
- [ ] **Paso 4:** correr. Esperado: PASS.
- [ ] **Paso 5: commit:** `feat: sección cómo trabajo`

---

### Tarea 6: Las cuatro áreas con sus animaciones

**Archivos:**
- Crear: `src/components/AreasIntro.astro`, `src/components/Area.astro`, `src/components/ProjectCard.astro`, `src/components/visuals/{Waves,IsoBlocks,Embers,Streams}.astro`, `tests/e2e/areas.spec.ts`
- Modificar: `src/pages/index.astro`

**Interfaces:**
- Consume: `areas`, `Project`.
- Produce:
  - `Area.astro` con la prop `{ area: Area }` y un `<slot name="visual" />` para la ilustración.
  - `ProjectCard.astro` con la prop `{ project: Project; accent: string; accent2: string }`. Si `team` es true, muestra la etiqueta `En equipo`; si `inProgress` es true, agrega ` · en desarrollo` al nombre. Es un `<a>` que abre `href` en una pestaña nueva con `rel="noopener"`.
  - Los visuales se portan del prototipo (`.waves`/`.caustic`, `.iso`/`.gridfloor`, `#embers`/`.core`, `.streams`/`.cloudnode`). `Embers` pausa su `requestAnimationFrame` cuando su sección no es visible, no dibuja nada con reduced motion y dimensiona el canvas con `width:100%;height:100%` (en el prototipo faltaba ese ajuste y las brasas quedaban apiñadas).

- [ ] **Paso 1: tests que fallan:**

```ts
test('cuatro áreas con etiquetas y proyectos', async ({ page }) => {
  await page.goto('/');
  for (const [id, label] of [['fluir','Fluir'],['cimientos','Cimientos'],['chispa','Chispa'],['horizonte','Horizonte']]) {
    await expect(page.locator(`#${id} .kicker`)).toContainText(label);
  }
  await expect(page.locator('#fluir .proj')).toHaveCount(2);
  await expect(page.locator('#fluir .proj').first()).toContainText('PomoPet');
  await expect(page.locator('.proj', { hasText: 'PomoPet' })).toContainText('En equipo');
  await expect(page.locator('.proj', { hasText: 'OraAdmin XE' })).not.toContainText('En equipo');
  await expect(page.locator('#horizonte .chip')).toHaveText(['Render', 'GitHub Actions', 'GitHub Pages']);
});
test('sin scroll horizontal en móvil', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
test('canvas de brasas ocupa toda la sección', async ({ page }) => {
  await page.goto('/#chispa');
  const [c, s] = await Promise.all([page.locator('#embers').boundingBox(), page.locator('#chispa').boundingBox()]);
  expect(c!.width).toBeCloseTo(s!.width, 0);
});
```

- [ ] **Paso 2:** correr. Esperado: FAIL.
- [ ] **Paso 3:** implementar `AreasIntro` ("Cuatro áreas, un mismo equilibrio.") y `Area` y `ProjectCard` según 6.5. Portar los cuatro visuales del prototipo. `body` lleva `overflow-x: clip`, y en móvil los visuales se atenúan detrás del texto.
- [ ] **Paso 4:** correr. Esperado: PASS.
- [ ] **Paso 5: commit:** `feat: cuatro áreas con animaciones`

---

### Tarea 7: Contacto y pie

**Archivos:**
- Crear: `src/components/Contacto.astro`, `src/components/Footer.astro`, `tests/e2e/contacto.spec.ts`
- Modificar: `src/pages/index.astro`

**Interfaces:**
- Consume: `person`.

- [ ] **Paso 1: tests que fallan:**

```ts
test('contacto con correo y copiar', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/#contacto');
  const c = page.locator('#contacto');
  await expect(c.getByRole('heading')).toHaveText('¿Tienes un proyecto en mente?');
  await expect(c.getByRole('link', { name: /mvnaranjo1@gmail\.com/ })).toHaveAttribute('href', 'mailto:mvnaranjo1@gmail.com');
  await c.getByRole('button', { name: 'Copiar' }).click();
  await expect(c.getByRole('button', { name: 'Copiado' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('mvnaranjo1@gmail.com');
});
test('copiar sin clipboard', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { value: undefined }));
  const errores: string[] = [];
  page.on('pageerror', e => errores.push(e.message));
  await page.goto('/#contacto');
  await page.locator('#contacto').getByRole('button', { name: 'Copiar' }).click();
  expect(errores).toEqual([]);
  expect(await page.evaluate(() => getSelection()?.toString())).toBe('mvnaranjo1@gmail.com');
});
test('pie con GitHub', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('footer').getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', 'https://github.com/marcovinir');
});
```

- [ ] **Paso 2:** correr. Esperado: FAIL.
- [ ] **Paso 3:** implementar según 6.6. El botón Copiar es un `<button>` **fuera** del `<a>` (en el prototipo estaba anidado, y eso no es HTML válido). Si `navigator.clipboard?.writeText` falla o no existe, seleccionar el texto del correo con `Range`/`Selection` y dejar el botón en "Copiar". El pie lleva el enlace a GitHub y el año de compilación.
- [ ] **Paso 4:** correr. Esperado: PASS.
- [ ] **Paso 5: commit:** `feat: contacto y pie`

---

### Tarea 8: CV imprimible y PDF

**Archivos:**
- Crear: `src/pages/cv.astro`, `scripts/generate-cv.mjs`, `tests/e2e/cv.spec.ts`

**Interfaces:**
- Consume: todos los exports de `src/data/cv.ts`; `Area.cvCategory`.
- Produce: `dist/cv-marco-rojas.pdf`. `npm run cv` lo genera a partir de un `dist/` ya compilado: levanta `astro preview` en el puerto 4322, abre `/cv` con Chromium de Playwright, ejecuta `page.pdf({ path, format: 'A4', printBackground: true })` y cierra el servidor. Si hay cualquier error, termina con código ≠ 0.

- [ ] **Paso 1: tests que fallan** en `tests/e2e/cv.spec.ts`:

```ts
import { readFileSync, existsSync } from 'node:fs';

test('página /cv con categorías normales y noindex', async ({ page }) => {
  await page.goto('/cv');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  for (const t of ['Frontend', 'Backend y datos', 'Tiempo real y juegos', 'Cloud y despliegue']) await expect(page.locator('body')).toContainText(t);
  for (const t of ['Fluir', 'Cimientos', 'Chispa', 'Horizonte']) await expect(page.locator('body')).not.toContainText(t);
  await expect(page.locator('body')).toContainText('mvnaranjo1@gmail.com');
});
test('pdf existe y es una página', () => {
  const path = 'dist/cv-marco-rojas.pdf';
  expect(existsSync(path)).toBe(true);
  const pdf = readFileSync(path, 'latin1');
  expect(pdf.startsWith('%PDF')).toBe(true);
  expect((pdf.match(/\/Type\s*\/Page[^s]/g) ?? []).length).toBe(1);
});
```

- [ ] **Paso 2:** `npm run build && npx playwright test cv`. Esperado: FAIL.
- [ ] **Paso 3:** implementar `cv.astro` según la sección 9 del diseño: `Base` con `noindex`, fondo blanco, A4 (`@page { size: A4; margin: 14mm }`), sin animaciones y con acento `#6366f1`. Incluye nombre, rol, perfil, contacto, Educación, Experiencia, Proyectos (nombre, resumen, stack, enlace y "En equipo") y Habilidades por `cvCategory`. Implementar `generate-cv.mjs` según **Interfaces**.
- [ ] **Paso 4:** `npm run build && npm run cv && npx playwright test cv`. Esperado: PASS. Si el CV no cabe en una página, ajustar la tipografía o el espaciado, nunca recortar contenido.
- [ ] **Paso 5: commit:** `feat: CV imprimible y generación de PDF`

---

### Tarea 9: Revisión del build, 404, SEO y despliegue

**Archivos:**
- Crear: `scripts/check-dist.mjs`, `src/pages/404.astro`, `.github/workflows/deploy.yml`, `README.md`
- Modificar: `src/layouts/Base.astro` (OG/meta)

**Interfaces:**
- Consume: `dist/` completo, incluido el PDF.
- Produce: `npm run check` recorre todos los `.html` de `dist/`. Aplica sobre su texto visible y sus atributos `alt`/`title`/`content` las mismas reglas de la Tarea 2: emojis, nombres de elementos y ubicación con la excepción de la universidad. Además verifica que todo `href`/`src` interno (`/…` o `#…`) apunte a un archivo existente en `dist/` o a un `id` existente en la misma página. Si algo falla, imprime cada problema y termina con código 1.

- [ ] **Paso 1: test que falla:** agregar a `dist/index.html` un enlace temporal `<a href="/no-existe">` (a mano, después del build) y correr `npm run check`. Esperado: termina con código 1 y reporta `/no-existe`. Como el script todavía no existe, falla igual.
- [ ] **Paso 2:** implementar `check-dist.mjs`. Repetir el paso 1: debe reportar el enlace. Recompilar y correr `npm run build && npm run cv && npm run check`. Esperado: código 0.
- [ ] **Paso 3:** `404.astro`: fondo oscuro, texto "Esta página no existe." y enlace a la portada, sin emojis. En `Base`, agregar `description`, Open Graph (`og:title`, `og:description`, `og:url` desde `site`) y `theme-color` `#05060a`.
- [ ] **Paso 4:** `.github/workflows/deploy.yml`. Se dispara con `push` a `main` y `workflow_dispatch`. Permisos: `pages: write`, `id-token: write`, `contents: read`. Job `build`: checkout, Node 24, `npm ci`, `npx playwright install --with-deps chromium`, `npm test`, `npm run build`, `npm run cv`, `npm run check`, `npm run test:e2e`, y subir `dist/` con `actions/upload-pages-artifact`. Job `deploy` (necesita `build`): `actions/deploy-pages`. Usar las versiones mayores vigentes de esas actions según la guía de GitHub Pages de Astro. Si cualquier paso falla, no se publica.
- [ ] **Paso 5:** `README.md` corto: qué es, cómo correrlo (`npm i`, `npm run dev`), dónde se edita el contenido (`src/data/cv.ts`) y cómo se genera el CV.
- [ ] **Paso 6:** verificación local completa: `npm test && npm run build && npm run cv && npm run check && npm run test:e2e`. Esperado: todo PASS.
- [ ] **Paso 7: commit:** `feat: chequeo del build, 404, SEO y despliegue a Pages`
- [ ] **Paso 8 (requiere confirmación de Marco):** crear el repo público `marcovinir/marcovinir.github.io`, hacer push de `main`, activar Pages con "GitHub Actions" como fuente y comprobar que el workflow publique en `https://marcovinir.github.io`.
