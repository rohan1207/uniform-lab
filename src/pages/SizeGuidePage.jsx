import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Info } from "lucide-react";

/* ─── HOOK ──────────────────────────────────────────────────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {}, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── DATA ──────────────────────────────────────────────────────────────── */
// Upper body — measurements 1–10 from the guide image
const UPPER = [
  {
    n: 1,
    title: "Full Shoulder",
    desc: "Measure from one shoulder bone to the other across the back. Keep the tape straight and snug.",
  },
  {
    n: 2,
    title: "Full Sleeves",
    desc: "Measure from the shoulder seam down to the wrist bone with your arm slightly bent at the elbow.",
  },
  {
    n: 3,
    title: "Full Chest",
    desc: "Wrap the tape around the fullest part of the chest, keeping it level and parallel to the floor.",
    tip: "Stand straight with arms relaxed.",
  },
  {
    n: 4,
    title: "Waist / Stomach",
    desc: "Measure around the natural waistline (just above the navel) with the tape parallel to the floor.",
    tip: "Keep one finger between tape and skin for comfort.",
  },
  {
    n: 5,
    title: "Hips",
    desc: "Place the tape around the fullest part of your hips and buttocks, keeping it level all around.",
  },
  {
    n: 6,
    title: "Front Chest",
    desc: "Measure from underarm to underarm straight across the front of the chest.",
  },
  {
    n: 7,
    title: "Back Chest Length",
    desc: "Measure from underarm to underarm straight across the upper back.",
  },
  {
    n: 8,
    title: "Jacket",
    desc: "From the highest point of the shoulder (next to the neck) down to the desired jacket hem length.",
    tip: "Jacket usually ends slightly below the hips for a professional look.",
  },
  {
    n: 14,
    title: "Bicep / Arms",
    desc: "Measure around the widest part of the upper arm.",
    tip: "Keeps sleeves comfortable and allows easy movement.",
  },
  {
    n: 15,
    title: "Neck",
    desc: "Measure around the base of your neck where the collar will sit, keeping the tape level.",
    tip: "Keep two fingers inside the tape for a comfortable collar fit.",
  },
];

// Lower body — measurements 9–13 from the guide image
const LOWER = [
  {
    n: 9,
    title: "Pant Waist",
    desc: "Measure around your waistline where you normally wear your trousers.",
  },
  {
    n: 10,
    title: "Low Hip for Pants",
    desc: "Wrap the tape around the widest part of your hips — typically 7–9 inches below the waistline.",
  },
  {
    n: 11,
    title: "Thigh",
    desc: "Measure around the fullest part of your thigh, just below the crotch, keeping the tape horizontal.",
  },
  {
    n: 12,
    title: "Full Crotch",
    desc: "Place tape at the centre-front waist, pass between the legs, and bring up to the back waist.",
    tip: "Ensures comfort and a proper rise for trousers.",
  },
  {
    n: 13,
    title: "Pant Length",
    desc: "Measure from the waistline down to the desired pant length at the ankle along the outside leg.",
  },
];

/* ─── CSS ────────────────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .sg-root {
    background: #f6f8ff;
    min-height: 100vh;
    font-family: 'Nunito', sans-serif;
    padding-top: 88px;
    overflow-x: hidden;
  }

  /* ── Breadcrumb ── */
  .sg-bc {
    background: #fff;
    border-bottom: 1px solid #e8f0fe;
    padding: 12px 0;
  }
  .sg-bc nav {
    display: flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: #94a3b8;
  }
  .sg-bc a { color: #94a3b8; text-decoration: none; transition: color 0.15s; }
  .sg-bc a:hover { color: #2563eb; }
  .sg-bc-active { color: #1e293b; }

  /* ── Hero ── */
  .sg-hero {
    position: relative;
    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #2563eb 100%);
    padding: clamp(48px, 8vw, 100px) clamp(20px, 5vw, 80px) clamp(80px, 12vw, 140px);
    text-align: center; overflow: hidden;
  }
  .sg-hero-dots {
    position: absolute; inset: 0; pointer-events: none;
    background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 28px 28px;
  }
  .sg-hero-glow {
    position: absolute; width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(96,165,250,0.18) 0%, transparent 70%);
    left: 50%; top: 50%; transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .sg-hero-inner { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
  .sg-pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 16px; border-radius: 999px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.18);
    color: #bfdbfe; font-size: 11px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    margin-bottom: 22px; backdrop-filter: blur(8px);
  }
  .sg-h1 {
    font-family: 'Baloo 2', cursive;
    font-size: clamp(30px, 5vw, 58px);
    color: #fff; font-weight: 900;
    line-height: 1.06; margin: 0 0 16px;
  }
  .sg-h1 em { font-style: normal; color: #93c5fd; }
  .sg-hero-sub {
    color: #93c5fd; font-size: clamp(14px, 1.3vw, 17px);
    font-weight: 600; line-height: 1.7;
  }

  /* ── Tips strip ── */
  .sg-tips {
    position: relative; z-index: 10;
    max-width: 860px; margin: -36px auto 0;
    padding: 0 clamp(16px, 3vw, 40px);
  }
  .sg-tips-inner {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 8px 40px rgba(30,58,138,0.12);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    overflow: hidden;
  }
  .sg-tip-item {
    padding: clamp(18px, 3vw, 28px) clamp(14px, 2vw, 24px);
    border-right: 1px solid #f0f4ff;
    display: flex; align-items: flex-start; gap: 12px;
  }
  .sg-tip-item:last-child { border-right: none; }
  .sg-tip-icon {
    width: 36px; height: 36px; flex-shrink: 0;
    border-radius: 10px;
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
  }
  .sg-tip-title { font-weight: 800; color: #1e293b; font-size: 13px; margin-bottom: 3px; }
  .sg-tip-sub { color: #64748b; font-size: 12px; font-weight: 600; line-height: 1.5; }

  /* ── Main body ── */
  .sg-body {
    max-width: 1200px; margin: 0 auto;
    padding: clamp(48px, 7vw, 80px) clamp(16px, 3vw, 40px) 80px;
  }

  /* ── Section heading ── */
  .sg-sec-head {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 28px;
  }
  .sg-sec-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 7px 18px; border-radius: 999px;
    background: linear-gradient(135deg, #1e3a8a, #2563eb);
    color: #fff; font-size: 12px; font-weight: 800;
    letter-spacing: 0.1em; text-transform: uppercase;
  }
  .sg-sec-line { flex: 1; height: 1px; background: linear-gradient(to right, #bfdbfe, transparent); }

  /* ── Card grid ── */
  .sg-cards { display: flex; flex-direction: column; gap: 12px; }

  /* ── Individual measurement card ── */
  .sg-card {
    background: #fff;
    border: 1px solid #e5edf9;
    border-radius: 16px;
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 16px 18px;
    overflow: hidden;
    transition: box-shadow 0.28s ease, transform 0.28s ease, border-color 0.28s ease;
    cursor: default;
    position: relative;
  }
  .sg-card::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: linear-gradient(to bottom, #1e3a8a, #2563eb);
    border-radius: 16px 0 0 16px;
    opacity: 0;
    transition: opacity 0.28s ease;
  }
  .sg-card:hover {
    box-shadow: 0 8px 30px rgba(30,58,138,0.11);
    transform: translateY(-2px);
    border-color: #bfdbfe;
  }
  .sg-card:hover::before { opacity: 1; }

  /* ── Number badge ── */
  .sg-num {
    width: 30px; height: 30px; flex-shrink: 0;
    border-radius: 9px;
    background: linear-gradient(135deg, #1e3a8a, #2563eb);
    color: #fff; font-family: 'Baloo 2', cursive;
    font-size: 13px; font-weight: 900;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 8px rgba(30,58,138,0.28);
    margin-top: 2px;
  }

  /* ── Text panel ── */
  .sg-text { display: flex; flex-direction: column; gap: 5px; flex: 1; }
  .sg-card-title {
    font-family: 'Baloo 2', cursive;
    font-size: 14px; font-weight: 800;
    color: #1a1a2e; margin: 0; line-height: 1.2;
  }
  .sg-card-desc {
    color: #475569; font-size: 13px; font-weight: 600;
    line-height: 1.6; margin: 0;
  }
  .sg-card-tip {
    display: inline-flex; align-items: center; gap: 5px;
    background: #eff6ff; color: #2563eb;
    font-size: 11.5px; font-weight: 700;
    border-radius: 8px; padding: 4px 10px;
    width: fit-content;
  }

  /* ── Reference image ── */
  .sg-ref-wrap {
    max-width: 860px; margin: 0 auto 48px;
    padding: 0 clamp(16px, 3vw, 40px);
  }
  .sg-ref-img {
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 8px 40px rgba(30,58,138,0.13);
    display: block;
  }

  /* ── Two col layout ── */
  .sg-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  /* ── Bottom CTA ── */
  .sg-cta {
    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
    border-radius: 24px;
    padding: clamp(36px, 5vw, 60px) clamp(24px, 4vw, 56px);
    display: flex; align-items: center; justify-content: space-between;
    gap: 24px; flex-wrap: wrap; position: relative; overflow: hidden;
    margin-top: 60px;
  }
  .sg-cta::before {
    content: '';
    position: absolute; width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(96,165,250,0.13) 0%, transparent 70%);
    right: -100px; top: -100px; pointer-events: none;
  }
  .sg-cta-text { position: relative; }
  .sg-cta-title { font-family: 'Baloo 2', cursive; font-size: clamp(20px, 2.5vw, 30px); color: #fff; font-weight: 900; margin: 0 0 8px; }
  .sg-cta-sub { color: #93c5fd; font-size: 14px; font-weight: 600; margin: 0; }
  .sg-cta-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px; border-radius: 14px;
    background: #fff; color: #1e3a8a;
    font-family: 'Baloo 2', cursive; font-size: 15px; font-weight: 800;
    text-decoration: none; white-space: nowrap; flex-shrink: 0;
    transition: all 0.22s ease; position: relative;
  }
  .sg-cta-btn:hover { background: #dbeafe; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.2); }

  /* ═══ MOBILE ════════════════════════════════════════════════════════════ */
  @media (max-width: 900px) {
    .sg-cols { grid-template-columns: 1fr; gap: 48px; }
    .sg-tips-inner { grid-template-columns: 1fr; }
    .sg-tip-item { border-right: none; border-bottom: 1px solid #f0f4ff; }
    .sg-tip-item:last-child { border-bottom: none; }
  }
  @media (max-width: 600px) {
    .sg-root { padding-top: 70px; }
    .sg-card { padding: 13px 14px; gap: 12px; }
    .sg-card-title { font-size: 13px; }
    .sg-card-desc { font-size: 12px; }
    .sg-cta { flex-direction: column; text-align: center; }
    .sg-cta-btn { width: 100%; justify-content: center; }
  }
`;

/* ─── CARD COMPONENT ──────────────────────────────────────────────────── */
function MeasurementCard({ item, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="sg-card">
        <div className="sg-num">{item.n}</div>
        <div className="sg-text">
          <p className="sg-card-title">{item.title}</p>
          <p className="sg-card-desc">{item.desc}</p>
          {item.tip && (
            <span className="sg-card-tip">
              <Info size={11} />
              {item.tip}
            </span>
          )}
        </div>
      </div>
    </Reveal>
  );
}

/* ─── PAGE ────────────────────────────────────────────────────────────── */
export default function SizeGuidePage() {
  return (
    <>
      <style>{CSS}</style>
      <div className="sg-root">
        {/* Breadcrumb */}
        <div className="sg-bc">
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 clamp(16px,3vw,40px)",
            }}
          >
            <nav>
              <Link to="/">Home</Link>
              <ChevronRight size={12} />
              <span className="sg-bc-active">Size Guide</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="sg-hero">
          <div className="sg-hero-dots" />
          <div className="sg-hero-glow" />
          <div className="sg-hero-inner">
            <div className="sg-pill">📏 Fit &amp; Measurements</div>
            <h1 className="sg-h1">
              How to Measure
              <br />
              <em>Yourself Correctly</em>
            </h1>
            <p className="sg-hero-sub">
              Follow this guide to capture your exact body measurements.
              Accurate sizing means uniforms that feel made for you — sharp,
              comfortable, and right from day one.
            </p>
          </div>
        </div>

        {/* Quick Tips Strip */}
        <Reveal className="sg-tips">
          <div className="sg-tips-inner">
            {[
              {
                icon: "📏",
                title: "Use a soft tape",
                sub: "Cloth or flexible tape gives the most accurate readings.",
              },
              {
                icon: "🧍",
                title: "Stand naturally",
                sub: "Measure in a relaxed standing posture, not tensed.",
              },
              {
                icon: "👗",
                title: "Wear thin clothing",
                sub: "Measure over a thin layer for the closest-to-skin sizing.",
              },
            ].map(({ icon, title, sub }) => (
              <div className="sg-tip-item" key={title}>
                <div className="sg-tip-icon">{icon}</div>
                <div>
                  <div className="sg-tip-title">{title}</div>
                  <div className="sg-tip-sub">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Reference measurements image */}
        <Reveal className="sg-ref-wrap" style={{ marginTop: 48 }}>
          <img
            src="/neck.webp"
            alt="Measurement guide showing all 15 body measurement points"
            className="sg-ref-img"
          />
        </Reveal>

        {/* Main content */}
        <div className="sg-body">
          <div className="sg-cols">
            {/* Upper Body */}
            <section>
              <Reveal>
                <div className="sg-sec-head">
                  <div className="sg-sec-badge">👕 Upper Body</div>
                  <div className="sg-sec-line" />
                </div>
              </Reveal>
              <div className="sg-cards">
                {UPPER.map((item, i) => (
                  <MeasurementCard key={item.n} item={item} delay={i * 0.04} />
                ))}
              </div>
            </section>

            {/* Lower Body */}
            <section>
              <Reveal>
                <div className="sg-sec-head">
                  <div className="sg-sec-badge">👖 Lower Body</div>
                  <div className="sg-sec-line" />
                </div>
              </Reveal>
              <div className="sg-cards">
                {LOWER.map((item, i) => (
                  <MeasurementCard key={item.n} item={item} delay={i * 0.04} />
                ))}
              </div>
            </section>
          </div>

          {/* CTA */}
          <Reveal>
            <div className="sg-cta">
              <div className="sg-cta-text">
                <div className="sg-cta-title">Got your measurements?</div>
                <p className="sg-cta-sub">
                  Share them with us and we'll create uniforms that fit
                  perfectly.
                </p>
              </div>
              <Link to="/schoolenquiry" className="sg-cta-btn">
                Start Your Order
                <ChevronRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
