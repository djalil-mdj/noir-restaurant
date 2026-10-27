import { useEffect, useRef, useState } from 'react'

/* ---------- Demo content (fictional) ---------- */
const MENU = {
  Starters: [
    ['Charred leek, burnt butter', 'Smoked hazelnut, aged vinegar, chive oil', 18],
    ['Cured sea bream', 'Pickled green plum, cucumber water, shiso', 22],
    ['Beef tartare', 'Black garlic, rye crisp, egg yolk', 21],
  ],
  'Main Courses': [
    ['Duck, two ways', 'Breast and confit leg, cherry, fennel pollen', 44],
    ['Line-caught turbot', 'Beurre blanc, sea herbs, brown shrimp', 48],
    ['Celeriac in ash', 'Mushroom jus, walnut, preserved lemon', 34],
  ],
  Desserts: [
    ['Dark chocolate sphere', 'Salted caramel, cocoa nib, warm sauce', 17],
    ['Burnt honey tart', 'Crème fraîche, bee pollen', 15],
    ['Pear and cardamom', 'Poached pear, brown butter ice cream', 16],
  ],
  Drinks: [
    ['Noir Negroni', 'Barrel-aged, smoked orange', 16],
    ['Smoked old fashioned', 'Rye, bronze bitters, cedar smoke', 18],
    ['Cold-brew tonic (0%)', 'Hibiscus, juniper, bitter orange', 11],
  ],
}
const SIGNATURES = [
  { n: 'Duck, two ways', d: 'Rendered for 48 hours, finished over cherry wood.', p: 44, c: '#7a2e2a' },
  { n: 'Line-caught turbot', d: 'A pale, glossy sauce and the sea herbs it grew beside.', p: 48, c: '#a89a7a' },
  { n: 'Dark chocolate sphere', d: 'Warm caramel melts through at the table.', p: 17, c: '#3b2a20' },
]
const GALLERY = [
  ['The dining room', '#2a2218'], ['Plating at the pass', '#3a2c1c'], ['The bar', '#1e1a15'],
  ['Cherry wood fire', '#4a2a1e'], ['Chef’s counter', '#2d2a22'], ['Late service', '#241d16'],
]
const REVIEWS = [
  ['“Every course arrived like a small, quiet performance.”', 'Sample reviewer A'],
  ['“Dark, warm and precise. We stayed until they dimmed the lights.”', 'Sample reviewer B'],
  ['“The turbot alone is worth the trip.”', 'Sample reviewer C'],
]
const NAV = ['Story', 'Dishes', 'Menu', 'Experience', 'Gallery', 'Visit']

/* ---------- Helpers ---------- */
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (reduced()) return setOn(true)
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.15 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${on ? 'in' : ''} ${className}`}>{children}</div>
}

/* Illustrated plate drawn in SVG: stands in for photography. */
function Plate({ color = '#7a2e2a', size = 420 }) {
  return (
    <svg viewBox="0 0 400 400" width={size} height={size} role="img" aria-label="Illustration of a plated dish">
      <defs>
        <radialGradient id="pg" cx="40%" cy="35%"><stop offset="0" stopColor="#f6efe0" /><stop offset="1" stopColor="#b9ad97" /></radialGradient>
        <radialGradient id="fg" cx="40%" cy="35%"><stop offset="0" stopColor={color} /><stop offset="1" stopColor="#1a120d" /></radialGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(#pg)" />
      <circle cx="200" cy="200" r="150" fill="none" stroke="#00000022" strokeWidth="2" />
      <ellipse cx="205" cy="205" rx="82" ry="62" fill="url(#fg)" transform="rotate(-18 205 205)" />
      <path d="M95 255 Q150 225 190 262" stroke="#b08a57" strokeWidth="6" fill="none" strokeLinecap="round" />
      {[[270, 140], [300, 175], [140, 140], [250, 285]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={6 + i} fill="#5c7a4a" />)}
      {[[120, 190], [290, 240], [175, 120]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="#b08a57" />)}
    </svg>
  )
}

/* Mouse-responsive 3D tilt with layered depth (CSS 3D, no WebGL needed). */
function Tilt({ children }) {
  const ref = useRef(null)
  const move = (e) => {
    if (reduced() || e.pointerType === 'touch') return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`
  }
  const leave = () => (ref.current.style.transform = '')
  return <div className="tilt-wrap" onPointerMove={move} onPointerLeave={leave}><div ref={ref} className="tilt">{children}</div></div>
}

/* ---------- Sections ---------- */
function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="header">
      <a href="#top" className="logo">NOIR</a>
      <nav className={open ? 'open' : ''} aria-label="Primary">
        {NAV.map((n) => <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)}>{n}</a>)}
      </nav>
      <a href="#reserve" className="btn small">Reserve</a>
      <button className="burger" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-text">
        <h1><span>An artful</span><span>approach</span><span className="it">to dining.</span></h1>
        <p>Contemporary cooking over open fire, plated like paintings and served in a room lit by candle and ember.</p>
        <div className="cta">
          <a className="btn" href="#menu">Explore our menu</a>
          <a className="btn ghost" href="#reserve">Reserve a table</a>
        </div>
        <p className="meta">Tue–Sun, 18:00–23:00 · 14 Ember Lane, Fictional City</p>
      </div>
      <Tilt>
        <div className="layer ring" />
        <div className="layer plate"><Plate size={460} /></div>
        <div className="layer herb h1" /><div className="layer herb h2" />
      </Tilt>
    </section>
  )
}

function Story() {
  return (
    <section id="story" className="section story">
      <Reveal><h2>We cook with fire, patience and very few ingredients.</h2></Reveal>
      <Reveal className="story-body">
        <p>NOIR opened around a single idea: that a plate should be quiet enough to taste. Ingredients come from growers within a day’s drive, and nothing leaves the kitchen that Chef Lena Arden would not serve her own family.</p>
        <p>The room is dark on purpose. Candlelight, walnut and bronze keep your attention on the table.</p>
      </Reveal>
    </section>
  )
}

function Signatures() {
  return (
    <section id="dishes" className="section">
      <Reveal><h2>Signature dishes</h2></Reveal>
      {SIGNATURES.map((s, i) => (
        <Reveal key={s.n} className={`sig ${i % 2 ? 'flip' : ''}`}>
          <div className="sig-img"><Plate color={s.c} size={320} /></div>
          <div><h3>{s.n}</h3><p>{s.d}</p><span className="price">${s.p}</span></div>
        </Reveal>
      ))}
    </section>
  )
}

function Menu() {
  const cats = Object.keys(MENU)
  const [cat, setCat] = useState(cats[0])
  return (
    <section id="menu" className="section menu">
      <Reveal><h2>The menu</h2><p className="note">Sample demo menu. NOIR is a fictional restaurant.</p></Reveal>
      <div role="tablist" aria-label="Menu categories" className="tabs">
        {cats.map((c) => <button key={c} role="tab" aria-selected={c === cat} className={c === cat ? 'active' : ''} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      <ul key={cat} className="items" role="tabpanel">
        {MENU[cat].map(([n, d, p]) => (
          <li key={n}><div><h3>{n}</h3><p>{d}</p></div><span className="price">${p}</span></li>
        ))}
      </ul>
    </section>
  )
}

function Experience() {
  const items = [['Ingredients', 'Dry-aged meats, line-caught fish and vegetables picked that morning.'], ['Craft', 'Every sauce is built from bones, shells and peels we already have.'], ['Atmosphere', 'Forty seats, one fire, no screens and no rush.']]
  return (
    <section id="experience" className="section exp">
      <Reveal><h2>The experience</h2></Reveal>
      <div className="exp-grid">
        {items.map(([t, d], i) => <Reveal key={t} className={`exp-item e${i}`}><h3>{t}</h3><p>{d}</p></Reveal>)}
      </div>
    </section>
  )
}

function Gallery() {
  const [sel, setSel] = useState(null)
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && setSel(null)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])
  return (
    <section id="gallery" className="section">
      <Reveal><h2>Gallery</h2><p className="note">Placeholder tiles: replace with your own photography.</p></Reveal>
      <div className="gallery">
        {GALLERY.map(([t, c], i) => (
          <button key={t} className={`tile t${i}`} style={{ '--c': c }} onClick={() => setSel(i)} aria-label={`Open ${t}`}><span>{t}</span></button>
        ))}
      </div>
      {sel !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={GALLERY[sel][0]} onClick={() => setSel(null)}>
          <div className="lb-card" style={{ '--c': GALLERY[sel][1] }} onClick={(e) => e.stopPropagation()}>
            <h3>{GALLERY[sel][0]}</h3>
            <div className="lb-nav">
              <button className="btn ghost small" onClick={() => setSel((sel + GALLERY.length - 1) % GALLERY.length)}>Previous</button>
              <button className="btn ghost small" onClick={() => setSel((sel + 1) % GALLERY.length)}>Next</button>
              <button className="btn small" autoFocus onClick={() => setSel(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function Reviews() {
  return (
    <section className="section reviews">
      <Reveal><h2>Kind words</h2><p className="note">Fictional sample testimonials.</p></Reveal>
      <div className="rev-grid">{REVIEWS.map(([q, a]) => <Reveal key={a}><blockquote>{q}<cite>{a}</cite></blockquote></Reveal>)}</div>
    </section>
  )
}

function Reserve() {
  const [f, setF] = useState({ name: '', email: '', date: '', time: '19:00', size: '2' })
  const [err, setErr] = useState({})
  const [state, setState] = useState('idle')
  const today = new Date().toISOString().slice(0, 10)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const x = {}
    if (f.name.trim().length < 2) x.name = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Enter a valid email address.'
    if (!f.date || f.date < today) x.date = 'Choose a date from today onward.'
    setErr(x)
    if (Object.keys(x).length) return
    setState('loading')
    setTimeout(() => setState('done'), 1200) // simulated: no backend
  }
  return (
    <section id="reserve" className="section reserve">
      <Reveal><h2>Reserve a table</h2><p className="note">Demo only. Nothing is sent or saved.</p></Reveal>
      {state === 'done' ? (
        <div className="success" role="status">
          <h3>Table simulated for {f.size} on {f.date} at {f.time}.</h3>
          <p>Thanks, {f.name}. This is a portfolio demo, so no real booking exists.</p>
          <button className="btn ghost" onClick={() => setState('idle')}>Make another</button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          {[['name', 'Full name', 'text'], ['email', 'Email', 'email'], ['date', 'Date', 'date']].map(([k, l, t]) => (
            <label key={k}>{l}
              <input type={t} value={f[k]} min={k === 'date' ? today : undefined} onChange={set(k)} aria-invalid={!!err[k]} aria-describedby={`${k}-e`} />
              <small id={`${k}-e`} className="err">{err[k]}</small>
            </label>
          ))}
          <label>Time
            <select value={f.time} onChange={set('time')}>{['18:00', '19:00', '20:00', '21:00', '22:00'].map((t) => <option key={t}>{t}</option>)}</select>
          </label>
          <label>Guests
            <select value={f.size} onChange={set('size')}>{[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n}>{n}</option>)}</select>
          </label>
          <button className="btn" disabled={state === 'loading'}>{state === 'loading' ? 'Simulating…' : 'Request table'}</button>
        </form>
      )}
    </section>
  )
}

function Visit() {
  return (
    <section id="visit" className="section visit">
      <Reveal><h2>Visit</h2><p className="note">Fictional business details.</p></Reveal>
      <div className="visit-grid">
        <div><h3>Address</h3><p>14 Ember Lane<br />Fictional City, 00000</p><h3>Contact</h3><p>hello@noir.example<br />+00 000 000 0000</p></div>
        <div><h3>Hours</h3><p>Tue–Thu 18:00–22:00<br />Fri–Sat 18:00–23:00<br />Sun 17:00–21:00<br />Closed Monday</p></div>
        <div className="map" role="img" aria-label="Map placeholder"><span>Map placeholder</span></div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="big">NOIR</div>
      <nav aria-label="Footer">{NAV.map((n) => <a key={n} href={`#${n.toLowerCase()}`}>{n}</a>)}</nav>
      <p>Tue–Sun, evenings · Social: Instagram, Facebook (placeholders)</p>
      <p className="note">Portfolio demo. NOIR is not a real business.</p>
    </footer>
  )
}

export default function App() {
  return (<><a className="skip" href="#story">Skip to content</a><Header /><main><Hero /><Story /><Signatures /><Menu /><Experience /><Gallery /><Reviews /><Reserve /><Visit /></main><Footer /></>)
}
