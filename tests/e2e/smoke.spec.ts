import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

test('la portada carga', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Marco Rojas/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
});

test('el sitio usa el dominio marcovinir.dev', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://marcovinir.dev/');
  expect(readFileSync('dist/CNAME', 'utf8').trim()).toBe('marcovinir.dev');
});
