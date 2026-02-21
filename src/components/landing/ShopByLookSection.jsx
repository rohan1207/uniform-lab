'use client';

import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { featuredSchools } from '@/data/featuredSchools';

const SHOP_BY_LOOK_SCHOOLS = featuredSchools
  .filter((s) => s.id === 'bharati-rabindranath-tagore' || s.id === 'the-orbis-school')
  .map((s) => ({
    ...s,
    shortName: s.id === 'bharati-rabindranath-tagore' ? 'BVRTSE' : 'The Orbis School',
    modelImage:
      s.id === 'bharati-rabindranath-tagore'
        ? '/bvrtse_shopbylook.png'
        : '/orbis_shopbylook.png',
  }));

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700;800&display=swap');

.sbl-sec {
  background: #FAF3F0;
  padding: 80px 0 88px;
  font-family: 'Nunito', sans-serif;
  position: relative;
  overflow: hidden;
}

/* Subtle decorative blob — purely aesthetic, doesn't affect layout */
.sbl-sec::before {
  content: '';
  position: absolute;
  top: -120px;
  left: -120px;
  width: 480px;
  height: 480px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(37,99,235,0.045) 0%, transparent 70%);
  pointer-events: none;
}

.sbl-inner {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  align-items: center;
  min-height: 520px;
}

/* ── LEFT COLUMN ── */
.sbl-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 64px;
}

.sbl-pill {
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
  margin-bottom: 20px;
  width: fit-content;
}

.sbl-h2 {
  font-family: 'Baloo 2', cursive;
  font-weight: 900;
  font-size: clamp(30px, 3.4vw, 46px);
  color: #1a1a2e;
  line-height: 1.08;
  letter-spacing: -0.5px;
  margin: 0 0 12px;
}

.sbl-h2 span { color: #2563eb; }

.sbl-sub {
  font-size: 15px;
  font-weight: 600;
  color: #64748b;
  line-height: 1.7;
  max-width: 420px;
  margin: 0 0 40px;
}

.sbl-divider {
  width: 48px;
  height: 3px;
  border-radius: 99px;
  background: linear-gradient(to right, #2563eb, #60a5fa);
  margin-bottom: 36px;
}

/* School card on left */
.sbl-school-card {
  background: #f8faff;
  border: 1.5px solid #e0eaff;
  border-radius: 20px;
  padding: 28px 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 4px 24px rgba(37,99,235,0.07);
  max-width: 380px;
}

.sbl-school-logo-wrap {
  display: flex;
  align-items: center;
}

.sbl-school-logo {
  max-width: 130px;
  max-height: 60px;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
}

.sbl-school-name {
  font-family: 'Baloo 2', cursive;
  font-weight: 800;
  font-size: clamp(20px, 2vw, 26px);
  color: #1e293b;
  line-height: 1.2;
  margin: 0;
}

.sbl-school-level {
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.02em;
  margin: 0;
}

/* Dots below school card */
.sbl-dots {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 20px;
}

.sbl-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #cbd5e1;
  transition: background 0.25s ease, transform 0.25s ease;
  cursor: pointer;
}

.sbl-dot.active {
  background: #2563eb;
  transform: scale(1.3);
}

/* ── RIGHT COLUMN ── */
.sbl-right {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 620px;
}

/* Arrow buttons flanking the model */
.sbl-arrow-left,
.sbl-arrow-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 4;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1.5px solid #e2e8f0;
  background: #fff;
  color: #475569;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  transition: border-color 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.sbl-arrow-left { left: 0; }
.sbl-arrow-right { right: 0; }

.sbl-arrow-left:hover,
.sbl-arrow-right:hover {
  border-color: #2563eb;
  color: #2563eb;
  box-shadow: 0 4px 18px rgba(37,99,235,0.18);
  transform: translateY(-50%) scale(1.08);
}

.sbl-arrow-left:active,
.sbl-arrow-right:active {
  transform: translateY(-50%) scale(0.97);
}

/* Model image */
.sbl-model-wrap {
  position: relative;
  width: 100%;
  max-width: 520px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.sbl-model-img {
  width: 100%;
  height: auto;
  max-height: 620px;
  object-fit: contain;
  object-position: center bottom;
  display: block;
  /* Remove any bg / shadow on the PNG itself */
  filter: drop-shadow(0 8px 32px rgba(0,0,0,0.10));
}

/* ── RESPONSIVE ── */
@media (max-width: 960px) {
  .sbl-inner {
    display: flex;
    flex-direction: column;
    grid-template-columns: unset;
    gap: 20px;
    min-height: auto;
  }

  .sbl-left {
    display: contents;
  }

  .sbl-heading {
    order: -2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-right: 0;
  }

  .sbl-left-rest {
    order: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .sbl-pill { margin: 0 auto 20px; }
  .sbl-sub { max-width: 100%; }
  .sbl-divider { margin: 0 auto 36px; }
  .sbl-school-card { max-width: 100%; }
  .sbl-dots { justify-content: center; }

  .sbl-right {
    order: -1;
    min-height: 380px;
  }

  .sbl-model-wrap { max-width: 340px; overflow: visible; }
  .sbl-model-img { max-height: 380px; transform: none; object-position: center center; }
}

@media (max-width: 640px) {
  .sbl-sec { padding: 28px 0 32px; }
  .sbl-inner { padding: 0 16px; gap: 12px; }
  .sbl-right { min-height: 300px; }

  /* Arrows: at section edges, minimal and light on phone */
  .sbl-arrow-left { left: 0; width: 30px; height: 30px; border-width: 1px; border-color: #e2e8f0; background: rgba(255,255,255,0.85); color: #94a3b8; box-shadow: none; }
  .sbl-arrow-right { right: 0; width: 30px; height: 30px; border-width: 1px; border-color: #e2e8f0; background: rgba(255,255,255,0.85); color: #94a3b8; box-shadow: none; }
  .sbl-arrow-left:hover, .sbl-arrow-right:hover { color: #64748b; box-shadow: 0 1px 6px rgba(37,99,235,0.1); }

  /* Model: scale downward from top so head isn't cropped, fills space below */
  .sbl-model-wrap { max-width: 220px; overflow: visible; align-items: flex-start; }
  .sbl-model-img {
    max-height: 320px;
    object-fit: contain;
    object-position: top center;
    transform: scale(1.18);
    transform-origin: top center;
  }

  /* Compact heading on phone */
  .sbl-heading .sbl-pill { margin-bottom: 10px; padding: 4px 12px; font-size: 10px; }
  .sbl-heading .sbl-h2 { font-size: 22px; margin-bottom: 6px; }
  .sbl-heading .sbl-sub { font-size: 13px; margin-bottom: 12px; line-height: 1.5; }
  .sbl-heading .sbl-divider { margin-bottom: 12px; }

  /* School card: slightly bigger, more noticeable, pushed down a bit on phone */
  .sbl-left-rest { margin-top: 60px; }
  .sbl-school-card {
    padding: 14px 18px 12px;
    gap: 10px;
    border-radius: 16px;
    max-width: 92%;
    min-width: 260px;
    box-shadow: 0 6px 28px rgba(37,99,235,0.1);
  }
  .sbl-school-logo { max-width: 120px; max-height: 48px; }
  .sbl-school-name { font-size: 18px; }
  .sbl-school-level { font-size: 12px; }
  .sbl-dots { margin-top: 10px; gap: 5px; }
  .sbl-dot { width: 6px; height: 6px; }
}
`;

export default function ShopByLookSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const school = SHOP_BY_LOOK_SCHOOLS[index];
  const total = SHOP_BY_LOOK_SCHOOLS.length;

  const goPrev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  const cardVariants = {
    enter: (dir) => ({ x: dir > 0 ? 30 : -30, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -30 : 30, opacity: 0 }),
  };

  return (
    <>
      <style>{CSS}</style>

      <section className="sbl-sec">
        <div className="sbl-inner">

          {/* ── LEFT ── */}
          <div className="sbl-left">
            <div className="sbl-heading">
              <div className="sbl-pill">
                <Sparkles size={12} strokeWidth={2.5} />
                Shop by Look
              </div>

              <h2 className="sbl-h2">
                See the Look.<br />
                <span>Choose the School.</span>
              </h2>

              <p className="sbl-sub">
                Browse uniforms by school. Select a school to view its complete look and explore available options.
              </p>

              <div className="sbl-divider" />
            </div>

            <div className="sbl-left-rest">
            {/* Animated school card */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={school.id}
                className="sbl-school-card"
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {school.logo && (
                  <div className="sbl-school-logo-wrap">
                    <img src={school.logo} alt={school.name} className="sbl-school-logo" />
                  </div>
                )}
                <div>
                  <p className="sbl-school-name">{school.shortName}</p>
                  {school.level && <p className="sbl-school-level">{school.level}</p>}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="sbl-dots">
              {SHOP_BY_LOOK_SCHOOLS.map((_, i) => (
                <div
                  key={i}
                  className={`sbl-dot${i === index ? ' active' : ''}`}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                />
              ))}
            </div>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="sbl-right">

            {/* Left arrow */}
            <button className="sbl-arrow-left" onClick={goPrev} aria-label="Previous school">
              <ChevronLeft size={20} strokeWidth={2} />
            </button>

            {/* Model image */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={school.id}
                className="sbl-model-wrap"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <img
                  src={school.modelImage}
                  alt={`${school.shortName} uniform look`}
                  className="sbl-model-img"
                />
              </motion.div>
            </AnimatePresence>

            {/* Right arrow */}
            <button className="sbl-arrow-right" onClick={goNext} aria-label="Next school">
              <ChevronRight size={20} strokeWidth={2} />
            </button>
          </div>

        </div>
      </section>
    </>
  );
}