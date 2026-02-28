import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  ShieldCheck,
  Factory,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Globe2,
  Shirt,
  BriefcaseBusiness,
  Boxes,
  MapPin,
  Store,
  PencilRuler,
  Settings,
  TrendingUp,
  ClipboardList,
  Files,
  Handshake,
} from 'lucide-react';

/* ─── DATA ─────────────────────────────────────────────────────────────── */
const SPECIALISATIONS = [
  { icon: Shirt, text: 'School uniform manufacturing with consistent fabric and colour control' },
  { icon: BriefcaseBusiness, text: 'Corporate uniform supply for offices, factories, and institutional teams' },
  { icon: Boxes, text: 'Bulk uniform production and distribution with scalable processes' },
  { icon: MapPin, text: 'On-campus uniform camps during admissions and reopening seasons' },
  { icon: Store, text: 'Retail and e-commerce uniform distribution models' },
  { icon: PencilRuler, text: 'Custom design and role-based uniform solutions' },
];

const WHY_CHOOSE = [
  { icon: Settings, title: 'System-Driven', sub: 'Year-on-year operational consistency' },
  { icon: Factory, title: 'In-House Manufacturing', sub: 'Stronger accountability and control' },
  { icon: TrendingUp, title: 'Scalable Production', sub: 'Single and multi-campus rollouts' },
  { icon: ClipboardList, title: 'Less Admin Burden', sub: 'Structured fulfilment models' },
  { icon: Files, title: 'Transparent Processes', sub: 'Tracking and documentation clarity' },
  { icon: Handshake, title: 'Long-Term Partnership', sub: 'Institutions choose us for years' },
];

const QUALITY_POINTS = [
  'Fabric sourcing and standardisation for composition and colour stability',
  'Structured production workflow: pattern, cutting, stitching, finishing',
  'Multi-level quality checks: pre-production, mid-production, final stage',
  'Fit and size consistency through standardised measurement mapping',
  'Timely production planning aligned to academic and corporate cycles',
  'Traceability and accountability through documented production cycles',
];

const STATS = [
  { value: '500+', label: 'Schools Served' },
  { value: '15+', label: 'Years Experience' },
  { value: '98%', label: 'Reorder Rate' },
  { value: '50K+', label: 'Units / Month' },
];

/* Unsplash photos relevant to school/manufacturing/uniform */
const GALLERY = [
  {
    src: '/fabric4.jpg',
    alt: 'School children in uniforms',
  },
  {
    src: '/fabric3.avif',
    alt: 'Fabric manufacturing',
  },
  {
    src: '/fabric2.jpg',
    alt: 'Students at school',
  },
  {
    src: '/fabric1.jpg',
    alt: 'Quality fabric rolls',
  },
];

/* ─── HOOK: IntersectionObserver reveal ────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── ANIMATED COUNTER ──────────────────────────────────────────────────── */
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);
  useEffect(() => {
    if (!visible) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    let start = 0;
    const step = Math.ceil(num / 50);
    const timer = setInterval(() => {
      start = Math.min(start + step, num);
      setCount(start);
      if (start >= num) clearInterval(timer);
    }, 28);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count}{target.replace(/[\d]/g, '')}</span>;
}

/* ─── REVEAL WRAPPER ────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '', style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── CSS ─────────────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .ab-root {
    min-height: 100vh;
    background: #f6f8ff;
    padding-top: 88px;
    font-family: 'Nunito', sans-serif;
    overflow-x: hidden;
  }

  /* ── Hero banner ── */
  .ab-hero {
    position: relative;
    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1d4ed8 100%);
    padding: clamp(56px, 9vw, 110px) clamp(20px, 5vw, 80px) clamp(72px, 11vw, 130px);
    overflow: hidden;
  }
  .ab-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .ab-hero-glow {
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(96,165,250,0.18) 0%, transparent 70%);
    top: -200px; right: -100px;
    pointer-events: none;
  }
  .ab-hero-content { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; }
  .ab-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 14px;
    border-radius: 999px;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2);
    color: #bfdbfe;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 22px;
    backdrop-filter: blur(8px);
  }
  .ab-h1 {
    font-family: 'Baloo 2', cursive;
    font-size: clamp(34px, 5vw, 66px);
    line-height: 1.05;
    color: #fff;
    max-width: 780px;
    margin-bottom: 18px;
  }
  .ab-h1 em { font-style: normal; color: #60a5fa; }
  .ab-hero-sub {
    color: #93c5fd;
    font-size: clamp(14px, 1.4vw, 17px);
    line-height: 1.7;
    font-weight: 600;
    max-width: 600px;
    margin-bottom: 0;
  }

  /* ── Stats strip ── */
  .ab-stats-strip {
    position: relative;
    margin: -36px auto 0;
    max-width: 1100px;
    padding: 0 clamp(16px, 3vw, 40px);
    z-index: 10;
  }
  .ab-stats-inner {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 8px 40px rgba(30,58,138,0.13);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    divide-x: 1px solid #e5edf9;
    overflow: hidden;
  }
  .ab-stat {
    padding: clamp(20px, 3vw, 36px) clamp(12px, 2vw, 28px);
    text-align: center;
    border-right: 1px solid #f0f4ff;
    transition: background 0.2s;
  }
  .ab-stat:last-child { border-right: none; }
  .ab-stat:hover { background: #f6f9ff; }
  .ab-stat-val {
    font-family: 'Baloo 2', cursive;
    font-size: clamp(28px, 3.5vw, 44px);
    font-weight: 900;
    color: #1e3a8a;
    line-height: 1;
    display: block;
    margin-bottom: 6px;
  }
  .ab-stat-lbl {
    color: #64748b;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  /* ── Main content ── */
  .ab-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: clamp(56px, 7vw, 96px) clamp(16px, 3vw, 40px) 64px;
  }

  /* ── Section label ── */
  .ab-sec-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #2563eb;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .ab-sec-label::before {
    content: '';
    width: 20px; height: 2px;
    background: #2563eb;
    border-radius: 2px;
  }

  /* ── About split ── */
  .ab-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    margin-bottom: 72px;
    align-items: center;
  }
  .ab-split-text {}
  .ab-h2 {
    font-family: 'Baloo 2', cursive;
    font-size: clamp(26px, 3vw, 38px);
    color: #1a1a2e;
    line-height: 1.12;
    margin-bottom: 16px;
  }
  .ab-h2 span { color: #2563eb; }
  .ab-body {
    color: #475569;
    font-size: clamp(14px, 1.2vw, 16px);
    line-height: 1.8;
    font-weight: 600;
    margin-bottom: 0;
  }

  /* ── Photo mosaic ── */
  .ab-mosaic {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 200px 200px 200px;
    gap: 12px;
    border-radius: 20px;
    overflow: hidden;
  }
  .ab-mosaic-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.55s cubic-bezier(0.22,1,0.36,1), filter 0.35s ease;
    filter: brightness(0.93) saturate(1.05);
  }
  .ab-mosaic > div { overflow: hidden; }
  .ab-mosaic > div:first-child { grid-row: 1 / 3; grid-column: 1; }
  .ab-mosaic > div:last-child { grid-column: 1 / -1; grid-row: 3 / 4; }
  .ab-mosaic > div:hover .ab-mosaic-img {
    transform: scale(1.07);
    filter: brightness(1) saturate(1.15);
  }

  /* ── Founder strip ── */
  .ab-founders {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 72px;
  }
  .ab-founder-card {
    background: #fff;
    border: 1px solid #e5edf9;
    border-radius: 20px;
    padding: 28px 28px 24px;
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.28s ease, transform 0.28s ease;
    cursor: default;
  }
  .ab-founder-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #1e3a8a, #3b82f6);
    border-radius: 20px 20px 0 0;
    opacity: 0;
    transition: opacity 0.28s ease;
  }
  .ab-founder-card:hover { box-shadow: 0 12px 40px rgba(30,58,138,0.13); transform: translateY(-4px); }
  .ab-founder-card:hover::before { opacity: 1; }
  .ab-founder-avatar {
    width: 54px; height: 54px;
    border-radius: 50%;
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
    color: #1d4ed8;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-bottom: 16px;
  }
  .ab-founder-role {
    color: #2563eb;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 800;
    margin-bottom: 4px;
  }
  .ab-founder-name {
    font-family: 'Baloo 2', cursive;
    font-size: 22px;
    font-weight: 800;
    color: #1e293b;
    margin-bottom: 8px;
  }
  .ab-founder-bio {
    color: #64748b;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.6;
  }

  /* ── Wide card ── */
  .ab-wide-card {
    background: #fff;
    border: 1px solid #e5edf9;
    border-radius: 24px;
    padding: clamp(28px, 4vw, 48px);
    margin-bottom: 28px;
  }
  .ab-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 32px;
    flex-wrap: nowrap;
  }
  .ab-card-icon {
    width: 48px; height: 48px;
    border-radius: 14px;
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    display: flex; align-items: center; justify-content: center;
    color: #2563eb;
    flex-shrink: 0;
  }

  /* ── Specialisations list ── */
  .ab-spec-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }
  .ab-spec-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 16px;
    background: #f8faff;
    border: 1px solid #e6edf9;
    border-radius: 14px;
    transition: all 0.22s ease;
    cursor: default;
  }
  .ab-spec-item:hover {
    background: #eff6ff;
    border-color: #bfdbfe;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(30,58,138,0.08);
  }
  .ab-spec-emoji {
    width: 32px; height: 32px;
    border-radius: 12px;
    background: linear-gradient(135deg, #e0edff 0%, #c7d2fe 100%);
    display: flex; align-items: center; justify-content: center;
    color: #1d4ed8;
    flex-shrink: 0;
  }
  .ab-spec-text { color: #475569; font-size: 13px; font-weight: 700; line-height: 1.5; }

  /* ── Why choose grid ── */
  .ab-why-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .ab-why-card {
    padding: 22px 18px;
    background: #f8faff;
    border: 1px solid #e6edf9;
    border-radius: 16px;
    transition: all 0.25s ease;
    cursor: default;
  }
  .ab-why-card:hover {
    background: linear-gradient(135deg, #eff6ff, #dbeafe);
    border-color: #93c5fd;
    transform: translateY(-3px);
    box-shadow: 0 8px 28px rgba(30,58,138,0.1);
  }
  .ab-why-emoji {
    width: 32px; height: 32px;
    border-radius: 999px;
    background: #eff6ff;
    display: flex; align-items: center; justify-content: center;
    color: #2563eb;
    margin-bottom: 10px;
    flex-shrink: 0;
  }
  .ab-why-title { font-family: 'Baloo 2', cursive; font-size: 16px; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
  .ab-why-sub { color: #64748b; font-size: 12px; font-weight: 700; }

  /* ── Quality list ── */
  .ab-quality-list { display: flex; flex-direction: column; gap: 12px; }
  .ab-quality-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 18px;
    background: #f8faff;
    border: 1px solid #e6edf9;
    border-radius: 14px;
    transition: all 0.22s ease;
    cursor: default;
  }
  .ab-quality-item:hover {
    background: #eff6ff;
    border-color: #bfdbfe;
    transform: translateX(4px);
    box-shadow: 0 4px 16px rgba(30,58,138,0.07);
  }
  .ab-quality-check {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
    display: flex; align-items: center; justify-content: center;
    color: #2563eb;
    flex-shrink: 0;
  }
  .ab-quality-text { color: #475569; font-size: 14px; font-weight: 700; }

  /* Generic list toggle for mobile (specialisations, why-choose, quality) */
  .ab-list-toggle {
    margin-top: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    color: #2563eb;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, transform 0.12s ease;
  }
  .ab-list-toggle:hover {
    background: #eff6ff;
    border-color: #bfdbfe;
    transform: translateY(-1px);
  }

  /* ── CTA ── */
  .ab-cta-block {
    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
    border-radius: 24px;
    padding: clamp(36px, 5vw, 60px) clamp(24px, 4vw, 56px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
    position: relative;
    overflow: hidden;
    margin-top: 60px;
  }
  .ab-cta-block::before {
    content: '';
    position: absolute;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 70%);
    right: -60px; top: -60px;
    pointer-events: none;
  }
  .ab-cta-text { position: relative; }
  .ab-cta-title {
    font-family: 'Baloo 2', cursive;
    font-size: clamp(22px, 2.5vw, 32px);
    color: #fff;
    font-weight: 800;
    margin-bottom: 8px;
  }
  .ab-cta-sub { color: #93c5fd; font-size: 15px; font-weight: 600; }
  .ab-cta-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 26px;
    border-radius: 999px;
    background: linear-gradient(180deg, #1a6bb8 0%, #004C99 50%, #003d7a 100%);
    border: 1px solid rgba(0,76,153,0.6);
    box-shadow: 0 2px 8px rgba(0,76,153,0.25), inset 0 1px 0 rgba(255,255,255,0.15);
    color: #fff;
    font-family: 'Baloo 2', cursive;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .ab-cta-btn:hover {
    filter: brightness(1.04);
    transform: translateY(-1px);
    box-shadow: 0 6px 22px rgba(37,99,235,0.28);
  }
  .ab-cta-btn:active {
    transform: translateY(1px);
    box-shadow: none;
  }

  /* ── Sticky side accent (desktop only) ── */
  @media (min-width: 1200px) {
    .ab-accent-line {
      position: fixed;
      left: 0; top: 30%; bottom: 30%;
      width: 4px;
      background: linear-gradient(to bottom, transparent, #2563eb, transparent);
      border-radius: 4px;
      opacity: 0.22;
      pointer-events: none;
    }
  }

  /* ═══ MOBILE ═══════════════════════════════════════════════════════════ */
  @media (max-width: 767px) {
    .ab-root { padding-top: 72px; }
    .ab-hero { padding: clamp(40px, 8vw, 56px) 16px clamp(56px, 10vw, 72px); }
    .ab-pill { font-size: 10px; padding: 4px 12px; white-space: nowrap; }
    .ab-stats-inner { grid-template-columns: repeat(2, 1fr); }
    .ab-stat { border-right: 1px solid #f0f4ff; border-bottom: 1px solid #f0f4ff; }
    .ab-stat:nth-child(2n) { border-right: none; }
    .ab-stat:nth-child(3), .ab-stat:nth-child(4) { border-bottom: none; }
    .ab-split { grid-template-columns: 1fr; }
    .ab-mosaic { grid-template-columns: 1fr 1fr; grid-template-rows: 160px 160px 160px; }
    .ab-founders { grid-template-columns: 1fr; }
    .ab-spec-grid { grid-template-columns: 1fr 1fr; }
    .ab-why-grid { grid-template-columns: 1fr 1fr; }
    .ab-cta-block { flex-direction: column; text-align: center; }
    .ab-card-header {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 14px;
    }
    .ab-card-header .ab-sec-label { justify-content: center; }
    .ab-card-header .ab-h2 { text-align: center; }
  }
  @media (max-width: 480px) {
    .ab-spec-grid { grid-template-columns: 1fr; }
    .ab-why-grid { grid-template-columns: 1fr; }
    .ab-mosaic { grid-template-columns: 1fr 1fr; grid-template-rows: 150px 140px 140px; }
    .ab-main { padding-left: 14px; padding-right: 14px; }
    .ab-wide-card { padding: 20px 18px; border-radius: 18px; }
    .ab-cta-block { padding: 28px 18px; border-radius: 18px; margin-top: 40px; }
    .ab-cta-btn { width: 100%; justify-content: center; }
  }
`;

/* ─── COMPONENT ──────────────────────────────────────────────────────── */
export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [showAllWhy, setShowAllWhy] = useState(false);
  const [showAllQuality, setShowAllQuality] = useState(false);

  useEffect(() => {
    const update = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth <= 767);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div className="ab-accent-line" />

      <div className="ab-root">
        {/* ══ HERO ═══════════════════════════════════════════════════════ */}
        <div className="ab-hero">
          <div className="ab-hero-glow" />
          <div className="ab-hero-content">
            <div className="ab-pill">
              <Building2 size={11} />
              About Uniform Lab
            </div>
            <h1 className="ab-h1">
              Process-Led Uniform<br />
              Manufacturing for<br />
              <em>Long-Term Reliability</em>
            </h1>
            <p className="ab-hero-sub">
              The Uniform Lab is a system-driven school and corporate uniform manufacturer in Pune,
              built to deliver consistency, quality, and reliability at scale across India.
            </p>
          </div>
        </div>

        {/* ══ STATS ══════════════════════════════════════════════════════ */}
        <Reveal className="ab-stats-strip">
          <div className="ab-stats-inner">
            {STATS.map(({ value, label }) => (
              <div className="ab-stat" key={label}>
                <span className="ab-stat-val">
                  <Counter target={value} />
                </span>
                <span className="ab-stat-lbl">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ══ MAIN ═══════════════════════════════════════════════════════ */}
        <div className="ab-main">

          {/* ── About Us + Photo Mosaic ── */}
          <div className="ab-split" style={{ marginBottom: '72px' }}>
            <Reveal delay={0}>
              <div className="ab-split-text">
                <div className="ab-sec-label">Who We Are</div>
                <h2 className="ab-h2">
                  Built on Systems,<br />
                  <span>Not on Promises</span>
                </h2>
                <p className="ab-body">
                  We specialise in designing, manufacturing, and distributing uniforms for schools,
                  corporates, and institutions. With in-house production capabilities and structured
                  quality control processes, we ensure fabric consistency, fit standardisation, and
                  timely deliveries year after year.
                </p>
                <p className="ab-body" style={{ marginTop: '16px' }}>
                  Our goal is to eliminate uniform-related stress for administrators, parents, and
                  employees — through process, not just promises.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="ab-mosaic">
                {GALLERY.map((img, i) => (
                  <div key={i}>
                    <img className="ab-mosaic-img" src={img.src} alt={img.alt} loading="lazy" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── Mota Group + Founders ── */}
          <Reveal>
            <div className="ab-sec-label">Our Legacy</div>
            <h2 className="ab-h2" style={{ marginBottom: '28px' }}>
              The <span>Mota Group</span> Heritage
            </h2>
          </Reveal>
          <div className="ab-founders" style={{ marginBottom: '72px' }}>
            {[
              {
                icon: Users,
                role: 'Founder',
                name: 'Priyank Mota',
                bio: 'Visionary behind the systems and scale that power The Uniform Lab. Focus on operational integrity, structured processes, and long-term institutional partnerships.',
              },
              {
                icon: Sparkles,
                role: 'Co-Founder',
                name: 'Nivedita Mota',
                bio: 'Champion of experience design and customer-centric clarity. Ensures every interaction — from inquiry to delivery — is seamless and delightful.',
              },
            ].map(({ icon: AvatarIcon, role, name, bio }, i) => (
              <Reveal key={name} delay={i * 0.1}>
                <div className="ab-founder-card">
                  <div className="ab-founder-avatar">
                    <AvatarIcon size={24} strokeWidth={2} />
                  </div>
                  <div className="ab-founder-role">{role}</div>
                  <div className="ab-founder-name">{name}</div>
                  <p className="ab-founder-bio">{bio}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ── Specialisations ── */}
          <Reveal>
            <div className="ab-wide-card">
              <div className="ab-card-header">
                <div>
                  <div className="ab-sec-label">What We Do</div>
                  <h2 className="ab-h2" style={{ marginBottom: 0 }}>Our Specialisations</h2>
                </div>
                <div className="ab-card-icon">
                  <Globe2 size={22} />
                </div>
              </div>
              {(() => {
                const all = SPECIALISATIONS;
                const visible = !isMobile || showAllSpecs ? all : all.slice(0, 3);
                return (
                  <>
                    <div className="ab-spec-grid">
                      {visible.map(({ icon: SpecIcon, text }) => (
                        <div className="ab-spec-item" key={text}>
                          <span className="ab-spec-emoji">
                            <SpecIcon size={18} strokeWidth={2} />
                          </span>
                          <span className="ab-spec-text">{text}</span>
                        </div>
                      ))}
                    </div>
                    {isMobile && all.length > 3 && (
                      <button
                        type="button"
                        className="ab-list-toggle"
                        onClick={() => setShowAllSpecs(v => !v)}
                      >
                        {showAllSpecs ? 'Show less' : 'Show more'}
                      </button>
                    )}
                  </>
                );
              })()}
            </div>
          </Reveal>

          {/* ── Why Choose ── */}
          <Reveal>
            <div className="ab-wide-card">
              <div className="ab-card-header">
                <div>
                  <div className="ab-sec-label">Why Us</div>
                  <h2 className="ab-h2" style={{ marginBottom: 0 }}>
                    Why Choose <span>The Uniform Lab</span>
                  </h2>
                </div>
                <div className="ab-card-icon">
                  <ShieldCheck size={22} />
                </div>
              </div>
              {(() => {
                const all = WHY_CHOOSE;
                const visible = !isMobile || showAllWhy ? all : all.slice(0, 3);
                return (
                  <>
                    <div className="ab-why-grid">
                      {visible.map(({ icon: WhyIcon, title, sub }) => (
                        <div className="ab-why-card" key={title}>
                          <span className="ab-why-emoji">
                            <WhyIcon size={18} strokeWidth={2} />
                          </span>
                          <div className="ab-why-title">{title}</div>
                          <div className="ab-why-sub">{sub}</div>
                        </div>
                      ))}
                    </div>
                    {isMobile && all.length > 3 && (
                      <button
                        type="button"
                        className="ab-list-toggle"
                        onClick={() => setShowAllWhy(v => !v)}
                      >
                        {showAllWhy ? 'Show less' : 'Show more'}
                      </button>
                    )}
                  </>
                );
              })()}
            </div>
          </Reveal>

          {/* ── Quality Control ── */}
          <Reveal>
            <div className="ab-wide-card" id="quality-control">
              <div className="ab-card-header">
                <div>
                  <div className="ab-sec-label">Quality Assurance</div>
                  <h2 className="ab-h2" style={{ marginBottom: 0 }}>
                    Manufacturing &amp; <span>Quality Control</span>
                  </h2>
                </div>
                <div className="ab-card-icon">
                  <Factory size={22} />
                </div>
              </div>
              {(() => {
                const all = QUALITY_POINTS;
                const visible = !isMobile || showAllQuality ? all : all.slice(0, 3);
                return (
                  <>
                    <div className="ab-quality-list">
                      {visible.map((item) => (
                        <div className="ab-quality-item" key={item}>
                          <div className="ab-quality-check">
                            <CheckCircle2 size={14} strokeWidth={2.5} />
                          </div>
                          <span className="ab-quality-text">{item}</span>
                        </div>
                      ))}
                    </div>
                    {isMobile && all.length > 3 && (
                      <button
                        type="button"
                        className="ab-list-toggle"
                        onClick={() => setShowAllQuality(v => !v)}
                      >
                        {showAllQuality ? 'Show less' : 'Show more'}
                      </button>
                    )}
                  </>
                );
              })()}
              <Link
                to="/faqs"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 28,
                  color: '#2563eb',
                  fontWeight: 800,
                  fontSize: 14,
                  textDecoration: 'none',
                  transition: 'gap 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.gap = '12px'}
                onMouseLeave={e => e.currentTarget.style.gap = '8px'}
              >
                Explore all FAQs
                <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>

          {/* ── CTA ── */}
          <Reveal>
            <div className="ab-cta-block">
              <div className="ab-cta-text">
                <div className="ab-cta-title">Ready to Partner with Us?</div>
                <p className="ab-cta-sub">Join 500+ schools that trust The Uniform Lab year after year.</p>
              </div>
              <Link to="/schoolenquiry" className="ab-cta-btn">
                Start an Enquiry
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

        </div>
      </div>
    </>
  );
}