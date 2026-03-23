import { useState } from 'react';
import { menuSections } from '../data/menuData';

export default function Menu() {
  const [active, setActive] = useState('german');
  const section = menuSections.find(s => s.id === active);

  return (
    <section id="menu" className="section" aria-labelledby="menu-heading">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-kicker">Our Menu</p>
          <h2 id="menu-heading" className="section-title">
            Hearty classics made entirely from scratch.
          </h2>
          <p className="section-description">
            House-brined meats, fresh-baked bread, and sauces that take all day to get right.
            Every dish reflects decades of craft and care.
          </p>
        </div>

        <div className="menu-tabs reveal reveal-d1">
          {menuSections.map(s => (
            <button key={s.id} role="tab" aria-selected={active === s.id}
              className={`menu-tab${active === s.id ? ' menu-tab--active' : ''}`}
              onClick={() => setActive(s.id)}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {section.items.map((item, i) => (
            <article key={item.id} className={`menu-card reveal reveal-d${Math.min(i+1,4)}`}>
              <div className="menu-card-img">
                <img src={item.image} alt={item.name} loading="lazy" />
                <div className="menu-card-img-overlay" aria-hidden="true" />
              </div>
              <div className="menu-card-body">
                <div className="menu-card-top">
                  <h3 className="menu-card-name">{item.name}</h3>
                  <span className="menu-card-price">{item.price}</span>
                </div>
                <span className="menu-card-tag">{item.tag}</span>
                <p className="menu-card-desc">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '1.4rem', maxWidth: '56ch', marginInline: 'auto' }}>
            All entrées served with grilled vegetables, fresh bread & Haus salad.
            Gluten-free and vegetarian options available — ask your server.
          </p>
          <a href="/menu" className="btn-ghost" style={{ display: 'inline-flex' }}>
            View Full Menu →
          </a>
        </div>
      </div>
    </section>
  );
}
