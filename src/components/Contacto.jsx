import { useState } from 'react';

const WHATSAPP_NUMBER = '5493571610239';
const WHATSAPP_LABEL = '+54 9 3571 610239';
const EMAIL = 'barrancasdelriobarrio@gmail.com';
const INSTAGRAM = '@barrancascountry';

const inputClass =
  'w-full bg-cream/5 border border-cream/20 rounded-sm px-4 py-3 text-cream text-sm placeholder-cream/40 focus:outline-none focus:border-gold transition-colors';

export default function Contacto() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nombre = data.get('nombre')?.toString().trim();
    const telefono = data.get('telefono')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const mensaje = data.get('mensaje')?.toString().trim();

    const lines = [
      'Hola! Quiero recibir más información sobre Barrancas del Río.',
      `Nombre: ${nombre}`,
      `Teléfono: ${telefono}`,
      `Email: ${email}`,
    ];
    if (mensaje) lines.push(`Mensaje: ${mensaje}`);

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`,
      '_blank',
      'noopener,noreferrer'
    );

    setSubmitted(true);
    e.currentTarget.reset();
  };

  return (
    <section id="contacto" className="bg-forest py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Hola! Quiero coordinar una visita a Barrancas del Río.'
                )}`}
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

          <form
            onSubmit={handleSubmit}
            className="bg-forest-dark/40 border border-cream/10 rounded-sm p-6 sm:p-8"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="nombre" className="block text-cream/70 text-xs uppercase tracking-wide mb-2">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  className={inputClass}
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-cream/70 text-xs uppercase tracking-wide mb-2">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  className={inputClass}
                  placeholder="Tu teléfono"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-cream/70 text-xs uppercase tracking-wide mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={inputClass}
                placeholder="tu@email.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="mensaje" className="block text-cream/70 text-xs uppercase tracking-wide mb-2">
                Mensaje <span className="text-cream/40 normal-case">(opcional)</span>
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={3}
                className={`${inputClass} resize-none`}
                placeholder="Contame qué estás buscando"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center items-center gap-2 bg-gold text-forest-dark text-sm font-medium px-6 py-4 rounded-full hover:bg-cream transition-colors"
            >
              Enviar consulta
            </button>

            <p className="text-cream/40 text-xs mt-3 text-center">
              {submitted
                ? '¡Listo! Te abrimos WhatsApp con tu consulta ya redactada.'
                : 'Al enviar, se abre WhatsApp con tu consulta lista para confirmar el envío.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
