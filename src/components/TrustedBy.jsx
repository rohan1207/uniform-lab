import { Heart } from 'lucide-react';

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');
`;

export default function TrustedBy() {
  return (
    <>
      <style>{CSS}</style>

      <section className="w-full relative">

        {/* ── Badge ── */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #fff5f0 0%, #fce8e0 100%)',
              border: '1.5px solid rgba(37,99,235,0.15)',
              boxShadow: '0 4px 20px rgba(15,23,42,0.1), 0 1px 0 rgba(255,255,255,0.9) inset',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {/* Pulse dot */}
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ background: '#e05252' }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: '#e05252' }}
              />
            </span>

            <Heart
              size={13}
              strokeWidth={0}
              fill="#e05252"
              className="flex-shrink-0"
            />

            <span
              className="text-[13px] font-700 tracking-wide whitespace-nowrap"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: '#1a1a2e',
                letterSpacing: '0.01em',
              }}
            >
              Trusted by{' '}
              <span style={{ color: '#2563eb' }}>1,000+</span>
              {' '}Moms
            </span>
          </div>
        </div>

        {/* ── Full-width image ── */}
        <div className="w-full">
          <img
            src="/trustedby.png"
            alt="Trusted by 1000+ Moms"
            className="w-full h-full object-cover block"
            style={{ display: 'block' }}
          />
        </div>

      </section>
    </>
  );
}