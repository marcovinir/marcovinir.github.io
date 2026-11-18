import { test, expect, type Page } from '@playwright/test';

const ES = '/proyectos/coffee-tour-pura-vista/';
const EN = '/en/projects/coffee-tour-pura-vista/';

async function imagenesCargadas(page: Page, selector: string) {
  const imgs = page.locator(selector);
  const n = await imgs.count();
  for (let i = 0; i < n; i++) {
    const img = imgs.nth(i);
    await img.scrollIntoViewIfNeeded();
    await expect(img).toHaveAttribute('alt', /.{10,}/);
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  }
  return n;
}

test('la tarjeta del Coffee Tour enlaza al detalle', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.proj', { hasText: 'Coffee Tour Pura Vista' }).getByRole('link', { name: /Ver detalles/ })).toHaveAttribute('href', ES);
  await page.goto('/en/');
  await expect(page.locator('.proj', { hasText: 'Coffee Tour Pura Vista' }).getByRole('link', { name: /View details/ })).toHaveAttribute('href', EN);
});

test('detalle en español: sitio, panel y lo que construí', async ({ page }) => {
  await page.goto(ES);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Coffee Tour Pura Vista');
  await expect(page.getByRole('heading', { name: 'El sitio público' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'El panel de la familia' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Lo que construí' })).toBeVisible();
  expect(await imagenesCargadas(page, '.gallery-site img')).toBe(2);
  expect(await imagenesCargadas(page, '.gallery-panel img')).toBe(10);
  await expect(page.getByRole('link', { name: /Ver demo/ })).toHaveAttribute('href', 'https://zagala.marcovinir.dev/');
  await expect(page.getByRole('link', { name: 'English version' })).toHaveAttribute('href', EN);
  await expect(page.getByRole('link', { name: /Volver al portafolio/ })).toHaveAttribute('href', '/#cimientos');
});

test('detalle en inglés', async ({ page }) => {
  await page.goto(EN);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { name: 'The public site' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'The family dashboard' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'What I built' })).toBeVisible();
  expect(await imagenesCargadas(page, '.gallery-panel img')).toBe(10);
  await expect(page.getByRole('link', { name: 'Versión en español' })).toHaveAttribute('href', ES);
  await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveAttribute('href', `https://marcovinir.dev${ES}`);
});

test('el detalle no tiene scroll horizontal en móvil', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(ES);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
