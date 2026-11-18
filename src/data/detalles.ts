// Páginas de detalle de proyectos. Las capturas viven en src/assets/proyectos/<slug>/<file>.png.
import type { Lang } from './index';

export type Shot = { file: string; alt: string; caption: string };
export type ProjectDetail = {
  name: string;
  intro: string[];
  role: string;
  features: string[];
  stack: string[];
  demo?: string;
  siteShots: Shot[];
  panelShots: Shot[];
  /** Sección del portafolio a la que vuelve el enlace "Volver". */
  backTo: string;
};

const stack = ['React', 'TypeScript', 'Vite', 'Spring Boot', 'Java', 'PostgreSQL', 'Flyway', 'Render', 'Neon'];

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
    stack,
    demo: 'https://zagala.marcovinir.dev/',
    siteShots: [
      { file: 'sitio-escritorio', alt: 'Portada del sitio público del Coffee Tour Pura Vista', caption: 'Portada: la historia de la finca y accesos a la tienda y a las visitas.' },
      { file: 'sitio-cafe', alt: 'Tienda de café con tres cafés y el resumen del pedido', caption: 'Tienda: cada café con su proceso, molienda y precio; el pedido se envía por WhatsApp.' },
    ],
    panelShots: [
      { file: 'panel-entrar', alt: 'Pantalla de acceso al panel de la familia', caption: 'Entrar: acceso privado con la clave de la familia.' },
      { file: 'panel-inicio', alt: 'Inicio del panel con tarjetas de tours, pendientes, ingresos e inventario', caption: 'Inicio: los tours de hoy, lo que falta atender, los ingresos del mes y el café que se acaba.' },
      { file: 'panel-buzon', alt: 'Buzón con visitas por confirmar y pedidos', caption: 'Buzón: pedidos y reservas que llegan de la página o se anotan a mano, con filtros y búsqueda.' },
      { file: 'panel-ventas', alt: 'Ventas del mes con filtros y tabla de ventas', caption: 'Ventas: el café entregado en el mes, con filtros y exportación a Excel. Nombres difuminados.' },
      { file: 'panel-tours', alt: 'Calendario semanal de tours', caption: 'Tours: calendario semanal de visitas, con guía y cantidad de personas.' },
      { file: 'panel-inventario', alt: 'Inventario de bolsas de cada café', caption: 'Inventario: bolsas de cada café; bajan solas al marcar un pedido como entregado.' },
      { file: 'panel-clientes', alt: 'Lista de clientes con sus datos difuminados', caption: 'Clientes: se arman solos por número de teléfono, con su historial. Datos difuminados.' },
      { file: 'panel-pagina', alt: 'Editor de la página pública con pestañas de cafés, galería y actividades', caption: 'Página: la familia edita los cafés, la galería, las actividades y las preguntas del sitio.' },
      { file: 'panel-familia', alt: 'Lista de integrantes de la familia', caption: 'Familia: quién entrega pedidos y guía los tours.' },
      { file: 'panel-apariencia', alt: 'Opciones de modo y paleta de colores del panel', caption: 'Apariencia: modo claro, oscuro o automático y cinco paletas de color.' },
    ],
    backTo: '/#cimientos',
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
    stack,
    demo: 'https://zagala.marcovinir.dev/',
    siteShots: [
      { file: 'sitio-escritorio', alt: 'Home page of the Coffee Tour Pura Vista public site', caption: 'Home: the story of the farm, with links to the shop and to the visits.' },
      { file: 'sitio-cafe', alt: 'Coffee shop with three coffees and the order summary', caption: 'Shop: each coffee with its process, grind and price; the order is sent over WhatsApp.' },
    ],
    panelShots: [
      { file: 'panel-entrar', alt: 'Sign-in screen of the family dashboard', caption: 'Sign-in: private access with the family password.' },
      { file: 'panel-inicio', alt: 'Dashboard home with cards for tours, pending items, revenue and inventory', caption: 'Home: today’s tours, what needs attention, monthly revenue and coffee running low.' },
      { file: 'panel-buzon', alt: 'Inbox with visits to confirm and orders', caption: 'Inbox: orders and bookings from the site or entered by hand, with filters and search.' },
      { file: 'panel-ventas', alt: 'Monthly sales with filters and a sales table', caption: 'Sales: coffee delivered in the month, with filters and Excel export. Names blurred.' },
      { file: 'panel-tours', alt: 'Weekly tour calendar', caption: 'Tours: weekly calendar of visits, with the guide and group size.' },
      { file: 'panel-inventario', alt: 'Bag inventory for each coffee', caption: 'Inventory: bags of each coffee; they go down automatically when an order is delivered.' },
      { file: 'panel-clientes', alt: 'Customer list with blurred details', caption: 'Customers: built automatically by phone number, with their history. Details blurred.' },
      { file: 'panel-pagina', alt: 'Public site editor with tabs for coffees, gallery and activities', caption: 'Site: the family edits the coffees, gallery, activities and FAQ.' },
      { file: 'panel-familia', alt: 'List of family members', caption: 'Family: who delivers orders and guides tours.' },
      { file: 'panel-apariencia', alt: 'Mode and color palette options of the dashboard', caption: 'Appearance: light, dark or automatic mode and five color palettes.' },
    ],
    backTo: '/en/#cimientos',
  },
};

export const detalles: Record<Lang, Record<string, ProjectDetail>> = { es, en };

/** Ruta pública del detalle en cada idioma. */
export function detailPath(lang: Lang, slug: string): string {
  return lang === 'en' ? `/en/projects/${slug}/` : `/proyectos/${slug}/`;
}
