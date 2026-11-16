import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootEl = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// En producción el HTML viene prerenderizado (scripts/prerender.js): se hidrata.
// En desarrollo el contenedor está vacío: se renderiza desde cero.
if (rootEl.firstElementChild) {
  hydrateRoot(rootEl, app)
} else {
  createRoot(rootEl).render(app)
}
