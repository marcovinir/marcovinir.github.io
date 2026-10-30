import { test, expect } from '@playwright/test';

test('perfil, educación y experiencia', async ({ page }) => {
  await page.goto('/');
  const perfil = page.locator('#perfil');
  await expect(perfil.getByRole('heading', { name: 'Sobre mí' })).toBeVisible();
  await expect(perfil).toContainText('Claude Code');
  await expect(perfil.locator('.stats b')).toHaveText(['700+', '5', '6']);
  await expect(perfil.getByRole('heading', { name: 'Educación' })).toBeVisible();
  await expect(perfil).toContainText('2024 — Actualidad');
  await expect(perfil).toContainText('Ingeniería en Sistemas de Información');
  const exp = page.locator('#experiencia');
  await expect(exp).toContainText('Desarrollador');
  await expect(exp).toContainText('Scrum');
  await expect(exp.getByRole('link', { name: /sira\.dannyas\.dev/ })).toHaveAttribute('href', 'https://sira.dannyas.dev/');
  await expect(exp.getByRole('link', { name: /munimontesdeoro/ })).toHaveAttribute('href', 'https://munimontesdeoro.go.cr/');
  await expect(exp).toContainText('Municipalidad de Montes de Oro');
});
