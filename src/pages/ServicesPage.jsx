import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Building2, BriefcaseBusiness, Boxes, Truck, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

/* ─── DATA ──────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: Building2,
    emoji: '🏫',
    accent: '#2563eb',
    accentLight: '#dbeafe',
    accentBg: '#eff6ff',
    title: 'School Uniform Manufacturing',
    description: 'End-to-end uniform manufacturing tailored to your school\'s identity — from design to delivery.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=80',
    points: [
      'Custom uniform design aligned with school identity',
      'Fabric sourcing with colour stability control',
      'Standardised size charts and fit consistency',
      'Bulk production planning aligned with academic calendars',
      'Admission-season uniform readiness',
    ],
  },
  {
    icon: BriefcaseBusiness,
    emoji: '🏢',
    accent: '#0ea5e9',
    accentLight: '#bae6fd',
    accentBg: '#f0f9ff',
    title: 'Corporate Uniform Solutions',
    description: 'Professional, role-based uniforms built for scalability, durability, and brand consistency.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=700&q=80',
    points: [
      'Role-based uniform design',
      'Logo embroidery and branding',
      'Durable fabric selection for industrial environments',
      'Scalable production for multi-location teams',
      'Structured bulk order management',
    ],
  },
  {
    icon: Boxes,
    emoji: '📦',
    accent: '#7c3aed',
    accentLight: '#ddd6fe',
    accentBg: '#f5f3ff',
    title: 'Bulk Uniform Manufacturing',
    description: 'High-volume production with tight consistency controls and on-time dispatch — every batch, every time.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=700&q=80',
    points: [
      'Centralised production planning',
      'Batch consistency control',
      'Quality checks at multiple stages',
      'Timely bulk dispatch',
      'Predictable output for institutional operations',
    ],
  },
  {
    icon: Truck,
    emoji: '🚚',
    accent: '#059669',
    accentLight: '#a7f3d0',
    accentBg: '#ecfdf5',
    title: 'Distribution & Fulfilment Models',
    description: 'Flexible, zero-hassle fulfilment — from on-campus camps to e-commerce ordering for parents.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80',
    points: [
      'On-campus uniform camps during admissions and reopening',
      'Retail store support for direct purchases',
      'E-commerce ordering for parents and employees',
      'Structured corporate dispatch models',
      'Reduced administrative burden for institutions',
    ],
  },
];

/* ─── HOOK ───────────────────────────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '', style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.65s ease ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── CSS ────────────────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .sv-root {
    min-height: 100vh;
    background: #f6f8ff;
    padding-top: 88px;
    font-family: 'Nunito', sans-serif;
    overflow-x: hidden;
  }

  /* ── Hero ── */
  .sv-hero {
    position: relative;
    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #2563eb 100%);
    padding: clamp(52px, 9vw, 108px) clamp(20px, 5vw, 80px) clamp(80px, 13vw, 150px);
    overflow: hidden;
    text-align: center;
  }
  .sv-hero-bg {
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 60% 55% at 15% 50%, rgba(96,165,250,0.13) 0%, transparent 70%),
      radial-gradient(ellipse 50% 60% at 85% 30%, rgba(167,139,250,0.1) 0%, transparent 65%);
  }
  .sv-hero-dots {
    position: absolute; inset: 0; pointer-events: none;
    background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 28px 28px;
  }
  .sv-hero-inner { position: relative; z-index: 1; max-width: 820px; margin: 0 auto; }
  .sv-pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 16px; border-radius: 999px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.18);
    color: #bfdbfe; font-size: 11px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    margin-bottom: 22px; backdrop-filter: blur(8px);
  }
  .sv-h1 {
    font-family: 'Baloo 2', cursive;
    font-size: clamp(32px, 5vw, 62px);
    line-height: 1.06; color: #fff;
    margin: 0 0 18px;
  }
  .sv-h1 em { font-style: normal; color: #93c5fd; }
  .sv-hero-sub {
    color: #93c5fd; font-size: clamp(14px, 1.4vw, 17px);
    font-weight: 600; line-height: 1.7;
    max-width: 620px; margin: 0 auto;
  }

  /* ── Services grid ── */
  .sv-main {
    max-width: 1200px; margin: 0 auto;
    padding: 0 clamp(16px, 3vw, 40px) 80px;
    margin-top: -52px; position: relative; z-index: 5;
  }

  /* ── Service card (horizontal split) ── */
  .sv-card {
    background: #fff;
    border: 1px solid #e5edf9;
    border-radius: 24px;
    margin-bottom: 24px;
    display: grid;
    grid-template-columns: 1fr 1.15fr;
    overflow: hidden;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    position: relative;
  }
  .sv-card:hover {
    box-shadow: 0 20px 60px rgba(30,58,138,0.13);
    transform: translateY(-4px);
  }
  .sv-card:nth-child(even) { grid-template-columns: 1.15fr 1fr; }
  .sv-card:nth-child(even) .sv-card-img-wrap { order: 1; }
  .sv-card:nth-child(even) .sv-card-body { order: 2; }

  /* ── Card image side ── */
  .sv-card-img-wrap {
    position: relative;
    overflow: hidden;
    min-height: 300px;
  }
  .sv-card-img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    transition: transform 0.65s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease;
    filter: brightness(0.88) saturate(1.1);
  }
  .sv-card:hover .sv-card-img {
    transform: scale(1.07);
    filter: brightness(0.95) saturate(1.2);
  }
  .sv-card-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(15,23,42,0.35) 0%, transparent 60%);
    pointer-events: none;
  }
  .sv-card-img-badge {
    position: absolute; top: 20px; left: 20px;
    width: 48px; height: 48px; border-radius: 14px;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
  }

  /* ── Card body side ── */
  .sv-card-body {
    padding: clamp(28px, 4vw, 48px);
    display: flex; flex-direction: column; justify-content: center;
  }
  .sv-card-label {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 10px; font-weight: 800; letter-spacing: 0.14em;
    text-transform: uppercase; margin-bottom: 12px;
  }
  .sv-card-label::before {
    content: ''; width: 18px; height: 2px; border-radius: 2px;
  }
  .sv-card-h2 {
    font-family: 'Baloo 2', cursive;
    font-size: clamp(20px, 2.2vw, 28px);
    font-weight: 800; color: #1e293b;
    line-height: 1.18; margin: 0 0 10px;
  }
  .sv-card-desc {
    color: #64748b; font-size: 14px; font-weight: 600;
    line-height: 1.7; margin: 0 0 22px;
  }
  .sv-points { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 9px; }
  .sv-point {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 11px 14px;
    border-radius: 12px; border: 1px solid #f1f5f9;
    background: #f9fbff;
    transition: all 0.22s ease;
    cursor: default;
  }
  .sv-point:hover {
    border-color: var(--sv-accent-light);
    background: var(--sv-accent-bg);
    transform: translateX(4px);
  }
  .sv-point-icon {
    width: 20px; height: 20px; flex-shrink: 0; margin-top: 1px;
  }
  .sv-point-text { color: #475569; font-size: 13px; font-weight: 700; line-height: 1.5; }

  /* ── Bottom CTA ── */
  .sv-cta {
    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
    border-radius: 24px;
    padding: clamp(36px, 5vw, 64px) clamp(24px, 4vw, 56px);
    text-align: center;
    position: relative; overflow: hidden;
    margin-top: 12px;
  }
  .sv-cta::before {
    content: '';
    position: absolute;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%);
    left: 50%; top: 50%; transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .sv-cta-inner { position: relative; z-index: 1; }
  .sv-cta-pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px; border-radius: 999px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.15);
    color: #93c5fd; font-size: 11px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    margin-bottom: 18px; backdrop-filter: blur(8px);
  }
  .sv-cta-title {
    font-family: 'Baloo 2', cursive;
    font-size: clamp(24px, 3vw, 38px);
    color: #fff; font-weight: 900;
    margin: 0 0 12px;
  }
  .sv-cta-sub { color: #93c5fd; font-size: 15px; font-weight: 600; margin: 0 0 32px; }
  .sv-cta-btns { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }
  .sv-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px; border-radius: 14px;
    background: #fff; color: #1e3a8a;
    font-family: 'Baloo 2', cursive; font-size: 15px; font-weight: 800;
    text-decoration: none;
    transition: all 0.22s ease;
  }
  .sv-btn-primary:hover { background: #dbeafe; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.2); }
  .sv-btn-secondary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px; border-radius: 14px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    color: #fff;
    font-family: 'Baloo 2', cursive; font-size: 15px; font-weight: 800;
    text-decoration: none; backdrop-filter: blur(8px);
    transition: all 0.22s ease;
  }
  .sv-btn-secondary:hover { background: rgba(255,255,255,0.18); transform: translateY(-2px); }

  /* ═══ MOBILE ════════════════════════════════════════════════════════════ */
  @media (max-width: 767px) {
    .sv-root { padding-top: 70px; }
    .sv-main { margin-top: -36px; }
    .sv-card {
      grid-template-columns: 1fr !important;
    }
    .sv-card:nth-child(even) .sv-card-img-wrap { order: 0 !important; }
    .sv-card:nth-child(even) .sv-card-body { order: 1 !important; }
    .sv-card-img-wrap { min-height: 220px; }
    .sv-card-body { padding: 24px 20px; }
    .sv-cta-btns { flex-direction: column; align-items: stretch; }
    .sv-btn-primary, .sv-btn-secondary { justify-content: center; }
  }
  @media (max-width: 480px) {
    .sv-card-img-wrap { min-height: 180px; }
    .sv-card-h2 { font-size: 20px; }
  }
`;

/* ─── COMPONENT ─────────────────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <>
      <style>{CSS}</style>

      <div className="sv-root">

        {/* ══ HERO ══════════════════════════════════════════════════════ */}
        <div className="sv-hero">
          <div className="sv-hero-bg" />
          <div className="sv-hero-dots" />
          <div className="sv-hero-inner">
            <div className="sv-pill">
              <Settings size={11} />
              Our Services
            </div>
            <h1 className="sv-h1">
              End-to-End Uniform<br />
              <em>Manufacturing &amp; Distribution</em>
            </h1>
            <p className="sv-hero-sub">
              Complete services for schools, corporates, and institutions — built for consistency,
              scalability, and operational ease.
            </p>
          </div>
        </div>

        {/* ══ CARDS ══════════════════════════════════════════════════════ */}
        <div className="sv-main">
          {SERVICES.map(({ icon: Icon, emoji, accent, accentLight, accentBg, title, description, image, points }, i) => (
            <Reveal key={title} delay={0.05}>
              <article
                className="sv-card"
                style={{ '--sv-accent': accent, '--sv-accent-light': accentLight, '--sv-accent-bg': accentBg }}
              >
                {/* Image */}
                <div className="sv-card-img-wrap">
                  <img className="sv-card-img" src={image} alt={title} loading="lazy" />
                  <div className="sv-card-img-overlay" />
                  <div className="sv-card-img-badge">{emoji}</div>
                </div>

                {/* Body */}
                <div className="sv-card-body">
                  <div
                    className="sv-card-label"
                    style={{ color: accent, '--before-bg': accent }}
                  >
                    <span style={{ display: 'inline-block', width: 18, height: 2, background: accent, borderRadius: 2, marginRight: 6 }} />
                    {['School', 'Corporate', 'Bulk', 'Distribution'][i]}
                  </div>
                  <h2 className="sv-card-h2">{title}</h2>
                  <p className="sv-card-desc">{description}</p>
                  <ul className="sv-points">
                    {points.map((point, j) => (
                      <li className="sv-point" key={point}>
                        <CheckCircle2
                          className="sv-point-icon"
                          size={16}
                          strokeWidth={2.5}
                          style={{ color: accent, flexShrink: 0, marginTop: 2 }}
                        />
                        <span className="sv-point-text">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}

          {/* ══ CTA ══════════════════════════════════════════════════════ */}
          <Reveal delay={0.05}>
            <div className="sv-cta">
              <div className="sv-cta-inner">
                <div className="sv-cta-pill">
                  <Sparkles size={11} />
                  Get Started
                </div>
                <h2 className="sv-cta-title">Ready to Simplify Your Uniform Operations?</h2>
                <p className="sv-cta-sub">
                  Join 500+ schools and institutions that trust The Uniform Lab for consistent, on-time delivery.
                </p>
                <div className="sv-cta-btns">
                  <Link to="/schoolenquiry" className="sv-btn-primary">
                    Partner with Us
                    <ArrowRight size={16} />
                  </Link>
                  <Link to="/schools" className="sv-btn-secondary">
                    Browse Schools
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}