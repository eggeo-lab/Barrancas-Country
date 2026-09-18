import logo from '../assets/images/logo-icon.png';

const LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#proyecto', label: 'El Proyecto' },
  { href: '#amenities', label: 'Amenities' },
  { href: '#masterplan', label: 'Masterplan' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Footer() {
  return (
    <footer className="bg-forest-dark py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-10 border-b border-cream/10">
          <a href="#inicio" className="flex items-center gap-3">
            <img src={logo} alt="Barrancas del Río" className="h-12 w-auto object-contain" />
            <span className="font-display text-cream text-lg">Barrancas del Río</span>
          </a>

          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-cream/70 text-sm hover:text-gold transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-1 text-sm text-cream/70">
            <span>+54 9 3571 610239</span>
            <span>@barrancascountry</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-6">
          <p className="text-cream/40 text-xs">
            © {new Date().getFullYear()} Barrancas del Río Country Club. Todos los derechos
            reservados.
          </p>
          <a
            href="https://www.eggeo.com.ar"
            target="_blank"
            rel="noreferrer"
            className="text-cream/40 text-xs hover:text-gold transition-colors"
          >
            Desarrollado por EGGEO
          </a>
        </div>
      </div>
    </footer>
  );
}
