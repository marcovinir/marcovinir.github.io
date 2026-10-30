# Portafolio marcovinir.dev: documento de diseño

Fecha: 2026-10-29
Autor del contenido: Marco Rojas (usuario de GitHub `marcovinir`)
Prototipo de referencia: [`2026-10-29-prototipo-portafolio.html`](2026-10-29-prototipo-portafolio.html). Ábrelo en el navegador: es la versión aprobada de estilo, estructura y animaciones. El sitio real debe verse y moverse como este prototipo, construido de forma limpia en Astro.

## 1. Intención

Marco es estudiante de Ingeniería en Sistemas de Información en la UNA (desde 2024) y desarrollador full-stack. Quiere un portafolio que funcione como **CV interactivo**: que quien lo abra piense *"es alguien creativo"* y le den ganas de **contratarlo o encargarle un proyecto**.

El sitio vive primero en `marcovinir.github.io` y después en el dominio `marcovinir.dev`, cuando lo obtenga con el GitHub Student Developer Pack, disponible alrededor del 1 de noviembre de 2026. Más adelante, cada proyecto tendrá su propio subdominio.

## 2. Objetivos

- Verse **moderno y oscuro**, con animaciones suaves que transmitan creatividad sin saturar.
- Tener un **ambiente inspirado en los cuatro elementos** (al estilo de *Avatar: la leyenda de Aang*), insinuado con colores, formas y movimiento, **nunca nombrado**.
- Funcionar como **CV**: perfil, educación, experiencia, forma de trabajo, habilidades, proyectos y CV descargable.
- Terminar con un **llamado claro a escribirle** por correo.

## 3. No-objetivos

- No es un blog ni tiene CMS.
- No tiene formulario de contacto con backend: el contacto es por correo (`mailto:` + botón copiar).
- No es multi-idioma por ahora; el sitio es solo en español. *(Decisión mía.)*
- No incluye todavía las páginas de los subdominios de proyectos. Eso es trabajo posterior (sección 10).

## 4. Anti-objetivos (fallaría aunque funcione)

- **Nada de emojis** en ningún lugar del sitio.
- **No escribir literalmente** "agua", "tierra", "fuego" ni "aire", ni otros nombres de los elementos.
- **No usar material de la serie**: ni personajes, ni logos, ni el símbolo oficial de los elementos, ni tipografías o imágenes de Nickelodeon. Todo es original.
- **No mostrar la ubicación** de Marco (ni Alajuela ni Costa Rica) en ninguna parte.
- **"Trabajemos juntos" no va en la portada**: el llamado a contactar vive solo al final.
- No presentar Scrum como su forma de trabajo general: **Scrum y Azure DevOps solo se mencionan dentro de la experiencia de SIRA**.
- No hacer parecer que la IA programa por él: Claude Code se presenta como herramienta que él dirige, acompañada de pruebas y revisión de código.
- No verse como plantilla genérica de "startup" ni ser infantil.

## 5. Restricciones

- **Framework:** Astro (lo eligió Marco).
- **Hosting:** GitHub Pages desde el repo `marcovinir/marcovinir.github.io`, desplegado con GitHub Actions (el action oficial de Astro para Pages).
- **Dominio:** `marcovinir.dev` (está libre al 2026-10-29). Mientras no exista, el sitio funciona en `https://marcovinir.github.io`. La configuración de Astro (`site`) y el archivo `CNAME` deben poder cambiarse al dominio sin tocar el resto.
- **`.dev` exige HTTPS** (HSTS precargado): hay que activar "Enforce HTTPS" en Pages al conectar el dominio.
- **Accesibilidad y rendimiento:** respetar `prefers-reduced-motion` (sin animaciones, contenido visible), contraste legible sobre fondo oscuro, navegable con teclado y buena nota en Lighthouse. Las animaciones de canvas se pausan cuando su sección no está en pantalla.
- **Responsive:** debe verse bien en celular. En pantallas pequeñas las ilustraciones animadas se atenúan o se ubican detrás del texto, como en el prototipo.

## 6. Estructura y contenido (decidido con Marco)

Orden de arriba hacia abajo. Hay una barra lateral de puntos que marca la sección actual y toma el color de esa sección.

### 6.1 Portada
- Línea superior: `Marco Rojas · Full-stack developer`
- Título: **"Construyo software en equilibrio."**, con "equilibrio" en un degradado de los cuatro colores.
- Texto: "Interfaces que fluyen, bases que no se caen, experiencias en tiempo real y despliegues que llegan lejos."
- Un solo botón: **Descargar CV** (PDF).
- Fondo: cuatro luces difusas de colores flotando lentamente (aurora) e indicador animado de scroll.

### 6.2 Sobre mí + Educación (dos columnas; una en celular)
- **Sobre mí:** "Soy estudiante de Ingeniería en Sistemas y desarrollador full-stack. Me gusta llevar una idea de punta a punta: diseñar la base de datos, construir la API, pulir la interfaz, escribir las pruebas y dejarla desplegada. Trabajo bien en equipo, con ramas, pull requests y revisiones de código." Se agrega una frase sobre IA: "Uso desarrollo asistido por IA con Claude Code para planificar, implementar y revisar más rápido, sin dejar de lado las pruebas ni la revisión de código."
- **Cifras:** `700+` commits en el último año · `5` proyectos destacados · `6` lenguajes.
- **Educación** (línea de tiempo; el punto de "actualidad" late):
  - 2024 — Actualidad · **Ingeniería en Sistemas de Información** · Universidad Nacional de Costa Rica (UNA) · "Bases de datos, programación, ingeniería de software y administración de sistemas."
  - Sin colegio ni otros estudios.

### 6.3 Experiencia (nueva respecto al prototipo)
Mismo estilo de línea de tiempo que Educación.
- **SIRA — Sistema de Reportes de Avería** · rol: **Desarrollador** · 2026 — Actualidad · proyecto en equipo.
  - Desarrollado con metodología **Scrum** (sprints e historias de usuario) usando **Azure DevOps**.
  - Stack: Django + React + TypeScript.
  - Enlace: https://sira.dannyas.dev/ (el repositorio es privado y no se enlaza).

### 6.4 Cómo trabajo (nueva respecto al prototipo)
Cuatro pasos en fila (en columna en celular) que se encienden en secuencia al entrar en pantalla:
1. **Planificar:** divido el trabajo en issues y etapas.
2. **Implementar:** en ramas, con apoyo de Claude Code.
3. **Probar:** pruebas automáticas e integración continua.
4. **Integrar:** pull request con revisión antes de fusionar.

### 6.5 Habilidades y proyectos: las cuatro áreas
Título de entrada: **"Cuatro áreas, un mismo equilibrio."** Después vienen cuatro secciones a pantalla completa. Al hacer scroll, el fondo cambia de ambiente. Cada sección tiene una etiqueta, un título, un texto, chips de tecnologías y una tarjeta de proyecto (la tarjeta se levanta al pasar el mouse y enlaza al repo o sitio).

| # | Etiqueta | Evoca | Título | Texto | Tecnologías | Proyecto |
|---|---|---|---|---|---|---|
| 01 | Fluir | agua | Interfaces que se mueven contigo. | Frontend rápido, accesible y con animaciones que se sienten naturales. | React · Vue · TypeScript · Astro · Vite | **Dos tarjetas:** (1) PomoPet, plataforma gamificada de gestión del tiempo y estudio, proyecto en equipo (Vue 3 + FastAPI + PostgreSQL + Docker) → https://github.com/You9123/PomoPet · (2) Gym-LACOBRA, app web para la gestión de un gimnasio, proyecto en equipo (React + Django) → https://github.com/You9123/Gym-LACOBRA |
| 02 | Cimientos | tierra | Backends que no se mueven. | APIs, modelos de datos y bases de datos diseñadas para crecer sin romperse. | Spring Boot · Django · FastAPI · .NET 8 · PostgreSQL · Oracle · Docker | OraAdmin XE, consola DBA de escritorio para Oracle 21c (C# + .NET 8) → https://github.com/marcovinir/oraadmin-xe |
| 03 | Chispa | fuego | Experiencias en tiempo real. | Multijugador, sockets y juegos donde cada milisegundo cuenta. | Socket.io · Express · Godot · Three.js | Pokémon Minigames, minijuegos 1 vs 1 en tiempo real (React + Socket.io + Prisma) → https://github.com/marcovinir/pokemon-minigames |
| 04 | Horizonte | aire | Del código a la nube. | Despliegues automatizados, CI y servicios cloud para que tu proyecto llegue a todos. | Render · GitHub Actions · GitHub Pages | SIRA (en desarrollo), Sistema de Reportes de Avería → https://sira.dannyas.dev/ |

*Decisión mía sobre PomoPet:* va en Fluir como segunda tarjeta, porque su parte más visible es el frontend en Vue. Fluir es la única área con dos proyectos, y las tarjetas se apilan una debajo de la otra. Los proyectos hechos en equipo, donde Marco es uno de los integrantes (PomoPet y Gym-LACOBRA, y también SIRA en Horizonte), llevan una etiqueta pequeña que dice **"En equipo"**.

*Decisión mía sobre los chips de Horizonte:* Azure DevOps no va aquí porque solo se menciona dentro de SIRA (sección 4), y Claude Code ya aparece en "Sobre mí" y en "Cómo trabajo".

**Paleta** (CSS custom properties, como en el prototipo):
- Fluir: `#38bdf8` → `#6366f1`
- Cimientos: `#34d399` → `#a3e635`
- Chispa: `#fb7185` → `#f59e0b`
- Horizonte: `#e2e8f0` → `#a78bfa`
- Fondo base: `#05060a`; texto `#eef0f6`; texto secundario `#8a90a6`.

**Animaciones por área** (versión aprobada en el prototipo; se pueden pulir, pero sin cambiar el carácter):
- **Fluir:** tres capas de olas SVG que se desplazan a distintas velocidades, más un anillo "líquido" con degradado cónico que gira y cambia de forma.
- **Cimientos:** bloques isométricos SVG que flotan con desfase, sobre una cuadrícula en perspectiva que avanza.
- **Chispa:** partículas tipo brasa en canvas que suben con leve vaivén, más un núcleo luminoso que late con ondas expansivas.
- **Horizonte:** corrientes de luz SVG que cruzan la pantalla (`stroke-dashoffset`) y una cuadrícula de nodos de vidrio que flotan, con el nodo central iluminado.

Comunes: textos que aparecen escalonados al entrar en pantalla (IntersectionObserver) y degradado del color de la sección en la segunda línea del título.

### 6.6 Contacto
- Línea de espectro animada con los cuatro colores.
- Título: **"¿Tienes un proyecto en mente?"**
- Texto: "Cuéntame tu idea y la construimos juntos. Escríbeme y te respondo pronto."
- Tarjeta con el correo **mvnaranjo1@gmail.com** (`mailto:`) y un botón **Copiar**, que muestra "Copiado" al hacer clic.
- Pie mínimo con enlace a GitHub (`github.com/marcovinir`) y año. *(Decisión mía.)*

## 7. Partes del "cómo" ya decididas

- Astro + GitHub Pages + GitHub Actions; dominio `marcovinir.dev` cuando esté disponible.
- Sitio de una sola página, con anclas por sección.
- CSS propio con custom properties (sin framework de UI). Animaciones en CSS/SVG y canvas solo para las brasas, como en el prototipo. *(Decisión mía: es lo más ligero y ya está probado en el prototipo.)*
- Los datos de contenido (proyectos, tecnologías, educación, experiencia) van en un archivo de datos (por ejemplo `src/data/*.ts`), separados de los componentes, para que actualizar el CV no exija tocar el diseño. *(Decisión mía.)*

## 8. Lo que queda a criterio de quien construye

- División en componentes Astro y estructura de carpetas.
- Tipografía (el prototipo usa Inter/system-ui; puede usarse una fuente autoalojada si se mantiene el carácter moderno).
- Detalles finos de tiempos, curvas y tamaños de las animaciones, sin cambiar su carácter.
- Metadatos SEO, Open Graph, favicon (original, sin emojis) y página 404.
- Pruebas: como mínimo, un build limpio en CI y una verificación de que no haya enlaces rotos.

## 9. CV descargable

El botón "Descargar CV" apunta a `/cv-marco-rojas.pdf`. **Decidido con Marco: el PDF se genera desde el sitio**, con los mismos datos de `src/data/`, para que portafolio y CV nunca se desincronicen.

- Una página imprimible propia (por ejemplo `/cv`, excluida de la navegación y con `noindex`) que arma el CV con esos datos: nombre, título, perfil (incluida la frase de Claude Code), contacto (correo y GitHub), educación, experiencia (SIRA), proyectos destacados con sus enlaces y habilidades agrupadas por las cuatro áreas, usando nombres normales de categoría (Frontend, Backend y datos, Tiempo real y juegos, Cloud y despliegue), no "Fluir", "Cimientos", etc.
- Diseño de CV: **fondo blanco, una página A4, sin animaciones**, con un acento de color discreto de la paleta. Debe leerse bien impreso y pasar filtros ATS (texto real, no imágenes). Sin ubicación y sin emojis, igual que el sitio.
- En el workflow de despliegue, después de `astro build`, un paso renderiza esa página a PDF con un navegador headless (Playwright o Puppeteer) y deja el archivo en la salida del build como `cv-marco-rojas.pdf`. Si la generación falla, el despliegue falla. Nunca se publica un botón roto.
- Para desarrollo local, un script (`npm run cv`) genera el mismo PDF.

## 10. Después del sitio (fuera de este alcance, en orden)

1. Reclamar el dominio con el Student Pack (~1 nov 2026) y conectarlo: `CNAME` en el repo + registros DNS (4 registros A de GitHub Pages en `@`, CNAME `www` → `marcovinir.github.io`), verificar el dominio en GitHub y activar HTTPS.
2. Subdominios: `pokemon.marcovinir.dev` → deploy de Render (CNAME); `oraadmin.marcovinir.dev` → página de presentación del proyecto (app de escritorio).
3. Cambiar el "próximamente" del README del perfil `marcovinir/marcovinir` por el enlace real.

## Cambios posteriores (2026-10-30, pedidos por Marco)

- Las etiquetas de las áreas son ahora Frontend, Backend y datos, Tiempo real y juegos, y Cloud y despliegue, en lugar de Fluir, Cimientos, Chispa y Horizonte.
- SIRA se presenta como proyecto para la Municipalidad de Montes de Oro, con enlace a su sitio y despliegues por SSH en AWS (EC2 y RDS).
- Se agregan conocimientos básicos de AWS, y agentes y MCP en "Cómo trabajo". Se retira Godot.

## 11. Preguntas abiertas

Ninguna.
