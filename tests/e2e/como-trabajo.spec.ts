import { test, expect } from '@playwright/test';

test('cinco pasos en orden', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#como-trabajo .step h3')).toHaveText(['Entender', 'Diseñar', 'Construir', 'Probar', 'Desplegar']);
  await expect(page.locator('#como-trabajo')).not.toContainText('Scrum');
});

test('cada paso tiene un ejemplo real', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#como-trabajo .example')).toHaveCount(5);
  await expect(page.locator('#como-trabajo .example').first()).toContainText('Coffee Tour Pura Vista');
});

test('el ejemplo aparece al pasar el mouse o al enfocar el paso', async ({ page }, info) => {
  test.skip(info.project.name === 'mobile', 'en móvil se muestran siempre');
  await page.goto('/#como-trabajo');
  const step = page.locator('#como-trabajo .step').first();
  const example = step.locator('.example');
  await expect(example).toHaveCSS('opacity', '0');
  await step.hover();
  await expect(example).toHaveCSS('opacity', '1');
  await page.mouse.move(0, 0);
  await step.focus();
  await expect(example).toHaveCSS('opacity', '1');
});

test('en pantallas táctiles los ejemplos se ven sin hover', async ({ browser }) => {
  const ctx = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 375, height: 812 } });
  const page = await ctx.newPage();
  await page.goto('/#como-trabajo');
  await expect(page.locator('#como-trabajo .example').first()).toHaveCSS('opacity', '1');
  await ctx.close();
});
