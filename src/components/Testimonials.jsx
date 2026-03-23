import { testimonials } from '../data/testimonialsData';

export default function Testimonials() {
  return (
    <section id="testimonials" className="section" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-kicker">Guest Reviews</p>
          <h2 id="testimonials-heading" className="section-title">
            What our guests are saying.
          </h2>
          <p className="section-description">
            Nearly 2,000 reviews and a loyal following of locals and visitors alike.
            Bären Haus has become a true Leavenworth institution.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <figure key={t.id} className={`testimonial-card reveal reveal-d${i+1}`}>
              <div className="testimonial-stars">{'★'.repeat(t.rating)}</div>
              <blockquote className="testimonial-quote">"{t.quote}"</blockquote>
              <figcaption className="testimonial-author">
                <p className="testimonial-name">{t.name}</p>
                <p className="testimonial-role">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="stats-bar reveal">
          {[
            { value: '1,998+', label: 'Google Reviews' },
            { value: '4.1 ★',  label: 'Average Rating' },
            { value: '#18',    label: 'of 75 Restaurants in Leavenworth' },
          ].map(({ value, label }) => (
            <div key={label} className="stat-item">
              <p className="stat-value">{value}</p>
              <p className="stat-label">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
