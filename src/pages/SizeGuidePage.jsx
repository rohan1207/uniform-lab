import { Link } from "react-router-dom";

/* ─── DATA ─────────────────────────────────────────────────────────────── */
const GUIDES = [
  {
    id: "chest",
    label: "Chest",
    image: "/chest.png",
    steps: [
      "Stand upright with arms relaxed at your sides.",
      "Wrap the tape around the fullest part of your chest, just under the armpits.",
      "Keep the tape parallel to the floor and snug, not tight.",
      "Note the measurement in inches or centimetres.",
    ],
    tip: "Breathe normally while measuring. Don't hold your breath or expand your chest.",
    videoUrl: "https://youtu.be/Jk9r3eDSlYw?si=Oz_y6SxYwHSvYT_E",
  },
  {
    id: "shirt-length",
    label: "Shirt Length (from Shoulder)",
    image: "/shirt-length.png",
    steps: [
      "Stand straight and place the tape at the highest point of your shoulder (near the neck).",
      "Let it run straight down the front to where you want the shirt to end.",
      "For school shirts, this is usually at the hip bone.",
      "Note the measurement.",
    ],
    tip: "Keep your posture upright, slouching changes the measurement.",
    videoUrl: "https://youtu.be/-Sb7FNci8Vg?si=xGeh2Y5HwFKsSY7x",
  },
  {
    id: "waist",
    label: "Waist",
    image: "/waist.png",
    steps: [
      "Find your natural waist, the narrowest part of your torso, just above the navel.",
      "Wrap the tape around this point, keeping it level all the way round.",
      "Keep one finger inside the tape for a comfortable fit (not too tight).",
      "Note the measurement.",
    ],
    tip: "Don't suck in your stomach. Measure relaxed for an accurate result.",
    videoUrl: "https://youtu.be/702qNh9dBMs?si=rSOvMJ_1EODJdgPz",
  },
  {
    id: "pant-length",
    label: "Pant Length",
    image: "/pant-length.png",
    steps: [
      "Stand straight with feet slightly apart.",
      "Place the tape at your natural waistline (where your trousers sit).",
      "Run the tape straight down the outside of your leg to the ankle bone.",
      "Note the measurement.",
    ],
    tip: "Wear the shoes you'd normally pair with the uniform for the most accurate length.",
    videoUrl: "https://youtu.be/io2mewM7D1Q?si=w1WcFgsF_PKdyG3v",
  },
];

/* ─── CSS ───────────────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  .sg-root, .sg-root * { font-family: 'Inter', sans-serif !important; }
  *, *::before, *::after { box-sizing: border-box; }

  .sg-root {
    background: #f8faff;
    min-height: 100vh;
    padding-top: 88px;
  }

  /* ── Page header ── */
  .sg-header {
    max-width: 1400px;
    margin: 0 auto;
    padding: clamp(36px, 6vw, 64px) clamp(16px, 2.5vw, 48px) 0;
    text-align: center;
  }
  .sg-pill {
    display: inline-block;
    padding: 5px 16px; border-radius: 999px;
    background: linear-gradient(135deg, #eef5ff, #ddeaff);
    color: #2563eb; font-size: 11px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    border: 1px solid rgba(37,99,235,0.12);
    margin-bottom: 18px;
  }
  .sg-h1 {
    font-size: clamp(26px, 3.8vw, 44px);
    font-weight: 800; color: #1a1a2e;
    letter-spacing: -0.8px; line-height: 1.07;
    margin: 0 0 14px;
  }
  .sg-h1-sub {
    font-size: 15px; font-weight: 500;
    color: #64748b; line-height: 1.7;
    margin: 0 auto;
    max-width: 520px;
  }

  /* ── Tip banner ── */
  .sg-tip-banner {
    max-width: 1400px; margin: 28px auto 0;
    padding: 0 clamp(16px, 2.5vw, 48px);
  }
  .sg-tip-banner-inner {
    background: #eff6ff; border: 1px solid rgba(37,99,235,0.15);
    border-radius: 12px; padding: 12px 18px;
    font-size: 13px; font-weight: 600; color: #1d4ed8;
    line-height: 1.6;
    display: flex; align-items: flex-start; gap: 10px;
  }
  .sg-tip-icon { font-size: 16px; flex-shrink: 0; line-height: 1.4; }

  /* ── Guide list ── */
  .sg-guides {
    max-width: 1400px; margin: 0 auto;
    padding: clamp(36px, 5vw, 56px) clamp(16px, 2.5vw, 48px) clamp(56px, 8vw, 96px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(16px, 2vw, 24px);
    align-items: stretch;
  }

  /* ── Single guide card ── */
  .sg-guide {
    background: #fff;
    border: 1px solid #e5edf9;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 16px rgba(30,58,138,0.05);
    display: flex;
    flex-direction: column;
  }

  /* ── Image + content row ── */
  .sg-guide-inner {
    display: grid;
    grid-template-columns: 230px 1fr;
    align-items: stretch;
    flex: 1;
  }

  /* ── Image side ── */
  .sg-guide-img-wrap {
    background: #f1f5fb;
    border-right: 1px solid #e5edf9;
    overflow: hidden;
    min-height: 220px;
    height: 100%;
    padding: 0;
  }
  .sg-guide-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }
  .sg-img-placeholder {
    width: 100%; min-height: 180px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 8px;
    border: 2px dashed #bfdbfe; border-radius: 12px;
    color: #93c5fd; font-size: 12px; font-weight: 600;
    letter-spacing: 0.06em; text-align: center;
    padding: 24px;
  }

  /* ── Content side ── */
  .sg-guide-content {
    padding: clamp(20px, 3vw, 32px);
  }
  .sg-guide-num {
    display: inline-block;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: #2563eb; margin-bottom: 6px;
  }
  .sg-guide-title {
    font-size: clamp(17px, 2vw, 22px);
    font-weight: 800; color: #1a1a2e;
    letter-spacing: -0.4px; margin: 0 0 16px;
  }

  /* ── Steps ── */
  .sg-steps {
    display: flex; flex-direction: column; gap: 10px;
    margin-bottom: 16px;
  }
  .sg-step {
    display: flex; align-items: flex-start; gap: 10px;
  }
  .sg-step-num {
    width: 22px; height: 22px; border-radius: 50%;
    background: linear-gradient(135deg, #1e3a8a, #2563eb);
    color: #fff; font-size: 11px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 1px;
  }
  .sg-step-text {
    font-size: 14px; font-weight: 500; color: #374151;
    line-height: 1.65;
  }

  /* ── Watch video link ── */
  .sg-video-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 7px 14px;
    border-radius: 999px;
    background: linear-gradient(135deg, #fff0f0 0%, #ffe4e4 100%);
    border: 1px solid rgba(220,38,38,0.18);
    color: #dc2626;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    letter-spacing: 0.02em;
    margin-bottom: 10px;
    transition: background 0.18s, box-shadow 0.18s, transform 0.15s;
    width: fit-content;
  }
  .sg-video-btn:hover {
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
    box-shadow: 0 2px 10px rgba(220,38,38,0.18);
    transform: translateY(-1px);
  }
  .sg-video-btn svg { flex-shrink: 0; }

  /* ── Tip row ── */
  .sg-guide-tip {
    background: #f0f9ff; border-left: 3px solid #0ea5e9;
    border-radius: 0 8px 8px 0;
    padding: 10px 14px;
    font-size: 13px; font-weight: 600; color: #0369a1;
    line-height: 1.6;
  }

  /* ── Label bar ── */
  .sg-guide-label {
    background: linear-gradient(135deg, #1e3a8a, #2563eb);
    padding: 10px clamp(20px, 3vw, 32px);
    display: flex; align-items: center; justify-content: space-between;
  }
  .sg-guide-label-text {
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: #bfdbfe;
  }
  .sg-guide-label-num {
    font-size: 22px; font-weight: 800;
    color: rgba(255,255,255,0.12); line-height: 1;
  }

  /* ═══ MOBILE ══════════════════════════════════════════════════════════ */
  @media (max-width: 768px) {
    .sg-guides { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .sg-root { padding-top: 72px; }
    .sg-guide-inner { grid-template-columns: 1fr; }
    .sg-guide-img-wrap {
      border-right: none;
      border-bottom: 1px solid #e5edf9;
      min-height: 160px;
      padding: 20px 40px;
    }
    .sg-guide-img { max-height: 140px; }
    .sg-img-placeholder { min-height: 100px; }
  }
`;

/* ─── PAGE ──────────────────────────────────────────────────────────────── */
export default function SizeGuidePage() {
  return (
    <>
      <style>{CSS}</style>
      <div className="sg-root">
        {/* Header */}
        <div className="sg-header">
          <div className="sg-pill">📏 Measuring Guide</div>
          <h1 className="sg-h1">How to Take Your Measurements</h1>
          <p className="sg-h1-sub">
            Four simple measurements are all we need to get your uniform fitting
            perfectly. Follow each step carefully for the best result.
          </p>
        </div>

        {/* General tip */}
        <div className="sg-tip-banner">
          <div className="sg-tip-banner-inner">
            <span className="sg-tip-icon">💡</span>
            <span>
              <strong>Before you start:</strong> Please keep 2 inches extra margin while measuring. If you are unsure about the measurements, contact us before ordering. use a soft measuring tape,
              stand straight in a relaxed posture, and wear thin clothing. Have
              someone help you for more accurate readings.
            </span>
          </div>
        </div>

        {/* Guides */}
        <div className="sg-guides">
          {GUIDES.map((g, idx) => (
            <div key={g.id} className="sg-guide">
              <div className="sg-guide-label">
                <span className="sg-guide-label-text">{g.label}</span>
                <span className="sg-guide-label-num">0{idx + 1}</span>
              </div>

              <div className="sg-guide-inner">
                {/* Image */}
                <div className="sg-guide-img-wrap">
                  <img
                    src={g.image}
                    alt={`How to measure ${g.label}`}
                    className="sg-guide-img"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="sg-img-placeholder"
                    style={{ display: "none" }}
                  >
                    <span style={{ fontSize: 28 }}>📷</span>
                    <span>Image coming soon</span>
                  </div>
                </div>

                {/* Steps */}
                <div className="sg-guide-content">
                  <span className="sg-guide-num">Step-by-step</span>
                  <h2 className="sg-guide-title">{g.label}</h2>
                  <div className="sg-steps">
                    {g.steps.map((step, i) => (
                      <div key={i} className="sg-step">
                        <div className="sg-step-num">{i + 1}</div>
                        <p className="sg-step-text">{step}</p>
                      </div>
                    ))}
                  </div>
                  {g.videoUrl && (
                    <a
                      href={g.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sg-video-btn"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      Watch how to measure
                    </a>
                  )}
                  <div className="sg-guide-tip">
                    <strong>Tip:</strong> {g.tip}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
