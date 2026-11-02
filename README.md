# marcovinir.dev

Portafolio y CV interactivo de Marco Rojas, hecho con [Astro](https://astro.build) y publicado en [marcovinir.dev](https://marcovinir.dev) con GitHub Pages.

## Correrlo en local

```bash
npm install
npm run dev
```

## Editar el contenido

Todo el texto del sitio y del CV vive en [`src/data/cv.ts`](src/data/cv.ts): perfil, educación, experiencia, proyectos y habilidades. Los componentes solo lo pintan, así que actualizar el CV no exige tocar el diseño.

`npm test` revisa las reglas del contenido: sin emojis, sin ubicación, etc.

## CV en PDF

El botón "Descargar CV" descarga `cv-marco-rojas.pdf`, que se genera a partir de la página `/cv`:

```bash
npm run build
npm run cv
```

En cada push a `main`, GitHub Actions compila el sitio, genera el PDF, revisa el resultado (`npm run check`), corre las pruebas de navegador (`npm run test:e2e`) y publica. Si algún paso falla, no se publica.

## Diseño

El documento de diseño y el plan están en [`docs/superpowers/`](docs/superpowers/).
