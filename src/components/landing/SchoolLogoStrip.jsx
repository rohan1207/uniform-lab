'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { featuredSchools } from '@/data/featuredSchools';

/**
 * SchoolLogoStrip
 *
 * A minimal, bare logo marquee — no cards, no bg, no shadows.
 * Scrolls left until all logos are visible, then reverses right. Loops forever.
 * Edge-fades via CSS mask. Responsive. Pauses on hover.
 */
export default function SchoolLogoStrip() {
  const wrapRef  = useRef(null);
  const trackRef = useRef(null);
  const [shift, setShift] = useState(0);

  const schools = useMemo(
    () => featuredSchools.filter((s) => s?.logo || s?.name),
    []
  );
  const marqueeSchools = useMemo(() => {
    if (schools.length <= 5) return [...schools, ...schools, ...schools];
    if (schools.length <= 8) return [...schools, ...schools];
    return schools;
  }, [schools]);

  /* Measure how far the track overflows the container */
  useEffect(() => {
    const measure = () => {
      const wrap  = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;
      const overflow = Math.max(0, track.scrollWidth - wrap.clientWidth);
      setShift(overflow);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [schools.length]);

  /* Scale duration so speed feels consistent regardless of logo count (lower = faster) */
  const duration = `${Math.max(11, shift / 48)}s`;

  if (!schools.length) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600&display=swap');

        @keyframes logo-bounce {
          0%   { transform: translateX(0px); }
          100% { transform: translateX(calc(-1 * var(--logo-shift, 0px))); }
        }

        .logo-animated {
          animation: logo-bounce var(--logo-dur, 20s) ease-in-out infinite alternate;
          will-change: transform;
        }

        /* Pause on hover — lets users read logos */
        .logo-strip-wrap:hover .logo-animated {
          animation-play-state: paused;
        }
      `}</style>

      {/* Outer wrapper: faded edges, full width, no overflow */}
      <div
        ref={wrapRef}
        className="logo-strip-wrap w-full overflow-hidden py-6 sm:py-8 md:py-10"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%)',
        }}
      >
        {/* Animated track — naturally wider than container */}
        <div
          ref={trackRef}
          className="logo-animated inline-flex items-center gap-10 sm:gap-14 px-3"
          style={
            {
              '--logo-shift': `${shift}px`,
              '--logo-dur': duration,
            }
          }
        >
          {marqueeSchools.map((school, i) =>
            school.logo ? (
              <img
                key={`${school.name ?? 'school'}-${i}`}
                src={school.logo}
                alt={school.name ?? 'School logo'}
                draggable={false}
                className="
                  h-24 w-auto max-w-[250px]
                  sm:h-28 sm:max-w-[290px]
                  md:h-[124px] md:max-w-[330px]
                  object-contain object-center
                  flex-shrink-0 select-none
                  opacity-75 hover:opacity-100
                  transition-opacity duration-300
                "
              />
            ) : (
              <span
                key={`${school.name ?? 'school'}-${i}`}
                className="
                  flex-shrink-0 whitespace-nowrap
                  text-sm sm:text-base font-semibold
                  text-slate-400 tracking-wide
                  [font-family:'DM_Sans',sans-serif]
                "
              >
                {school.name}
              </span>
            )
          )}
        </div>
      </div>
    </>
  );
}