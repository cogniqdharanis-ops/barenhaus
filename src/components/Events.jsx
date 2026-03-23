export default function Events() {
  const sidebar = [
    {
      title: 'Hours of Operation',
      items: [
        { icon: '📅', text: 'Sunday – Thursday: 11:00 AM – 10:00 PM' },
        { icon: '🎸', text: 'Friday – Saturday: 11:00 AM – 11:00 PM' },
        { icon: '🎵', text: 'Live Music: Fri & Sat, 8:00 – 11:00 PM' },
      ],
      cta: null,
    },
    {
      title: 'Large Group Bookings',
      items: [
        { icon: '👥', text: 'Large party? Call (509) 548-4535' },
        { icon: '📅', text: 'Available on non-festival weekends' },
        { icon: '✉',  text: 'Greg@barenhaus.com for event inquiries' },
      ],
      cta: { label: 'Call to Reserve', href: 'tel:+15095484535' },
    },
    {
      title: 'Dining Options',
      items: [
        { icon: '🍽️', text: 'Dine-in — walk-ins always welcome' },
        { icon: '🥡', text: 'Takeaway & curbside pickup available' },
        { icon: '🌿', text: 'Gluten-free & vegetarian options' },
        { icon: '♿', text: 'Handicap accessible venue' },
      ],
      cta: null,
    },
  ];

  return (
    <section id="events" className="section" aria-labelledby="events-heading">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-kicker">Events & Entertainment</p>
          <h2 id="events-heading" className="section-title">
            Live music, cold beer, and good company.
          </h2>
          <p className="section-description">
            Friday and Saturday nights come alive with classic acoustic rock. No cover charge —
            just great food, cold beer, and music that sets the perfect mood.
          </p>
        </div>

        <div className="events-layout">
          <article className="event-main reveal">
            <div className="event-img">
              <img
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=85"
                alt="Live acoustic music at Bären Haus"
              />
              <div className="event-img-grad" aria-hidden="true" />
            </div>
            <div className="event-body">
              <span className="event-label">Every Friday & Saturday Night</span>
              <h3 className="event-title">Live Acoustic Rock</h3>
              <p className="event-desc">
                Our rotating lineup of talented local musicians plays classic acoustic rock every
                weekend from 8 to 11 PM. Settle into the warm brick-walled dining room with a
                cold German draft and let the evening unfold. No cover charge, ever.
              </p>
              <div className="event-pills">
                <span className="pill"><span className="pill-dot" />8:00 – 11:00 PM</span>
                <span className="pill">No Cover Charge</span>
                <span className="pill">Every Weekend</span>
              </div>
            </div>
          </article>

          <div className="event-sidebar">
            {sidebar.map((card, i) => (
              <div key={card.title} className={`info-card reveal reveal-d${i+1}`}>
                <span className="info-card-title">{card.title}</span>
                <div className="info-list">
                  {card.items.map(({ icon, text }) => (
                    <div key={text} className="info-item">
                      <span className="info-item-icon">{icon}</span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
                {card.cta && (
                  <a href={card.cta.href} className="btn-primary"
                    style={{ width: '100%', marginTop: '1.1rem', justifyContent: 'center' }}>
                    {card.cta.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
