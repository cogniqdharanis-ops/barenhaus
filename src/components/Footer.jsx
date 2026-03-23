const LOGO = 'https://www.barenhaus.com/wp-content/uploads/2016/08/Baren-Haus-Logo.png';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">

          <div>
            <div className="footer-brand">
              <div className="footer-logo"><img src={LOGO} alt="Bären Haus" /></div>
              <div>
                <p className="footer-name">Bären Haus</p>
                <p className="footer-tagline">An Authentic Bavarian Experience</p>
              </div>
            </div>
            <p className="footer-address">
              901 Front Street<br />Leavenworth, WA 98826
            </p>
            <a href="tel:+15095484535" className="footer-phone">(509) 548-4535</a>
          </div>

          <div>
            <span className="footer-col-title">Hours</span>
            <div className="footer-links">
              <span>Sun – Thu: 11AM – 10PM</span>
              <span>Fri – Sat: 11AM – 11PM</span>
              <span className="footer-live">🎸 Live Music Fri & Sat 8–11PM</span>
            </div>
          </div>

          <div>
            <span className="footer-col-title">Explore</span>
            <nav className="footer-links">
              <a href="/">Home</a>
              <a href="/menu">Full Menu</a>
              <a href="/events">Events</a>
              <a href="/contact">Contact</a>
            </nav>
          </div>

          <div>
            <span className="footer-col-title">Connect</span>
            <div className="footer-links">
              <a href="https://www.facebook.com/baren.haus1/" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://www.barenhaus.com" target="_blank" rel="noreferrer">barenhaus.com</a>
              <a href="mailto:Greg@barenhaus.com">Greg@barenhaus.com</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Bären Haus. All rights reserved.</span>
          <span>901 Front St, Leavenworth, WA · (509) 548-4535</span>
        </div>
      </div>
    </footer>
  );
}
