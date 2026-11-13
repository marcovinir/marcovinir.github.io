import { test, expect } from '@playwright/test';

test('portada sin "Trabajemos juntos" y con Descargar CV', async ({ page }) => {
  await page.goto('/');
  const hero = page.locator('#hero');
  await expect(hero.getByRole('heading', { level: 1 })).toHaveText(/Construyo software\s*en equilibrio\./);
  await expect(hero).not.toContainText('Trabajemos juntos');
  const cv = hero.getByRole('link', { name: 'Descargar CV' });
  await expect(cv).toHaveAttribute('href', '/cv-marco-rojas.pdf');
  await expect(hero.getByRole('link')).toHaveCount(1);
});

test('reveal sin JS', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page.locator('#hero h1')).toHaveCSS('opacity', '1');
  await ctx.close();
});

test('reduced motion', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page.locator('#hero h1')).toHaveCSS('opacity', '1');
  const anim = await page.locator('.aurora span').first().evaluate(e => getComputedStyle(e).animationName);
  expect(anim).toBe('none');
  await ctx.close();
});

test('el tagline dice qué hace y con qué', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#hero .kicker')).toContainText('Desarrollador full-stack · React, Spring Boot, Django y AWS');
  await expect(page).toHaveTitle(/Desarrollador full-stack/);
});
