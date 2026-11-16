// Prerenderizado estático: inserta el HTML de la app dentro de dist/index.html
// para que el contenido esté en la respuesta inicial (SEO / bots de IA).
// Se ejecuta al final de `npm run build`, después del build SSR en dist-ssr/.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const indexPath = `${root}dist/index.html`;
const ssrDir = `${root}dist-ssr`;

const { render } = await import(pathToFileURL(`${ssrDir}/entry-server.js`).href);
const template = await readFile(indexPath, 'utf-8');

const PLACEHOLDER = '<!--app-html-->';
if (!template.includes(PLACEHOLDER)) {
  throw new Error(`No se encontró ${PLACEHOLDER} en dist/index.html`);
}

await writeFile(indexPath, template.replace(PLACEHOLDER, render()));
await rm(ssrDir, { recursive: true, force: true });
console.log('✓ dist/index.html prerenderizado');
