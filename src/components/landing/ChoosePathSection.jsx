import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CharacterCard } from './CharacterCard';

export default function ChoosePathSection({ id = 'choose-path', className = '' }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const onMouseMove = useCallback((e) => setMouse({ x: e.clientX, y: e.clientY }), []);

  return (
    <section
      id={id}
      className={`choose-path-section relative w-full min-h-[420px] pt-8 sm:pt-12 pb-16 sm:pb-20 overflow-hidden bg-[var(--page-bg)] ${className}`}
      onMouseMove={onMouseMove}
    >
      {/* Background image - slight opacity */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.28]"
        style={{
          background: 'var(--page-bg)',
          backgroundImage: 'url(/landingbg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Light overlay so content stays readable */}
      <div
        className="absolute inset-0 pointer-events-none z-0 bg-white/60"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <p className="choose-path-label uppercase mb-3">
            Choose your path
          </p>
          <h2 className="choose-path-heading">
            What are you here for?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full items-stretch">
          <CharacterCard
            character="teacher"
            mouse={mouse}
            delay={0.25}
            subtitle="For enquiry"
            title="Schools & Colleges"
            description=""
            ctaText="Enquire as school / college"
            ctaHref="/schoolenquiry"
          />
          <CharacterCard
            character="parentStudent"
            mouse={mouse}
            delay={0.3}
            subtitle="For shopping"
            title="Parents & Students"
            description=""
            ctaText="Shop as parent / student"
            ctaHref="/schools"
          />
        </div>
      </div>
    </section>
  );
}
