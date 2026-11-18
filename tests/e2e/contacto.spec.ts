import { test, expect } from '@playwright/test';

test('contacto con correo y copiar', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/#contacto');
  const c = page.locator('#contacto');
  await expect(c.getByRole('heading', { level: 2 })).toHaveText('Contacto');
  await expect(c.locator('.card')).toHaveCount(0);
  await expect(c.getByRole('link', { name: /marcorojassp@gmail.com/ })).toHaveAttribute('href', 'mailto:marcorojassp@gmail.com');
  await c.getByRole('button', { name: 'Copiar' }).click();
  await expect(c.getByRole('button', { name: 'Copiado' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('marcorojassp@gmail.com');
});

test('copiar sin clipboard', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { value: undefined }));
  const errores: string[] = [];
  page.on('pageerror', e => errores.push(e.message));
  await page.goto('/#contacto');
  await page.locator('#contacto').getByRole('button', { name: 'Copiar' }).click();
  expect(errores).toEqual([]);
  expect(await page.evaluate(() => getSelection()?.toString())).toBe('marcorojassp@gmail.com');
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

const FORMSPREE = 'https://formspree.io/**';

test('teléfono y formulario en contacto', async ({ page }) => {
  await page.goto('/#contacto');
  const c = page.locator('#contacto');
  await expect(c.getByRole('link', { name: '+506 8687-7280' })).toHaveAttribute('href', 'tel:+50686877280');
  await expect(c.locator('form')).toHaveAttribute('action', /^https:\/\/formspree\.io\/f\/\w+$/);
  await expect(c.getByLabel('Nombre')).toHaveAttribute('required', '');
  await expect(c.getByLabel('Correo')).toHaveAttribute('type', 'email');
  const msg = c.getByLabel('Mensaje');
  await expect(msg).toHaveAttribute('maxlength', '500');
  await expect(c.locator('.counter')).toHaveText('0/500');
  await msg.fill('Hola Marco');
  await expect(c.locator('.counter')).toHaveText('10/500');
  await expect(c.locator('input[name="_gotcha"]')).toBeHidden();
});

test('enviar el formulario muestra confirmación y limpia los campos', async ({ page }) => {
  let body = '';
  await page.route(FORMSPREE, async route => {
    body = route.request().postData() ?? '';
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  await page.goto('/#contacto');
  const c = page.locator('#contacto');
  await c.getByLabel('Nombre').fill('Ana Prueba');
  await c.getByLabel('Correo').fill('ana@example.com');
  await c.getByLabel('Mensaje').fill('Quiero una página para mi negocio.');
  await c.getByRole('button', { name: 'Enviar mensaje' }).click();
  await expect(c.getByRole('status')).toHaveText(/Gracias, Ana Prueba\. Tu mensaje llegó/);
  expect(body).toContain('ana@example.com');
  expect(body).toContain('Quiero una página para mi negocio.');
  await expect(c.getByLabel('Mensaje')).toHaveValue('');
});

test('si el envío falla, avisa y sugiere el correo', async ({ page }) => {
  await page.route(FORMSPREE, route => route.fulfill({ status: 500, body: 'error' }));
  await page.goto('/#contacto');
  const c = page.locator('#contacto');
  await c.getByLabel('Nombre').fill('Ana');
  await c.getByLabel('Correo').fill('ana@example.com');
  await c.getByLabel('Mensaje').fill('Hola');
  await c.getByRole('button', { name: 'Enviar mensaje' }).click();
  await expect(c.getByRole('status')).toContainText('marcorojassp@gmail.com');
  await expect(c.getByLabel('Mensaje')).toHaveValue('Hola');
});

test('no envía si faltan datos', async ({ page }) => {
  let calls = 0;
  await page.route(FORMSPREE, route => { calls++; return route.fulfill({ status: 200, body: '{}' }); });
  await page.goto('/#contacto');
  await page.locator('#contacto').getByRole('button', { name: 'Enviar mensaje' }).click();
  await page.waitForTimeout(300);
  expect(calls).toBe(0);
});

test('formulario en inglés', async ({ page }) => {
  await page.goto('/en/#contacto');
  const c = page.locator('#contacto');
  await expect(c.getByRole('heading', { level: 2 })).toHaveText('Contact');
  await expect(c.getByLabel('Name')).toBeVisible();
  await expect(c.getByLabel('Email')).toBeVisible();
  await expect(c.getByLabel('Message')).toBeVisible();
  await expect(c.getByRole('button', { name: 'Send message' })).toBeVisible();
});
