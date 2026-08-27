# Barrancas del Río — sitio web

Proyecto React + Vite + Tailwind CSS. Reemplaza el .html único original por
un proyecto de componentes, fácil de editar y liviano (las fotos y el video
ya no van en base64 dentro del HTML).

## Cómo correrlo en tu máquina

```bash
npm install
npm run dev
```

Abrí http://localhost:5173

## Cómo generar la versión para publicar

```bash
npm run build
```

Esto genera la carpeta `dist/` lista para subir a cualquier hosting estático
(Vercel, Netlify, GitHub Pages, un hosting tradicional, etc.). Para probarla
localmente antes de publicar:

```bash
npm run preview
```

## Estructura

```
src/
  components/
    Navbar.jsx         -> menu con hamburguesa en mobile
    Hero.jsx
    ElProyecto.jsx
    Amenities.jsx       -> filas imagen/texto, siempre 50/50 (grid, no flex)
    Masterplan.jsx       -> seccion del plano interactivo
    masterplan/
      MasterplanMap.jsx  -> el mapa SVG con zoom/pan y seleccion de lotes
      statusUtils.js
    Financiacion.jsx
    Ubicacion.jsx
    Contacto.jsx
    Footer.jsx
  data/
    masterplan.js        -> geometria real de los 48 lotes + calles (extraida
                             del plano que enviaste)
  assets/images/         -> fotos, video y la imagen aerea del terreno
```

## Cosas para revisar / completar

- **Ubicacion**: el mapa embebido usa una busqueda generica por nombre
  ("Barrancas del Rio Country Club"). Cuando tengas la direccion o
  coordenadas exactas, reemplaza `MAPS_QUERY` en `src/components/Ubicacion.jsx`.
- **Estado de los lotes**: como no me pasaste datos reales de ventas, cada
  lote muestra un estado (disponible / vendido / construido) calculado de
  forma deterministica a partir de su ID, solo para que el plano no se vea
  vacio. Cuando tengas el estado real de cada lote, actualiza
  `src/components/Masterplan.jsx` (el array `statuses`) o conectalo a una
  fuente de datos real.
- Saque el modo "editor" que tenia el plano original (el toggle para
  cambiar el estado de cada lote desde la propia pagina) - ahora es de solo
  lectura para los visitantes, como pediste.
- El WhatsApp del boton "Consultar este lote" y de Contacto usa
  +54 9 3571 610239 (el mismo del sitio original).
