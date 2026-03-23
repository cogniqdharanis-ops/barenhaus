import { useState } from 'react';

const init = { name: '', email: '', phone: '', guests: '', date: '', message: '' };

export default function Contact() {
  const [form, setForm]     = useState(init);
  const [sent, setSent]     = useState(false);
  const [error, setError]   = useState('');

  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onFocus = e => { e.target.style.borderColor = 'var(--border-md)'; e.target.style.background = 'rgba(255,255,255,0.055)'; };
  const onBlur  = e => { e.target.style.borderColor = 'var(--border)';    e.target.style.background = 'rgba(255,255,255,0.03)'; };

  function submit(e) {
    e.preventDefault(); setError('');
    if (!form.name.trim() || !form.email.trim()) { setError('Please fill in your name and email.'); return; }
    console.log('Inquiry:', form);
    setSent(true); setForm(init);
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-kicker">Say Hello</p>
          <h2 id="contact-heading" className="section-title">
            Planning a large group or special event?
          </h2>
          <p className="section-description">
            Walk-ins are always welcome for regular dining. For large groups or private gatherings,
            reach out and we will take care of everything.
          </p>
        </div>

        <div className="contact-wrap reveal reveal-d1">
          {sent ? (
            <div style={{
              gridColumn: '1 / -1', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '1.1rem', padding: '5rem 2rem', textAlign: 'center',
              background: 'linear-gradient(145deg, var(--surface), var(--surface-2))',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--gold), var(--gold-lt))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem',
              }}>🐻</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 600, color: 'var(--ivory)' }}>
                Message received!
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.96rem', maxWidth: '38ch', lineHeight: 1.75 }}>
                Thank you for reaching out. We will get back to you within one business day.
                For urgent inquiries, call us at (509) 548-4535.
              </p>
              <button type="button" className="btn-ghost" style={{ marginTop: '0.5rem' }}
                onClick={() => setSent(false)}>
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              {/* Form */}
              <div className="contact-form-col">
                <form onSubmit={submit} style={{ display: 'grid', gap: '1.25rem' }}>
                  {error && (
                    <p role="alert" style={{
                      color: '#f87171', fontSize: '0.84rem', padding: '0.65rem 1rem',
                      borderRadius: 'var(--radius-sm)', background: 'rgba(248,113,113,0.08)',
                      border: '1px solid rgba(248,113,113,0.22)',
                      fontFamily: 'var(--font-body)',
                    }}>{error}</p>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input id="name" name="name" type="text" placeholder="Your name"
                        className="form-input" value={form.name} onChange={set}
                        onFocus={onFocus} onBlur={onBlur} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input id="email" name="email" type="email" placeholder="you@email.com"
                        className="form-input" value={form.email} onChange={set}
                        onFocus={onFocus} onBlur={onBlur} required />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input id="phone" name="phone" type="tel" placeholder="(509) 000-0000"
                        className="form-input" value={form.phone} onChange={set}
                        onFocus={onFocus} onBlur={onBlur} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="guests" className="form-label">Party Size</label>
                      <input id="guests" name="guests" type="number" min="1" placeholder="Number of guests"
                        className="form-input" value={form.guests} onChange={set}
                        onFocus={onFocus} onBlur={onBlur} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="date" className="form-label">Preferred Date</label>
                    <input id="date" name="date" type="date"
                      className="form-input" value={form.date} onChange={set}
                      onFocus={onFocus} onBlur={onBlur} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Tell us about your event</label>
                    <textarea id="message" name="message" rows={4}
                      placeholder="Birthday dinner, company offsite, family reunion..."
                      className="form-input" style={{ resize: 'vertical', lineHeight: 1.65 }}
                      value={form.message} onChange={set}
                      onFocus={onFocus} onBlur={onBlur}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.25rem' }}>
                    Send Inquiry
                  </button>
                </form>
              </div>

              {/* Info */}
              <div className="contact-info-col">
                <div>
                  <span className="contact-section-label">Find Us</span>
                  <div className="contact-info-block">
                    <p className="contact-info-main">901 Front Street</p>
                    <p className="contact-info-sub">Leavenworth, WA 98826</p>
                  </div>
                  <div className="contact-info-block">
                    <p className="contact-info-main">(509) 548-4535</p>
                    <p className="contact-info-sub">Greg@barenhaus.com</p>
                  </div>

                  <div style={{ marginTop: '1.75rem', paddingTop: '1.75rem', borderTop: '1px solid var(--border)' }}>
                    <span className="contact-section-label">Hours</span>
                    <div className="contact-hours">
                      {[
                        { day: 'Sunday – Thursday', time: '11:00 AM – 10:00 PM' },
                        { day: 'Friday – Saturday', time: '11:00 AM – 11:00 PM' },
                        { day: 'Live Music',        time: 'Fri & Sat, 8–11 PM' },
                      ].map(({ day, time }) => (
                        <div key={day} className="contact-hour-row">
                          <span>{day}</span><span>{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="contact-notes">
                  {[
                    'Walk-ins always welcome for regular dining.',
                    'Large group reservations on non-festival weekends only.',
                    'Handicap accessible · Outdoor seating available.',
                    'Curbside pickup and takeaway offered.',
                  ].map(text => (
                    <p key={text} className="contact-note">
                      <span className="contact-note-dash">—</span>{text}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Map */}
        <div className="map-frame reveal">
          <iframe
            title="Bären Haus on Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2682.8!2d-120.6615!3d47.5962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549a4e5c6b2e7b0b%3A0x1234567890abcdef!2s901%20Front%20St%2C%20Leavenworth%2C%20WA%2098826!5e0!3m2!1sen!2sus!4v1700000000000"
            className="map-embed" loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
