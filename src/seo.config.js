// Configuración central de SEO / GEO.
// Lo usan vite.config.js (meta tags, JSON-LD y sitemap.xml generados en el build)
// y los componentes que muestran datos de contacto. Mantener este archivo como
// única fuente de verdad: si cambia un dato, se cambia acá.

export const SITE = {
  url: 'https://barrancasdelrio.com.ar',
  name: 'Barrancas del Río Country Club',
  shortName: 'Barrancas del Río',
  locale: 'es_AR',
  lang: 'es-AR',

  // <title> (50-60 caracteres) y meta description (140-155 caracteres).
  title: 'Barrancas del Río Country Club | Lotes en venta en Córdoba',
  description:
    'Lotes desde 1000 m² con escritura inmediata y financiación propia, sobre la vera del río en Córdoba, Argentina. Golf, tenis, club house y hotel & spa.',

  // Imagen para compartir en redes (1200x630, servida desde public/).
  ogImage: '/og-image.jpg',
  ogImageAlt:
    'Vista aérea de Barrancas del Río Country Club: el río, la cancha de golf y las calles del loteo',

  // Contacto (datos presentes en el sitio).
  email: 'barrancasdelriobarrio@gmail.com',
  phone: '+54 9 3571 610239',
  whatsapp: '5493571610239',
  instagram: 'https://www.instagram.com/barrancascountry',
  instagramHandle: '@barrancascountry',

  // Ubicación. Las coordenadas son las del loteo (src/components/Ubicacion.jsx).
  geo: { latitude: -32.17310166452366, longitude: -64.22572707105174 },
  address: {
    // PENDIENTE: completar con la dirección postal exacta y la localidad
    // cuando estén confirmadas (no figuran en el sitio). Hasta entonces el
    // Schema solo declara provincia y país, más las coordenadas.
    streetAddress: '',
    addressLocality: '',
    postalCode: '',
    addressRegion: 'Córdoba',
    addressCountry: 'AR',
  },
  // Referencias de ubicación que sí aparecen en el sitio (mapa de Ubicación).
  areaDescription:
    'A 5 minutos de Almafuerte y de Río Tercero, junto al Lago Piedras Moras y a 1 hora de la ciudad de Córdoba.',

  amenities: [
    'Golf & Driving Range',
    'Canchas de tenis',
    'Club House',
    'Hotel & Spa',
    'Acceso directo y senderos sobre la vera del río',
  ],
  infrastructure: [
    'Escritura inmediata',
    'Servicios subterráneos: luz, agua de red y fibra óptica',
    'Calles asfaltadas',
    'Iluminación general',
  ],
};
