// Genera los CV en PDF (español e inglés) a partir de las páginas /cv y /en/cv ya compiladas.
// Uso: npm run build && npm run cv
import { existsSync } from 'node:fs';
import { preview } from 'astro';
import { chromium } from '@playwright/test';

const PORT = 4322;
const CVS = [
  { page: '/cv', html: 'dist/cv/index.html', out: 'dist/cv-marco-rojas.pdf' },
  { page: '/en/cv', html: 'dist/en/cv/index.html', out: 'dist/cv-marco-rojas-en.pdf' },
];

const missing = CVS.filter(cv => !existsSync(cv.html));
if (missing.length) {
  console.error(`No existe ${missing.map(cv => cv.html).join(', ')}. Corre primero: npm run build`);
  process.exit(1);
}

const server = await preview({ server: { port: PORT, host: 'localhost' }, logLevel: 'warn' });
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const cv of CVS) {
    await page.goto(`http://localhost:${PORT}${cv.page}`, { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    // Esperar la tipografía incluida: con la del sistema el CV puede ocupar otra cantidad de páginas.
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: cv.out, format: 'A4', printBackground: true, preferCSSPageSize: true });
    console.log(`CV generado: ${cv.out}`);
  }
} catch (err) {
  console.error('No se pudo generar el CV:', err);
  process.exitCode = 1;
} finally {
  await browser.close();
  await server.stop();
}
