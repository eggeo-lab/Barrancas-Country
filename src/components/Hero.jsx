import heroVideo from '../assets/images/hero-video.mp4';

const STATS = [
  { value: '1000 m²', label: 'Lotes desde' },
  { value: 'Listo', label: 'para construir' },
  { value: 'Golf 18h', label: 'campo integrado' },
  { value: 'Financiación', label: 'Propia' },
];

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/60 to-forest-dark/30" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 pt-40 pb-14">
        <p className="text-gold text-xs sm:text-sm tracking-[0.3em] uppercase mb-5">
          Lotes desde 1000 m² &nbsp;·&nbsp; Financiación Propia
        </p>
        <h1 className="font-display text-cream max-w-3xl text-[clamp(38px,6.5vw,88px)] leading-[1.04]">
          Lotes con Escritura Inmediata y Financiación Propia, sobre la vera del río.
        </h1>

        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href="#masterplan"
            className="inline-flex items-center gap-2 bg-gold text-forest-dark text-sm font-medium px-6 py-3.5 rounded-full hover:bg-cream transition-colors"
          >
            Ver Masterplan
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 border border-cream/50 text-cream text-sm px-6 py-3.5 rounded-full hover:border-gold hover:text-gold transition-colors"
          >
            Agendá tu visita
          </a>
        </div>
      </div>

      <div className="relative z-10 border-t border-cream/15 bg-forest-dark/70 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6">
          <p className="text-cream/60 text-xs tracking-[0.2em] uppercase mb-4">
            Barrancas del Río en cifras
          </p>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-cream text-2xl sm:text-3xl">{s.value}</dd>
                <dd className="text-cream/60 text-xs sm:text-sm mt-1">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
