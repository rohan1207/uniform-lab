import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { ChevronDown, Truck, Tag, ShieldCheck, ArrowRight } from 'lucide-react';
import { HeroCTAFace } from '@/components/hero/HeroCTAFace';

const MOBILE_BREAKPOINT = 640;

export default function Hero() {
  const imageControls = useAnimation();
  const sectionControls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ctaRef = useRef(null);
  const headContainerRef = useRef(null);
  const [headBounds, setHeadBounds] = useState({ left: 0, top: 0, width: 1, height: 1 });

  const onMouseMove = useCallback((e) => setMouse({ x: e.clientX, y: e.clientY }), []);

  useEffect(() => {
    const updateBounds = () => {
      if (headContainerRef.current) setHeadBounds(headContainerRef.current.getBoundingClientRect());
    };
    updateBounds();
    const id = setTimeout(updateBounds, 0);
    window.addEventListener('resize', updateBounds);
    return () => {
      clearTimeout(id);
      window.removeEventListener('resize', updateBounds);
    };
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    imageControls.set({ x: '0' });
  }, [imageControls, isMobile]);

  useEffect(() => {
    sectionControls.set({ scale: 1, opacity: 1 });
  }, [sectionControls]);

  return (
    <motion.section
      initial={{ scale: 1, opacity: 1 }}
      animate={sectionControls}
      onMouseMove={onMouseMove}
      className="relative min-h-screen overflow-hidden pt-16 hero-section"
    >
      {/* Logo top center – accent line ties to hero palette */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <Link to="/" className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hero-accent)] focus-visible:ring-offset-2 rounded-lg">
          {logoError ? (
            <span className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-[var(--hero-heading)] whitespace-nowrap shadow-none">
              The Uniform Lab
            </span>
          ) : (
            <img
              src="/logo.png"
              alt="The Uniform Lab"
              className="h-28 w-auto sm:h-32 md:h-36 object-contain shadow-none"
              onError={() => setLogoError(true)}
            />
          )}
        </Link>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1] overflow-hidden bg-[var(--hero-bg)]">
        <motion.div
          initial={{ x: '0' }}
          animate={imageControls}
          className="relative w-[96vmin] sm:w-[120vmin] h-[62vmin] max-h-[70vh] sm:h-[98vmin] sm:max-h-[100vh] overflow-hidden rounded-sm bg-[var(--hero-bg)]"
          style={{
            maxWidth: '100vw',
            minHeight: 0,
            border: 'none',
            outline: 'none',
            transform: 'translateZ(0)',
            willChange: 'transform',
            isolation: 'isolate',
          }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-sm bg-[var(--hero-bg)]">
            <video
              ref={(el) => el?.play().catch(() => {})}
              src="/hero.mp4"
              className="absolute w-full h-full object-contain object-center"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(1.02)',
                minWidth: '100%',
                minHeight: '100%',
                display: 'block',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
              }}
              loop
              muted
              playsInline
              autoPlay
              preload="auto"
              aria-label="The Uniform Lab"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex h-screen items-center px-4 pt-20 pb-24 sm:pt-16 sm:pb-16 sm:px-10 lg:px-20"
      >
        <div className="hero-left max-w-xl text-left w-full">
          <p className="hero-label uppercase mb-3">
            Welcome to
          </p>
          <h1 className="hero-heading mb-5">
            Comfort and luxury of uniforms, redefined.
          </h1>
          <p className="hero-paragraph max-w-md mb-6">
            Premium school uniforms and accessories — thoughtful fabrics, precise fits, delivered in 2 days. Easy ordering and hassle-free returns.
          </p>

          <ul className="flex flex-wrap gap-x-4 gap-y-2.5 sm:gap-x-6 sm:gap-y-3 mb-8 text-[var(--hero-heading)]">
            <li className="flex items-center gap-1.5 sm:gap-2">
              <span className="hero-trust-icon shrink-0">
                <Tag size={18} strokeWidth={1.5} />
              </span>
              <span className="hero-trust-text">Affordable prices</span>
            </li>
            <li className="flex items-center gap-1.5 sm:gap-2">
              <span className="hero-trust-icon shrink-0">
                <Truck size={18} strokeWidth={1.5} />
              </span>
              <span className="hero-trust-text">2-day delivery</span>
            </li>
            <li className="flex items-center gap-1.5 sm:gap-2">
              <span className="hero-trust-icon shrink-0">
                <ShieldCheck size={18} strokeWidth={1.5} />
              </span>
              <span className="hero-trust-text">Quality assured</span>
            </li>
          </ul>

          <div ref={ctaRef} className="relative inline-flex items-center gap-3 sm:gap-4">
            {/* Enquiry button to the left of main CTA – same size and weight */}
            <Link
              to="/schoolenquiry"
              className="hero-cta inline-flex items-center justify-center gap-2 transition-all hover:gap-3 px-5 sm:px-6"
            >
              Enquiry
            </Link>

            {/* Main CTA with animated face overlapping button */}
            <div className="relative inline-flex items-center">
              <HeroCTAFace
                containerRef={headContainerRef}
                mouse={mouse}
                bounds={headBounds}
              />
              <Link
                to="/schools"
                className="hero-cta inline-flex items-center gap-2 transition-all hover:gap-3 -ml-8 sm:-ml-10 pl-10 sm:pl-12 pr-6 sm:pr-7"
              >
                Shop by school
                <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 1 }}
        className="absolute bottom-5 sm:bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <Link
          to="/schools"
          className="inline-flex flex-col items-center gap-0.5 sm:gap-1 text-[var(--hero-muted)] hover:text-[var(--hero-accent)] transition-colors"
        >
         
         
        </Link>
      </motion.div>
    </motion.section>
  );
}
