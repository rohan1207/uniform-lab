import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Factory, TrendingUp, Files, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';

const POINTS = [
  {
    icon: ShieldCheck,
    title: 'System-Driven Operations',
    text: 'Structured production and delivery ensures year-on-year consistency in quality and fit.',
    accent: '#2563eb',
    tone: '#f5f9ff',
  },
  {
    icon: Factory,
    title: 'In-House Manufacturing Control',
    text: 'Direct production oversight enables stronger quality assurance and accountability.',
    accent: '#0ea5e9',
    tone: '#f3fbff',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Production Capacity',
    text: 'Supports controlled scaling for single-campus and multi-campus institutions.',
    accent: '#4f46e5',
    tone: '#f5f5ff',
  },
  {
    icon: Files,
    title: 'Transparent Processes',
    text: 'Clear billing, documentation, and order tracking for smoother coordination.',
    accent: '#0f766e',
    tone: '#f1fcfb',
  },
  {
    icon: Handshake,
    title: 'Long-Term Partnerships',
    text: 'Built for reliable multi-year relationships, not seasonal transactions.',
    accent: '#7c3aed',
    tone: '#f8f3ff',
  },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700;800&display=swap');

  .why-sec {
    background: #fff;
    padding: 72px 0 78px;
    font-family: 'Nunito', sans-serif;
  }
  .why-head { text-align: center; margin-bottom: 28px; }
  .why-pill {
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
    box-shadow: 0 1px 8px rgba(37,99,235,0.12);
    margin-bottom: 14px;
  }
  .why-h2 {
    margin: 0 0 10px;
    color: #1a1a2e;
    font-family: 'Baloo 2', cursive;
    font-size: clamp(28px, 3.2vw, 42px);
    line-height: 1.1;
    letter-spacing: -0.4px;
  }
  .why-h2 span { color: #2563eb; }
  .why-sub {
    margin: 0 auto;
    max-width: 640px;
    color: #64748b;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.68;
  }

  .why-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin-bottom: 20px;
  }

  .why-card-wrap { position: relative; }
  .why-card-glow {
    position: absolute;
    inset: -1px;
    border-radius: 16px;
    opacity: 0;
    transition: opacity 0.24s ease;
    filter: blur(7px);
    z-index: 0;
  }
  .why-card-wrap:hover .why-card-glow { opacity: 1; }

  .why-card {
    position: relative;
    z-index: 1;
    border: 1px solid #e7edf8;
    border-radius: 16px;
    padding: 15px 14px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
    box-shadow: 0 2px 12px rgba(15,23,42,0.04);
  }
  .why-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 26px rgba(37,99,235,0.12);
    border-color: rgba(37,99,235,0.22);
  }
  .why-icon {
    width: 34px;
    height: 34px;
    border-radius: 11px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eff6ff;
  }
  .why-title {
    margin: 1px 0 4px;
    color: #1e293b;
    font-family: 'Baloo 2', cursive;
    font-size: 18px;
    font-weight: 800;
    line-height: 1.2;
  }
  .why-text {
    margin: 0;
    color: #64748b;
    font-size: 12.5px;
    line-height: 1.58;
    font-weight: 600;
  }

  .why-cta-bar {
    border: 1px solid #dbeafe;
    border-radius: 14px;
    background: #f8fbff;
    padding: 12px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .why-cta-copy {
    margin: 0;
    color: #475569;
    font-size: 13px;
    font-weight: 700;
    line-height: 1.5;
  }
  .why-cta {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    text-decoration: none;
    color: #fff;
    background: #0f172a;
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 12px;
    font-weight: 800;
    white-space: nowrap;
    transition: background 0.2s ease, transform 0.2s ease;
  }
  .why-cta:hover {
    background: #1e3a8a;
    transform: translateY(-1px);
  }

  @media (max-width: 1023px) {
    .why-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 767px) {
    .why-sec { padding: 56px 0 64px; }
    .why-grid { grid-template-columns: 1fr; gap: 10px; }
    .why-sub { font-size: 14px; }
    .why-title { font-size: 17px; }
    .why-card { padding: 13px 12px; }
    .why-cta-bar { flex-direction: column; align-items: stretch; }
    .why-cta { justify-content: center; }
  }
`;

export default function WhyChooseSection() {
  return (
    <>
      <style>{CSS}</style>
      <section className="why-sec">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="why-head">
            <div className="why-pill">
              <ShieldCheck size={11} />
              Why Uniform Lab
            </div>
            <h2 className="why-h2">
              Built for Stability,
              <span> Not Short-Term Supply</span>
            </h2>
            <p className="why-sub">
              Choosing a uniform partner is a long-term decision. We combine operational discipline
              with transparent execution so institutions can depend on predictable outcomes.
            </p>
          </div>

          <div className="why-grid">
            {POINTS.map(({ icon: Icon, title, text, accent, tone }) => (
              <motion.article
                className="why-card-wrap"
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.38 }}
              >
                <div className="why-card-glow" style={{ background: `${accent}22` }} />
                <div className="why-card" style={{ background: `linear-gradient(160deg, #fff 0%, ${tone} 100%)` }}>
                  <div className="why-icon" style={{ color: accent }}>
                    <Icon size={17} />
                  </div>
                  <div>
                    <h3 className="why-title">{title}</h3>
                    <p className="why-text">{text}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="why-cta-bar">
            <p className="why-cta-copy">
              Explore our complete approach to consistency, control, and long-term partnership.
            </p>
            <Link to="/about#why-choose" className="why-cta">
              Read Full Why Choose Us
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
