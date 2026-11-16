import { FAQ } from '../data/faq';

// Acordeón nativo (<details>): sin JS, y las respuestas quedan en el HTML
// prerenderizado aunque estén colapsadas, así las leen buscadores y motores de IA.
export default function PreguntasFrecuentes() {
  return (
    <section id="preguntas-frecuentes" className="bg-cream pb-24 sm:pb-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-10 md:gap-16 items-start border-t border-forest/15 pt-16 sm:pt-20">
          <div>
            <p className="text-forest-mid text-xs tracking-[0.3em] uppercase mb-4">
              Preguntas frecuentes
            </p>
            <h2 className="font-display text-forest text-[clamp(30px,4vw,46px)] leading-[1.15]">
              Todo lo que querés saber
            </h2>
          </div>

          <div className="divide-y divide-forest/15 border-y border-forest/15">
            {FAQ.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-forest [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base sm:text-lg leading-snug">{item.q}</h3>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 text-gold text-xl leading-none transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="text-muted text-[0.95rem] leading-relaxed mt-3 max-w-2xl">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
