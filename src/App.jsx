import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';
import useScrollReveal from './hooks/useScrollReveal';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function NavbarScrollEffect() {
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const onScroll = () => {
      if (window.scrollY > 40) navbar?.classList.add('scrolled');
      else navbar?.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return null;
}

export default function App() {
  useScrollReveal();
  return (
    <div className="app-shell">
      <ScrollToTop />
      <NavbarScrollEffect />
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}
