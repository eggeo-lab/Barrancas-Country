import golfImg from '../assets/images/amenity-golf.webp';
import tenisImg from '../assets/images/amenity-tenis.webp';
import clubhouseImg from '../assets/images/amenity-clubhouse.webp';
import hotelImg from '../assets/images/amenity-hotel.webp';
import rioImg from '../assets/images/amenity-rio.webp';

const ITEMS = [
  {
    n: '01',
    title: 'Golf & Driving Range',
    text: 'Un campo perfectamente integrado al entorno natural, pensado para todos los niveles de juego.',
    img: golfImg,
    dark: true,
  },
  {
    n: '02',
    title: 'Tenis',
    text: 'Canchas profesionales de uso exclusivo para socios, disponibles todo el año.',
    img: tenisImg,
    dark: false,
  },
  {
    n: '03',
    title: 'Club House',
    text: 'Un espacio exclusivo para la vida social y los eventos.',
    img: clubhouseImg,
    dark: true,
  },
  {
    n: '04',
    title: 'Hotel & Spa',
    text: 'Alojamiento y relax de categoría dentro del desarrollo, para vos y tus invitados.',
    img: hotelImg,
    dark: false,
  },
  {
    n: '05',
    title: 'Naturaleza & Río',
    text: 'Acceso directo y senderos naturales sobre la vera del río.',
    img: rioImg,
    dark: true,
  },
];

export default function Amenities() {
  return (
    <section id="amenities" className="bg-forest-dark">
      <div className="max-w-[1200px] mx-auto px-8 sm:px-14 py-10 sm:py-12">
        <p className="text-forest-mid text-[13px] tracking-[1.5px] uppercase mb-4">
          Amenities &amp; Lifestyle
        </p>
        <h2 className="font-display text-cream text-[clamp(30px,4vw,46px)] max-w-xl">
          Venís a sentirte bien
        </h2>
      </div>

      {ITEMS.map((item, i) => {
        const imageFirst = i % 2 === 0;
        return (
          <div
            key={item.n}
            className={`grid md:grid-cols-2 ${item.dark ? 'bg-forest' : 'bg-cream'}`}
          >
            <div
              className={`aspect-[4/3] md:aspect-auto md:min-h-[520px] w-full overflow-hidden ${
                imageFirst ? 'md:order-1' : 'md:order-2'
              }`}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div
              className={`flex flex-col justify-center p-8 sm:p-14 ${
                imageFirst ? 'md:order-2' : 'md:order-1'
              }`}
            >
              <span className="font-display text-gold text-[1rem]">{item.n}</span>
              <h3
                className={`font-display text-[2.5rem] mt-3.5 mb-4 ${
                  item.dark ? 'text-cream' : 'text-forest'
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`text-[1rem] leading-[1.8] max-w-[380px] ${
                  item.dark ? 'text-sage' : 'text-muted'
                }`}
              >
                {item.text}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
