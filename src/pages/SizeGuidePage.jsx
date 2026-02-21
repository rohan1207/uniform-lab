import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700;800&display=swap');

  .sg-root {
    background: #f8faff;
    min-height: 100vh;
    font-family: 'Nunito', sans-serif;
    padding-top: 5.5rem; /* clear fixed navbar so breadcrumb sits below it */
  }

  /* ── Breadcrumb ── */
  .sg-breadcrumb {
    background: #fff;
    border-bottom: 1px solid #e8f0fe;
    padding: 14px 0;
  }
  .sg-breadcrumb nav {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'Nunito', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #94a3b8;
  }
  .sg-breadcrumb a { color: #94a3b8; text-decoration: none; transition: color 0.15s; }
  .sg-breadcrumb a:hover { color: #2563eb; }
  .sg-breadcrumb .sg-bc-active { color: #1e293b; }

  /* ── Header ── */
  .sg-header {
    text-align: center;
    padding-top: 52px;
    padding-bottom: 48px;
  }
  .sg-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 16px;
    border-radius: 999px;
    background: linear-gradient(135deg, #eef5ff 0%, #ddeaff 100%);
    color: #2563eb;
    font-family: 'Nunito', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    box-shadow: 0 1px 8px rgba(37,99,235,0.12);
    margin-bottom: 18px;
  }
  .sg-h1 {
    font-family: 'Baloo 2', cursive;
    font-weight: 900;
    font-size: clamp(28px, 4vw, 50px);
    color: #1a1a2e;
    letter-spacing: -0.5px;
    line-height: 1.1;
    margin: 0 0 14px;
  }
  .sg-subtext {
    font-family: 'Nunito', sans-serif;
    font-size: clamp(14px, 1.1vw, 16px);
    font-weight: 600;
    color: #64748b;
    max-width: 580px;
    margin: 0 auto 24px;
    line-height: 1.6;
  }
  .sg-divider {
    width: 56px;
    height: 3px;
    border-radius: 99px;
    background: linear-gradient(to right, #2563eb, #0ea5e9);
    margin: 0 auto;
  }

  /* ── Section headings ── */
  .sg-section-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Nunito', sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #2563eb;
    background: linear-gradient(135deg, #eef5ff 0%, #ddeaff 100%);
    padding: 5px 14px;
    border-radius: 999px;
    margin-bottom: 20px;
  }

  /* ── Measurement cards ── */
  .sg-card {
    background: #fff;
    border-radius: 16px;
    padding: 16px 18px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    box-shadow: 0 2px 12px rgba(37,99,235,0.06), 0 0 0 1px #eef2ff;
    transition: transform 0.18s cubic-bezier(.34,1.56,.64,1), box-shadow 0.18s ease;
  }
  .sg-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37,99,235,0.11), 0 0 0 1.5px #c7d7ff;
  }

  /* Number badge */
  .sg-num {
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #fff;
    font-family: 'Baloo 2', cursive;
    font-weight: 900;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 8px rgba(37,99,235,0.28);
    margin-top: 1px;
  }

  .sg-card-title {
    font-family: 'Baloo 2', cursive;
    font-weight: 800;
    font-size: 15px;
    color: #1a1a2e;
    margin: 0 0 5px;
    line-height: 1.2;
  }
  .sg-card-desc {
    font-family: 'Nunito', sans-serif;
    font-size: 13.5px;
    font-weight: 600;
    color: #475569;
    line-height: 1.6;
    margin: 0 0 4px;
  }
  .sg-card-tip {
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: #2563eb;
    background: #eef5ff;
    border-radius: 8px;
    padding: 4px 10px;
    display: inline-block;
    margin-top: 4px;
  }

  /* ── Coming-soon placeholder ── */
  .sg-coming-soon {
    border: 2px dashed #c7d7ff;
    border-radius: 16px;
    padding: 28px 20px;
    text-align: center;
    background: #f8faff;
  }
  .sg-coming-soon p {
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #94a3b8;
    margin: 0;
  }

  /* ── Mobile ── */
  @media (max-width: 767px) {
    .sg-root { padding-top: 88px !important; }
    .sg-header { padding-top: 32px !important; padding-bottom: 32px !important; }
    .sg-h1 { font-size: 26px !important; }
    .sg-subtext { font-size: 13px !important; }
    .sg-card { padding: 13px 14px !important; gap: 11px !important; }
    .sg-num { width: 30px !important; height: 30px !important; font-size: 12px !important; border-radius: 9px !important; }
    .sg-card-title { font-size: 13.5px !important; }
    .sg-card-desc  { font-size: 12.5px !important; }
    .sg-card-tip   { font-size: 11px !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────────────────────── */
const UPPER = [
  {
    n: 1,
    title: 'Full Shoulder / Shoulder Width',
    desc: 'Measure from one shoulder bone to the other across the back. Keep the tape straight and snug, not tight.',
    tip: 'Helps tailor the perfect shoulder fit for shirts, blazers & jackets.',
  },
  {
    n: 2,
    title: 'Chest / Full Chest',
    desc: 'Wrap the tape around the fullest part of the chest, keeping it level and parallel to the floor.',
    tip: 'Stand straight with arms relaxed while measuring.',
  },
  {
    n: 3,
    title: 'Front Chest & Back Chest Length',
    desc: 'Front chest: measure from one underarm to the other across the chest front. Back chest: measure the same across the upper back.',
  },
  {
    n: 4,
    title: 'Waist / Stomach',
    desc: 'Measure around the natural waistline (usually just above the navel) with the tape parallel to the floor.',
    tip: 'Keep one finger between the tape and skin for a comfortable reading.',
  },
  {
    n: 5,
    title: 'Hips',
    desc: 'Place the tape around the fullest part of your hips and buttocks, keeping it level all around.',
    tip: 'Essential for pants and jackets so the garment sits well.',
  },
  {
    n: 6,
    title: 'Sleeve Length',
    desc: 'Measure from the shoulder seam to the wrist bone with your arm slightly bent at the elbow.',
    tip: 'Ensures the perfect sleeve length for shirts and jackets.',
  },
  {
    n: 7,
    title: 'Bicep / Arm',
    desc: 'Measure around the widest part of the upper arm.',
    tip: 'Keeps sleeves comfortable and allows easy movement.',
  },
  {
    n: 8,
    title: 'Neck',
    desc: 'Measure around the base of your neck where the collar will sit, keeping the tape level.',
    tip: 'Keep two fingers inside the tape for a comfortable collar fit.',
  },
  {
    n: 9,
    title: 'Jacket Length',
    desc: 'Start from the highest point of the shoulder (next to the neck) and measure down to the desired jacket length.',
    tip: 'For a professional look, the jacket usually ends slightly below the hips.',
  },
];

const LOWER = [
  {
    n: 10,
    title: 'Trouser Waist / Pant Waist',
    desc: 'Measure around your waistline where you normally wear your trousers.',
  },
  {
    n: 11,
    title: 'Low Hip for Pants',
    desc: 'Wrap the tape around the widest part of your hips — typically 7–9 inches below the waistline.',
  },
  {
    n: 12,
    title: 'Full Crotch',
    desc: 'Place the tape at the center front waist, pass it between the legs, and bring it up to the back waist.',
    tip: 'Ensures comfort and a proper rise for trousers.',
  },
  {
    n: 13,
    title: 'Thigh',
    desc: 'Measure around the fullest part of your thigh, just below the crotch, keeping the tape horizontal.',
  },
  {
    n: 14,
    title: 'Pant Length / Outseam',
    desc: 'Measure from the waistline down to the desired pant length at the ankle along the outside of the leg.',
  },
  {
    n: 15,
    title: 'Inside Leg / Inseam',
    desc: 'Start from the crotch and measure down to the bottom of the ankle along the inside leg seam.',
    tip: 'Critical for achieving the correct pant height.',
  },
  {
    n: 16,
    title: 'Around the Ankle / Bottom',
    desc: 'Wrap the tape loosely around the ankle or the desired pant opening width depending on how tapered you want the hem to be.',
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
function MeasurementCard({ item }) {
  return (
    <div className="sg-card">
      <div className="sg-num">{item.n}</div>
      <div>
        <p className="sg-card-title">{item.title}</p>
        <p className="sg-card-desc">{item.desc}</p>
        {item.tip && <span className="sg-card-tip">💡 {item.tip}</span>}
      </div>
    </div>
  );
}

export default function SizeGuidePage() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <div className="sg-root">

        {/* ── Breadcrumb ── */}
        <div className="sg-breadcrumb">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav>
              <Link to="/">Home</Link>
              <span style={{ color: '#cbd5e1' }}>/</span>
              <span className="sg-bc-active">Size Guide</span>
          </nav>
        </div>
      </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <header className="sg-header">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <span className="sg-pill">📏 Fit & Measurements</span>
            </div>
            <h1 className="sg-h1">How to Measure Yourself</h1>
            <p className="sg-subtext">
              Follow this simple guide to capture your exact body measurements.
              Sharing these with us helps you get uniforms that feel made for you —
              comfortable through the day and sharp in every class.
          </p>
            <div className="sg-divider" />
        </header>

          {/* ── Two-column grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 pb-20">

          {/* Upper body */}
          <section>
              <span className="sg-section-label">👕 Upper Body</span>
              <div className="flex flex-col gap-3">
                {UPPER.map((item) => (
                  <MeasurementCard key={item.n} item={item} />
                ))}
            </div>
          </section>

          {/* Lower body */}
          <section>
              <span className="sg-section-label">👖 Lower Body</span>
              <div className="flex flex-col gap-3">
                {LOWER.map((item) => (
                  <MeasurementCard key={item.n} item={item} />
                ))}

                {/* Coming soon */}
                <div className="sg-coming-soon mt-2">
                  <p>🖼️ Diagram illustrations coming soon — visual guides showing exactly where to place the tape for each measurement.</p>
              </div>
              </div>
            </section>

            </div>
        </div>
      </div>
    </>
  );
}
