'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { featuredSchools } from '@/data/featuredSchools';

/**
 * SchoolLogoStrip
 *
 * Minimal logo marquee — small, uniform logos in a line. Scrolls left then right, loops forever.
 * Robust: re-measures on visibility change and after mount so animation never sticks.
 * Edge-fades via CSS mask. Pauses on hover.
 */
const LOGO_HEIGHT = 68;
const LOGO_WIDTH  = 140; /* fixed box so all same aspect-ratio container, object-contain inside */

export default function SchoolLogoStrip() {
  const wrapRef  = useRef(null);
  const trackRef = useRef(null);
  const [shift, setShift] = useState(200);

  const schools = useMemo(
    () => featuredSchools.filter((s) => s?.logo || s?.name),
    []
  );
  /* Always duplicate so track overflows on all viewports (phone included) */
  const marqueeSchools = useMemo(() => {
    const list = schools.length ? [...schools, ...schools, ...schools] : [];
    return list;
  }, [schools]);

  /* Measure on mount, resize, and when page becomes visible (robust after redirect / tab switch) */
  useEffect(() => {
    const measure = () => {
      const wrap  = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;
      const overflow = Math.max(100, track.scrollWidth - wrap.clientWidth);
      setShift(overflow);
    };

    measure();
    const t1 = setTimeout(measure, 50);
    const t2 = setTimeout(measure, 350);

    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);

    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        requestAnimationFrame(measure);
        setTimeout(measure, 80);
      }
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisible);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [schools.length]);

  const duration = `${Math.max(14, Math.min(28, shift / 35))}s`;

  if (!schools.length) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600&display=swap');

        @keyframes logo-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-1 * var(--logo-shift, 200px))); }
        }

        .logo-animated {
          animation: logo-marquee var(--logo-dur, 18s) ease-in-out infinite alternate;
          will-change: transform;
          backface-visibility: hidden;
        }

        .logo-strip-wrap:hover .logo-animated {
          animation-play-state: paused;
        }

        .logo-strip-cell {
          width: ${LOGO_WIDTH}px;
          height: ${LOGO_HEIGHT}px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .logo-strip-cell img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          object-position: center;
        }
      `}</style>

      <div
        ref={wrapRef}
        className="logo-strip-wrap w-full overflow-hidden py-4 sm:py-5"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)',
        }}
      >
        <div
          ref={trackRef}
          className="logo-animated inline-flex items-center gap-8 px-2"
          style={{
            '--logo-shift': `${shift}px`,
            '--logo-dur': duration,
          }}
        >
          {marqueeSchools.map((school, i) => (
            <div key={`${school.name ?? 'school'}-${i}`} className="logo-strip-cell">
              {school.logo ? (
                <img
                  src={school.logo}
                  alt={school.name ?? 'School logo'}
                  draggable={false}
                  className="select-none opacity-80 hover:opacity-100 transition-opacity duration-200"
                />
              ) : (
                <span
                  className="text-xs font-semibold text-slate-400 truncate w-full text-center px-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {school.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
