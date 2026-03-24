import Hero from '../components/Hero';
import MusicBanner from '../components/MusicBanner';
import About from '../components/About';
import Menu from '../components/Menu';
import Events from '../components/Events';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <MusicBanner />
      <About />
      <Menu />
      <Events />
      <Testimonials />
      <Gallery />
      <Contact />
    </div>
  );
}