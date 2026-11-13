import { test, expect } from '@playwright/test';
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

test('el CV usa la tipografía incluida en el sitio, no la del sistema', async ({ page }) => {
  await page.goto('/cv');
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => getComputedStyle(document.body).fontFamily)).toMatch(/^"?Inter Variable"?/);
  expect(await page.evaluate(() => document.fonts.check('16px "Inter Variable"'))).toBe(true);
});
