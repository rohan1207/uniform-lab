import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { CharacterScene } from './CharacterScene';

export function CharacterCard({
  character,
  mouse,
  delay = 0.25,
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
}) {
  const containerRef = useRef(null);
  const [bounds, setBounds] = useState({ left: 0, top: 0, width: 1, height: 1 });

  useEffect(() => {
    const updateBounds = () => {
      if (containerRef.current) {
        setBounds(containerRef.current.getBoundingClientRect());
      }
    };
    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col w-full h-full items-center"
    >
      <div className="w-full py-4 sm:py-5">
        <div
          ref={containerRef}
          className="relative w-full h-[240px] sm:h-[280px]"
        >
          <Canvas
            camera={{ position: [0, 1, 3.6], fov: 40 }}
            gl={{ antialias: true, alpha: true }}
            className="w-full h-full"
          >
            <CharacterScene
              character={character}
              mouse={mouse}
              bounds={bounds}
            />
          </Canvas>
        </div>
      </div>
      <div className="character-card-premium w-full text-center pt-1 min-h-[200px] flex flex-col items-center">
        <p className="card-subtitle uppercase mb-2">
          {subtitle}
        </p>
        <h2 className="card-title mb-2">
          {title}
        </h2>
        {description ? (
          <p className="card-description mb-4 max-w-sm mx-auto">
            {description}
          </p>
        ) : null}
        <Link
          to={ctaHref}
          className={`card-cta inline-flex items-center justify-center ${description ? '' : 'mt-4'}`}
        >
          {ctaText}
        </Link>
      </div>
    </motion.div>
  );
}
