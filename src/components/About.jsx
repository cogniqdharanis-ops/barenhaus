export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-kicker">Our Story</p>
          <h2 id="about-heading" className="section-title">
            The old brick building on the corner of Front Street.
          </h2>
          <p className="section-description">
            A Leavenworth landmark where every meal starts from scratch and every evening
            feels like a genuine Bavarian celebration.
          </p>
        </div>

        <div className="about-wrap reveal reveal-d1">
          <div className="about-img-col">
            {/* Warm cozy restaurant interior — brick walls, wood, intimate lighting */}
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=90"
              alt="Warm Bavarian restaurant interior with brick walls and soft lighting"
            />
          </div>

          <div className="about-content-col">
            <h3 className="about-heading">
              Authentic Bavarian hospitality in the Pacific Northwest.
            </h3>

            <p className="about-body">
              Bären Haus is Leavenworth's beloved German tavern — a warm, brick-walled restaurant
              serving hearty classics alongside pastas, steaks, burgers, and our legendary Reuben
              sandwich. Every dish starts from scratch: we make our own sauces, brines, and dough,
              and our bread is baked fresh every single day.
            </p>

            <p className="about-body">
              Whether you're stopping in for a schnitzel after a hike, gathering your group for a
              celebration, or settling in for live acoustic rock on a Friday night — Bären Haus
              always has a table waiting for you.
            </p>

            <div className="about-facts">
              {[
                { label: 'Location',     value: '901 Front St, Leavenworth, WA 98826' },
                { label: 'Hours',        value: 'Sun–Thu 11AM–10PM · Fri–Sat 11AM–11PM' },
                { label: 'Live Music',   value: 'Every Friday & Saturday, 8–11 PM' },
                { label: 'Reservations', value: 'Large groups: (509) 548-4535' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="about-fact-label">{label}</p>
                  <p className="about-fact-value">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
