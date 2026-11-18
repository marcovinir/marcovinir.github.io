import { test, expect } from '@playwright/test';
import { readFileSync, existsSync } from 'node:fs';

test('la versión en inglés existe en /en/', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveTitle(/Full-stack developer/);
  await expect(page.locator('#hero .kicker')).toContainText('Full-stack developer · React, Spring Boot, Django and AWS');
  await expect(page.locator('#hero').getByRole('link', { name: 'Download CV' })).toHaveAttribute('href', '/cv-marco-rojas-en.pdf');
  for (const name of ['About me', 'Education', 'Certifications', 'Experience', 'How I work']) {
    await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
  }
  await expect(page.locator('.proj', { hasText: 'Rivalmon' }).getByRole('link', { name: /View demo/ })).toHaveAttribute('href', 'https://rivalmon.marcovinir.dev/');
  await expect(page.locator('.proj', { hasText: 'Coffee Tour Pura Vista' })).toContainText('Private code');
  await expect(page.locator('.proj', { hasText: 'PomoPet' })).toContainText('Team project');
  await expect(page.locator('#contacto').getByRole('button', { name: 'Copy' })).toBeVisible();
  await expect(page.locator('body')).not.toContainText(/Sobre mí|Descargar CV|Ver demo|Cómo trabajo/);
});

test('el selector de idioma lleva a la otra versión', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'English version' })).toHaveAttribute('href', '/en/');
  await page.goto('/en/');
  await expect(page.getByRole('link', { name: 'Versión en español' })).toHaveAttribute('href', '/');
});

test('hreflang en ambas versiones', async ({ page }) => {
  for (const path of ['/', '/en/']) {
    await page.goto(path);
    await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveAttribute('href', 'https://marcovinir.dev/');
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', 'https://marcovinir.dev/en/');
  }
});

test('el CV en inglés existe, es noindex y tiene una página', async ({ page }) => {
  await page.goto('/en/cv');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  for (const t of ['Profile', 'Experience', 'Education', 'Certifications', 'Projects', 'Skills']) await expect(page.getByRole('heading', { name: t, exact: true })).toBeVisible();
  const path = 'dist/cv-marco-rojas-en.pdf';
  expect(existsSync(path)).toBe(true);
  const pdf = readFileSync(path, 'latin1');
  expect((pdf.match(/\/Type\s*\/Page[^s]/g) ?? []).length).toBe(1);
});
