import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Factory, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const FOUNDERS = [
  {
    name: 'Priyank Mota',
    role: 'Founder',
    bio: 'Focus on systems, scale, and structured growth. Hands-on experience in manufacturing and retail operations.',
    initials: 'PM',
    image: null, // set path when you have profile images, e.g. '/team/priyank.jpg'
  },
  {
    name: 'Nivedita Mota',
    role: 'Co-Founder',
    bio: 'Strategic direction and customer-centric thinking. Ensures every touchpoint reflects clarity and professionalism.',
    initials: 'NM',
    image: null,
  },
];

const MINI_POINTS = [
  { icon: ShieldCheck, label: 'System-led operations' },
  { icon: Factory, label: 'In-house control' },
  { icon: Users, label: 'Long-term partnership' },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700;800&display=swap');

  .about-sec {
    background: #FAF3F0;
    padding: 72px 0 80px;
    font-family: 'Nunito', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .about-header-top {
    text-align: center;
    margin-bottom: 18px;
  }
  .about-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 24px;
    border-radius: 999px;
    background: linear-gradient(135deg, #eef5ff 0%, #ddeaff 100%);
    color: #2563eb;
    font-family: 'Baloo 2', cursive;
    font-size: clamp(18px, 2.2vw, 26px);
    font-weight: 900;
    letter-spacing: 0.02em;
    box-shadow: 0 2px 12px rgba(37,99,235,0.14);
    margin: 0 auto;
  }
  .about-h2 {
    font-family: 'Baloo 2', cursive;
    font-weight: 900;
    font-size: clamp(26px, 3.2vw, 42px);
    color: #1a1a2e;
    line-height: 1.1;
    letter-spacing: -0.4px;
    margin: 0 0 10px;
  }
  .about-h2 span { color: #2563eb; }
  .about-sub {
    font-size: 15px;
    font-weight: 600;
    color: #64748b;
    line-height: 1.68;
    max-width: 640px;
    margin: 0 0 28px;
  }
  .about-divider {
    width: 56px;
    height: 3px;
    border-radius: 99px;
    background: linear-gradient(to right, #2563eb, #0ea5e9);
    margin-bottom: 32px;
  }

  /* Intro block */
  .about-intro {
    font-size: 15px;
    font-weight: 600;
    color: #475569;
    line-height: 1.75;
    max-width: 720px;
    margin-bottom: 36px;
  }

  /* Leadership heading */
  .about-lead-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #2563eb;
    margin-bottom: 14px;
  }
  .about-founders-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  }

  .about-founder-card {
    background: #fff;
    border: 1px solid #e8f0fe;
    border-radius: 20px;
    padding: 24px;
    display: flex;
    gap: 20px;
    align-items: flex-start;
    box-shadow: 0 4px 20px rgba(15,23,42,0.06);
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  }
  .about-founder-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(37,99,235,0.12);
    border-color: rgba(37,99,235,0.25);
  }
  .about-founder-photo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    flex-shrink: 0;
    background: linear-gradient(135deg, #eef5ff 0%, #dbeafe 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Baloo 2', cursive;
    font-weight: 900;
    font-size: 24px;
    color: #2563eb;
    overflow: hidden;
  }
  .about-founder-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .about-founder-role {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 4px;
  }
  .about-founder-name {
    font-family: 'Baloo 2', cursive;
    font-weight: 800;
    font-size: 20px;
    color: #1e293b;
    margin: 0 0 8px;
    line-height: 1.2;
  }
  .about-founder-bio {
    font-size: 13px;
    font-weight: 600;
    color: #64748b;
    line-height: 1.6;
    margin: 0;
  }

  /* Mini points row */
  .about-points-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 28px;
  }
  .about-point-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 12px;
    background: #fff;
    border: 1px solid #e2e8f0;
    font-size: 13px;
    font-weight: 700;
    color: #475569;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  }
  .about-point-pill:hover {
    border-color: #93c5fd;
    box-shadow: 0 4px 14px rgba(37,99,235,0.08);
    transform: translateY(-1px);
  }
  .about-point-pill svg { color: #2563eb; flex-shrink: 0; }

  /* CTA bar — same style as ServicesSection */
  .about-cta-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 18px 22px;
    border-radius: 18px;
    border: 1px solid #dbeafe;
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(8px);
  }
  .about-cta-text {
    font-family: 'Baloo 2', cursive;
    font-weight: 800;
    font-size: 17px;
    color: #1e293b;
    margin: 0;
  }
  .about-cta-sub {
    font-size: 13px;
    font-weight: 600;
    color: #64748b;
    margin: 4px 0 0 0;
  }
  .about-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 22px;
    border-radius: 12px;
    background: #0f172a;
    color: #fff;
    font-size: 14px;
    font-weight: 800;
    text-decoration: none;
    transition: background 0.2s ease, transform 0.2s ease;
    flex-shrink: 0;
  }
  .about-cta-btn:hover {
    background: #1e3a8a;
    transform: translateY(-2px);
  }

  @media (max-width: 767px) {
    .about-sec { padding: 56px 0 64px; }
    .about-intro { font-size: 14px; margin-bottom: 28px; }
    .about-founders-grid { grid-template-columns: 1fr; gap: 14px; margin-bottom: 24px; }
    .about-founder-card { padding: 18px; gap: 16px; flex-direction: column; align-items: center; text-align: center; }
    .about-founder-photo { width: 72px; height: 72px; font-size: 22px; }
    .about-points-row { gap: 8px; margin-bottom: 22px; }
    .about-point-pill { padding: 8px 12px; font-size: 12px; }
    .about-cta-bar { flex-direction: column; align-items: stretch; text-align: center; padding: 16px; }
    .about-cta-btn { justify-content: center; }
  }
`;

export default function AboutSection() {
  return (
    <>
      <style>{CSS}</style>
      <section className="about-sec">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Header (same hierarchy as ServicesSection) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about-header-top">
              <div className="about-pill">
                <Sparkles size={18} style={{ flexShrink: 0 }} />
                About Uniform Lab
              </div>
            </div>
            <h2 className="about-h2">
              Reliable Uniform Systems.
              <span> Human-Centered Execution.</span>
            </h2>
            <p className="about-sub">
              A system-driven school and corporate uniform manufacturer in Pune — we deliver consistency,
              quality, and reliability at scale. Full story and process depth on our About page.
            </p>
            <div className="about-divider" />
          </motion.div>

          {/* ── Intro ── */}
          <motion.p
            className="about-intro"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.06 }}
          >
            The Uniform Lab specialises in designing, manufacturing, and distributing uniforms for schools,
            corporates, and institutions across India. With in-house production and structured quality control,
            we ensure fabric consistency, fit standardisation, and timely deliveries year after year. We are
            long-term uniform partners for schools and parents alike.
          </motion.p>

          {/* ── Leadership ── */}
          <p className="about-lead-label">Leadership</p>
          <div className="about-founders-grid">
            {FOUNDERS.map((founder, i) => (
              <motion.article
                key={founder.name}
                className="about-founder-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: 0.08 + i * 0.06 }}
                whileHover={{ y: -3 }}
              >
                <div className="about-founder-photo">
                  {founder.image ? (
                    <img src={founder.image} alt={founder.name} />
                  ) : (
                    founder.initials
                  )}
                </div>
                <div>
                  <p className="about-founder-role">{founder.role}</p>
                  <h3 className="about-founder-name">{founder.name}</h3>
                  <p className="about-founder-bio">{founder.bio}</p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* ── Mini points (like WhyChoose, compact) ── */}
          <div className="about-points-row">
            {MINI_POINTS.map(({ icon: Icon, label }) => (
              <span key={label} className="about-point-pill">
                <Icon size={16} />
                {label}
              </span>
            ))}
          </div>

          {/* ── CTA bar (ServicesSection-style) ── */}
          <motion.div
            className="about-cta-bar"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <p className="about-cta-text">Want the full picture?</p>
              <p className="about-cta-sub">Our story, Mota Group legacy, and how we work.</p>
            </div>
            <Link to="/about" className="about-cta-btn">
              Read Our Full Story
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
