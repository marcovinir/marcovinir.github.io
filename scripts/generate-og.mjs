// Genera las imágenes de vista previa para compartir (og:image) en español e inglés.
// Se guardan en public/og/ y se versionan; solo hay que correrlo si cambia el diseño o el texto.
// Uso: node scripts/generate-og.mjs
import { readFileSync } from 'node:fs';
import { chromium } from '@playwright/test';

const font = readFileSync('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2').toString('base64');

const IMAGES = [
  { out: 'public/og/marco-rojas-es.png', role: 'Desarrollador full-stack', line: 'Frontend, backend, tiempo real y despliegue.' },
  { out: 'public/og/marco-rojas-en.png', role: 'Full-stack developer', line: 'Frontend, backend, real time and deployment.' },
];
const STACK = ['React', 'Spring Boot', 'Django', 'AWS'];

const html = ({ role, line }) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Inter; src: url(data:font/woff2;base64,${font}) format('woff2'); font-weight: 100 900; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #05060a; color: #eef0f6; font-family: Inter, sans-serif; position: relative; overflow: hidden; }
.glow { position: absolute; border-radius: 50%; filter: blur(110px); opacity: .45; }
.g1 { width: 420px; height: 420px; background: #38bdf8; right: -60px; top: -140px; }
.g2 { width: 360px; height: 360px; background: #34d399; right: 220px; bottom: -220px; opacity: .3; }
.g3 { width: 340px; height: 340px; background: #fb7185; right: -120px; bottom: -80px; opacity: .35; }
.g4 { width: 300px; height: 300px; background: #a78bfa; right: 300px; top: -200px; opacity: .3; }
.wrap { position: absolute; inset: 0; padding: 80px 88px; display: flex; flex-direction: column; }
.logo { display: grid; grid-template-columns: repeat(3, 18px); grid-template-rows: repeat(3, 18px); width: 54px; height: 54px; }
.logo i { width: 18px; height: 18px; border-radius: 50%; display: block; }
h1 { font-size: 104px; font-weight: 800; letter-spacing: -.035em; line-height: 1; margin-top: 54px; }
.role { font-size: 50px; font-weight: 700; letter-spacing: -.02em; margin-top: 18px;
  background: linear-gradient(90deg, #38bdf8, #34d399, #f59e0b, #fb7185, #a78bfa); -webkit-background-clip: text; background-clip: text; color: transparent; width: fit-content; }
.line { font-size: 26px; color: #8a90a6; margin-top: 20px; }
.foot { margin-top: auto; display: flex; justify-content: space-between; align-items: center; }
.chips { display: flex; gap: 12px; }
.chip { padding: 10px 22px; border-radius: 999px; font-size: 22px; font-weight: 500; border: 1px solid #ffffff26; background: #ffffff0d; }
.url { font-size: 26px; font-weight: 600; color: #eef0f6; }
</style></head><body>
<div class="glow g1"></div><div class="glow g2"></div><div class="glow g3"></div><div class="glow g4"></div>
<div class="wrap">
  <div class="logo"><span></span><i style="background:#38bdf8"></i><span></span><i style="background:#a78bfa"></i><span></span><i style="background:#34d399"></i><span></span><i style="background:#fb7185"></i><span></span></div>
  <h1>Marco Rojas</h1>
  <div class="role">${role}</div>
  <p class="line">${line}</p>
  <div class="foot">
    <div class="chips">${STACK.map(s => `<span class="chip">${s}</span>`).join('')}</div>
    <span class="url">marcovinir.dev</span>
  </div>
</div></body></html>`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  for (const img of IMAGES) {
    await page.setContent(html(img));
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: img.out, type: 'png' });
    console.log(`Imagen generada: ${img.out}`);
  }
} finally {
  await browser.close();
}
