import { test, expect } from '@playwright/test';

test('perfil, educación y experiencia', async ({ page }) => {
  await page.goto('/');
  const perfil = page.locator('#perfil');
  await expect(perfil.getByRole('heading', { name: 'Sobre mí' })).toBeVisible();
  await expect(perfil).toContainText('Claude Code');
  await expect(perfil.locator('.stats b')).toHaveText(['700+', '6', '6']);
  await expect(perfil.getByRole('heading', { name: 'Educación' })).toBeVisible();
  await expect(perfil).toContainText('2024 — Actualidad');
  await expect(perfil).toContainText('Ingeniería en Sistemas de Información');
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
