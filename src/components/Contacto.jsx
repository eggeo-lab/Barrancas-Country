const WHATSAPP_NUMBER = '5493571610239';
const WHATSAPP_LABEL = '+54 9 3571 610239';
const EMAIL = 'barrancasdelriobarrio@gmail.com';
const INSTAGRAM = '@barrancascountry';

export default function Contacto() {
  return (
    <section id="contacto" className="bg-forest py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Contacto</p>
            <h2 className="font-display text-cream text-[clamp(30px,4vw,46px)] mb-5 leading-[1.15]">
              Coordinemos tu visita
            </h2>
            <p className="text-sage text-base leading-relaxed max-w-md mb-8">
              Escribinos y te acompañamos en todo el proceso, desde la primera visita hasta la
              escritura.
            </p>

            <div className="space-y-3 text-cream text-sm">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="block hover:text-gold transition-colors"
              >
                {WHATSAPP_LABEL}
              </a>
              <a href={`mailto:${EMAIL}`} className="block hover:text-gold transition-colors">
                {EMAIL}
              </a>
              <a
                href="https://instagram.com/barrancascountry"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-gold transition-colors"
              >
                {INSTAGRAM}
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex justify-center items-center gap-2 bg-whatsapp text-white text-sm font-medium px-6 py-4 rounded-full hover:opacity-90 transition-opacity"
            >
              Enviar por WhatsApp
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex-1 inline-flex justify-center items-center gap-2 border border-cream/40 text-cream text-sm px-6 py-4 rounded-full hover:border-gold hover:text-gold transition-colors"
            >
              Enviar por Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
