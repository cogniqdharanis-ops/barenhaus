// Carefully selected images that match Bären Haus atmosphere:
// warm brick interiors, German food, beer, live music, bread
const images = [
  {
    id: 1,
    // Warm rustic restaurant interior — brick, wood, soft lighting
    src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=90',
    alt: 'Warm rustic restaurant interior',
    label: 'The Bären Haus dining room',
  },
  {
    id: 2,
    // Golden crispy schnitzel — the signature dish
    src: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=900&q=90',
    alt: 'Golden crispy Jaeger Schnitzel',
    label: 'Jaeger Schnitzel — house favorite',
  },
  {
    id: 3,
    // Two golden German beers being toasted — perfect Bavarian moment
    src: 'https://images.unsplash.com/photo-1436076863939-06870fe779c2?auto=format&fit=crop&w=900&q=90',
    alt: 'Golden German draft beers being toasted',
    label: 'Prost! German draft on tap',
  },
  {
    id: 4,
    // Intimate live music — guitarist in warm lighting
    src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=90',
    alt: 'Live acoustic music performance',
    label: 'Live music every Fri & Sat',
  },
  {
    id: 5,
    // Artisan bread loaves — rustic bakery feel
    src: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=900&q=90',
    alt: 'Fresh artisan bread baked daily',
    label: 'Fresh-baked bread every morning',
  },
  {
    id: 6,
    // Cozy restaurant table evening — candlelit warm atmosphere
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=90',
    alt: 'Warm candlelit restaurant evening',
    label: 'An evening at Bären Haus',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="section" aria-labelledby="gallery-heading">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-kicker">Inside the Haus</p>
          <h2 id="gallery-heading" className="section-title">
            Brick walls, warm light, and cold beer.
          </h2>
          <p className="section-description">
            A glimpse inside the restaurant that has been welcoming Leavenworth visitors
            and locals for decades.
          </p>
        </div>

        <div className="surface-card reveal reveal-d1" style={{ padding: '1.25rem' }}>
          <div className="gallery-masonry">
            {images.map(img => (
              <figure key={img.id} className="gallery-item">
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="gallery-overlay" aria-hidden="true" />
                <figcaption className="gallery-caption">{img.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
