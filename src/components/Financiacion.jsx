const POINTS = [
  'Sin intermediarios ni comisiones bancarias',
  'Derecho a construir desde el primer momento',
  'Escritura inmediata, seguridad jurídica desde el día uno',
];

export default function Financiacion() {
  return (
    <section className="bg-cream pt-24 sm:pt-28 pb-12 sm:pb-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <p className="text-forest-mid text-xs tracking-[0.3em] uppercase mb-4">
              Oportunidad de Inversión
            </p>
            <h2 className="font-display text-forest text-[clamp(30px,4vw,46px)] leading-[1.15]">
              Financiación propia, sin intermediarios
            </h2>
          </div>

          <div>
            <p className="text-muted text-base leading-relaxed mb-8">
              El desarrollador financia directamente cada lote, con derecho de construcción
              inmediato desde la firma de la escritura. Un camino simple y transparente, sin
              bancos de por medio.
            </p>
            <ul className="space-y-4">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span className="text-forest text-sm sm:text-base">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
