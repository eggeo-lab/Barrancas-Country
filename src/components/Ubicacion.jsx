import viewUbicacion from '../assets/images/view-ubicacion.png';

// Coordenadas reales del loteo.
const LAT = -32.17310166452366;
const LNG = -64.22572707105174;
const MAPS_LINK = `https://www.google.com/maps?q=${LAT},${LNG}`;

export default function Ubicacion() {
  return (
    <section id="ubicacion" className="bg-cream pt-12 sm:pt-14 pb-24 sm:pb-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-forest-mid text-xs tracking-[0.3em] uppercase mb-4">Ubicación</p>
            <h2 className="font-display text-forest text-[clamp(30px,4vw,46px)] mb-5 leading-[1.15]">
              Sobre la vera del río
            </h2>
            <p className="text-muted text-base leading-relaxed max-w-md mb-8">
              Un predio bordeado por el río y la vegetación autóctona, a minutos del centro de la
              ciudad, con calles asfaltadas y acceso directo a la naturaleza.
            </p>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-forest text-sm font-medium border-b border-gold pb-1 hover:text-gold transition-colors"
            >
              Cómo llegar →
            </a>
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-sm border border-forest/10 bg-sand">
            <img
              src={viewUbicacion}
              alt="Mapa de ubicación de Barrancas del Río, a 5 minutos de Almafuerte y Río Tercero, junto al Lago Piedras Moras y a 1 hora de Córdoba"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
