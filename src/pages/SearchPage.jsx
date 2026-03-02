import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, X, School, ArrowRight } from 'lucide-react';
import { cachedFetch } from '@/lib/apiCache';

/* ---------------------------------------------------------------------------
   CSS - premium card style matching FeaturedSchools
--------------------------------------------------------------------------- */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700&display=swap');

  .srch-root {
    background: #f8faff;
    min-height: 100vh;
    font-family: 'Nunito', sans-serif;
  }

  .srch-input {
    background: #fff;
    border: 2px solid #ddeaff;
    border-radius: 999px;
    outline: none;
    color: #1a1a2e;
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 600;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
    box-shadow: 0 2px 16px rgba(37,99,235,0.08);
  }
  .srch-input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37,99,235,0.12), 0 4px 20px rgba(37,99,235,0.10);
  }
  .srch-input::placeholder { color: #9ca3af; }

  .srch-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 14px;
    border-radius: 999px;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #475569;
    cursor: pointer;
    transition: all 0.15s ease;
    white-space: nowrap;
  }
  .srch-chip:hover {
    background: #eef5ff;
    border-color: #93bbfc;
    color: #2563eb;
  }

  .srch-card-link {
    text-decoration: none;
    display: block;
    outline: none;
  }

  .srch-card {
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    overflow: hidden;
    background: #ffffff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    will-change: transform;
  }

  .srch-card-tag {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 2;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    font-size: 9px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #64748b;
    background: rgba(255,255,255,0.92);
    box-shadow: 0 1px 2px rgba(0,0,0,0.06);
  }

  .srch-card-visual {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform-style: preserve-3d;
  }

  .srch-card-logo-zone {
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 136px;
    flex-shrink: 0;
    padding: 14px 16px;
    will-change: transform;
  }

  .srch-card-logo-img {
    max-height: 116px;
    max-width: 92%;
    width: auto;
    object-fit: contain;
    display: block;
    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.10));
  }

  .srch-card-initials {
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

  .srch-card-school-zone {
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    will-change: transform;
  }

  .srch-card-school-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    will-change: transform;
  }

  .srch-card-body {
    height: 82px;
    padding: 10px 12px 12px 22px;
    overflow: hidden;
    flex-shrink: 0;
    background: linear-gradient(165deg, #f8fafc 0%, #f1f5f9 50%, #eef2f7 100%);
    border-radius: 0 0 20px 20px;
    border-top: 1px solid rgba(203, 213, 225, 0.6);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 2px rgba(0,0,0,0.04);
  }

  .srch-card-name {
    margin: 0;
    font-family: 'Baloo 2', cursive;
    font-weight: 900;
    color: #0f172a;
    line-height: 1.28;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: clamp(13px, 1.05vw, 15px);
    letter-spacing: -0.02em;
  }

  .srch-hl {
    background: rgba(37, 99, 235, 0.12);
    color: #1d4ed8;
    border-radius: 2px;
    padding: 0 1px;
  }

  @media (max-width: 767px) {
    .srch-root     { padding-top: 56px !important; }
    .srch-heading  { font-size: 24px !important; }

    .srch-input {
      font-size: 16px !important;
      padding: 13px 40px 13px 44px !important;
    }

    .srch-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 12px !important;
    }

    .srch-card          { border-radius: 16px !important; }
    .srch-card-logo-zone { height: 104px !important; padding: 10px 12px !important; }
    .srch-card-logo-img  { max-height: 82px !important; max-width: 92% !important; }
    .srch-card-initials  { width: 48px !important; height: 48px !important; font-size: 17px !important; border-radius: 13px !important; }
    .srch-card-body      { height: 68px !important; padding: 8px 10px 10px 18px !important; }
    .srch-card-name      { font-size: 12px !important; }
    .srch-card-tag       { font-size: 8px !important; padding: 2px 5px !important; top: 6px !important; right: 6px !important; }

    .srch-chip { font-size: 11px !important; padding: 5px 11px !important; }
  }
`;

/* ---------------------------------------------------------------------------
   Fuzzy matching - every query word must appear somewhere in school fields
--------------------------------------------------------------------------- */
function matchesQuery(school, rawQuery) {
  if (!rawQuery) return true;
  const words = rawQuery.toLowerCase().split(/\s+/).filter(Boolean);
  const haystack = [school.name, school.level, school.city, school.area]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return words.every((w) => haystack.includes(w));
}

/* ---------------------------------------------------------------------------
   Highlight matched words inside school name
--------------------------------------------------------------------------- */
function HighlightName({ name, rawQuery }) {
  if (!rawQuery || !rawQuery.trim()) return name;
  const words = rawQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const escaped = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = name.split(re);
  return parts.map((part, i) =>
    re.test(part) ? (
      <span key={i} className="srch-hl">{part}</span>
    ) : (
      part
    ),
  );
}

/* ---------------------------------------------------------------------------
   SchoolCard - 3-D tilt card with logo + school image
--------------------------------------------------------------------------- */
function SchoolCard({ school, query }) {
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const onMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      setTilt({ x: dx, y: dy });
    });
  }, []);

  const onMouseEnter = useCallback(() => setActive(true), []);
  const onMouseLeave = useCallback(() => {
    setActive(false);
    setTilt({ x: 0, y: 0 });
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const onTouchMove = useCallback((e) => {
    if (!cardRef.current || !e.touches[0]) return;
    const r = cardRef.current.getBoundingClientRect();
    const dx = (e.touches[0].clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.touches[0].clientY - r.top - r.height / 2) / (r.height / 2);
    setActive(true);
    setTilt({ x: dx, y: dy });
  }, []);

  const onTouchEnd = useCallback(() => {
    setActive(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  const initials = school.name
    .replace(/[^a-zA-Z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  const CARD_ROT = 7;
  const LOGO_SHIFT = 4;
  const IMG_SHIFT = 10;
  const easeOut = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const transition = active ? 'transform 0.07s linear' : `transform 0.5s ${easeOut}`;

  const cardTransform = active
    ? `perspective(900px) rotateX(${tilt.y * -CARD_ROT}deg) rotateY(${tilt.x * CARD_ROT}deg) scale(1.03)`
    : 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';

  const logoTransform = active
    ? `translate(${tilt.x * -LOGO_SHIFT}px, ${tilt.y * -LOGO_SHIFT}px)`
    : 'translate(0px, 0px)';

  const imgTransform = active
    ? `translate(${tilt.x * IMG_SHIFT}px, ${tilt.y * IMG_SHIFT}px) scale(1.06)`
    : 'translate(0px, 0px) scale(1)';

  return (
    <Link to={`/schools/${school.slug || school.id}`} className="srch-card-link">
      <div
        ref={cardRef}
        className="srch-card"
        style={{
          transform: cardTransform,
          boxShadow: active
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
        <span className="srch-card-tag">{school.level}</span>

        <div className="srch-card-visual">
          <div
            className="srch-card-logo-zone"
            style={{ transform: logoTransform, transition }}
          >
            {school.logo ? (
              <img
                src={school.logo}
                alt={`${school.name} logo`}
                className="srch-card-logo-img"
                draggable={false}
              />
            ) : (
              <div className="srch-card-initials">{initials}</div>
            )}
          </div>

          <div className="srch-card-school-zone">
            <img
              src={school.image}
              alt={school.name}
              className="srch-card-school-img"
              style={{ transform: imgTransform, transition }}
              draggable={false}
            />
          </div>
        </div>

        <div className="srch-card-body">
          <p className="srch-card-name">
            <HighlightName name={school.name} rawQuery={query} />
          </p>
        </div>
      </div>
    </Link>
  );
}

/* ---------------------------------------------------------------------------
   SearchPage - School-first search
--------------------------------------------------------------------------- */
export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQ);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await cachedFetch('/api/public/schools');
        if (!Array.isArray(data) || cancelled) return;
        const mapped = data.map((s) => ({
          id: s._id || s.slug,
          slug: s.slug,
          name: s.name,
          level: s.level || 'CBSE',
          image: s.imageUrl || '/school-placeholder.png',
          logo: s.logoUrl || null,
          city: s.city || '',
          area: s.area || '',
        }));
        setSchools(mapped);
      } catch {
        /* keep empty */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed) {
      setSearchParams({ q: trimmed }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [query, setSearchParams]);

  const trimmed = query.trim();
  const results = useMemo(
    () => schools.filter((s) => matchesQuery(s, trimmed)),
    [schools, trimmed],
  );

  const suggestions = useMemo(() => {
    const skip = new Set(['school', 'the', 'of', 'and', 'for', 'public', 'international', 'vidyalaya', 'academy', 'high', 'english', 'medium']);
    const names = schools.slice(0, 10).map((s) => {
      const words = s.name.split(/\s+/).filter((w) => w.length > 2 && !skip.has(w.toLowerCase()));
      return words[0] || s.name.split(' ')[0];
    });
    return [...new Set(names)].slice(0, 6);
  }, [schools]);

  const clearQuery = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <>
      <style>{CSS}</style>

      <main className="srch-root pt-12 pb-16 sm:pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <header className="text-center mb-8 sm:mb-10">
            <div className="flex justify-center mb-3">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full font-bold uppercase tracking-widest"
                style={{
                  background: 'linear-gradient(135deg, #eef5ff 0%, #ddeaff 100%)',
                  color: '#2563eb',
                  fontSize: 'clamp(9px, 0.8vw, 11px)',
                  boxShadow: '0 1px 8px rgba(37,99,235,0.14)',
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                Find & Shop
              </span>
            </div>

            <h1
              className="srch-heading m-0 font-black text-[#1a1a2e] leading-tight mb-2"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontSize: 'clamp(26px, 3.6vw, 48px)',
                letterSpacing: '-0.5px',
              }}
            >
              Search Your School
            </h1>

            <p
              className="m-0 font-semibold text-gray-400 max-w-lg mx-auto leading-snug"
              style={{ fontSize: 'clamp(13px, 1.1vw, 16px)' }}
            >
              Type your school name to find uniforms, sports kits, accessories and more.
            </p>
          </header>

          <div className="relative mb-5 max-w-xl mx-auto">
            <SearchIcon
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
              style={{ color: '#2563eb' }}
              strokeWidth={2}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Bharati Vidyapeeth, DPS, Ryan..."
              className="srch-input w-full pl-12 pr-10 py-3.5 sm:py-4"
              aria-label="Search school"
            />
            {trimmed && (
              <button
                type="button"
                onClick={clearQuery}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-full border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {!trimmed && suggestions.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-xl mx-auto">
              <span className="text-[10px] uppercase tracking-[0.14em] font-bold text-slate-400 self-center mr-1">
                Try:
              </span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="srch-chip"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-baseline justify-between mb-4 max-w-7xl mx-auto">
            <p
              className="text-xs sm:text-sm font-semibold text-slate-400"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {loading ? (
                'Loading schools...'
              ) : trimmed ? (
                <>
                  <span className="text-slate-700">{results.length}</span>
                  {results.length === 1 ? ' school' : ' schools'} for{' '}
                  <span className="text-[#2563eb]">"{trimmed}"</span>
                </>
              ) : (
                <>
                  <span className="text-slate-700">{schools.length}</span> partner schools
                </>
              )}
            </p>

            {trimmed && results.length > 0 && (
              <button
                type="button"
                onClick={clearQuery}
                className="text-xs font-semibold text-[#2563eb] hover:underline"
              >
                Show all
              </button>
            )}
          </div>

          {loading && (
            <div className="srch-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden bg-white"
                  style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
                >
                  <div className="h-[136px] bg-slate-100 animate-pulse" />
                  <div className="aspect-square bg-slate-50 animate-pulse" />
                  <div className="h-[82px] p-4 bg-slate-50">
                    <div className="h-3 w-3/4 bg-slate-200 rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-slate-200 rounded animate-pulse mt-2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="srch-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {results.map((school) => (
                <SchoolCard key={school.id} school={school} query={trimmed} />
              ))}
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-slate-200 bg-white text-center mx-auto max-w-lg">
              <div className="mb-4 w-16 h-16 rounded-full bg-[#eef5ff] flex items-center justify-center">
                <SearchIcon size={28} className="text-[#2563eb]" />
              </div>
              <p
                className="mb-2 font-black text-[#1a1a2e]"
                style={{ fontFamily: "'Baloo 2', cursive", fontSize: '20px' }}
              >
                {trimmed ? 'No school found' : 'No schools available'}
              </p>
              <p
                className="text-sm text-slate-400 max-w-xs leading-relaxed"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {trimmed ? (
                  <>
                    We couldn't find a school matching <strong>"{trimmed}"</strong>.
                    Try a shorter name or check spelling.
                  </>
                ) : (
                  'Schools will appear here once they are added.'
                )}
              </p>
              {trimmed && (
                <button
                  type="button"
                  onClick={clearQuery}
                  className="mt-5 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold text-white"
                  style={{
                    background: 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)',
                    boxShadow: '0 2px 8px rgba(37,99,235,0.3)',
                  }}
                >
                  Clear search <X size={14} />
                </button>
              )}
            </div>
          )}

          {!loading && trimmed && results.length > 0 && (
            <div className="text-center mt-8">
              <Link
                to="/schools"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#2563eb] hover:underline"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Browse all schools <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
