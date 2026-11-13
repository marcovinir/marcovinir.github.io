// Revisa el sitio compilado en dist/: reglas de contenido y enlaces internos.
// Uso: npm run build && npm run cv && npm run check
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';

const DIST = 'dist';
const EMOJI = /\p{Extended_Pictographic}/u;
const ELEMENTOS = /\b(agua|tierra|fuego|aire)\b/i;
const UBICACION = /Alajuela|Costa Rica/i;
const UNIVERSIDAD = 'Universidad Nacional de Costa Rica';
// Dominio de desarrollo de SIRA: está cubierto por un acuerdo de confidencialidad.
const CONFIDENCIAL = /dannyas|Montes de Oro|munimontesdeoro/i;

function htmlFiles(dir) {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return path.endsWith('.html') ? [path] : [];
  });
}

const decode = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');

function visibleText(html) {
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const attrs = [...body.matchAll(/\s(?:alt|title|content|aria-label)="([^"]*)"/gi)].map(m => m[1]);
  return decode(body.replace(/<[^>]+>/g, ' ') + ' ' + attrs.join(' '));
}

function resolves(target, fromFile) {
  const clean = target.split('#')[0].split('?')[0];
  const base = clean.startsWith('/') ? join(DIST, clean) : join(dirname(fromFile), clean);
  return [base, join(base, 'index.html'), `${base}.html`].some(p => existsSync(p) && statSync(p).isFile());
}

const problems = [];
for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8');
  const where = relative(DIST, file);
  const text = visibleText(html);

  if (EMOJI.test(text)) problems.push(`${where}: contiene emojis`);
  const elem = text.match(ELEMENTOS);
  if (elem) problems.push(`${where}: menciona "${elem[0]}"`);
  const loc = text.replaceAll(UNIVERSIDAD, '').match(UBICACION);
  if (loc) problems.push(`${where}: menciona la ubicación "${loc[0]}"`);
  if (CONFIDENCIAL.test(html)) problems.push(`${where}: contiene datos confidenciales de SIRA`);

  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
  for (const [, attr, target] of html.matchAll(/\s(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(target)) continue;
    if (target.startsWith('#')) {
      if (target.length > 1 && !ids.has(target.slice(1))) problems.push(`${where}: ${attr}="${target}" no apunta a ningún id`);
      continue;
    }
    if (!resolves(target, file)) problems.push(`${where}: ${attr}="${target}" no existe en dist/`);
  }
}

if (problems.length) {
  console.error(`check-dist: ${problems.length} problema(s)`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log('check-dist: todo bien');
