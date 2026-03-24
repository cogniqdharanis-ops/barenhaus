import { useState } from 'react';
import { menuSections } from '../data/menuData';

export default function MenuPage() {
  const [active, setActive] = useState('german');
  const section = menuSections.find(s => s.id === active);

  return (
    <div className="container" style={{ paddingBlock: '3rem' }}>
      <div className="section-header" style={{ marginBottom: '2.5rem' }}>
        <p className="section-kicker">Full Menu</p>
        <h1 className="section-title">Everything we make, we make from scratch.</h1>
        <p className="section-description">
          All bread baked daily. House-made sauces, brines, and dough.
        </p>
      </div>
      <div className="menu-tabs">
        {menuSections.map(s => (
          <button key={s.id} className={`menu-tab${active === s.id ? ' menu-tab--active' : ''}`}
            onClick={() => setActive(s.id)}>{s.icon} {s.label}</button>
        ))}
      </div>
      <div className="menu-grid">
        {section.items.map(item => (
          <article key={item.id} className="menu-card">
            <div className="menu-card-image"><img src={item.image} alt={item.name} loading="lazy" /></div>
            <div className="menu-card-body">
              <div className="menu-card-header">
                <h2 className="menu-card-name">{item.name}</h2>
                <span className="menu-card-price">{item.price}</span>
              </div>
              <span className="menu-card-tag">{item.tag}</span>
              <p className="menu-card-desc">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}