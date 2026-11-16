// Plugin de Vite que inyecta en el <head> las meta tags, Open Graph, Twitter Card
// y los datos estructurados (JSON-LD), y emite sitemap.xml en cada build.
// Toda la información sale de src/seo.config.js y src/data/faq.js.

import { SITE } from '../src/seo.config.js';
import { FAQ } from '../src/data/faq.js';

const abs = (path) => new URL(path, SITE.url).href;

function compact(obj) {
  // Saca campos vacíos para no publicar strings en blanco en el Schema.
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== '' && v != null));
}

function buildJsonLd() {
  const home = abs('/');
  const address = { '@type': 'PostalAddress', ...compact(SITE.address) };
  const geo = { '@type': 'GeoCoordinates', ...SITE.geo };
  const mapUrl = `https://www.google.com/maps?q=${SITE.geo.latitude},${SITE.geo.longitude}`;

  const organization = {
    '@type': 'RealEstateAgent',
    '@id': `${home}#organizacion`,
    name: SITE.name,
    url: home,
    logo: abs('/logo.png'),
    image: abs(SITE.ogImage),
    email: SITE.email,
    telephone: SITE.phone,
    address,
    geo,
    hasMap: mapUrl,
    areaServed: { '@type': 'AdministrativeArea', name: 'Córdoba, Argentina' },
    sameAs: [SITE.instagram],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: SITE.phone,
      email: SITE.email,
      areaServed: 'AR',
      availableLanguage: ['es'],
    },
  };

  const community = {
    '@type': 'GatedResidenceCommunity',
    '@id': `${home}#country`,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: home,
    description: `${SITE.description} ${SITE.areaDescription}`,
    image: abs(SITE.ogImage),
    telephone: SITE.phone,
    address,
    geo,
    hasMap: mapUrl,
    amenityFeature: [...SITE.amenities, ...SITE.infrastructure].map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true,
    })),
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${home}#sitio`,
    url: home,
    name: SITE.name,
    inLanguage: SITE.lang,
    publisher: { '@id': organization['@id'] },
  };

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${home}#breadcrumb`,
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: home }],
  };

  const webpage = {
    '@type': 'WebPage',
    '@id': `${home}#pagina`,
    url: home,
    name: SITE.title,
    description: SITE.description,
    inLanguage: SITE.lang,
    isPartOf: { '@id': website['@id'] },
    about: { '@id': community['@id'] },
    primaryImageOfPage: { '@type': 'ImageObject', url: abs(SITE.ogImage), width: 1200, height: 630 },
    breadcrumb: { '@id': breadcrumb['@id'] },
  };

  const faq = {
    '@type': 'FAQPage',
    '@id': `${home}#preguntas-frecuentes`,
    inLanguage: SITE.lang,
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, community, website, webpage, breadcrumb, faq],
  };
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${abs('/')}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
}

export default function seoPlugin() {
  let isSsrBuild = false;
  return {
    name: 'seo',
    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr);
    },
    transformIndexHtml() {
      const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' });
      // "<" escapado para que el JSON nunca pueda cerrar el <script>.
      const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c');
      return [
        { tag: 'title', children: SITE.title, injectTo: 'head-prepend' },
        meta({ name: 'description', content: SITE.description }),
        meta({ name: 'robots', content: 'index, follow, max-image-preview:large' }),
        { tag: 'link', attrs: { rel: 'canonical', href: abs('/') }, injectTo: 'head' },
        { tag: 'link', attrs: { rel: 'alternate', hreflang: SITE.lang, href: abs('/') }, injectTo: 'head' },
        meta({ property: 'og:type', content: 'website' }),
        meta({ property: 'og:site_name', content: SITE.name }),
        meta({ property: 'og:locale', content: SITE.locale }),
        meta({ property: 'og:url', content: abs('/') }),
        meta({ property: 'og:title', content: SITE.title }),
        meta({ property: 'og:description', content: SITE.description }),
        meta({ property: 'og:image', content: abs(SITE.ogImage) }),
        meta({ property: 'og:image:type', content: 'image/jpeg' }),
        meta({ property: 'og:image:width', content: '1200' }),
        meta({ property: 'og:image:height', content: '630' }),
        meta({ property: 'og:image:alt', content: SITE.ogImageAlt }),
        meta({ name: 'twitter:card', content: 'summary_large_image' }),
        meta({ name: 'twitter:title', content: SITE.title }),
        meta({ name: 'twitter:description', content: SITE.description }),
        meta({ name: 'twitter:image', content: abs(SITE.ogImage) }),
        meta({ name: 'twitter:image:alt', content: SITE.ogImageAlt }),
        { tag: 'script', attrs: { type: 'application/ld+json' }, children: jsonLd, injectTo: 'head' },
      ];
    },
    generateBundle() {
      if (isSsrBuild) return;
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap() });
    },
  };
}
