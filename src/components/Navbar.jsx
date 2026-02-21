import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Heart, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { featuredSchools } from '@/data/featuredSchools';

/* ─────────────────────────────────────────────────────────────────────────
   FONT
────────────────────────────────────────────────────────────────────────── */
const NAV_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700&display=swap');
`;

export default function Navbar() {
  const [open, setOpen]                               = useState(false);
  const [shopBySchoolsOpen, setShopBySchoolsOpen]     = useState(false);
  const [schoolsAccordion, setSchoolsAccordion]       = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const location  = useLocation();
  const pathname  = location.pathname;
  const { totalItems, openCart } = useCart();

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

  /* close mobile menu on route change */
  useEffect(() => { setOpen(false); }, [pathname]);

  const desktopNavItems = [
    { href: '/',            label: 'Home' },
    { href: '/about',       label: 'About Us' },
    { href: '/services',    label: 'Services' },
    { label: 'Shop By Schools', isDropdown: true },
    { href: '/faqs',        label: 'FAQs' },
    { href: '/size-guide',  label: 'Size Guide' },
    { href: '/schoolenquiry', label: 'Contact Us' },
  ];

  const isActive = (item) => {
    if (item.isDropdown) return pathname.startsWith('/schools');
    if (!item.href || item.href === '#') return false;
    if (item.href === '/home') return pathname === '/' || pathname === '/home';
    return pathname === item.href || pathname.startsWith(item.href + '/');
  };

  const rightIcons = [
    { icon: User,   label: 'Account', href: '#' },
    { icon: Heart,  label: 'Wishlist', href: '#' },
    { icon: Search, label: 'Search',  href: '#' },
  ];

  /* ── Mobile nav items ── */
  const mobileNavItems = [
    { href: '/',             label: 'Home',           emoji: '🏠' },
    { href: '/about',        label: 'About Us',        emoji: '🏢' },
    { href: '/services',     label: 'Services',        emoji: '⚙️' },
    { isSchools: true,       label: 'Shop By Schools', emoji: '🏫' },
    { href: '/faqs',         label: 'FAQs',            emoji: '❓' },
    { href: '/size-guide',   label: 'Size Guide',      emoji: '📏' },
    { href: '/schoolenquiry',label: 'Contact Us',      emoji: '💬' },
  ];

  return (
    <>
      <style>{NAV_CSS}</style>

      {/* ═══════════════════════════════════════
          HEADER BAR
      ═══════════════════════════════════════ */}
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300 opacity-100 translate-y-0"
      >
        <div
          className={`transition-all duration-300 ${
            isAtTop
              ? 'bg-transparent border-b border-transparent'
              : 'bg-white/95 backdrop-blur-md border-b border-[var(--color-border)]/80'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between min-h-[5.5rem] h-[5.5rem] gap-6">

              {/* Logo */}
              <Link
                to="/"
                className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 rounded-md"
                aria-label="The Uniform Lab – Home"
              >
                <img
                  src="/logo.png"
                  alt="The Uniform Lab"
                  className="h-[4.75rem] min-h-[4rem] min-w-[9rem] w-auto sm:h-[5rem] sm:min-w-[11rem] md:h-[5.25rem] md:min-w-[12rem] object-contain object-left"
                />
              </Link>

              {/* Desktop nav links */}
              <ul className="hidden md:flex items-center gap-1 flex-1 justify-center">
                {desktopNavItems.map((item) =>
                  item.isDropdown ? (
                    <li
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setShopBySchoolsOpen(true)}
                      onMouseLeave={() => setShopBySchoolsOpen(false)}
                    >
                      <button
                        type="button"
                        className={`flex items-center gap-1 px-4 py-3 text-sm font-medium cursor-pointer transition-colors duration-200 border-b-2 -mb-[2px] ${
                          isActive(item)
                            ? 'text-[var(--color-navy)] border-[var(--color-navy)]'
                            : 'text-[var(--color-slate)] border-transparent hover:text-[var(--color-navy)] hover:border-[var(--color-navy)]/30'
                        }`}
                        aria-expanded={shopBySchoolsOpen}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <ChevronDown size={16} className={`transition-transform duration-200 ${shopBySchoolsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {shopBySchoolsOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[320px]">
                          <div className="rounded-2xl border border-[var(--color-border)] bg-white shadow-xl shadow-black/8 py-3 overflow-hidden">
                            <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                              Select your school
                            </p>
                            <ul className="max-h-[70vh] overflow-y-auto">
                              {featuredSchools.map((school) => (
                                <li key={school.id}>
                                  <Link
                                    to={`/schools/${school.id}`}
                                    className="block px-4 py-3 text-sm text-[var(--color-navy)] hover:bg-[var(--color-cream)] hover:text-[var(--color-accent)] transition-colors duration-150 cursor-pointer border-l-2 border-transparent hover:border-l-[var(--color-accent)]"
                                    onClick={() => setShopBySchoolsOpen(false)}
                                  >
                                    <span className="font-medium">{school.name}</span>
                                    {school.level && (
                                      <span className="block text-xs text-[var(--color-text-muted)] mt-0.5">{school.level}</span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </li>
                  ) : (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 -mb-[2px] cursor-pointer ${
                          isActive(item)
                            ? 'text-[var(--color-navy)] border-[var(--color-navy)]'
                            : 'text-[var(--color-slate)] border-transparent hover:text-[var(--color-navy)] hover:border-[var(--color-navy)]/30'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>

              {/* Right icons */}
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                {/* User / Heart / Search — desktop only */}
                {rightIcons.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg text-[var(--color-navy)] hover:bg-[var(--color-cream-warm)]/80 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
                    aria-label={label}
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </a>
                ))}

                {/* Cart — always visible */}
                <button
                  type="button"
                  onClick={openCart}
                  className="relative flex items-center justify-center w-10 h-10 rounded-lg text-[var(--color-navy)] hover:bg-[var(--color-cream-warm)]/80 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
                  aria-label={`Cart${totalItems > 0 ? ` – ${totalItems} items` : ''}`}
                >
                  <ShoppingBag size={20} strokeWidth={1.75} />
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[1.25rem] h-5 px-1 rounded-full bg-[var(--color-accent)] text-white text-xs font-semibold flex items-center justify-center">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </button>

                {/* Hamburger — mobile only */}
                <button
                  type="button"
                  className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[var(--color-navy)] hover:bg-[var(--color-cream-warm)]/80 transition-colors cursor-pointer"
                  onClick={() => setOpen((v) => !v)}
                  aria-label={open ? 'Close menu' : 'Open menu'}
                  aria-expanded={open}
                >
                  {open ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>

            </nav>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════
          MOBILE DRAWER
      ═══════════════════════════════════════ */}
      <AnimatePresence>
      {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mob-backdrop"
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(15,23,42,0.52)', backdropFilter: 'blur(3px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setOpen(false)}
          aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              key="mob-panel"
              className="fixed top-0 right-0 bottom-0 z-50 md:hidden flex flex-col"
              style={{
                width: '100vw',
                background: '#fff',
                boxShadow: '-6px 0 40px rgba(15,23,42,0.18)',
                fontFamily: "'Nunito', sans-serif",
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >

              {/* ── Drawer header ── */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4"
                style={{ borderBottom: '1px solid #e8ecf1' }}>
                <Link to="/" onClick={() => setOpen(false)}>
                  <img src="/logo.png" alt="Uniform Lab" style={{ height: '72px', width: 'auto', objectFit: 'contain' }} />
              </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-[#f1f5f9]"
                  style={{ border: '1.5px solid #e2e8f0', color: '#64748b', background: '#fff', cursor: 'pointer' }}
                  aria-label="Close menu"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              </div>

              {/* ── Nav links ── */}
              <nav className="flex-1 overflow-y-auto px-4 py-3" style={{ scrollbarWidth: 'none' }}>
                <ul className="flex flex-col" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {mobileNavItems.map((item) => {
                    if (item.isSchools) {
                      return (
                        <li key="schools">
                          {/* Accordion trigger */}
              <button
                type="button"
                            onClick={() => setSchoolsAccordion(v => !v)}
                            className="w-full flex items-center gap-3 py-4 transition-colors"
                            style={{
                              borderBottom: '1px solid #f1f5f9',
                              background: 'none',
                              border: 'none',
                              borderBottom: '1px solid #f1f5f9',
                              cursor: 'pointer',
                              padding: '14px 8px',
                            }}
                          >
                            <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
                              style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)' }}>
                              {item.emoji}
                            </span>
                            <span style={{
                              fontFamily: "'Baloo 2', cursive",
                              fontWeight: 900,
                              fontSize: '15px',
                              color: schoolsAccordion ? '#2563eb' : '#0f172a',
                              flex: 1,
                              textAlign: 'left',
                            }}>
                              {item.label}
                            </span>
                            <motion.span
                              animate={{ rotate: schoolsAccordion ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                              style={{ color: '#94a3b8', display: 'flex' }}
                            >
                              <ChevronRight size={16} strokeWidth={2.5} />
                            </motion.span>
              </button>

                          {/* School list accordion */}
                          <AnimatePresence initial={false}>
                            {schoolsAccordion && (
                              <motion.ul
                                key="schools-list"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                style={{ overflow: 'hidden', listStyle: 'none', margin: 0, padding: 0, background: '#f8faff', borderRadius: '12px', marginBottom: '4px' }}
                              >
                                {featuredSchools.map((school, i) => (
                    <li key={school.id}>
                      <Link
                        to={`/schools/${school.id}`}
                        onClick={() => setOpen(false)}
                                      className="flex items-center gap-2.5 px-4 py-3 transition-colors hover:bg-[#eff6ff]"
                                      style={{
                                        textDecoration: 'none',
                                        borderBottom: i < featuredSchools.length - 1 ? '1px solid #e8f0fe' : 'none',
                                      }}
                      >
                                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                        style={{ background: '#2563eb', opacity: 0.5 }} />
                                      <div>
                                        <p className="m-0 leading-snug"
                                          style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '13px', color: '#0f172a' }}>
                        {school.name}
                                        </p>
                                        {school.level && (
                                          <p className="m-0"
                                            style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: '11px', color: '#94a3b8' }}>
                                            {school.level}
                                          </p>
                                        )}
                                      </div>
                      </Link>
                    </li>
                  ))}
                              </motion.ul>
              )}
                          </AnimatePresence>
            </li>
                      );
                    }

                    const active = item.href && item.href !== '#' && (pathname === item.href || pathname.startsWith(item.href + '/'));
                    return (
                      <li key={item.label} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <Link
                          to={item.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 transition-colors hover:bg-[#f8faff]"
                          style={{ textDecoration: 'none', padding: '14px 8px', borderRadius: '10px' }}
                        >
                          <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
                            style={{ background: active ? 'linear-gradient(135deg, #eff6ff, #dbeafe)' : '#f8f9fb' }}>
                            {item.emoji}
                          </span>
                          <span style={{
                            fontFamily: "'Baloo 2', cursive",
                            fontWeight: 900,
                            fontSize: '15px',
                            color: active ? '#2563eb' : '#0f172a',
                            flex: 1,
                          }}>
                            {item.label}
                          </span>
                          <ChevronRight size={15} strokeWidth={2} style={{ color: '#cbd5e1' }} />
              </Link>
            </li>
                    );
                  })}
          </ul>
              </nav>

              {/* ── Bottom actions ── */}
              <div className="px-4 pb-6 pt-4" style={{ borderTop: '1px solid #e8ecf1' }}>

                {/* Primary CTAs */}
                <div className="flex gap-3 mb-4">
                  <Link to="/schoolenquiry" onClick={() => setOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-black uppercase text-white transition-all"
                    style={{
                      fontFamily: "'Baloo 2', cursive",
                      fontSize: '12px',
                      letterSpacing: '0.1em',
                      background: 'linear-gradient(180deg, #ffe066 0%, #f5a800 55%, #e08c00 100%)',
                      boxShadow: '0 4px 0 0 #7a4f00, 0 0 0 2px #c97d00, 0 0 0 4px #7a4f00',
                      textDecoration: 'none',
                      textShadow: '0 1px 0 #7a4f00',
                    }}>
                    🏫 School
            </Link>
                  <Link to="/schools" onClick={() => setOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-black uppercase text-white transition-all"
                    style={{
                      fontFamily: "'Baloo 2', cursive",
                      fontSize: '12px',
                      letterSpacing: '0.1em',
                      background: 'linear-gradient(180deg, #4db8ff 0%, #0077e6 55%, #005bbf 100%)',
                      boxShadow: '0 4px 0 0 #003a7a, 0 0 0 2px #005bbf, 0 0 0 4px #003a7a',
                      textDecoration: 'none',
                      textShadow: '0 1px 0 #003a7a',
                    }}>
                    👨‍👧 Parent
            </Link>
                </div>

                {/* Secondary icons row */}
                <div className="flex gap-2">
                  {[
                    { icon: User,   label: 'Account', href: '#' },
                    { icon: Heart,  label: 'Wishlist', href: '#' },
                    { icon: Search, label: 'Search',  href: '#' },
                  ].map(({ icon: Icon, label, href }) => (
                    <Link key={label} to={href} onClick={() => setOpen(false)}
                      className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl transition-all hover:bg-[#f1f5f9]"
                      style={{ border: '1.5px solid #e2e8f0', textDecoration: 'none' }}>
                      <Icon size={18} strokeWidth={1.75} style={{ color: '#475569' }} />
                      <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '10px', color: '#64748b', letterSpacing: '0.04em' }}>
                        {label}
                      </span>
            </Link>
                  ))}
            <button
              type="button"
              onClick={() => { openCart(); setOpen(false); }}
                    className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl transition-all hover:bg-[#f1f5f9]"
                    style={{ border: '1.5px solid #e2e8f0', background: '#fff', cursor: 'pointer' }}>
                    <span className="relative">
                      <ShoppingBag size={18} strokeWidth={1.75} style={{ color: '#475569' }} />
                      {totalItems > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#2563eb] text-white flex items-center justify-center"
                          style={{ fontSize: '9px', fontWeight: 700, fontFamily: "'Baloo 2', cursive" }}>
                          {totalItems}
                        </span>
                      )}
                    </span>
                    <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '10px', color: '#64748b', letterSpacing: '0.04em' }}>
                      Cart
                    </span>
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
