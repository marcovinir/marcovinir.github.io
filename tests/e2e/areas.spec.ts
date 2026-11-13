import { test, expect } from '@playwright/test';

test('cuatro áreas con etiquetas y proyectos', async ({ page }) => {
  await page.goto('/');
  for (const [id, label] of [['fluir', 'Frontend'], ['cimientos', 'Backend y datos'], ['chispa', 'Tiempo real y juegos'], ['horizonte', 'Cloud y despliegue']]) {
    await expect(page.locator(`#${id} .kicker`)).toContainText(label);
  }
  await expect(page.locator('#fluir .proj')).toHaveCount(2);
  await expect(page.locator('#fluir .proj').first()).toContainText('PomoPet');
  await expect(page.locator('.proj', { hasText: 'PomoPet' })).toContainText('En equipo');
  await expect(page.locator('.proj', { hasText: 'OraAdmin XE' })).not.toContainText('En equipo');
  await expect(page.locator('#horizonte .chip')).toHaveText(['AWS EC2', 'AWS RDS', 'SSH', 'Render', 'Cloudinary', 'GitHub Actions', 'GitHub Pages']);
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

test('las tarjetas muestran Ver demo y Ver código', async ({ page }) => {
  await page.goto('/');
  const rival = page.locator('.proj', { hasText: 'Rivalmon' });
  await expect(rival.getByRole('link', { name: /Ver demo/ })).toHaveAttribute('href', 'https://rivalmon.marcovinir.dev/');
  await expect(rival.getByRole('link', { name: /Ver código/ })).toHaveAttribute('href', 'https://github.com/marcovinir/rivalmon');
  const cafe = page.locator('.proj', { hasText: 'Coffee Tour Pura Vista' });
  await expect(cafe.getByRole('link', { name: /Ver demo/ })).toHaveAttribute('href', 'https://zagala.marcovinir.dev/');
  await expect(cafe).toContainText('Código privado');
  await expect(page.locator('.proj', { hasText: 'OraAdmin XE' }).getByRole('link', { name: /Ver demo/ })).toHaveCount(0);
});
