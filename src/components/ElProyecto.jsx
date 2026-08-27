const ITEMS = [
  {
    n: '01',
    title: 'Escritura Inmediata',
    text: 'Transparencia y seguridad jurídica desde el primer día. Comprás. Escriturás. Empezás.',
  },
  {
    n: '02',
    title: 'Servicios Subterráneos',
    text: 'Luz, agua de red y fibra óptica sin cables a la vista.',
  },
  {
    n: '03',
    title: 'Infraestructura Completa',
    text: 'Calles asfaltadas e iluminación general en todo el desarrollo.',
  },
  {
    n: '04',
    title: 'Ubicación y Naturaleza',
    text: 'Terrenos bordeados por el río y vegetación autóctona.',
  },
];

export default function ElProyecto() {
  return (
    <section id="proyecto" className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-forest-mid text-xs tracking-[0.3em] uppercase mb-4">El Proyecto</p>
        <h2 className="font-display text-forest text-[clamp(30px,4vw,46px)] max-w-xl mb-14 sm:mb-16">
          Venís a construir tu lugar en el mundo
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {ITEMS.map((item) => (
            <div key={item.n} className="border-t border-forest/15 pt-6">
              <span className="text-gold font-display text-sm">{item.n}</span>
              <h3 className="font-display text-forest text-[1.5rem] mt-3 mb-2.5">{item.title}</h3>
              <p className="text-muted text-[0.9rem] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
