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
