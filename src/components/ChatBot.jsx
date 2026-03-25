import { useState, useRef, useEffect, useCallback } from 'react';

const SUGGESTIONS = [
  "What's on the menu?",
  "Do you have live music?",
  "What are your hours?",
  "How do I book a large group?",
];

/* ── Icons ── */
const ChatIcon = () => (
  <svg width="28" height="28" viewBox="0 0 60 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    {/* Speech bubble with tail at bottom left */}
    <path d="M30 2C14.5 2 2 12.5 2 25.5c0 7.2 3.8 13.6 9.8 17.8L8 48l8.5-2.8c4 1.5 8.6 2.3 13.5 2.3 15.5 0 28-11 28-24S45.5 2 30 2z"/>
    {/* 3 white dots */}
    <circle cx="20" cy="26" r="3.5" fill="white"/>
<circle cx="30" cy="26" r="3.5" fill="white"/>
<circle cx="40" cy="26" r="3.5" fill="white"/>
  </svg>
);

const CloseIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MicIcon = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SpeakerIcon = ({ active }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M11 5L6 9H2v6h4l5 4V5z"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {active
      ? <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      : <path d="M23 9l-6 6M17 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    }
  </svg>
);

/* ── Initial messages ── */
const INIT_MSGS = [
  { role: 'assistant', content: 'Welcome to Bären Haus! Ask me anything — menu, hours, live music, or how to book a large group.' },
];

export default function ChatBot() {
  const [open, setOpen]         = useState(false);
  const [msgs, setMsgs]         = useState(INIT_MSGS);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [unread, setUnread]     = useState(0);
  const [listening, setListening] = useState(false);
  const [ttsActive, setTtsActive] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);

  const bottomRef   = useRef(null);
  const inputRef    = useRef(null);
  const recognRef   = useRef(null);

  /* Check browser support */
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const hasTTS = 'speechSynthesis' in window;
    setVoiceSupported(!!(SpeechRecognition && hasTTS));
  }, []);

  useEffect(() => {
    if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 120); }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, loading]);

  /* ── Send message ── */
  const send = useCallback(async (text) => {
    const t = (text ?? input).trim();
    if (!t || loading) return;
    setInput('');
    const updated = [...msgs, { role: 'user', content: t }];
    setMsgs(updated);
    setLoading(true);
    try {
      const res  = await fetch('https://barenhaus.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated.map(({ role, content }) => ({ role, content })) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error();
      const reply = data.reply || "Sorry, try again!";
      setMsgs(p => [...p, { role: 'assistant', content: reply }]);
      if (!open) setUnread(n => n + 1);
      /* Auto-speak reply if TTS is active */
      if (ttsActive && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(reply);
        utt.rate = 1; utt.pitch = 1; utt.volume = 1;
        window.speechSynthesis.speak(utt);
      }
    } catch {
      setMsgs(p => [...p, { role: 'assistant', content: "Couldn't reach the assistant. Call us at (509) 548-4535!" }]);
    } finally {
      setLoading(false);
    }
  }, [input, msgs, loading, open, ttsActive]);

  /* ── Clear chat ── */
  const clearChat = useCallback(() => {
    window.speechSynthesis?.cancel();
    setMsgs(INIT_MSGS);
    setInput('');
  }, []);

  /* ── Voice input (speech-to-text) ── */
  const toggleListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (listening) {
      recognRef.current?.stop();
      setListening(false);
      return;
    }

    const recog = new SpeechRecognition();
    recog.lang = 'en-US';
    recog.interimResults = false;
    recog.maxAlternatives = 1;

    recog.onstart  = () => setListening(true);
    recog.onend    = () => setListening(false);
    recog.onerror  = () => setListening(false);

    recog.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      /* Auto-send after voice input */
      setTimeout(() => send(transcript), 300);
    };

    recog.start();
    recognRef.current = recog;
  }, [listening, send]);

  /* ── TTS toggle ── */
  const toggleTTS = useCallback(() => {
    if (ttsActive) window.speechSynthesis?.cancel();
    setTtsActive(p => !p);
  }, [ttsActive]);

  const onKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  /* ── Styles ── */
  const s = {
    panel: {
      position: 'fixed', bottom: '5.5rem', right: '1.5rem',
      width: 'min(390px, calc(100vw - 2rem))', maxHeight: '72vh',
      zIndex: 9999, display: 'flex', flexDirection: 'column',
      borderRadius: '20px', overflow: 'hidden',
      border: '1px solid var(--border-md)',
      background: 'linear-gradient(160deg, rgba(8,12,8,0.99), rgba(15,24,15,0.98))',
      backdropFilter: 'blur(32px)', boxShadow: '0 32px 80px rgba(0,0,0,0.9)',
      opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
      transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.96)',
      transition: 'opacity 240ms ease, transform 240ms ease',
      transformOrigin: 'bottom right',
    },
    header: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0.85rem 1.1rem', borderBottom: '1px solid var(--border)',
      background: 'rgba(0,0,0,0.35)', flexShrink: 0, gap: '0.5rem',
    },
    iconBtn: (active) => ({
      background: active ? 'var(--gold-dim)' : 'rgba(255,255,255,0.05)',
      border: `1px solid ${active ? 'var(--border-md)' : 'var(--border)'}`,
      borderRadius: '8px', padding: '0.32rem',
      color: active ? 'var(--gold-lt)' : 'var(--muted)',
      cursor: 'pointer', display: 'flex', alignItems: 'center',
      justifyContent: 'center', transition: 'all 180ms',
      minWidth: 30, minHeight: 30,
    }),
    messages: {
      flex: 1, overflowY: 'auto', padding: '1rem',
      display: 'flex', flexDirection: 'column', gap: '0.75rem',
      scrollbarWidth: 'thin', scrollbarColor: 'var(--border) transparent',
    },
    bubble: (role) => ({
      maxWidth: '82%', padding: '0.65rem 0.95rem',
      borderRadius: role === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
      background: role === 'user'
        ? 'linear-gradient(135deg, var(--gold), var(--gold-lt))'
        : 'rgba(255,255,255,0.06)',
      border: role === 'user' ? 'none' : '1px solid var(--border)',
      color: role === 'user' ? 'var(--bg)' : 'var(--cream)',
      fontFamily: 'var(--font-body)', fontSize: '0.88rem',
      lineHeight: 1.62, fontWeight: role === 'user' ? 500 : 300,
      whiteSpace: 'pre-wrap',
    }),
  };

  return (
    <>
      {/* ── Panel ── */}
      <div role="dialog" aria-label="Bären Haus chat" aria-hidden={!open} style={s.panel}>

        {/* Header */}
        <div style={s.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1, minWidth: 0 }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, var(--gold-lt), var(--gold))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg)',
            }}>
              <ChatIcon />
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 600, color: 'var(--ivory)', whiteSpace: 'nowrap' }}>
                Bären Haus Assistant
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#42e885', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#42e885', display: 'inline-block', flexShrink: 0 }} />
                Online now
              </p>
            </div>
          </div>

          {/* Header action buttons */}
          <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
            {/* TTS toggle */}
            {voiceSupported && (
              <button
                type="button" onClick={toggleTTS}
                style={s.iconBtn(ttsActive)}
                title={ttsActive ? 'Mute voice replies' : 'Speak replies aloud'}
                aria-label={ttsActive ? 'Mute voice' : 'Enable voice'}
              >
                <SpeakerIcon active={ttsActive} />
              </button>
            )}
            {/* Clear chat */}
            <button
              type="button" onClick={clearChat}
              style={s.iconBtn(false)}
              title="Clear conversation"
              aria-label="Clear chat history"
            >
              <TrashIcon />
            </button>
            {/* Close */}
            <button
              type="button" onClick={() => setOpen(false)}
              style={s.iconBtn(false)}
              aria-label="Close chat"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div style={s.messages}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={s.bubble(m.role)}>{m.content}</div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ padding: '0.65rem 0.9rem', borderRadius: '1rem 1rem 1rem 0.25rem', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block', animation: 'bh-pulse 1.2s ease-in-out infinite', animationDelay: `${i*0.2}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {msgs.length === 1 && (
          <div style={{ padding: '0 1rem 0.65rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem', flexShrink: 0 }}>
            {SUGGESTIONS.map(s => (
              <button key={s} type="button" onClick={() => send(s)}
                style={{ padding: '0.3rem 0.75rem', borderRadius: '999px', border: '1px solid var(--border-md)', background: 'var(--gold-dim)', color: 'var(--gold-lt)', fontFamily: 'var(--font-body)', fontSize: '0.72rem', cursor: 'pointer', transition: 'background 160ms' }}
                onMouseEnter={e => e.target.style.background = 'var(--gold-glow)'}
                onMouseLeave={e => e.target.style.background = 'var(--gold-dim)'}
              >{s}</button>
            ))}
          </div>
        )}

        {/* Voice listening indicator */}
        {listening && (
          <div style={{ padding: '0.4rem 1rem', background: 'rgba(196,152,58,0.1)', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block', animation: 'bh-pulse 0.8s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.76rem', color: 'var(--gold-lt)' }}>Listening… speak now</span>
          </div>
        )}

        {/* Input bar */}
        <div style={{ display: 'flex', gap: '0.45rem', padding: '0.75rem 1rem', borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.25)', flexShrink: 0, alignItems: 'flex-end' }}>
          <textarea
            ref={inputRef} rows={1} value={input}
            onChange={e => setInput(e.target.value)} onKeyDown={onKey}
            placeholder={listening ? 'Listening…' : 'Ask about menu, hours, events…'}
            aria-label="Chat message"
            style={{ flex: 1, resize: 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.6rem 0.85rem', color: 'var(--cream)', fontFamily: 'var(--font-body)', fontSize: '0.86rem', outline: 'none', lineHeight: 1.5, maxHeight: 100, overflowY: 'auto', transition: 'border-color 200ms' }}
            onFocus={e => e.target.style.borderColor = 'var(--border-md)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />

          {/* Mic button */}
          {voiceSupported && (
            <button type="button" onClick={toggleListening}
              aria-label={listening ? 'Stop listening' : 'Start voice input'}
              style={{
                width: 38, height: 38, borderRadius: '10px', flexShrink: 0,
                background: listening ? 'linear-gradient(135deg, var(--gold), var(--gold-lt))' : 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border)',
                color: listening ? 'var(--bg)' : 'var(--muted)',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', transition: 'all 200ms',
                animation: listening ? 'bh-pulse 1s ease-in-out infinite' : 'none',
              }}>
              <MicIcon active={listening} />
            </button>
          )}

          {/* Send button */}
          <button type="button" onClick={() => send()}
            disabled={!input.trim() || loading}
            aria-label="Send message"
            style={{
              width: 38, height: 38, borderRadius: '10px', flexShrink: 0,
              background: input.trim() && !loading ? 'linear-gradient(135deg, var(--gold), var(--gold-lt))' : 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border)',
              color: input.trim() && !loading ? 'var(--bg)' : 'rgba(255,255,255,0.25)',
              cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 200ms',
            }}>
            <SendIcon />
          </button>
        </div>
      </div>

      {/* ── Floating bubble ── */}
      <button
        type="button"
        aria-label={open ? 'Close chat' : 'Chat with us'}
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 10000,
          width: 56, height: 56, borderRadius: '50%',
          background: open ? 'rgba(12,18,12,0.98)' : 'linear-gradient(135deg, var(--gold), var(--gold-lt))',
          border: open ? '1px solid var(--border-md)' : 'none',
          boxShadow: open ? 'none' : '0 8px 32px var(--gold-glow)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: open ? 'var(--cream)' : 'var(--bg)',
          transition: 'transform 220ms, background 240ms, box-shadow 220ms',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {open ? <CloseIcon size={18} /> : <ChatIcon />}
        {!open && unread > 0 && (
          <span style={{
            position: 'absolute', top: 2, right: 2,
            width: 18, height: 18, borderRadius: '50%',
            background: '#f87171', color: '#fff', fontSize: '0.62rem',
            fontWeight: 700, display: 'flex', alignItems: 'center',
            justifyContent: 'center', border: '2px solid var(--bg)',
          }}>{unread}</span>
        )}
      </button>

      <style>{`
        @keyframes bh-pulse {
          0%,80%,100% { opacity:.25; transform:scale(.85); }
          40%          { opacity:1;   transform:scale(1);   }
        }
      `}</style>
    </>
  );
}
