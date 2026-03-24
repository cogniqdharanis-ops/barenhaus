import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LOGO = 'https://www.barenhaus.com/wp-content/uploads/2016/08/Baren-Haus-Logo.png';

const links = [
  { label: 'Home',    section: null,       to: '/' },
  { label: 'About',   section: 'about',    to: '/#about' },
  { label: 'Menu',    section: 'menu',     to: '/#menu' },
  { label: 'Events',  section: 'events',   to: '/#events' },
  { label: 'Gallery', section: 'gallery',  to: '/#gallery' },
  { label: 'Contact', section: 'contact', to: '/#contact' },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleClick = link => e => {
    e.preventDefault(); setOpen(false);
    if (link.section) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => document.getElementById(link.section)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 130);
      } else {
        document.getElementById(link.section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else { navigate(link.to); }
  };

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container navbar-inner">

        <NavLink to="/" className="navbar-brand">
          <div className="navbar-logo">
            <img src={LOGO} alt="Bären Haus" />
          </div>
          <div className="navbar-wordmark">
            <span className="navbar-name">Bären Haus</span>
            <span className="navbar-tagline">Authentic Bavarian · Leavenworth, WA</span>
          </div>
        </NavLink>

        <nav className="navbar-links" aria-label="Primary">
          {links.map(link => (
            <a key={link.label} href={link.to} className="navbar-link" onClick={handleClick(link)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar-actions">
          <span className="navbar-open-pill">
            <span className="navbar-open-dot" />
            Open Daily 11AM
          </span>
          <a href="tel:+15095484535" className="navbar-reserve">Reserve</a>
        </div>

        <button type="button" className="navbar-toggle" aria-label="Toggle menu"
          aria-expanded={open} onClick={() => setOpen(o => !o)}>
          <span className="navbar-toggle-icon" aria-hidden="true" />
        </button>
      </div>

      <div className={`nav-overlay${open ? ' nav-overlay--open' : ''}`} onClick={() => setOpen(false)} />

      <div className={`nav-panel${open ? ' nav-panel--open' : ''}`} aria-hidden={!open}>
        <nav className="nav-panel-links">
          {links.map(link => (
            <a key={link.label} href={link.to} className="nav-panel-link" onClick={handleClick(link)}>
              {link.label}
            </a>
          ))}
          <div className="nav-panel-divider" />
          <a href="tel:+15095484535" className="nav-panel-link">📞 (509) 548-4535</a>
          <a href="mailto:Greg@barenhaus.com" className="nav-panel-link">✉ Greg@barenhaus.com</a>
        </nav>
      </div>
    </header>
  );
}
