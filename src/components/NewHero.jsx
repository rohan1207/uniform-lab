import React from 'react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────────────────────────────────
   GLOBAL STYLES
────────────────────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700&display=swap');

  /* ── Separators ── */
  .metric-sep, .btn-sep {
    height: 1px;
    border: none;
    margin: 0;
  }
  .metric-sep { background: linear-gradient(to right, transparent, #e8d8d0 40%, #e8d8d0 60%, transparent); }
  .btn-sep    { background: linear-gradient(to right, transparent, #e8d8d0 50%, transparent); }

  /* Hide mobile-only buttons row on desktop */
  .hero-btns-mobile { display: none; }

  /* ── Peek SVG icon ── */
  .peek-wrap {
    position: relative;
    width: 100%;
  }
  .peek-icon {
    position: absolute;
    bottom: calc(100% - 8px);   /* starts mostly hidden behind button */
    left: 50%;
    transform: translateX(-50%) translateY(22px) scale(0.55);
    font-size: clamp(24px, 2.2vw, 34px);
    line-height: 1;
    opacity: 0;
    pointer-events: none;
    z-index: 0;                  /* sits behind the button */
    transition:
      transform 0.34s cubic-bezier(0.34, 1.56, 0.64, 1),
      opacity   0.22s ease;
    filter: drop-shadow(0 -4px 10px rgba(0,0,0,0.18));
    will-change: transform, opacity;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .peek-wrap:hover .peek-icon {
    opacity: 1;
    transform: translateX(-50%) translateY(-8px) scale(1.15);
  }
  /* button sits ON TOP of the peek icon */
  .peek-btn {
    position: relative;
    z-index: 1;
  }

  /* ═══════════════════════════════════════════════════════════════════════
     MOBILE
  ═══════════════════════════════════════════════════════════════════════ */
  @media (max-width: 767px) {
    .hero-root {
      height: auto !important;
      max-height: none !important;
      overflow: visible !important;
      padding-bottom: 20px;
    }
    .hero-logo-section { padding-top: 60px !important; }
    .hero-logo-img     { height: 78px !important; }

    .hero-main-grid {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      gap: 0 !important;
      padding: 0 16px 0 !important;
      margin-top: 2px !important;
    }
    .hero-left-col {
      width: 100% !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      text-align: center !important;
      padding-right: 0 !important;
      gap: 6px !important;
      margin-bottom: 0px !important;
    }
    .hero-left-col p { text-align: center !important; max-width: 34ch !important; }
    .hero-left-col p:first-of-type { font-size: 26px !important; }
    .hero-left-col p:last-of-type  { font-size: 13px !important; }
    .hero-features-list { display: none !important; }
    .hero-left-divider  { display: none !important; }

    .hero-center-col {
      width: 100% !important;
      height: auto !important;
      overflow: visible !important;
    }
    .hero-img-scale { transform: scale(1.08) translateY(0%) !important; }
    .hero-btns-desktop { display: none !important; }

    .hero-btns-mobile {
      display: flex !important;
      width: 100% !important;
      gap: 24px !important;
      margin-top: 48px !important;
      padding-bottom: 10px !important;
    }
    .hero-btns-mobile .peek-wrap > .peek-btn {
      padding: 8px 16px !important;
      border-radius: 9999px !important;
    }
    .hero-btns-mobile .peek-wrap > .peek-btn span:first-child { font-size: 16px !important; }
    .hero-btns-mobile .peek-wrap > .peek-btn span:nth-child(2) {
      font-size: 11px !important;
      letter-spacing: 0.10em !important;
    }

    .hero-right-col {
      width: 100% !important;
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 10px !important;
      padding-left: 0 !important;
      padding-bottom: 0 !important;
      margin-top: 16px !important;
    }
    .hero-right-col .metric-sep { display: none !important; }
    .hero-metric-card {
      background: linear-gradient(135deg, #fff5f0 0%, #fce8e0 100%);
      border-radius: 14px;
      padding: 12px 10px;
    }
  }
`;


/* ─────────────────────────────────────────────────────────────────────────
   SVG ICONS
────────────────────────────────────────────────────────────────────────── */
/* Proper school building — flat facade with flag, windows, door, steps */
const IconSchool = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:`${size}px`,height:`${size}px`}}>
    {/* Main building body */}
    <rect x="2" y="10" width="20" height="11" rx="0.5"/>
    {/* Roof / pediment */}
    <path d="M1 10h22"/>
    <path d="M4 10V7h16v3"/>
    {/* Central entrance arch */}
    <path d="M10 21v-5a2 2 0 014 0v5"/>
    {/* Left window */}
    <rect x="4" y="13" width="3" height="2.5" rx="0.4"/>
    {/* Right window */}
    <rect x="17" y="13" width="3" height="2.5" rx="0.4"/>
    {/* Flag pole + flag */}
    <line x1="12" y1="7" x2="12" y2="3"/>
    <path d="M12 3h4l-1 1.5L16 6h-4"/>
    {/* Steps */}
    <path d="M8 21h8"/>
  </svg>
);

const IconDelivery = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:'22px',height:'22px'}}>
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <path d="M16 8h4l3 5v4h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const IconQuality = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:'22px',height:'22px'}}>
    <path d="M12 2l2.9 6.3L22 9.3l-5 4.9 1.2 6.8L12 18l-6.2 3 1.2-6.8L2 9.3l7.1-1z"/>
  </svg>
);
const IconFit = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:'22px',height:'22px'}}>
    <path d="M9 3H5a2 2 0 00-2 2v4"/><path d="M15 3h4a2 2 0 012 2v4"/>
    <path d="M9 21H5a2 2 0 01-2-2v-4"/><path d="M15 21h4a2 2 0 002-2v-4"/>
    <rect x="9" y="9" width="6" height="6" rx="1"/>
  </svg>
);


/* ─────────────────────────────────────────────────────────────────────────
   GAME BUTTON  —  with peek-emoji effect (no tooltip)
────────────────────────────────────────────────────────────────────────── */
function GameButton({ to, label, emoji, peekEmoji, variant = 'gold' }) {
  const isGold = variant === 'gold';

  const shadowOn = isGold
    ? '0 1px 0 #b45309, 0 4px 14px rgba(245,158,11,0.24), inset 0 1px 0 rgba(255,255,255,0.45)'
    : '0 1px 0 #0b1220, 0 4px 14px rgba(15,23,42,0.22), inset 0 1px 0 rgba(255,255,255,0.18)';
  const shadowOff = isGold
    ? '0 1px 0 #b45309, 0 1px 6px rgba(245,158,11,0.16), inset 0 1px 0 rgba(255,255,255,0.35)'
    : '0 1px 0 #0b1220, 0 1px 6px rgba(15,23,42,0.14), inset 0 1px 0 rgba(255,255,255,0.12)';
  const bg = isGold
    ? 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 62%, #d97706 100%)'
    : 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)';
  const border = isGold ? '1px solid #c97d00' : '1px solid #1f314f';
  const txtShadow = isGold
    ? '0 1px 0 #9a5800, 0 2px 5px rgba(0,0,0,0.22)'
    : '0 1px 0 #0b1220, 0 2px 5px rgba(0,0,0,0.28)';

  return (
    <Link to={to} style={{ textDecoration: 'none' }} className="select-none peek-wrap">

      {/* Peek icon (same emoji as button) */}
      <span className="peek-icon" aria-hidden="true">{peekEmoji || emoji}</span>

      {/* Button — sits on top (pill shape, no emoji inside; peek emoji on hover only) */}
      <div
        className="peek-btn relative flex items-center justify-center gap-2 px-5 py-2.5 rounded-full cursor-pointer w-full"
        style={{
          background: bg,
          border,
          boxShadow: shadowOn,
          transition: 'transform 0.1s ease, box-shadow 0.1s ease, filter 0.12s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.filter = 'brightness(1.04)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.filter = '';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = shadowOn;
        }}
        onMouseDown={e => {
          e.currentTarget.style.transform = 'translateY(1px)';
          e.currentTarget.style.boxShadow = shadowOff;
        }}
        onMouseUp={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = shadowOn;
        }}
      >
        <span
          className="font-black uppercase text-white text-center"
          style={{
            fontFamily: "'Baloo 2', cursive",
            fontSize: 'clamp(11px, 1vw, 13px)',
            letterSpacing: '0.11em',
            textShadow: txtShadow,
          }}
        >
          {label}
        </span>
      </div>
    </Link>
  );
}


/* ─────────────────────────────────────────────────────────────────────────
   METRIC ROW
────────────────────────────────────────────────────────────────────────── */
function Metric({ Icon, title, sub, iconColor = '#2563eb' }) {
  return (
    <div className="hero-metric-card flex items-center gap-3">
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-2xl"
        style={{
          width: 'clamp(36px, 3.6vw, 52px)',
          height: 'clamp(36px, 3.6vw, 52px)',
          background: 'linear-gradient(135deg, #eef5ff 0%, #ddeaff 100%)',
          boxShadow: '0 2px 10px rgba(0,80,200,0.12)',
          color: iconColor,
          flexShrink: 0,
        }}
      >
        <Icon />
      </div>
      <div>
        <p
          className="m-0 font-black text-[#1a1a2e] leading-snug"
          style={{ fontFamily: "'Baloo 2', cursive", fontSize: 'clamp(11px, 1.1vw, 15px)' }}
        >
          {title}
        </p>
        <p
          className="m-0 text-gray-400 font-semibold leading-snug"
          style={{ fontSize: 'clamp(9px, 0.85vw, 12px)' }}
        >
          {sub}
        </p>
      </div>
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────────────────
   HERO
────────────────────────────────────────────────────────────────────────── */
export default function NewHero({
  logoSrc       = '/logo.png',
  lineOne       = 'School uniforms made simple.',
  lineTwo       = 'Order online, get fast delivery and perfect fits.',
  heroVideoSrc  = '/hero.mp4',
  primaryHref   = '/schoolenquiry',
  secondaryHref = '/schools',
}) {
  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <section
        className="hero-root relative h-svh max-h-screen overflow-hidden flex flex-col"
        style={{ background: '#FAF3F0', fontFamily: "'Nunito', sans-serif" }}
      >
        <div className="relative z-10 flex flex-col w-full h-full">

          {/* ── Logo ── */}
          {/* Navbar is ~60-70px; paddingTop pushes logo clearly below it */}
          <div
            className="hero-logo-section flex-shrink-0 flex justify-center"
            style={{
              paddingTop:   'clamp(52px, 6vh, 80px)',
              paddingLeft:  'clamp(14px, 2.2vw, 36px)',
              paddingRight: 'clamp(14px, 2.2vw, 36px)',
            }}
          >
            <img
              src={logoSrc}
              alt="Uniform Lab"
              className="hero-logo-img"
              style={{ height: 'clamp(100px, 16vh, 188px)', width: 'auto' }}
            />
          </div>

          {/* ── Main grid ── */}
          <div
            className="hero-main-grid flex-1 min-h-0 w-full grid"
            style={{
              gridTemplateColumns: '1fr 1.8fr 1fr',
              columnGap:     'clamp(10px, 1.8vw, 28px)',
              marginTop:     'clamp(4px, 0.8vh, 12px)',
              paddingBottom: 'clamp(10px, 1.6vh, 22px)',
              paddingLeft:   'clamp(14px, 2.2vw, 36px)',
              paddingRight:  'clamp(14px, 2.2vw, 36px)',
              alignItems:    'center',
            }}
          >
            {/* LEFT */}
            <div className="hero-left-col flex flex-col justify-center gap-3 h-full" style={{ paddingRight: 'clamp(8px, 1.5vw, 24px)' }}>
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold uppercase tracking-widest"
                  style={{
                    background: 'linear-gradient(135deg, #eef5ff 0%, #ddeaff 100%)',
                    color: '#2563eb',
                    fontSize: 'clamp(9px, 0.75vw, 11px)',
                    boxShadow: '0 1px 6px rgba(37,99,235,0.12)',
                  }}
                >
                  🏛️ Trusted by 500+ Schools
                </span>
              </div>
              <p
                className="m-0 font-black text-[#1a1a2e] leading-tight"
                style={{ fontFamily: "'Baloo 2', cursive", fontSize: 'clamp(20px, 2.6vw, 36px)', letterSpacing: '-0.3px' }}
              >
                {lineOne}
              </p>
              <p
                className="m-0 font-semibold text-gray-400 leading-snug"
                style={{ fontSize: 'clamp(11px, 1vw, 14px)', maxWidth: '28ch' }}
              >
                {lineTwo}
              </p>
              <hr className="hero-left-divider" style={{ border:'none', height:'1px', background:'linear-gradient(to right, #ccdeff 0%, transparent 80%)', margin:'2px 0' }} />
              <ul className="hero-features-list m-0 p-0 flex flex-col gap-2" style={{ listStyle: 'none' }}>
                {[
                  { Icon: IconDelivery, color: '#0ea5e9', text: '2–3 day doorstep delivery' },
                  { Icon: IconQuality,  color: '#f59e0b', text: 'ISI certified quality fabrics' },
                  { Icon: IconFit,      color: '#10b981', text: 'Exact sizing, guaranteed fit' },
                  { Icon: IconSchool,   color: '#2563eb', text: 'Affordable school pricing' },
                ].map(({ Icon, color, text }) => (
                  <li key={text} className="flex items-center gap-2">
                    <span
                      className="flex items-center justify-center rounded-lg flex-shrink-0"
                      style={{ width: 'clamp(24px, 2vw, 30px)', height: 'clamp(24px, 2vw, 30px)', background: `${color}18`, color }}
                    >
                      <Icon />
                    </span>
                    <span className="font-semibold text-[#1a1a2e]" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)' }}>
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CENTRE */}
            <div className="hero-center-col h-full flex items-center justify-center overflow-visible">
              <div className="flex flex-col items-center justify-center w-full">
                {/* CHANGED: translateY nudged slightly down (was 0% → 3%) to bring video down a touch */}
                <video
                  src={heroVideoSrc}
                  className="hero-img-scale"
                  autoPlay loop muted playsInline
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    display: 'block',
                    transform: 'scale(1.32) translateY(3%)',
                    transformOrigin: 'center center',
                    pointerEvents: 'none',
                    clipPath: 'inset(1px 1px 2px 1px)',
                    WebkitClipPath: 'inset(1px 1px 2px 1px)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                />

                {/* Buttons desktop — extra padding-top so peek has room */}
                <div
                  className="hero-btns-desktop flex items-center justify-center gap-4"
                  style={{ marginTop: 'clamp(40px, 7vh, 90px)', width: '100%', paddingTop: '48px' }}
                >
                  <GameButton
                    to={primaryHref}
                    label="Partner with us"
                    emoji="🏫"
                    peekEmoji="🏫"
                    variant="gold"
                  />
                  <GameButton
                    to={secondaryHref}
                    label="Shop Now"
                    emoji="👨‍👩‍👦"
                    peekEmoji="👨‍👩‍👦"
                    variant="blue"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div
              className="hero-right-col flex flex-col justify-center gap-3 h-full"
              style={{ paddingBottom: 'clamp(4px, 0.8vh, 10px)', paddingLeft: 'clamp(44px, 7vw, 96px)' }}
            >
              <Metric Icon={IconSchool}   iconColor="#2563eb" title="School Approved"  sub="Trusted by 500+ schools"    />
              <hr className="metric-sep" />
              <Metric Icon={IconDelivery} iconColor="#0ea5e9" title="Fastest Delivery" sub="2–3 day doorstep delivery"  />
              <hr className="metric-sep" />
              <Metric Icon={IconQuality}  iconColor="#f59e0b" title="100% Quality"     sub="ISI certified fabrics"       />
              <hr className="metric-sep" />
              <Metric Icon={IconFit}      iconColor="#10b981" title="Perfect Fit"       sub="Exact sizing, guaranteed"   />
            </div>

            {/* Buttons mobile */}
            <div className="hero-btns-mobile">
              <GameButton to={primaryHref}   label="Join us" emoji="🏫" peekEmoji="🏫" variant="gold" />
              <GameButton to={secondaryHref} label="Shop Now" emoji="👨‍👩‍👦" peekEmoji="👨‍👩‍👦" variant="blue" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}