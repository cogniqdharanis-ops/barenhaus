import { useState, useRef, useEffect } from 'react';

const SUGGESTIONS = ["What's on the menu?", "Do you have live music?", "What are your hours?", "How do I book a large group?"];

export default function ChatBot() {
  const [open, setOpen]       = useState(false);
  const [msgs, setMsgs]       = useState([{ role: 'assistant', content: "Willkommen! 🐻 Welcome to Bären Haus. Ask me anything — menu, hours, live music, or how to book a large group!" }]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread]   = useState(0);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => { if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 120); } }, [open]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, loading]);

  async function send(text) {
    const t = (text ?? input).trim();
    if (!t || loading) return;
    setInput('');
    const updated = [...msgs, { role: 'user', content: t }];
    setMsgs(updated);
    setLoading(true);
    try {
      const res  = await fetch('https://barenhaus.onrender.com/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: updated.map(({ role, content }) => ({ role, content })) }) });
      const data = await res.json();
      if (!res.ok) throw new Error();
      setMsgs(p => [...p, { role: 'assistant', content: data.reply }]);
      if (!open) setUnread(n => n + 1);
    } catch {
      setMsgs(p => [...p, { role: 'assistant', content: "Couldn't reach the assistant. Call us at (509) 548-4535!" }]);
    } finally { setLoading(false); }
  }

  const onKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  const panelStyle = {
    position: 'fixed', bottom: '5.5rem', right: '1.5rem',
    width: 'min(380px, calc(100vw - 2rem))', maxHeight: '70vh', zIndex: 9999,
    display: 'flex', flexDirection: 'column', borderRadius: '18px', overflow: 'hidden',
    border: '1px solid var(--border-md)',
    background: 'linear-gradient(160deg, rgba(8,12,8,0.99), rgba(15,24,15,0.98))',
    backdropFilter: 'blur(32px)', boxShadow: '0 32px 80px rgba(0,0,0,0.9)',
    opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
    transform: open ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.97)',
    transition: 'opacity 240ms ease, transform 240ms ease', transformOrigin: 'bottom right',
  };

  return (
    <>
      <div role="dialog" aria-label="Bären Haus chat assistant" aria-hidden={!open} style={panelStyle}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 1.1rem', borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.3)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-lt), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>🐻</div>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--ivory)' }}>Bären Haus Assistant</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: '#42e885', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#42e885', display: 'inline-block' }} />Online now
              </p>
            </div>
          </div>
          <button type="button" onClick={() => setOpen(false)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.3rem 0.55rem', color: 'var(--muted)', fontSize: '0.85rem', cursor: 'pointer' }}>✕</button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', scrollbarWidth: 'thin', scrollbarColor: 'var(--border) transparent' }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '82%', padding: '0.65rem 0.9rem',
                borderRadius: m.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                background: m.role === 'user' ? 'linear-gradient(135deg, var(--gold), var(--gold-lt))' : 'rgba(255,255,255,0.06)',
                border: m.role === 'user' ? 'none' : '1px solid var(--border)',
                color: m.role === 'user' ? 'var(--bg)' : 'var(--cream)',
                fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.6,
                fontWeight: m.role === 'user' ? 500 : 300, whiteSpace: 'pre-wrap',
              }}>{m.content}</div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ padding: '0.65rem 0.9rem', borderRadius: '1rem 1rem 1rem 0.25rem', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                {[0,1,2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block', animation: 'bh-pulse 1.2s ease-in-out infinite', animationDelay: `${i*0.2}s` }} />)}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {msgs.length === 1 && (
          <div style={{ padding: '0 1rem 0.65rem', display: 'flex', flexWrap: 'wrap', gap: '0.45rem', flexShrink: 0 }}>
            {SUGGESTIONS.map(s => (
              <button key={s} type="button" onClick={() => send(s)} style={{ padding: '0.32rem 0.8rem', borderRadius: '999px', border: '1px solid var(--border-md)', background: 'var(--gold-dim)', color: 'var(--gold-lt)', fontFamily: 'var(--font-body)', fontSize: '0.74rem', cursor: 'pointer', transition: 'background 160ms' }}
                onMouseEnter={e => e.target.style.background = 'var(--gold-glow)'}
                onMouseLeave={e => e.target.style.background = 'var(--gold-dim)'}
              >{s}</button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{ display: 'flex', gap: '0.5rem', padding: '0.8rem 1rem', borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.25)', flexShrink: 0 }}>
          <textarea ref={inputRef} rows={1} value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey}
            placeholder="Ask about menu, hours, events..."
            style={{ flex: 1, resize: 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.6rem 0.9rem', color: 'var(--cream)', fontFamily: 'var(--font-body)', fontSize: '0.86rem', outline: 'none', lineHeight: 1.5, maxHeight: 100, overflowY: 'auto' }}
          />
          <button type="button" onClick={() => send()} disabled={!input.trim() || loading} style={{ alignSelf: 'flex-end', width: 38, height: 38, borderRadius: '10px', background: input.trim() && !loading ? 'linear-gradient(135deg, var(--gold), var(--gold-lt))' : 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', color: input.trim() && !loading ? 'var(--bg)' : 'rgba(255,255,255,0.3)', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 700, flexShrink: 0, transition: 'all 200ms' }}>↑</button>
        </div>
      </div>

      {/* Bubble */}
      <button type="button" aria-label={open ? 'Close chat' : 'Open chat'} onClick={() => setOpen(o => !o)} style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 10000, width: 56, height: 56, borderRadius: '50%', background: open ? 'rgba(15,24,15,0.98)' : 'linear-gradient(135deg, var(--gold), var(--gold-lt))', border: open ? '1px solid var(--border-md)' : 'none', boxShadow: open ? 'none' : '0 8px 32px var(--gold-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', cursor: 'pointer', transition: 'transform 220ms, background 240ms', color: open ? 'var(--cream)' : 'var(--bg)' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {open ? '✕' : '🐻'}
        {!open && unread > 0 && <span style={{ position: 'absolute', top: 2, right: 2, width: 18, height: 18, borderRadius: '50%', background: '#f87171', color: '#fff', fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--bg)' }}>{unread}</span>}
      </button>

      <style>{`@keyframes bh-pulse { 0%,80%,100%{opacity:.25;transform:scale(.85)} 40%{opacity:1;transform:scale(1)} }`}</style>
    </>
  );
}
