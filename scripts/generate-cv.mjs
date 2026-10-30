// Genera dist/cv-marco-rojas.pdf a partir de la página /cv ya compilada.
// Uso: npm run build && npm run cv
import { existsSync } from 'node:fs';
import { preview } from 'astro';
import { chromium } from '@playwright/test';

const OUT = 'dist/cv-marco-rojas.pdf';
const PORT = 4322;

if (!existsSync('dist/cv/index.html')) {
  console.error('No existe dist/cv/index.html. Corre primero: npm run build');
  process.exit(1);
}

const server = await preview({ server: { port: PORT, host: 'localhost' }, logLevel: 'warn' });
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}/cv`, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: OUT, format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log(`CV generado: ${OUT}`);
} catch (err) {
  console.error('No se pudo generar el CV:', err);
  process.exitCode = 1;
} finally {
  await browser.close();
  await server.stop();
}
