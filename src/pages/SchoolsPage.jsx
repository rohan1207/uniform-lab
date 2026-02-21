import { useState, useMemo, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { featuredSchools } from '@/data/featuredSchools';

/* ─────────────────────────────────────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700&display=swap');

  /* ── Root ── */
  .sp-root {
    background: #f8faff;
    min-height: 100vh;
    font-family: 'Nunito', sans-serif;
  }

  /* ── Search bar ── */
  .sp-search {
    background: #fff;
    border: 2px solid #ddeaff;
    border-radius: 999px;
    outline: none;
    color: #1a1a2e;
    font-family: 'Nunito', sans-serif;
    font-size: clamp(13px, 1.1vw, 15px);
    font-weight: 600;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
    box-shadow: 0 2px 12px rgba(37,99,235,0.06);
  }
  .sp-search:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37,99,235,0.12);
  }
  .sp-search::placeholder { color: #9ca3af; }

  /* ═══════════════════════════════════════════════════════════════════════════
     SCHOOL CARD — dual-zone: white logo top + school image bottom
  ═══════════════════════════════════════════════════════════════════════════ */

  .sp-card-link {
    text-decoration: none;
    display: block;
    outline: none;
  }

  /* Card shell — no border at all, only floating shadow */
  .sp-card-new {
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    overflow: hidden;
    background: #ffffff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    will-change: transform;
  }

  /* ── Visual area: flex column, two stacked zones ── */
  .sp-card-visual {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* preserve-3d so child layers feel truly layered */
    transform-style: preserve-3d;
  }

  /* ── TOP ZONE: pure white, logo lives here ── */
  .sp-card-logo-zone {
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    /* fixed height — gives consistent logo frame across cards */
    height: 136px;
    flex-shrink: 0;
    padding: 14px 16px;
    will-change: transform;
  }

  /* Logo image — big and clean */
  .sp-card-logo-img {
    max-height: 116px;
    max-width: 92%;
    width: auto;
    object-fit: contain;
    display: block;
    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.10));
  }

  /* Initials badge (no logo) */
  .sp-card-initials {
    width: 64px;
    height: 64px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f5f9;
    border: 2px solid #e2e8f0;
    font-family: 'Baloo 2', cursive;
    font-weight: 900;
    font-size: 22px;
    color: #334155;
    letter-spacing: -0.5px;
  }

  /* ── BOTTOM ZONE: school building photo ── */
  .sp-card-school-zone {
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    will-change: transform;
  }

  .sp-card-school-img {
    width: 100%;
    height: 100%;
    object-fit: cover;   /* fill the zone completely, no grey gaps */
    display: block;
    will-change: transform;
  }

  /* ── Card body (text below visual) ── */
  .sp-card-body {
    /* Fixed height so every card is identical regardless of name length */
    height: 84px;
    padding: 10px 14px 14px;
    background: #ffffff;
    overflow: hidden;
    flex-shrink: 0;
  }

  .sp-card-level {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 999px;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    font-size: clamp(9px, 0.7vw, 10px);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #2563eb;
    background: linear-gradient(135deg, #eef5ff 0%, #ddeaff 100%);
    margin-bottom: 6px;
  }

  .sp-card-name {
    margin: 0;
    font-family: 'Baloo 2', cursive;
    font-weight: 900;
    color: #1a1a2e;
    line-height: 1.25;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: clamp(12px, 1vw, 14px);
  }

  /* ── View-more button (game style) ── */
  .sp-view-more {
    font-family: 'Baloo 2', cursive;
    font-weight: 900;
    font-size: clamp(12px, 1.1vw, 14px);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #fff;
    background: linear-gradient(180deg, #4db8ff 0%, #0077e6 55%, #005bbf 100%);
    border: none;
    border-radius: 999px;
    padding: 12px 36px;
    cursor: pointer;
    box-shadow: 0 5px 0 0 #003a7a, 0 0 0 3px #005bbf, 0 0 0 6px #003a7a,
                inset 0 2px 0 rgba(255,255,255,0.35), inset 0 -3px 0 rgba(0,0,0,0.3);
    transition: transform 0.1s ease, box-shadow 0.1s ease, filter 0.12s ease;
    text-shadow: 0 1px 0 #003a7a, 0 2px 6px rgba(0,0,0,0.35);
  }
  .sp-view-more:hover  { filter: brightness(1.08); transform: translateY(-2px); }
  .sp-view-more:active { transform: translateY(4px); box-shadow: 0 1px 0 0 #003a7a, 0 0 0 3px #005bbf, 0 0 0 5px #003a7a; }

  /* ═══════════════════════════════════════════════════════════════════════════
     MOBILE — phones (< 768 px)
  ═══════════════════════════════════════════════════════════════════════════ */
  @media (max-width: 767px) {

    .sp-root { padding-top: 90px !important; }
    .sp-header { margin-bottom: 24px !important; }

    .sp-heading {
      font-size: 28px !important;
      letter-spacing: -0.2px !important;
    }
    .sp-subheading { font-size: 13px !important; }

    .sp-search {
      font-size: 14px !important;
      padding: 13px 16px 13px 44px !important;
    }

    .sp-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 12px !important;
      margin-bottom: 28px !important;
    }

    .sp-card-new     { border-radius: 16px !important; }

    /* Logo zone — shorter on mobile */
    .sp-card-logo-zone {
      height: 104px !important;
      padding: 10px 12px !important;
    }
    .sp-card-logo-img    { max-height: 82px !important; max-width: 92% !important; }
    .sp-card-initials    { width: 48px !important; height: 48px !important; font-size: 17px !important; border-radius: 13px !important; }

    .sp-card-body    { height: 66px !important; padding: 8px 10px 10px !important; }
    .sp-card-name    { font-size: 11.5px !important; }
    .sp-card-level   { font-size: 9px !important; margin-bottom: 4px !important; }

    .sp-view-more {
      width: 100% !important;
      padding: 13px 24px !important;
      font-size: 13px !important;
    }
  }
`;

const INITIAL_VISIBLE = 8;

/* ─────────────────────────────────────────────────────────────────────────────
   SchoolCard — white logo zone + school image zone + 3-D tilt
───────────────────────────────────────────────────────────────────────────── */
function SchoolCard({ school }) {
  const cardRef = useRef(null);
  const rafRef  = useRef(null);
  const [tilt,   setTilt]   = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  /* ── Mouse ── */
  const onMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const r  = cardRef.current.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
      const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
      setTilt({ x: dx, y: dy });
    });
  }, []);

  const onMouseEnter = useCallback(() => setActive(true), []);
  const onMouseLeave = useCallback(() => {
    setActive(false);
    setTilt({ x: 0, y: 0 });
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── Touch ── */
  const onTouchMove = useCallback((e) => {
    if (!cardRef.current || !e.touches[0]) return;
    const r  = cardRef.current.getBoundingClientRect();
    const dx = (e.touches[0].clientX - r.left - r.width  / 2) / (r.width  / 2);
    const dy = (e.touches[0].clientY - r.top  - r.height / 2) / (r.height / 2);
    setActive(true);
    setTilt({ x: dx, y: dy });
  }, []);

  const onTouchEnd = useCallback(() => {
    setActive(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  /* Initials placeholder */
  const initials = school.name
    .replace(/[^a-zA-Z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  /* ── 3-D parallax values
       Card  → slight whole-card perspective tilt
       Logo  → shifts gently OPPOSITE direction (feels closer / foreground)
       Image → shifts more in the SAME direction (feels deeper / background)
  */
  const CARD_ROT   = 7;
  const LOGO_SHIFT = 4;
  const IMG_SHIFT  = 10;
  const easeOut    = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const transition = active ? 'transform 0.07s linear' : `transform 0.5s ${easeOut}`;

  const cardTransform = active
    ? `perspective(900px) rotateX(${tilt.y * -CARD_ROT}deg) rotateY(${tilt.x * CARD_ROT}deg) scale(1.03)`
    : `perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)`;

  /* Logo: counter-parallax (opposite direction = foreground) */
  const logoTransform = active
    ? `translate(${tilt.x * -LOGO_SHIFT}px, ${tilt.y * -LOGO_SHIFT}px)`
    : `translate(0px, 0px)`;

  /* School image: same direction, more shift = deeper plane */
  const imgTransform = active
    ? `translate(${tilt.x * IMG_SHIFT}px, ${tilt.y * IMG_SHIFT}px) scale(1.06)`
    : `translate(0px, 0px) scale(1)`;

  return (
    <Link to={`/schools/${school.id}`} className="sp-card-link">
      <div
        ref={cardRef}
        className="sp-card-new"
        style={{
          transform:  cardTransform,
          boxShadow:  active
            ? '0 22px 52px rgba(0,0,0,0.16), 0 6px 18px rgba(0,0,0,0.09)'
            : '0 4px 24px rgba(0,0,0,0.08)',
          transition: active
            ? 'transform 0.07s linear, box-shadow 0.07s linear'
            : `transform 0.5s ${easeOut}, box-shadow 0.35s ease`,
        }}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="sp-card-visual">

          {/* ── TOP: white logo zone ── */}
          <div
            className="sp-card-logo-zone"
            style={{ transform: logoTransform, transition }}
          >
            {school.logo ? (
              <img
                src={school.logo}
                alt={`${school.name} logo`}
                className="sp-card-logo-img"
                draggable={false}
              />
            ) : (
              <div className="sp-card-initials">{initials}</div>
            )}
          </div>

          {/* ── BOTTOM: school building image ── */}
          <div className="sp-card-school-zone">
            <img
              src={school.image}
              alt={school.name}
              className="sp-card-school-img"
              style={{ transform: imgTransform, transition }}
              draggable={false}
            />
          </div>

        </div>

        {/* ── Name row ── */}
        <div className="sp-card-body">
          <span className="sp-card-level">{school.level}</span>
          <p className="sp-card-name">{school.name}</p>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────────────────── */
export default function SchoolsPage() {
  const [query,   setQuery]   = useState('');
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    if (!query.trim()) return featuredSchools;
    const q = query.trim().toLowerCase();
    return featuredSchools.filter(
      (s) => s.name.toLowerCase().includes(q) || s.level.toLowerCase().includes(q)
    );
  }, [query]);

  const visible     = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore     = filtered.length > INITIAL_VISIBLE;
  const isCollapsed = !showAll && hasMore;

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <main className="sp-root pt-20 pb-12 sm:pt-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <header className="sp-header text-center mb-8 sm:mb-9">
            <div className="flex justify-center mb-4">
              <span
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest"
                style={{
                  background: 'linear-gradient(135deg, #eef5ff 0%, #ddeaff 100%)',
                  color: '#2563eb',
                  fontSize: 'clamp(9px, 0.8vw, 11px)',
                  boxShadow: '0 1px 8px rgba(37,99,235,0.14)',
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                🏫 500+ Schools on board
              </span>
            </div>

            <h1
              className="sp-heading m-0 font-black text-[#1a1a2e] leading-tight mb-3"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontSize: 'clamp(28px, 4vw, 54px)',
                letterSpacing: '-0.5px',
              }}
            >
              Find Your School
          </h1>

            <p
              className="sp-subheading m-0 font-semibold text-gray-400 max-w-xl mx-auto leading-snug"
              style={{ fontSize: 'clamp(13px, 1.1vw, 16px)' }}
            >
            Choose your school and shop uniforms, blazers, ties, socks and accessories — all in one place.
          </p>

            <div
              className="mx-auto mt-5"
              style={{
                height: '2px', width: '60px', borderRadius: '99px',
                background: 'linear-gradient(to right, #2563eb, #0ea5e9)',
              }}
            />
        </header>

          {/* ── Search ── */}
          <div className="relative mb-7 max-w-md mx-auto">
          <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: '#2563eb' }}
              strokeWidth={2}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your school..."
              className="sp-search w-full pl-12 pr-4 py-3.5"
            aria-label="Search school"
          />
        </div>

          {/* ── Cards grid ── */}
          <div className="sp-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-7">
          {visible.map((school) => (
              <SchoolCard key={school.id} school={school} />
          ))}
        </div>

          {/* ── Empty state ── */}
        {filtered.length === 0 && (
            <p
              className="text-center py-8 font-semibold text-gray-400"
              style={{ fontFamily: "'Nunito', sans-serif", fontSize: 'clamp(14px, 1.1vw, 16px)' }}
            >
            No school found. Try a different search.
          </p>
        )}

          {/* ── View more ── */}
        {isCollapsed && (
            <div className="text-center mt-2">
            <button
              type="button"
              onClick={() => setShowAll(true)}
                className="sp-view-more"
            >
                View {filtered.length - INITIAL_VISIBLE} more schools ✦
            </button>
          </div>
        )}

      </div>
    </main>
    </>
  );
}
