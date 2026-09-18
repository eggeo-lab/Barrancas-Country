import { useEffect, useState } from 'react';
import logo from '../assets/images/logo-icon.png';

const LINKS = [
  { href: '#proyecto', label: 'El Proyecto' },
  { href: '#amenities', label: 'Amenities' },
  { href: '#masterplan', label: 'Masterplan' },
  { href: '#ubicacion', label: 'Ubicación' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open, and close it if the
  // viewport grows back into desktop size.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleLinkClick = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'bg-forest/95 backdrop-blur-sm shadow-lg shadow-forest-dark/20' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between h-20 sm:h-24 py-3">
        <a href="#inicio" className="flex items-center gap-3 shrink-0" onClick={handleLinkClick}>
          <img src={logo} alt="Barrancas del Río" className="h-12 sm:h-16 w-auto object-contain" />
          <span className="font-display text-cream text-lg sm:text-xl tracking-wide">Barrancas del Río</span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm tracking-wide text-cream/90 hover:text-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden lg:inline-flex items-center gap-2 border border-gold text-gold text-sm px-5 py-2.5 rounded-full hover:bg-gold hover:text-forest-dark transition-colors"
        >
          Agendá tu visita →
        </a>

        {/* Hamburger — visible only below the lg breakpoint */}
        <button
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 shrink-0"
        >
          <span
            className={`block h-0.5 w-6 bg-cream transition-transform duration-300 ${
              open ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-cream transition-opacity duration-200 ${open ? 'opacity-0' : 'opacity-100'}`}
          />
          <span
            className={`block h-0.5 w-6 bg-cream transition-transform duration-300 ${
              open ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          open ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-5 pb-6 pt-2 gap-1 border-t border-cream/10">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={handleLinkClick}
              className="text-cream/90 hover:text-gold py-3 text-base border-b border-cream/10 last:border-none"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={handleLinkClick}
            className="mt-4 inline-flex justify-center items-center gap-2 border border-gold text-gold text-sm px-5 py-3 rounded-full"
          >
            Agendá tu visita →
          </a>
        </nav>
      </div>
    </header>
  );
}
