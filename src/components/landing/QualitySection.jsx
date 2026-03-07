import { Link } from "react-router-dom";
import { ArrowRight, Shield, Scissors, Shirt, Clock3 } from "lucide-react";

const ITEMS = [
  "Controlled fabric sourcing to maintain composition and colour tone stability",
  "Pattern standardisation, cutting precision, stitching supervision, and finishing checks",
  "Multi-level quality checks at pre-production, mid-production, and final finishing stages",
  "Standardised measurement charts to improve fit consistency and reduce return rates",
  "Buffer-based planning aligned with school calendars and corporate demand cycles",
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  .qc-sec, .qc-sec * { font-family: 'Inter', sans-serif !important; }
  .qc-sec {
    background: #f8faff;
    padding: 88px 0 94px;
    font-family: 'Inter', sans-serif;
  }
  .qc-wrap {
    border: 1px solid #dce9ff;
    border-radius: 24px;
    padding: 28px;
    background: linear-gradient(135deg, #f9fcff 0%, #f1f7ff 100%);
  }
  .qc-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 16px;
    border-radius: 999px;
    background: linear-gradient(135deg, #eef5ff 0%, #ddeaff 100%);
    color: #2563eb;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    box-shadow: 0 1px 8px rgba(37,99,235,0.10);
    border: 1px solid rgba(37,99,235,0.12);
    margin-bottom: 14px;
  }
  .qc-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
    align-items: start;
  }
  .qc-h2 {
    margin: 0 0 12px;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: clamp(26px, 3vw, 44px);
    line-height: 1.08;
    letter-spacing: -0.6px;
    color: #1a1a2e;
  }
  .qc-h2 span { color: #2563eb; }
  .qc-sub {
    margin: 0;
    color: #64748b;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.7;
    max-width: 520px;
  }
  .qc-features {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    margin-top: 14px;
  }
  .qc-feature {
    border: 1px solid #dbeafe;
    border-radius: 12px;
    background: #fff;
    padding: 16px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-align: center;
    color: #2563eb;
    font-weight: 700;
    font-size: 13px;
  }
  .qc-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .qc-item {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 11px 13px;
    color: #64748b;
    font-size: 13px;
    line-height: 1.55;
    font-weight: 600;
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }
  .qc-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #2563eb;
    opacity: 0.65;
    margin-top: 6px;
    flex-shrink: 0;
  }
  .qc-cta-wrap {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }
  .qc-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: clamp(12px, 1vw, 14px);
    letter-spacing: 0.11em;
    text-transform: uppercase;
    white-space: nowrap;
    padding: 12px 24px;
    border-radius: 9999px;
    border: 1px solid rgba(0,76,153,0.6);
    background: linear-gradient(180deg, #1a6bb8 0%, #004C99 50%, #003d7a 100%);
    box-shadow: 0 2px 8px rgba(0,76,153,0.25), inset 0 1px 0 rgba(255,255,255,0.15);
    text-shadow: 0 1px 0 rgba(0,0,0,0.2);
    transition: transform 0.1s ease, box-shadow 0.1s ease, filter 0.12s ease;
  }
  .qc-cta:hover {
    filter: brightness(1.04);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,76,153,0.3), inset 0 1px 0 rgba(255,255,255,0.2);
  }
  .qc-cta:active {
    transform: translateY(1px);
    box-shadow: 0 1px 4px rgba(0,76,153,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
  }
  @media (max-width: 767px) {
    .qc-sec { padding: 58px 0 66px; }
    .qc-wrap { padding: 20px; border-radius: 18px; }
    .qc-grid { grid-template-columns: 1fr; }
    .qc-features { grid-template-columns: 1fr 1fr 1fr; }
  }
`;

export default function QualitySection() {
  return (
    <>
      <style>{CSS}</style>
      <section className="qc-sec">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="qc-wrap" id="quality-control">
            <div className="qc-pill">
              <Shield size={11} />
              Manufacturing & Quality
            </div>
            <div className="qc-grid">
              <div>
                <h2 className="qc-h2">
                  Uniform consistency is not accidental.
                  <span> It is process-driven.</span>
                </h2>
                <p className="qc-sub">
                  Our manufacturing operations are designed to ensure repeatable
                  quality at scale, with clear process checkpoints and
                  batch-level accountability.
                </p>
                <div className="qc-features">
                  <div className="qc-feature">
                    <Scissors size={18} />
                    Precision
                  </div>
                  <div className="qc-feature">
                    <Shirt size={18} />
                    Fit Control
                  </div>
                  <div className="qc-feature">
                    <Clock3 size={18} />
                    Timely Delivery
                  </div>
                </div>
              </div>
              <div>
                <ul className="qc-list">
                  {ITEMS.map((item) => (
                    <li className="qc-item" key={item}>
                      <span className="qc-dot" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="qc-cta-wrap">
                  <Link to="/about#quality-control" className="qc-cta">
                    Quality Framework
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
