'use client';

import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Building2, Factory, PackageCheck } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';

const CARD_BGS = ['/su.png', '/corporate.avif', '/bulk.png'];

const SERVICES = [
  {
    num: '01',
    icon: Building2,
    title: 'School Uniform Manufacturing',
    short: 'Crafted for schools',
    text: 'Custom uniform design, fabric sourcing with colour stability control, standardised size charts, and admission-season readiness — built to run year after year without friction.',
    tags: ['Colour Matching', 'Size Standards', 'Seasonal Planning'],
    accent: '#2563eb',
    accentLight: '#eff6ff',
    surfaceFrom: '#ffffff',
    surfaceTo: '#f6faff',
    grad: 'from-blue-600 to-indigo-600',
  },
  {
    num: '02',
    icon: Factory,
    title: 'Corporate Uniform Solutions',
    short: 'Branded workwear',
    text: 'Role-based design systems, logo embroidery, durable industrial-grade fabrics, and scalable production for multi-location corporate teams.',
    tags: ['Logo Embroidery', 'Role-Based Design', 'Multi-site Delivery'],
    accent: '#0ea5e9',
    accentLight: '#f0f9ff',
    surfaceFrom: '#ffffff',
    surfaceTo: '#f3fbff',
    grad: 'from-sky-500 to-blue-600',
  },
  {
    num: '03',
    icon: PackageCheck,
    title: 'Bulk Manufacturing & Distribution',
    short: 'End-to-end supply',
    text: 'Centralised planning, batch consistency, multi-stage quality checks, and flexible fulfilment through on-campus camps, retail counters, and e-commerce.',
    tags: ['Batch QC', 'On-campus Camps', 'E-commerce Ready'],
    accent: '#6366f1',
    accentLight: '#eef2ff',
    surfaceFrom: '#ffffff',
    surfaceTo: '#f6f5ff',
    grad: 'from-indigo-500 to-violet-600',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawY, { stiffness: 280, damping: 28 });
  const rotateY = useSpring(rawX, { stiffness: 280, damping: 28 });

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    rawX.set(x * 7);
    rawY.set(-y * 7);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  };

  const Icon = service.icon;
  const bgSrc = CARD_BGS[index];

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="svc-card relative group cursor-default"
    >
      {/* Glow backdrop */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{ background: `linear-gradient(135deg, ${service.accent}44, ${service.accent}18)` }}
      />

      {/* Card */}
      <div
        className="relative rounded-2xl border overflow-hidden h-full flex flex-col transition-shadow duration-400 group-hover:shadow-2xl"
        style={{
          borderColor: hovered ? `${service.accent}30` : '#e8f0fe',
          boxShadow: hovered
            ? `0 24px 64px ${service.accent}14, 0 2px 8px rgba(15,23,42,0.04)`
            : '0 2px 16px rgba(15,23,42,0.05)',
        }}
      >
        {/* ── Full card background image ── */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            backgroundImage: `url('${bgSrc}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: hovered ? 0.22 : 0.14,
          }}
        />

        {/* ── White gradient overlay so text stays readable ── */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: hovered
              ? `linear-gradient(160deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.65) 100%)`
              : `linear-gradient(160deg, rgba(255,255,255,0.92) 0%, ${service.surfaceTo}cc 100%)`,
          }}
        />

        {/* Top accent bar */}
        <div
          className={`relative h-[3px] w-full bg-gradient-to-r ${service.grad} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`}
        />

        <div className="relative p-3 md:p-5 lg:p-6 flex flex-col gap-2 md:gap-4 lg:gap-5 flex-1">
          {/* Number + Icon row */}
          <div className="flex items-start justify-between">
            <span
              className="font-['Baloo_2'] text-3xl md:text-5xl lg:text-6xl font-900 leading-none select-none"
              style={{ color: `${service.accent}18` }}
            >
              {service.num}
            </span>
            <motion.div
              className="w-8 h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: service.accentLight, color: service.accent }}
              whileHover={{ scale: 1.14, rotate: -6 }}
              transition={{ type: 'spring', stiffness: 360, damping: 18 }}
            >
              <Icon size={20} strokeWidth={1.8} />
            </motion.div>
          </div>

          {/* Short tag */}
          <div>
            <span
              className="text-[9px] md:text-[10px] font-bold tracking-[0.14em] md:tracking-[0.18em] uppercase"
              style={{ color: service.accent }}
            >
              {service.short}
            </span>
            <h3 className="mt-0.5 md:mt-1 font-['Baloo_2'] text-[14px] md:text-[20px] lg:text-[22px] font-800 leading-tight text-slate-900">
              {service.title}
            </h3>
          </div>

          {/* Body */}
          <p className="text-slate-500 text-[11px] md:text-[13px] lg:text-[14px] leading-snug md:leading-relaxed font-medium flex-1 line-clamp-3 md:line-clamp-none">
            {service.text}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 md:gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] md:text-[11px] font-700 px-2 md:px-3 py-0.5 md:py-1 rounded-full border transition-all duration-200 group-hover:border-opacity-60"
                style={{
                  background: service.accentLight,
                  color: service.accent,
                  borderColor: `${service.accent}28`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow — hide on phone to save space, show from md */}
          <div className="hidden md:flex items-center gap-1.5 mt-1">
            <span
              className="text-[12px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{ color: service.accent }}
            >
              Learn more
            </span>
            <ArrowUpRight
              size={14}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: service.accent }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const orbY2 = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const lineW = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '100%']);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700;800&display=swap');
        .svc-root { font-family: 'Nunito', sans-serif; }
        .font-900 { font-weight: 900; }
        .font-800 { font-weight: 800; }
        .font-700 { font-weight: 700; }
      `}</style>

      <section
        ref={sectionRef}
        className="svc-root relative bg-[#FAF3F0] overflow-hidden py-16 sm:py-20 lg:py-24"
      >
        {/* Fine grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(37,99,235,0.045) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(37,99,235,0.045) 1px, transparent 1px)`,
            backgroundSize: '52px 52px',
          }}
        />

        {/* Parallax orbs */}
        <motion.div
          style={{ y: orbY1 }}
          className="absolute -top-44 -right-44 w-[500px] h-[500px] sm:w-[580px] sm:h-[580px] rounded-full pointer-events-none"
          aria-hidden
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600/12 to-indigo-600/6 blur-[100px]" />
        </motion.div>
        <motion.div
          style={{ y: orbY2 }}
          className="absolute -bottom-40 -left-40 w-[380px] h-[380px] sm:w-[460px] sm:h-[460px] rounded-full pointer-events-none"
          aria-hidden
        >
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-sky-500/10 to-blue-600/5 blur-[90px]" />
        </motion.div>

        <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-300/40 to-transparent pointer-events-none hidden lg:block" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div className="mb-10 sm:mb-12 lg:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-4 sm:mb-5"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold tracking-[0.16em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                What We Do
              </div>
            </motion.div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="font-['Baloo_2'] text-3xl sm:text-4xl lg:text-[52px] font-900 text-slate-900 leading-[1.08] tracking-[-0.8px] max-w-xl"
              >
                End-to-End{' '}
                <em className="not-italic bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Uniform
                </em>
                <br />
                Services.
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-sm lg:max-w-[360px]"
              >
                <p className="text-slate-600 text-[14px] sm:text-[15px] leading-[1.68] font-medium">
                  Complete manufacturing and distribution systems — designed for consistency,
                  scale, and operational ease.
                </p>
              </motion.div>
            </div>

            {/* Animated rule */}
            <div className="mt-6 sm:mt-8 h-px bg-blue-200/60 overflow-hidden">
              <motion.div
                style={{ width: lineW }}
                className="h-full bg-gradient-to-r from-blue-500/60 via-indigo-400/40 to-transparent"
              />
            </div>
          </div>

          {/* ── Cards: 2 cols on phone, 3 cols from md (desktop unchanged) ── */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-5">
            {SERVICES.map((svc, i) => (
              <ServiceCard key={svc.num} service={svc} index={i} />
            ))}
          </div>

          {/* ── Bottom CTA bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl border border-blue-200/70 bg-white/75 backdrop-blur-sm"
          >
            <div>
              <p className="text-slate-900 font-['Baloo_2'] text-base sm:text-lg font-700">
                Ready to streamline your uniform operations?
              </p>
              <p className="text-slate-600 text-[13px] sm:text-sm font-medium mt-0.5">
                Distribution, fulfilment, on-campus camps, and production workflows — all under one roof.
              </p>
            </div>
            <Link
              to="/services"
              className="group w-full sm:w-auto justify-center sm:justify-start flex-shrink-0 inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 hover:-translate-y-0.5"
            >
              Explore All Services
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

        </div>
      </section>
    </>
  );
}