import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Scissors, Shirt, Clock3 } from 'lucide-react';

const ITEMS = [
  'Controlled fabric sourcing to maintain composition and colour tone stability',
  'Pattern standardisation, cutting precision, stitching supervision, and finishing checks',
  'Multi-level quality checks at pre-production, mid-production, and final finishing stages',
  'Standardised measurement charts to improve fit consistency and reduce return rates',
  'Buffer-based planning aligned with school calendars and corporate demand cycles',
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700;800&display=swap');
  .qc-sec {
    background: #f8faff;
    padding: 88px 0 94px;
    font-family: 'Nunito', sans-serif;
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
    padding: 5px 14px;
    border-radius: 999px;
    background: rgba(37,99,235,0.12);
    color: #2563eb;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
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
    font-family: 'Baloo 2', cursive;
    font-size: clamp(26px, 3vw, 40px);
    line-height: 1.12;
    color: #1a1a2e;
  }
  .qc-h2 span { color: #2563eb; }
  .qc-sub {
    margin: 0;
    color: #64748b;
    font-size: 14px;
    font-weight: 600;
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
    border-radius: 10px;
    background: #fff;
    padding: 10px;
    text-align: center;
    color: #2563eb;
    font-weight: 800;
    font-size: 11px;
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
    color: #475569;
    font-size: 13px;
    line-height: 1.55;
    font-weight: 700;
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
  .qc-cta {
    margin-top: 14px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #1a1a2e;
    font-size: 13px;
    font-weight: 800;
    text-decoration: none;
  }
  .qc-cta:hover { color: #2563eb; }
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
                  Our manufacturing operations are designed to ensure repeatable quality at scale,
                  with clear process checkpoints and batch-level accountability.
                </p>
                <div className="qc-features">
                  <div className="qc-feature"><Scissors size={14} style={{ marginBottom: 4 }} /><br />Precision</div>
                  <div className="qc-feature"><Shirt size={14} style={{ marginBottom: 4 }} /><br />Fit Control</div>
                  <div className="qc-feature"><Clock3 size={14} style={{ marginBottom: 4 }} /><br />Timely Delivery</div>
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
                <Link to="/about#quality-control" className="qc-cta">
                  Read complete quality framework
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
