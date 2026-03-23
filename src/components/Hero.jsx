const LOGO = 'https://www.barenhaus.com/wp-content/uploads/2016/08/Baren-Haus-Logo.png';

export default function Hero() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-title">
      {/* Dark rustic restaurant interior background */}
      <div className="hero-bg" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1920&q=90')",
      }} aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-inner">
        <div className="container">
          <div className="hero-grid">

            <div className="hero-left">
              <p className="hero-eyebrow">Leavenworth, Washington · 901 Front Street</p>

              <div className="hero-titles">
                <p className="hero-supertitle">An Authentic</p>
                <h1 id="hero-title" className="hero-title">Bären Haus</h1>
                <p className="hero-subtitle">Bavarian Experience</p>
              </div>

              <p className="hero-desc">
                Nestled in Leavenworth's Bavarian village — hearty German classics, house-baked
                breads, imported beers, and live acoustic rock every Friday and Saturday night,
                in a warm brick-walled tavern that feels like home.
              </p>

              <div className="hero-actions">
                <button type="button" className="btn-primary" onClick={() => scrollTo('contact')}>
                  Reserve a Table
                </button>
                <button type="button" className="btn-ghost" onClick={() => scrollTo('menu')}>
                  Explore Menu
                </button>
              </div>

              <div className="hero-badges">
                {['Fresh-Baked Daily','House-Made Sauces','Gluten-Free Options','Walk-ins Welcome','Outdoor Seating'].map(b => (
                  <span key={b} className="hero-badge">✓ {b}</span>
                ))}
              </div>

              <div className="hero-stats">
                {[
                  { value: '1,998+', label: 'Guest Reviews' },
                  { value: '4.1★',  label: 'Google Rating' },
                  { value: 'Fri–Sat', label: 'Live Music' },
                ].map(({ value, label }) => (
                  <div key={label} className="hero-stat">
                    <span className="hero-stat-value">{value}</span>
                    <span className="hero-stat-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-right">
              <article className="hero-card">
                <div className="hero-card-img">
                  {/* Golden crispy schnitzel — most representative dish */}
                  <img
                    src="https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=900&q=90"
                    alt="Jaeger Schnitzel — Bären Haus house favorite"
                    loading="eager"
                  />
                  <div className="hero-card-img-grad" aria-hidden="true" />
                  <div className="hero-card-badge">
                    <img src={LOGO} alt="Bären Haus" />
                  </div>
                </div>
                <div className="hero-card-body">
                  <span className="hero-card-label">⭐ Most-Ordered Dish</span>
                  <h2 className="hero-card-title">Jaeger Schnitzel</h2>
                  <p className="hero-card-desc">
                    Pan-fried pork schnitzel with rich mushroom gravy, red cabbage, sauerkraut,
                    and roasted potatoes. Made entirely from scratch, every service.
                  </p>
                  <div className="hero-card-foot">
                    <div className="hero-card-rating">
                      <span className="hero-card-stars">★★★★</span>
                      <span className="hero-card-score">4.1</span>
                      <span className="hero-card-count">· 1,998 reviews</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--muted)' }}>
                      Walk-ins welcome
                    </span>
                  </div>
                </div>
              </article>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
