import { test, expect } from '@playwright/test';

test('cuatro pasos en orden', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#como-trabajo .step h3')).toHaveText(['Planificar', 'Implementar', 'Probar', 'Integrar']);
  await expect(page.locator('#como-trabajo')).not.toContainText('Scrum');
});
