// Entrada para el prerenderizado en el build (ver scripts/prerender.js).
// Genera el HTML de la página para que buscadores y bots de IA lo lean sin
// ejecutar JavaScript.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
