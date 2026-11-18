// Páginas de detalle de proyectos. Las capturas viven en src/assets/proyectos/<slug>/<file>.
import type { Lang } from './index';

export type Shot = { file: string; alt: string; caption: string };
export type Gallery = { id: string; title: string; shots: Shot[] };
export type Challenge = { title: string; text: string };
export type ProjectDetail = {
  name: string;
  intro: string[];
  role: string;
  /** Título de la lista de funciones; por defecto "Lo que construí". */
  featuresTitle?: string;
  features: string[];
  challenges?: Challenge[];
  stack: string[];
  demo?: string;
  code?: string;
  galleries: Gallery[];
  /** Sección del portafolio a la que vuelve el enlace "Volver". */
  backTo: string;
};

const coffeeStack = ['React', 'TypeScript', 'Vite', 'Spring Boot', 'Java', 'PostgreSQL', 'Flyway', 'Render', 'Neon'];
const rivalmonStack = ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'Node.js', 'Express', 'Socket.io', 'Prisma', 'PostgreSQL', 'Vitest', 'Playwright', 'Render', 'Neon'];
const oraStack = ['C#', '.NET 8', 'Windows Forms', 'Oracle 21c XE', 'ODP.NET', 'Data Pump', 'ScottPlot', 'xUnit'];

const es: Record<string, ProjectDetail> = {
  'coffee-tour-pura-vista': {
    name: 'Coffee Tour Pura Vista',
    intro: [
      'Página web para una finca familiar de café: vende el Café Zagala, recibe reservas de visitas guiadas y cierra cada pedido por WhatsApp, con pago por SINPE Móvil.',
      'Detrás hay un panel privado donde la familia atiende los pedidos, agenda los tours, controla el inventario y actualiza la página sin tocar código.',
    ],
    role: 'Proyecto individual: diseño, frontend, backend, base de datos y despliegue.',
    features: [
      'Sitio público bilingüe con tienda de café, reservas de visitas y planificador del recorrido.',
      'Pedidos por WhatsApp y pago con SINPE Móvil.',
      'Panel privado para la familia: pedidos, ventas, tours, inventario, clientes y resumen del mes.',
      'La familia actualiza cafés, galería, actividades y preguntas de la página desde el panel; los cambios aparecen en menos de un minuto.',
      'Exportación de ventas a Excel (CSV) y descarga de respaldos.',
      'Funciona en celular y en computadora, con modo claro, oscuro o automático.',
    ],
    stack: coffeeStack,
    demo: 'https://zagala.marcovinir.dev/',
    galleries: [
      {
        id: 'panel', title: 'El panel de la familia', shots: [
          { file: 'panel-entrar.png', alt: 'Pantalla de acceso al panel de la familia', caption: 'Entrar: acceso privado con la clave de la familia.' },
          { file: 'panel-inicio.png', alt: 'Inicio del panel con tarjetas de tours, pendientes, ingresos e inventario', caption: 'Inicio: los tours de hoy, lo que falta atender, los ingresos del mes y el café que se acaba. Nombres difuminados.' },
          { file: 'panel-buzon.png', alt: 'Buzón con visitas por confirmar y pedidos', caption: 'Buzón: pedidos y reservas que llegan de la página o se anotan a mano, con filtros y búsqueda. Nombres difuminados.' },
          { file: 'panel-ventas.png', alt: 'Ventas del mes con filtros y tabla de ventas', caption: 'Ventas: el café entregado en el mes, con filtros y exportación a Excel. Nombres difuminados.' },
          { file: 'panel-tours.png', alt: 'Calendario semanal de tours', caption: 'Tours: calendario semanal de visitas, con guía y cantidad de personas.' },
          { file: 'panel-inventario.png', alt: 'Inventario de bolsas de cada café', caption: 'Inventario: bolsas de cada café; bajan solas al marcar un pedido como entregado.' },
          { file: 'panel-clientes.png', alt: 'Lista de clientes con sus datos difuminados', caption: 'Clientes: se arman solos por número de teléfono, con su historial. Datos difuminados.' },
          { file: 'panel-pagina.png', alt: 'Editor de la página pública con pestañas de cafés, galería y actividades', caption: 'Página: la familia edita los cafés, la galería, las actividades y las preguntas del sitio.' },
          { file: 'panel-familia.png', alt: 'Lista de integrantes de la familia', caption: 'Familia: quién entrega pedidos y guía los tours.' },
          { file: 'panel-apariencia.png', alt: 'Opciones de modo y paleta de colores del panel', caption: 'Apariencia: modo claro, oscuro o automático y cinco paletas de color.' },
        ],
      },
      {
        id: 'site', title: 'El sitio público', shots: [
          { file: 'sitio-escritorio.png', alt: 'Portada del sitio público del Coffee Tour Pura Vista', caption: 'Portada: la historia de la finca y accesos a la tienda y a las visitas.' },
          { file: 'sitio-cafe.png', alt: 'Tienda de café con tres cafés y el resumen del pedido', caption: 'Tienda: cada café con su proceso, molienda y precio; el pedido se envía por WhatsApp.' },
        ],
      },
    ],
    backTo: '/#cimientos',
  },
  rivalmon: {
    name: 'Rivalmon',
    intro: [
      'Minijuegos Pokémon en tiempo real para dos personas: creas una sala, le pasas el código a un amigo y juegan 1 vs 1 desde el navegador.',
      'Tiene tres juegos (Doble tipo, Subasta Pokémon y ¿Quién es ese Pokémon?), cuentas con perfil y estadísticas, una Pokédex con los 1025 Pokémon y revanchas. Es un proyecto de fans sin fines de lucro.',
    ],
    role: 'Lo desarrollé de punta a punta: diseño, frontend, backend, base de datos, pruebas y despliegue.',
    features: [
      'Tres minijuegos 1 vs 1 en tiempo real con Socket.io.',
      'Cuentas con perfil, estadísticas e historial, y también modo invitado.',
      'Pokédex de los 1025 Pokémon con buscador y filtro por dos tipos.',
      'Revanchas, reconexión a mitad de partida y dos temas visuales en claro y oscuro.',
      'Unas 1800 pruebas automáticas y 44 pruebas de extremo a extremo con Playwright en navegadores reales.',
      'Desplegado en Render con PostgreSQL en Neon y CI en GitHub Actions.',
    ],
    challenges: [
      { title: 'El servidor manda', text: 'El motor de cada juego es un reductor puro (estado más evento da estado más efectos), así que cada regla se prueba con un reloj simulado y el navegador no puede hacer trampa.' },
      { title: 'Reconexiones', text: 'Si alguien recarga la página en plena ronda vuelve a su asiento, y quien se desconecta tiene un tiempo de gracia antes de perder la partida.' },
      { title: 'Siluetas sin trampa', text: 'La silueta se dibuja en el servidor como una imagen negra detrás de un token aleatorio, así la respuesta nunca llega al navegador del jugador.' },
      { title: 'Cuentas seguras', text: 'Token de acceso corto que vive solo en memoria, cookie de refresco HttpOnly que rota, límites por IP y comprobación del origen de cada petición.' },
    ],
    stack: rivalmonStack,
    demo: 'https://rivalmon.marcovinir.dev/',
    code: 'https://github.com/marcovinir/rivalmon',
    galleries: [
      {
        id: 'juego', title: 'El juego', shots: [
          { file: 'menu.jpg', alt: 'Menú principal de Rivalmon con las tarjetas de los minijuegos', caption: 'Menú principal: eliges entre los tres minijuegos.' },
          { file: 'lobby.jpg', alt: 'Pantalla para crear una sala o unirse con un código', caption: 'Sala: crear una partida con sus opciones o unirse con el código de un amigo.' },
          { file: 'ronda.jpg', alt: 'Ronda de Doble tipo con el par de tipos, el cronómetro y sugerencias', caption: 'Doble tipo: 15 segundos para nombrar un Pokémon que tenga los dos tipos.' },
          { file: 'silueta.jpg', alt: 'Juego de la silueta con una silueta negra y el cronómetro', caption: '¿Quién es ese Pokémon?: la silueta llega del servidor sin revelar la respuesta.' },
          { file: 'resumen.jpg', alt: 'Resumen de la partida con el ganador, el marcador y los equipos', caption: 'Resumen: el ganador, el marcador y el equipo de cada jugador.' },
          { file: 'pokedex.jpg', alt: 'La pantalla de sala con el tema visual Pokédex', caption: 'Tema Pokédex: la misma pantalla con el segundo estilo visual.' },
        ],
      },
    ],
    backTo: '/#chispa',
  },
  'oraadmin-xe': {
    name: 'OraAdmin XE',
    intro: [
      'Aplicación de escritorio para Windows con la que un DBA administra una base Oracle 21c XE desde una sola ventana: tablespaces, tuning, rendimiento, auditoría, seguridad, respaldos y recuperación.',
      'Proyecto final del curso Administración de Bases de Datos (EIF-402) de la UNA, hecho en un equipo de cuatro personas.',
    ],
    role: 'Proyecto en equipo. Hice la base de la aplicación (el acceso a Oracle, la bitácora, la interfaz y los diálogos comunes), los scripts del modelo de datos y los módulos de Seguridad e Inicio, y escribí buena parte de las pruebas.',
    featuresTitle: 'Qué hace la aplicación',
    features: [
      'Once módulos: tablespaces, tuning con planes de ejecución, rendimiento en vivo, auditoría unificada, seguridad, respaldos, recuperación y más.',
      'Respaldos completos, por esquema y por tabla con Data Pump (DBMS_DATAPUMP), con progreso y log.',
      'Restauración desde un catálogo de respaldos, con remapeo de esquema.',
      'Seguridad: usuarios, roles, privilegios y perfiles.',
      'Bitácora de todo lo que se ejecuta desde la aplicación, con su SQL y su resultado.',
      'Modelo de datos propio en tercera forma normal.',
    ],
    challenges: [
      { title: 'Una sola puerta a Oracle', text: 'Todo el acceso a la base pasa por una sola interfaz (IBaseDatos), que además registra cada sentencia en la bitácora sin que cada módulo tenga que hacerlo.' },
      { title: 'Sin inyección SQL en el DDL', text: 'Los nombres de objetos se validan antes de armar cada sentencia DDL y los valores van siempre como parámetros; las contraseñas se ocultan con asteriscos en la bitácora.' },
      { title: 'Acciones peligrosas con confirmación', text: 'Antes de borrar o cambiar algo se muestra el SQL exacto que se va a ejecutar, y los errores de Oracle se explican en lenguaje claro.' },
      { title: 'Contraseñas que nunca se guardan', text: 'La configuración de la conexión recuerda el servidor, el puerto, el servicio y el usuario, pero nunca la contraseña.' },
    ],
    stack: oraStack,
    code: 'https://github.com/marcovinir/oraadmin-xe',
    galleries: [
      {
        id: 'app', title: 'La aplicación', shots: [
          { file: '03_inicio.png', alt: 'Inicio con el estado de la instancia, sesiones y uso de tablespaces', caption: 'Inicio: estado de la instancia, sesiones, uso de tablespaces y último respaldo.' },
          { file: '04_seguridad_usuarios.png', alt: 'Módulo de seguridad con la lista de usuarios', caption: 'Seguridad: usuarios con su estado, perfil y cuota.' },
          { file: '06_seguridad_roles.png', alt: 'Módulo de seguridad con roles y privilegios', caption: 'Seguridad: roles y privilegios.' },
          { file: '08_confirmar_destructiva.png', alt: 'Diálogo que pide confirmar una acción destructiva', caption: 'Confirmación de una acción destructiva, con el SQL exacto.' },
          { file: '09_error_oracle.png', alt: 'Diálogo que explica un error de Oracle', caption: 'Los errores de Oracle se explican en lenguaje claro.' },
          { file: '12_tuning.png', alt: 'Módulo de tuning con el plan de ejecución', caption: 'Tuning: plan de ejecución y estadísticas.' },
          { file: '13_performance.png', alt: 'Módulo de rendimiento con sesiones y gráfico', caption: 'Performance: sesiones, bloqueos y gráfico en vivo.' },
          { file: '15_respaldos.png', alt: 'Módulo de respaldos con Data Pump', caption: 'Respaldos con Data Pump: completo, por esquema o por tabla.' },
          { file: '16_recuperacion.png', alt: 'Módulo de recuperación desde el catálogo de respaldos', caption: 'Recuperación desde el catálogo de respaldos.' },
          { file: '18_bitacora.png', alt: 'Bitácora con el historial de acciones', caption: 'Bitácora con el SQL y el resultado de cada acción.' },
        ],
      },
    ],
    backTo: '/#cimientos',
  },
  pomopet: {
    name: 'PomoPet',
    intro: [
      'Plataforma gamificada para estudiar con la técnica Pomodoro: cada sesión de estudio hace crecer y evolucionar una mascota en pixel art.',
      'Incluye materias, estadísticas de estudio y un quiz contra un Jefe Final generado con IA. Proyecto del curso Paradigmas de Programación de la UNA, hecho en equipo.',
    ],
    role: 'Proyecto en equipo. Hice el temporizador Pomodoro completo (los endpoints de sesiones y pausas en FastAPI y la pantalla del temporizador en Vue), las mascotas en pixel art con sus variantes de color y la evolución por niveles, y el servicio de IA con Gemini para el consejo de la mascota y el quiz del Jefe Final.',
    featuresTitle: 'Qué hace la plataforma',
    features: [
      'Temporizador Pomodoro con pausas, que se retoma donde quedó si recargas la página.',
      'Una mascota en pixel art (gato, perro o dragón) en cinco colores, que sube de nivel y evoluciona al estudiar.',
      'Materias, estadísticas de estudio y jefes por vencer.',
      'Consejos de la mascota y un quiz contra el Jefe Final generados con IA (Gemini).',
      'Backend en FastAPI con PostgreSQL y frontend en Vue 3 con Pinia, todo levantado con Docker.',
    ],
    challenges: [
      { title: 'Pausar dos veces sin errores', text: 'Al pausar dos veces seguidas el servidor fallaba; lo resolví bloqueando la sesión en la base de datos antes de leer sus pausas.' },
      { title: 'Un temporizador que no se pierde', text: 'El tiempo se calcula con marcas de tiempo del servidor y no con un contador del navegador, así que al recargar la página la sesión se retoma desde la API.' },
      { title: 'IA que no rompe la app', text: 'El servicio de Gemini tiene un modo falso para las pruebas y una respuesta de respaldo si la IA no contesta, así la plataforma sigue funcionando.' },
      { title: 'Setenta y cinco sprites sin dibujarlos a mano', text: 'Hice herramientas que generan las variantes de color de cada mascota a partir de un sprite base, con pruebas para que no cambie ni un píxel por error.' },
    ],
    stack: ['Vue 3', 'Vite', 'Pinia', 'JavaScript', 'Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Gemini API', 'pytest'],
    code: 'https://github.com/You9123/PomoPet',
    galleries: [
      {
        id: 'pantallas', title: 'La aplicación', shots: [
          { file: 'mascota-consejo.png', alt: 'Pantalla principal con la mascota dragón y su consejo', caption: 'La mascota y su consejo, generado con Gemini según cómo estudiaste. Parte que hice.' },
          { file: 'temporizador.png', alt: 'Temporizador Pomodoro de 25 minutos con materia y Jefe Final', caption: 'El temporizador: eliges la materia y un Jefe Final. Parte que hice.' },
          { file: 'materias.png', alt: 'Lista de materias con pomodoros, minutos y nivel', caption: 'Materias con sus pomodoros, minutos, XP y nivel.' },
          { file: 'estadisticas.png', alt: 'Estadísticas de estudio: tiempo, XP, éxito y pomodoros', caption: 'Estadísticas: tiempo estudiado, XP, éxito y sesiones canceladas.' },
        ],
      },
      {
        id: 'mascota', title: 'La mascota evoluciona', shots: [
          { file: 'cria.gif', alt: 'Mascota dragón en pixel art en la etapa Cría', caption: 'Cría: la etapa inicial, desde 0 XP.' },
          { file: 'joven.gif', alt: 'Mascota dragón en pixel art en la etapa Joven', caption: 'Joven: a los 500 XP, unos 5 pomodoros.' },
          { file: 'adulta.gif', alt: 'Mascota dragón en pixel art en la etapa Adulta', caption: 'Adulta: a los 2500 XP, unos 25 pomodoros.' },
          { file: 'legendaria.gif', alt: 'Mascota dragón en pixel art en la etapa Legendaria, con corona', caption: 'Legendaria: a los 5000 XP.' },
        ],
      },
    ],
    backTo: '/#fluir',
  },
  'gym-lacobra': {
    name: 'Gym-LACOBRA',
    intro: [
      'Aplicación web para administrar un gimnasio: usuarios, sedes, ejercicios, rutinas y las medidas de cada cliente, con vistas distintas para administradores, coaches y clientes.',
      'Proyecto del curso Programación IV de la UNA, hecho en un equipo de cuatro personas.',
    ],
    role: 'Proyecto en equipo. Hice los modelos de Django y la conexión con la base de datos Oracle, las API de usuarios, ubicaciones y medidas, las pantallas de administración de usuarios y ubicaciones, y el panel del coach: sus alumnos, sus medidas y la creación y asignación de rutinas.',
    featuresTitle: 'Qué hace la aplicación',
    features: [
      'Panel de administración para usuarios, sedes, ubicaciones y ejercicios.',
      'Panel del coach con sus alumnos, el registro de medidas y rutinas para crear y asignar.',
      'Vistas para clientes, con ejercicios animados.',
      'API REST con Django REST Framework sobre una base de datos Oracle.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Python', 'Django', 'Django REST Framework', 'Oracle'],
    code: 'https://github.com/You9123/Gym-LACOBRA',
    galleries: [
      {
        id: 'app', title: 'La aplicación', shots: [
          { file: 'coach.png', alt: 'Panel del coach con sus alumnos y acciones', caption: 'Panel del coach: sus alumnos, plantillas de rutinas y mediciones. Parte que hice.' },
          { file: 'disenar-rutina.jpg', alt: 'Formulario para diseñar una rutina base', caption: 'El coach diseña una rutina base y le agrega ejercicios. Parte que hice.' },
          { file: 'usuarios.jpg', alt: 'Administración de usuarios del sistema', caption: 'Administración de usuarios. Parte que hice.' },
          { file: 'medidas.jpg', alt: 'Medidas corporales de los clientes', caption: 'Medidas corporales de cada cliente, con su índice de masa corporal.' },
          { file: 'admin.png', alt: 'Dashboard del administrador con usuarios recientes', caption: 'Dashboard del administrador: usuarios, ejercicios, rutinas y sedes.' },
          { file: 'cliente.png', alt: 'Perfil del cliente con su coach, rutina y medidas', caption: 'Perfil del cliente con su coach, su rutina activa y sus medidas.' },
          { file: 'historial-medidas.jpg', alt: 'Historial de medidas del cliente con un gráfico', caption: 'Historial de medidas del cliente, con el gráfico de su evolución.' },
          { file: 'inicio.jpg', alt: 'Página principal del gimnasio', caption: 'Página principal del gimnasio.' },
        ],
      },
    ],
    backTo: '/#fluir',
  },
};

const en: Record<string, ProjectDetail> = {
  'coffee-tour-pura-vista': {
    name: 'Coffee Tour Pura Vista',
    intro: [
      'Website for a family coffee farm: it sells Café Zagala, takes bookings for guided visits and closes every order over WhatsApp, with payment through SINPE Móvil.',
      'Behind it there is a private dashboard where the family handles orders, schedules tours, tracks inventory and updates the site without touching code.',
    ],
    role: 'Solo project: design, frontend, backend, database and deployment.',
    features: [
      'Bilingual public site with a coffee shop, visit bookings and a tour planner.',
      'Orders over WhatsApp and payment with SINPE Móvil.',
      'Private dashboard for the family: orders, sales, tours, inventory, customers and a monthly summary.',
      'The family updates the coffees, gallery, activities and FAQ from the dashboard; changes go live in under a minute.',
      'Sales export to Excel (CSV) and backup downloads.',
      'Works on phones and computers, with light, dark or automatic mode.',
    ],
    stack: coffeeStack,
    demo: 'https://zagala.marcovinir.dev/',
    galleries: [
      {
        id: 'panel', title: 'The family dashboard', shots: [
          { file: 'panel-entrar.png', alt: 'Sign-in screen of the family dashboard', caption: 'Sign-in: private access with the family password.' },
          { file: 'panel-inicio.png', alt: 'Dashboard home with cards for tours, pending items, revenue and inventory', caption: 'Home: today’s tours, what needs attention, monthly revenue and coffee running low. Names blurred.' },
          { file: 'panel-buzon.png', alt: 'Inbox with visits to confirm and orders', caption: 'Inbox: orders and bookings from the site or entered by hand, with filters and search. Names blurred.' },
          { file: 'panel-ventas.png', alt: 'Monthly sales with filters and a sales table', caption: 'Sales: coffee delivered in the month, with filters and Excel export. Names blurred.' },
          { file: 'panel-tours.png', alt: 'Weekly tour calendar', caption: 'Tours: weekly calendar of visits, with the guide and group size.' },
          { file: 'panel-inventario.png', alt: 'Bag inventory for each coffee', caption: 'Inventory: bags of each coffee; they go down automatically when an order is delivered.' },
          { file: 'panel-clientes.png', alt: 'Customer list with blurred details', caption: 'Customers: built automatically by phone number, with their history. Details blurred.' },
          { file: 'panel-pagina.png', alt: 'Public site editor with tabs for coffees, gallery and activities', caption: 'Site: the family edits the coffees, gallery, activities and FAQ.' },
          { file: 'panel-familia.png', alt: 'List of family members', caption: 'Family: who delivers orders and guides tours.' },
          { file: 'panel-apariencia.png', alt: 'Mode and color palette options of the dashboard', caption: 'Appearance: light, dark or automatic mode and five color palettes.' },
        ],
      },
      {
        id: 'site', title: 'The public site', shots: [
          { file: 'sitio-escritorio.png', alt: 'Home page of the Coffee Tour Pura Vista public site', caption: 'Home: the story of the farm, with links to the shop and to the visits.' },
          { file: 'sitio-cafe.png', alt: 'Coffee shop with three coffees and the order summary', caption: 'Shop: each coffee with its process, grind and price; the order is sent over WhatsApp.' },
        ],
      },
    ],
    backTo: '/en/#cimientos',
  },
  rivalmon: {
    name: 'Rivalmon',
    intro: [
      'Real-time Pokémon minigames for two people: you create a room, share the code with a friend and play 1 vs 1 in the browser.',
      'It has three games (Dual Type, Pokémon Auction and Who’s That Pokémon?), accounts with a profile and stats, a Pokédex with all 1025 Pokémon, and rematches. It is a non-profit fan project.',
    ],
    role: 'I built it end to end: design, frontend, backend, database, testing and deployment.',
    features: [
      'Three real-time 1 vs 1 minigames with Socket.io.',
      'Accounts with a profile, stats and history, plus a guest mode.',
      'A Pokédex with all 1025 Pokémon, with search and a filter by two types.',
      'Rematches, reconnection mid-game and two visual themes in light and dark.',
      'About 1800 automated tests and 44 end-to-end tests with Playwright in real browsers.',
      'Deployed on Render with PostgreSQL on Neon and CI on GitHub Actions.',
    ],
    challenges: [
      { title: 'The server is in charge', text: 'Each game engine is a pure reducer (state plus event gives state plus effects), so every rule is tested with a fake clock and the browser cannot cheat.' },
      { title: 'Reconnections', text: 'If someone reloads the page mid-round they get their seat back, and a player who disconnects has a grace period before losing the match.' },
      { title: 'Cheat-proof silhouettes', text: 'The silhouette is drawn on the server as a black image behind a random token, so the answer never reaches the player’s browser.' },
      { title: 'Secure accounts', text: 'A short-lived access token kept only in memory, a rotating HttpOnly refresh cookie, per-IP rate limits and an origin check on every request.' },
    ],
    stack: rivalmonStack,
    demo: 'https://rivalmon.marcovinir.dev/',
    code: 'https://github.com/marcovinir/rivalmon',
    galleries: [
      {
        id: 'juego', title: 'The game', shots: [
          { file: 'menu.jpg', alt: 'Rivalmon main menu with the minigame cards', caption: 'Main menu: choose one of the three minigames.' },
          { file: 'lobby.jpg', alt: 'Screen to create a room or join with a code', caption: 'Room: create a match with its options or join with a friend’s code.' },
          { file: 'ronda.jpg', alt: 'Dual Type round with the type pair, the timer and suggestions', caption: 'Dual Type: 15 seconds to name a Pokémon that has both types.' },
          { file: 'silueta.jpg', alt: 'Silhouette game with a black silhouette and the timer', caption: 'Who’s That Pokémon?: the silhouette comes from the server without revealing the answer.' },
          { file: 'resumen.jpg', alt: 'Match summary with the winner, the score and the teams', caption: 'Summary: the winner, the score and each player’s team.' },
          { file: 'pokedex.jpg', alt: 'The room screen with the Pokédex visual theme', caption: 'Pokédex theme: the same screen with the second visual style.' },
        ],
      },
    ],
    backTo: '/en/#chispa',
  },
  'oraadmin-xe': {
    name: 'OraAdmin XE',
    intro: [
      'A Windows desktop app that lets a DBA manage an Oracle 21c XE database from a single window: tablespaces, tuning, performance, auditing, security, backups and recovery.',
      'Final project for the Database Administration course (EIF-402) at UNA, built by a team of four.',
    ],
    role: 'Team project. I built the foundation of the app (Oracle access, the activity log, the interface and shared dialogs), the data model scripts and the Security and Home modules, and wrote a large share of the tests.',
    featuresTitle: 'What the app does',
    features: [
      'Eleven modules: tablespaces, tuning with execution plans, live performance, unified auditing, security, backups, recovery and more.',
      'Full, per-schema and per-table backups with Data Pump (DBMS_DATAPUMP), with progress and log.',
      'Restore from a backup catalog, with schema remapping.',
      'Security: users, roles, privileges and profiles.',
      'An activity log of everything run from the app, with its SQL and result.',
      'Its own data model in third normal form.',
    ],
    challenges: [
      { title: 'A single gateway to Oracle', text: 'All database access goes through one interface (IBaseDatos), which also records every statement in the activity log so no module has to do it itself.' },
      { title: 'No SQL injection in DDL', text: 'Object names are validated before each DDL statement is built and values are always passed as parameters; passwords are masked with asterisks in the log.' },
      { title: 'Dangerous actions need confirmation', text: 'Before deleting or changing anything the app shows the exact SQL it will run, and Oracle errors are explained in plain language.' },
      { title: 'Passwords are never stored', text: 'The connection settings remember the host, port, service and user, but never the password.' },
    ],
    stack: oraStack,
    code: 'https://github.com/marcovinir/oraadmin-xe',
    galleries: [
      {
        id: 'app', title: 'The application', shots: [
          { file: '03_inicio.png', alt: 'Home with instance status, sessions and tablespace usage', caption: 'Home: instance status, sessions, tablespace usage and last backup.' },
          { file: '04_seguridad_usuarios.png', alt: 'Security module with the list of users', caption: 'Security: users with their status, profile and quota.' },
          { file: '06_seguridad_roles.png', alt: 'Security module with roles and privileges', caption: 'Security: roles and privileges.' },
          { file: '08_confirmar_destructiva.png', alt: 'Dialog asking to confirm a destructive action', caption: 'Confirming a destructive action, showing the exact SQL.' },
          { file: '09_error_oracle.png', alt: 'Dialog explaining an Oracle error', caption: 'Oracle errors are explained in plain language.' },
          { file: '12_tuning.png', alt: 'Tuning module with the execution plan', caption: 'Tuning: execution plan and statistics.' },
          { file: '13_performance.png', alt: 'Performance module with sessions and a chart', caption: 'Performance: sessions, locks and a live chart.' },
          { file: '15_respaldos.png', alt: 'Backup module with Data Pump', caption: 'Backups with Data Pump: full, per schema or per table.' },
          { file: '16_recuperacion.png', alt: 'Recovery module from the backup catalog', caption: 'Recovery from the backup catalog.' },
          { file: '18_bitacora.png', alt: 'Activity log with the history of actions', caption: 'Activity log with the SQL and result of each action.' },
        ],
      },
    ],
    backTo: '/en/#cimientos',
  },
  pomopet: {
    name: 'PomoPet',
    intro: [
      'A gamified platform for studying with the Pomodoro technique: every study session helps a pixel-art pet grow and evolve.',
      'It includes subjects, study stats and a quiz against a Final Boss generated with AI. Built as a team for the Programming Paradigms course at UNA.',
    ],
    role: 'Team project. I built the full Pomodoro timer (the session and pause endpoints in FastAPI and the timer screen in Vue), the pixel-art pets with their color variants and level-based evolution, and the AI service with Gemini for the pet’s advice and the Final Boss quiz.',
    featuresTitle: 'What the platform does',
    features: [
      'A Pomodoro timer with pauses that picks up where it left off if you reload the page.',
      'A pixel-art pet (cat, dog or dragon) in five colors that levels up and evolves as you study.',
      'Subjects, study stats and bosses to defeat.',
      'Pet advice and a quiz against the Final Boss generated with AI (Gemini).',
      'FastAPI backend with PostgreSQL and a Vue 3 frontend with Pinia, all running with Docker.',
    ],
    challenges: [
      { title: 'Pausing twice without errors', text: 'Pausing twice in a row made the server fail; I fixed it by locking the session in the database before reading its pauses.' },
      { title: 'A timer that never gets lost', text: 'Time is calculated from server timestamps instead of a browser counter, so when the page reloads the session is resumed from the API.' },
      { title: 'AI that does not break the app', text: 'The Gemini service has a fake mode for tests and a fallback answer if the AI does not respond, so the platform keeps working.' },
      { title: 'Seventy-five sprites without drawing them by hand', text: 'I built tools that generate each pet’s color variants from a base sprite, with tests so not a single pixel changes by mistake.' },
    ],
    stack: ['Vue 3', 'Vite', 'Pinia', 'JavaScript', 'Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Gemini API', 'pytest'],
    code: 'https://github.com/You9123/PomoPet',
    galleries: [
      {
        id: 'pantallas', title: 'The application', shots: [
          { file: 'mascota-consejo.png', alt: 'Main screen with the dragon pet and its advice', caption: 'The pet and its advice, generated with Gemini from how you studied. Built by me.' },
          { file: 'temporizador.png', alt: '25-minute Pomodoro timer with subject and Final Boss', caption: 'The timer: you pick the subject and a Final Boss. Built by me.' },
          { file: 'materias.png', alt: 'List of subjects with pomodoros, minutes and level', caption: 'Subjects with their pomodoros, minutes, XP and level.' },
          { file: 'estadisticas.png', alt: 'Study stats: time, XP, success rate and pomodoros', caption: 'Stats: time studied, XP, success rate and cancelled sessions.' },
        ],
      },
      {
        id: 'mascota', title: 'The pet evolves', shots: [
          { file: 'cria.gif', alt: 'Pixel-art dragon pet at the Baby stage', caption: 'Baby: the first stage, from 0 XP.' },
          { file: 'joven.gif', alt: 'Pixel-art dragon pet at the Young stage', caption: 'Young: at 500 XP, about 5 pomodoros.' },
          { file: 'adulta.gif', alt: 'Pixel-art dragon pet at the Adult stage', caption: 'Adult: at 2500 XP, about 25 pomodoros.' },
          { file: 'legendaria.gif', alt: 'Pixel-art dragon pet at the Legendary stage, with a crown', caption: 'Legendary: at 5000 XP.' },
        ],
      },
    ],
    backTo: '/en/#fluir',
  },
  'gym-lacobra': {
    name: 'Gym-LACOBRA',
    intro: [
      'A web app to run a gym: users, branches, exercises, routines and each client’s measurements, with separate views for admins, coaches and clients.',
      'Built for the Programming IV course at UNA by a team of four.',
    ],
    role: 'Team project. I built the Django models and the connection to the Oracle database, the users, locations and measurements APIs, the admin screens for users and locations, and the coach dashboard: their students, their measurements and creating and assigning routines.',
    featuresTitle: 'What the app does',
    features: [
      'Admin dashboard for users, branches, locations and exercises.',
      'Coach dashboard with their students, measurement tracking and routines to create and assign.',
      'Client views with animated exercises.',
      'REST API with Django REST Framework on an Oracle database.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Python', 'Django', 'Django REST Framework', 'Oracle'],
    code: 'https://github.com/You9123/Gym-LACOBRA',
    galleries: [
      {
        id: 'app', title: 'The application', shots: [
          { file: 'coach.png', alt: 'Coach dashboard with their students and actions', caption: 'Coach dashboard: their students, routine templates and measurements. Built by me.' },
          { file: 'disenar-rutina.jpg', alt: 'Form to design a base routine', caption: 'The coach designs a base routine and adds exercises to it. Built by me.' },
          { file: 'usuarios.jpg', alt: 'User management screen', caption: 'User management. Built by me.' },
          { file: 'medidas.jpg', alt: 'Body measurements of the clients', caption: 'Each client’s body measurements, with their body mass index.' },
          { file: 'admin.png', alt: 'Admin dashboard with recent users', caption: 'Admin dashboard: users, exercises, routines and branches.' },
          { file: 'cliente.png', alt: 'Client profile with their coach, routine and measurements', caption: 'Client profile with their coach, active routine and measurements.' },
          { file: 'historial-medidas.jpg', alt: 'Client measurement history with a chart', caption: 'Client measurement history, with a chart of their progress.' },
          { file: 'inicio.jpg', alt: 'Gym home page', caption: 'The gym’s home page.' },
        ],
      },
    ],
    backTo: '/en/#fluir',
  },
};

export const detalles: Record<Lang, Record<string, ProjectDetail>> = { es, en };

/** Ruta pública del detalle en cada idioma. */
export function detailPath(lang: Lang, slug: string): string {
  return lang === 'en' ? `/en/projects/${slug}/` : `/proyectos/${slug}/`;
}
