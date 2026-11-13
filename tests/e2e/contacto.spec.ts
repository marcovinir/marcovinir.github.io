import { test, expect } from '@playwright/test';

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

test('LinkedIn en contacto, pie y CV', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#contacto').getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', 'https://www.linkedin.com/in/marco-vinicio-rojas-pe%C3%B1a-89497a416/');
  await expect(page.locator('footer').getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', 'https://www.linkedin.com/in/marco-vinicio-rojas-pe%C3%B1a-89497a416/');
  await page.goto('/cv');
  await expect(page.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://www.linkedin.com/in/marco-vinicio-rojas-pe%C3%B1a-89497a416/');
});
