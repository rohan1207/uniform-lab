import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, ShoppingBag, User, Heart, Search, ChevronDown,
  Home, Building2, Building, Settings, HelpCircle, Ruler, MessageCircle, GraduationCap, Users,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { featuredSchools as staticFeaturedSchools } from '@/data/featuredSchools';
import { cachedFetch } from '@/lib/apiCache';

const NAV_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700&display=swap');
`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [schoolsAccordion, setSchoolsAccordion] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();
  const pathname = location.pathname;
  const { totalItems, openCart } = useCart();
  const [schools, setSchools] = useState(staticFeaturedSchools);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setIsAtTop(window.scrollY <= 2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Load real schools list for dropdowns, fallback to staticFeaturedSchools on error
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
        }));
        if (mapped.length) setSchools(mapped);
      } catch {
        // ignore, keep static fallback
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href) => {
    if (!href || href === '#') return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  const navLinkStyle = (active) => ({
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 700,
    fontSize: '14px',
    color: active ? '#0077e6' : '#374151',
    textDecoration: 'none',
    padding: '6px 2px',
    borderBottom: active ? '2px solid #0077e6' : '2px solid transparent',
    transition: 'color 0.2s, border-color 0.2s',
    whiteSpace: 'nowrap',
    letterSpacing: '0.01em',
  });

  const leftLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
  ];

  const rightLinks = [
    { href: '/faqs', label: 'FAQs' },
    { href: '/size-guide', label: 'Size Guide' },
    { href: '/schoolenquiry', label: 'Contact Us' },
  ];

  const mobileNavItems = [
    { href: '/', label: 'Home', icon: Home },
    { isSchools: true, label: 'Shop By Schools', icon: Building2 },
    { href: '/about', label: 'About Us', icon: Building },
    { href: '/services', label: 'Services', icon: Settings },
    { href: '/faqs', label: 'FAQs', icon: HelpCircle },
    { href: '/size-guide', label: 'Size Guide', icon: Ruler },
    { href: '/schoolenquiry', label: 'Contact Us', icon: MessageCircle },
  ];

  /* Transparent-at-top only on landing page; other pages always solid */
  const isLandingPage = pathname === '/';
  const useTransparentHeader = isLandingPage && isAtTop;

  const headerBg = useTransparentHeader
    ? 'transparent'
    : 'rgba(255,255,255,1)';

  const headerShadow = useTransparentHeader
    ? 'none'
    : '0 2px 16px rgba(0,0,0,0.08)';

  return (
    <>
      <style>{NAV_CSS}</style>

      {/* ══════════════════════════════ HEADER ══════════════════════════════ */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: headerBg,
          boxShadow: headerShadow,
          backdropFilter: useTransparentHeader ? 'none' : 'blur(12px)',
          WebkitBackdropFilter: useTransparentHeader ? 'none' : 'blur(12px)',
          borderBottom: useTransparentHeader ? 'none' : '1px solid #f1f5f9',
          transition: 'box-shadow 0.3s, background 0.3s',
        }}
      >
        {/* ── Desktop Layout ── */}
        <div
          className="hidden md:grid"
          style={{
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 32px',
            height: '84px',
          }}
        >
          {/* LEFT: 3 nav links + Shop By Schools dropdown */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
              justifyContent: 'flex-end',
              paddingRight: '40px',
            }}
          >
            {leftLinks.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                style={navLinkStyle(isActive(item.href))}
                onMouseEnter={(e) => { if (!isActive(item.href)) e.currentTarget.style.color = '#0077e6'; }}
                onMouseLeave={(e) => { if (!isActive(item.href)) e.currentTarget.style.color = '#374151'; }}
              >
                {item.label}
              </Link>
            ))}

            {/* Shop By Schools dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button
                style={{
                  ...navLinkStyle(pathname.startsWith('/schools')),
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  borderBottom: pathname.startsWith('/schools') ? '2px solid #0077e6' : '2px solid transparent',
                }}
                onMouseEnter={(e) => { if (!pathname.startsWith('/schools')) e.currentTarget.style.color = '#0077e6'; }}
                onMouseLeave={(e) => { if (!pathname.startsWith('/schools')) e.currentTarget.style.color = '#374151'; }}
              >
                Shop By Schools
                <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: shopOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>

              <AnimatePresence>
                {shopOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 12px)',
                      right: 0,
                      minWidth: '220px',
                      background: '#fff',
                      borderRadius: '14px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      border: '1px solid #e8f0fe',
                      padding: '8px',
                      zIndex: 100,
                    }}
                  >
                    <p style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: '11px', color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 10px 8px' }}>
                      Select your school
                    </p>
                    {schools.map((school) => (
                      <Link
                      key={school.slug || school.id || school.name}
                      to={`/schools/${school.slug || school.id}`}
                        onClick={() => setShopOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '9px 10px',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          color: '#1e293b',
                          fontFamily: "'Nunito', sans-serif",
                          fontWeight: 600,
                          fontSize: '13.5px',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#eff6ff'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        {school.name}
                        {school.level && (
                          <span style={{ fontSize: '11px', color: '#0077e6', background: '#eff6ff', borderRadius: '6px', padding: '2px 7px', fontWeight: 700 }}>
                            {school.level}
                          </span>
                        )}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* CENTER: Logo (strictly centered via grid) */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img
              src="/logo.png"
              alt="Logo"
              style={{ height: '80px', width: 'auto', display: 'block', objectFit: 'contain' }}
            />
          </Link>

          {/* RIGHT: 3 nav links + icons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
              justifyContent: 'flex-start',
              paddingLeft: '40px',
            }}
          >
            {rightLinks.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                style={navLinkStyle(isActive(item.href))}
                onMouseEnter={(e) => { if (!isActive(item.href)) e.currentTarget.style.color = '#0077e6'; }}
                onMouseLeave={(e) => { if (!isActive(item.href)) e.currentTarget.style.color = '#374151'; }}
              >
                {item.label}
              </Link>
            ))}

            {/* Divider */}
            <div style={{ width: '1px', height: '20px', background: '#e2e8f0', flexShrink: 0 }} />

            {/* Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {[
                { icon: User, label: 'Account', href: '/account' },
                { icon: Heart, label: 'Wishlist', href: '/wishlist' },
                { icon: Search, label: 'Search', href: '/search' },
              ].map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  to={href}
                  aria-label={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    color: '#475569',
                    transition: 'background 0.15s, color 0.15s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#0077e6'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569'; }}
                >
                  <Icon size={18} />
                </Link>
              ))}

              {/* Cart */}
              <button
                onClick={openCart}
                aria-label={`Cart${totalItems > 0 ? ` – ${totalItems} items` : ''}`}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#475569',
                  transition: 'background 0.15s, color 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#0077e6'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569'; }}
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    background: '#0077e6',
                    color: '#fff',
                    borderRadius: '999px',
                    fontSize: '10px',
                    fontWeight: 800,
                    minWidth: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 3px',
                    fontFamily: "'Nunito', sans-serif",
                    lineHeight: 1,
                  }}>
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Layout ── */}
        <div
          className="flex md:hidden"
          style={{
            alignItems: 'center',
            height: '60px',
            padding: '0 16px',
            position: 'relative',
          }}
        >
          {/* Left: Hamburger — minimal, no bg */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#374151',
              flexShrink: 0,
            }}
          >
            {open ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </button>

          {/* Center: Logo (absolute center) */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img
                src="/logo.png"
                alt="Logo"
                style={{ height: '58px', width: 'auto', display: 'block', objectFit: 'contain' }}
              />
            </Link>
          </div>

          {/* Right: Cart */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={openCart}
              aria-label={`Cart${totalItems > 0 ? ` – ${totalItems} items` : ''}`}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'none',
                border: '1.5px solid #e2e8f0',
                cursor: 'pointer',
                color: '#475569',
              }}
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  background: '#0077e6',
                  color: '#fff',
                  borderRadius: '999px',
                  fontSize: '10px',
                  fontWeight: 800,
                  minWidth: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 3px',
                  fontFamily: "'Nunito', sans-serif",
                  lineHeight: 1,
                }}>
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════ MOBILE DRAWER ══════════════════════════════ */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(15,23,42,0.45)',
                zIndex: 1001,
                backdropFilter: 'blur(2px)',
              }}
              aria-hidden="true"
            />

            {/* Panel — full-screen on phone */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                width: '100%',
                maxWidth: '100%',
                background: '#fff',
                zIndex: 1002,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
              }}
            >
              {/* Drawer header — clean, premium */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 20px 16px',
                borderBottom: '1px solid #f1f5f9',
                flexShrink: 0,
              }}>
                <Link to="/" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
                  <img
                    src="/logo.png"
                    alt="Uniform Lab"
                    style={{ height: '44px', width: 'auto', display: 'block', objectFit: 'contain' }}
                  />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '40px', height: '40px', borderRadius: '12px',
                    border: '1px solid #e2e8f0', background: '#fafafa', cursor: 'pointer', color: '#64748b',
                  }}
                  aria-label="Close menu"
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>

              {/* Nav links — professional icons, clear hierarchy */}
              <nav style={{ padding: '12px 16px', flex: 1 }}>
                {mobileNavItems.map((item) => {
                  const NavIcon = item.icon;
                  if (item.isSchools) {
                    return (
                      <div key="schools">
                        <button
                          onClick={() => setSchoolsAccordion((v) => !v)}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            padding: '14px 12px',
                            background: 'none',
                            border: 'none',
                            borderBottom: '1px solid #f1f5f9',
                            cursor: 'pointer',
                            fontFamily: "'Nunito', sans-serif",
                            fontWeight: 700,
                            fontSize: '15px',
                            color: '#1e293b',
                            textAlign: 'left',
                          }}
                        >
                          <span style={{ color: '#64748b', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <NavIcon size={20} strokeWidth={1.75} />
                          </span>
                          <span style={{ flex: 1 }}>{item.label}</span>
                          <ChevronDown
                            size={18}
                            strokeWidth={2}
                            style={{
                              color: '#94a3b8',
                              flexShrink: 0,
                              transition: 'transform 0.2s',
                              transform: schoolsAccordion ? 'rotate(180deg)' : 'rotate(0deg)',
                            }}
                          />
                        </button>

                        <AnimatePresence>
                          {schoolsAccordion && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              style={{ overflow: 'hidden', background: '#f8faff', borderRadius: '10px', margin: '4px 0 8px' }}
                            >
                              {schools.map((school, i) => (
                                <Link
                                  key={school.slug || school.id || school.name}
                                  to={`/schools/${school.slug || school.id}`}
                                  onClick={() => setOpen(false)}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '11px 16px',
                                    textDecoration: 'none',
                                    fontFamily: "'Nunito', sans-serif",
                                    fontWeight: 600,
                                    fontSize: '13.5px',
                                    color: '#334155',
                                    borderBottom: i < schools.length - 1 ? '1px solid #e8f0fe' : 'none',
                                    transition: 'background 0.15s',
                                  }}
                                  onMouseEnter={(e) => { e.currentTarget.style.background = '#eff6ff'; }}
                                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                                >
                                  <span>{school.name}</span>
                                  {school.level && (
                                    <span style={{ fontSize: '11px', color: '#0077e6', background: '#e0edff', borderRadius: '6px', padding: '2px 7px', fontWeight: 700 }}>
                                      {school.level}
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  const active = item.href && (pathname === item.href || pathname.startsWith(item.href + '/'));
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '14px 12px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        fontFamily: "'Nunito', sans-serif",
                        fontWeight: 700,
                        fontSize: '15px',
                        color: active ? '#0077e6' : '#1e293b',
                        background: active ? '#eff6ff' : 'transparent',
                        borderBottom: '1px solid #f1f5f9',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = '#f8faff'; }}
                      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <span style={{ color: active ? '#0077e6' : '#64748b', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <NavIcon size={20} strokeWidth={1.75} />
                      </span>
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Bottom actions — pill CTAs + icon row */}
              <div style={{ padding: '20px 16px 24px', borderTop: '1px solid #f1f5f9', flexShrink: 0, background: '#fafafa' }}>
                {/* CTA buttons — NewHero-style pills, professional icons */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <Link
                    to="/schoolenquiry"
                    onClick={() => setOpen(false)}
                    style={{
                      flex: 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      padding: '14px 12px',
                      borderRadius: '9999px',
                      fontFamily: "'Baloo 2', cursive",
                      fontWeight: 800,
                      fontSize: '12px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      color: '#5c3a0a',
                      background: 'linear-gradient(180deg, #fcd88a 0%, #F7BE4F 50%, #e5a732 100%)',
                      border: '1px solid rgba(229,167,50,0.6)',
                      boxShadow: '0 2px 8px rgba(247,190,79,0.35), inset 0 1px 0 rgba(255,255,255,0.45)',
                    }}
                  >
                    <GraduationCap size={18} strokeWidth={2} />
                    School
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setOpen(false)}
                    style={{
                      flex: 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      padding: '14px 12px',
                      borderRadius: '9999px',
                      fontFamily: "'Baloo 2', cursive",
                      fontWeight: 800,
                      fontSize: '12px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      color: '#fff',
                      background: 'linear-gradient(180deg, #1a6bb8 0%, #004C99 50%, #003d7a 100%)',
                      border: '1px solid rgba(0,76,153,0.6)',
                      boxShadow: '0 2px 8px rgba(0,76,153,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
                    }}
                  >
                    <Users size={18} strokeWidth={2} />
                    Parent
                  </Link>
                </div>

                {/* Icon row — Account, Wishlist, Search, Cart (professional line icons) */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[
                    { icon: User, label: 'Account', href: '/account' },
                    { icon: Heart, label: 'Wishlist', href: '/wishlist' },
                    { icon: Search, label: 'Search', href: '/search' },
                  ].map(({ icon: Icon, label, href }) => (
                    <Link
                      key={label}
                      to={href}
                      onClick={() => setOpen(false)}
                      style={{
                        flex: 1,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                        padding: '12px 8px',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        background: '#fff',
                        textDecoration: 'none',
                        color: '#475569',
                        fontFamily: "'Nunito', sans-serif",
                        fontSize: '11px',
                        fontWeight: 600,
                        transition: 'background 0.15s, border-color 0.15s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                    >
                      <Icon size={20} strokeWidth={1.75} />
                      {label}
                    </Link>
                  ))}

                  <button
                    onClick={() => { openCart(); setOpen(false); }}
                    style={{
                      flex: 1,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                      padding: '12px 8px',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      background: '#fff',
                      cursor: 'pointer',
                      color: '#475569',
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: '11px',
                      fontWeight: 600,
                      position: 'relative',
                      transition: 'background 0.15s, border-color 0.15s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                  >
                    {totalItems > 0 && (
                      <span style={{
                        position: 'absolute', top: '6px', right: '50%', transform: 'translateX(6px)',
                        background: '#0077e6', color: '#fff',
                        borderRadius: '999px', fontSize: '9px', fontWeight: 800,
                        minWidth: '14px', height: '14px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '0 3px', lineHeight: 1,
                      }}>
                        {totalItems}
                      </span>
                    )}
                    <ShoppingBag size={20} strokeWidth={1.75} />
                    Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}