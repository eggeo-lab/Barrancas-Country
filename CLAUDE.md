# CLAUDE.md

Guía para Claude Code al trabajar en este repositorio.

## Qué es

Sitio web institucional (one-page) de **Barrancas del Río Country Club**, un loteo
con lotes en venta. Publicado en `barrancasdelrio.com.ar` (ver `public/CNAME`) vía
GitHub Pages. Todo el contenido y los comentarios del código están en **español
rioplatense** (voseo: "Agendá", "Tocá", "Escribinos"); mantener ese tono.

## Stack y comandos

React 19 + Vite 8 + Tailwind CSS 4 (plugin `@tailwindcss/vite`, sin `tailwind.config.js`).
JavaScript puro (JSX), sin TypeScript. No hay tests ni router ni backend.

```bash
npm install
npm run dev       # servidor local en http://localhost:5173
npm run build     # build cliente + build SSR + prerender → dist/ (HTML con contenido)
npm run preview   # sirve dist/ localmente
npm run lint      # oxlint (config en .oxlintrc.json)
npm run deploy    # build + publica dist/ en la rama gh-pages
```

## Estructura

- [src/App.jsx](src/App.jsx) — compone las secciones en orden: Navbar, Hero, ElProyecto,
  Amenities, Masterplan, Financiacion, Ubicacion, Contacto, Footer.
- [src/components/](src/components/) — un componente por sección. El contenido de texto
  vive como constantes al inicio de cada archivo (`ITEMS`, `STATS`, `POINTS`, `LINKS`).
- [src/components/masterplan/](src/components/masterplan/) — plano interactivo:
  - `MasterplanMap.jsx`: SVG con zoom/pan propio (manipula el `viewBox`), selección por
    pointer events, pinch-to-zoom con dos dedos y tooltip. Botones de zoom solo en mobile (`sm:hidden`).
  - `statusUtils.js`: `STATUS_META` (etiqueta y color por estado) y `fmtArea`.
- [src/data/masterplan.js](src/data/masterplan.js) — geometría generada: `LOTS` (59 lotes
  con `id`, `manzana`, `num`, `area`, `d`, `cx`, `cy`), `ROAD_PATHS`, `PLAN_TRANSFORM`.
  Líneas enormes; no leerlo entero ni editarlo a mano salvo un valor puntual.
- [src/data/lotStatuses.js](src/data/lotStatuses.js) — **estado comercial real** de los lotes.
- [src/index.css](src/index.css) — tokens de Tailwind en `@theme` (colores y fuente).
- `src/assets/images/` — fotos, logos, video del hero e imagen aérea del masterplan
  (importados desde los componentes, Vite los procesa).

## SEO / GEO

- [src/seo.config.js](src/seo.config.js) es la fuente única de título, descripción, contacto,
  coordenadas y amenities. [seo/vite-plugin-seo.js](seo/vite-plugin-seo.js) inyecta desde ahí
  las meta tags, Open Graph/Twitter y el JSON-LD en `index.html`, y emite `sitemap.xml`.
- [src/data/faq.js](src/data/faq.js) alimenta la sección `PreguntasFrecuentes` **y** el Schema
  `FAQPage`; el texto visible y el del Schema son el mismo.
- Prerender: `src/entry-server.jsx` + `scripts/prerender.js` reemplazan `<!--app-html-->` en
  `dist/index.html`; `main.jsx` hidrata si hay HTML previo. Todo componente debe poder
  renderizarse en Node (sin `window`/`document` fuera de efectos o handlers).
- Estáticos en `public/`: `robots.txt`, `llms.txt` (mantener al día si cambia el contenido),
  `og-image.jpg` (1200×630), `logo.png`. No tocar `public/CNAME`.

## Tareas frecuentes

- **Actualizar estado de lotes**: editar `VENDIDOS` / `CONSTRUIDOS` en
  `src/data/lotStatuses.js`. IDs con formato `"MANZANA-NUMERO"` (ej. `"5-103"`). Todo lote
  que no esté en ninguna lista es `disponible`; `construido` tiene prioridad sobre
  `vendido`. Manzanas existentes: 1, 2, 3, 4, 5, 7, 8 (no hay 6).
- **Datos de contacto**: WhatsApp `5493571610239` está repetido en `Contacto.jsx`,
  `Masterplan.jsx` (botón "Consultar disponibilidad") y `Footer.jsx`; el email e Instagram
  en `Contacto.jsx` y `Footer.jsx`. Si cambian, actualizar todos.
- **Formulario de contacto**: no envía a ningún servidor; arma un mensaje y abre WhatsApp
  (`wa.me`) con el texto precargado.

## Convenciones de estilo

- Usar los colores del tema (`forest`, `forest-dark`, `forest-mid`, `gold`, `cream`,
  `sand`, `muted`, `sage`, `olive`, `whatsapp`) en vez de hex sueltos en clases.
- Títulos con la clase `font-display` (Lato itálica 300). Tamaños fluidos con
  `text-[clamp(...)]`.
- Contenedor estándar de sección: `mx-auto max-w-7xl px-5 sm:px-8`.
- Navegación por anclas (`#inicio`, `#proyecto`, `#amenities`, `#masterplan`,
  `#ubicacion`, `#contacto`) con `scroll-behavior: smooth`; si se agrega una sección,
  sumarla a `LINKS` en `Navbar.jsx` y `Footer.jsx`.
- Diseño mobile-first; verificar breakpoints `sm`, `md`, `lg`.

## Detalles a tener en cuenta

- El mapa del masterplan resuelve la selección en `pointerdown` (no en `click`) porque
  `setPointerCapture` puede retargetear el click; no "simplificar" a `onClick` en los lotes.
  Los lotes se identifican con el atributo `data-lot-id`.
- La imagen aérea y las capas del plano están alineadas con transformaciones calibradas
  a mano (`matrix(...)` en `MasterplanMap.jsx` y `PLAN_TRANSFORM`); cambiarlas desalinea
  el plano con la foto.
- El `README.md` está parcialmente desactualizado: los estados de lotes ya no se calculan
  en `Masterplan.jsx` sino en `lotStatuses.js`, y `Ubicacion.jsx` usa coordenadas
  (`LAT`/`LNG`) e imagen estática, no un mapa embebido con `MAPS_QUERY`.
- Hay assets sin uso (`logo-footer.webp`, `logo-hero.png`, `logo-nav.webp`) y `VIEW_BOX`
  exportado pero no usado. Las etiquetas del SVG piden la fuente `Jost`, que no se carga
  (cae a sans-serif).
