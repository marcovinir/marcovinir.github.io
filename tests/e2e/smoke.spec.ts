import { test, expect } from '@playwright/test';

test('la portada carga', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Marco Rojas/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
});
