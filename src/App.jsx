import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ElProyecto from './components/ElProyecto';
import Amenities from './components/Amenities';
import Masterplan from './components/Masterplan';
import Financiacion from './components/Financiacion';
import Ubicacion from './components/Ubicacion';
import Contacto from './components/Contacto';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero />
        <ElProyecto />
        <Amenities />
        <Masterplan />
        <Financiacion />
        <Ubicacion />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}
