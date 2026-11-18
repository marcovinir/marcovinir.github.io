import { test, expect } from '@playwright/test';

test('perfil, educación y experiencia', async ({ page }) => {
  await page.goto('/');
  const perfil = page.locator('#perfil');
  await expect(perfil.getByRole('heading', { name: 'Sobre mí' })).toBeVisible();
  await expect(perfil).toContainText('Claude Code');
  await expect(perfil.locator('.stats')).toHaveCount(0);
  await expect(perfil.getByRole('heading', { name: 'Educación' })).toBeVisible();
  await expect(perfil).toContainText('2024 — Actualidad');
  await expect(perfil).toContainText('Ingeniería en Sistemas de Información');
  await expect(perfil).toContainText('Diplomado en Programación de Aplicaciones Informáticas');
  const exp = page.locator('#experiencia');
  await expect(exp).toContainText('Desarrollador');
  await expect(exp).toContainText('Scrum');
  await expect(exp.getByRole('link', { name: /dannyas/ })).toHaveCount(0);
  await expect(exp).toContainText('institución pública');
  await expect(exp).not.toContainText('Montes de Oro');
});

test('certificaciones en el perfil', async ({ page }) => {
  await page.goto('/');
  const perfil = page.locator('#perfil');
  await expect(perfil.getByRole('heading', { name: 'Certificaciones' })).toBeVisible();
  await expect(perfil).toContainText('Cloud Computing');
  await expect(perfil.getByRole('link', { name: /AI Skills Fest 2026/ })).toHaveAttribute('href', 'https://www.credly.com/badges/9fe53920-c524-4bfa-9019-586444f4c141');
  await expect(page.locator('#experiencia')).toContainText('historias de usuario completas');
});

test('la certificación de Google enlaza a Skillshop', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#perfil').getByRole('link', { name: 'Cloud Computing' })).toHaveAttribute('href', 'https://skillshop.exceedlms.com/student/award/xbT5TszjkaUcbVz9YzWg2Euy');
});

test('resumen Con qué trabajo después de Sobre mí', async ({ page }) => {
  await page.goto('/');
  const s = page.locator('#stack');
  await expect(s.getByRole('heading', { name: 'Con qué trabajo' })).toBeVisible();
  await expect(s.locator('dt')).toHaveText(['Lenguajes', 'Frontend', 'Backend', 'Datos', 'Cloud y despliegue', 'Herramientas']);
  await expect(s.locator('dd').nth(1)).toContainText('React');
  const orden = await page.evaluate(() => ['perfil', 'stack', 'experiencia'].map(id => document.getElementById(id)!.getBoundingClientRect().top));
  expect(orden[0]).toBeLessThan(orden[1]);
  expect(orden[1]).toBeLessThan(orden[2]);
  await page.goto('/en/');
  await expect(page.locator('#stack').getByRole('heading', { name: 'What I work with' })).toBeVisible();
});
