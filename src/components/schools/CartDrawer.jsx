import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Check, Zap, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getRecommendedForCart } from '@/data/productLookup';
import { DETAIL_SIZES } from '@/data/schoolCatalog';

/* ─────────────────────────────────────────────────────────────────────────
   STYLES
────────────────────────────────────────────────────────────────────────── */
const CART_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700&display=swap');

  .cart-scrollbar-hide { scrollbar-width: none; }
  .cart-scrollbar-hide::-webkit-scrollbar { display: none; }

  /* ── Checkout CTA: NewHero gold pill ── */
  .cart-checkout-btn {
    border-radius: 9999px !important;
    border: 1px solid rgba(229,167,50,0.6) !important;
    background: linear-gradient(180deg, #fcd88a 0%, #F7BE4F 50%, #e5a732 100%) !important;
    box-shadow: 0 2px 8px rgba(247,190,79,0.35), inset 0 1px 0 rgba(255,255,255,0.45) !important;
    font-family: 'Baloo 2', cursive !important;
    font-weight: 900 !important;
    font-size: clamp(11px, 1vw, 13px) !important;
    letter-spacing: 0.11em !important;
    text-transform: uppercase !important;
    color: #5c3a0a !important;
    text-shadow: 0 1px 0 rgba(255,255,255,0.45) !important;
    text-decoration: none !important;
    transition: transform 0.1s ease, box-shadow 0.1s ease, filter 0.12s ease !important;
  }
  .cart-checkout-btn:hover {
    filter: brightness(1.04) !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 12px rgba(247,190,79,0.4), inset 0 1px 0 rgba(255,255,255,0.5) !important;
  }
  .cart-checkout-btn:active {
    transform: translateY(1px) !important;
    box-shadow: 0 1px 4px rgba(247,190,79,0.25), inset 0 1px 0 rgba(255,255,255,0.35) !important;
  }

  /* ── Browse Uniforms: NewHero blue pill ── */
  .cart-btn-browse {
    border-radius: 9999px !important;
    border: 1px solid rgba(0,76,153,0.6) !important;
    background: linear-gradient(180deg, #1a6bb8 0%, #004C99 50%, #003d7a 100%) !important;
    box-shadow: 0 2px 8px rgba(0,76,153,0.25), inset 0 1px 0 rgba(255,255,255,0.15) !important;
    font-family: 'Baloo 2', cursive !important;
    font-weight: 900 !important;
    font-size: clamp(11px, 1vw, 13px) !important;
    letter-spacing: 0.11em !important;
    text-transform: uppercase !important;
    color: #fff !important;
    text-shadow: 0 1px 0 rgba(0,0,0,0.2) !important;
    text-decoration: none !important;
    transition: transform 0.1s ease, box-shadow 0.1s ease, filter 0.12s ease !important;
  }
  .cart-btn-browse:hover {
    filter: brightness(1.04) !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 12px rgba(0,76,153,0.3), inset 0 1px 0 rgba(255,255,255,0.2) !important;
  }
  .cart-btn-browse:active {
    transform: translateY(1px) !important;
    box-shadow: 0 1px 4px rgba(0,76,153,0.2), inset 0 1px 0 rgba(255,255,255,0.1) !important;
  }

  /* ── Item badges (Size / Color): NewHero-style square badge ── */
  .cart-badge {
    display: inline-flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 8px;
    background: linear-gradient(135deg, #eef5ff 0%, #ddeaff 100%);
    border: 1px solid rgba(0,76,153,0.25);
    color: #004C99;
    font-family: 'Baloo 2', cursive;
    font-weight: 800;
    font-size: 10.5px;
    box-shadow: 0 1px 3px rgba(0,76,153,0.08);
  }

  /* Desktop: start drawer below navbar (no overlap) */
  @media (min-width: 768px) {
    .cart-aside {
      top: 84px !important;
      height: calc(100vh - 84px) !important;
      max-height: calc(100vh - 84px) !important;
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     MOBILE  (< 768 px)  — full-width drawer below navbar
  ═══════════════════════════════════════════════════════════════════════ */
  @media (max-width: 767px) {

    /* Position just under the fixed mobile navbar (60px high) */
    .cart-aside {
      top: 60px !important;
      height: calc(100vh - 60px) !important;
      max-height: calc(100vh - 60px) !important;
      width: 100vw !important;
      width: 100dvw !important;
      max-width: 100vw !important;
    }

    /* Header — slightly bigger hit target */
    .cart-header {
      padding: 18px 20px !important;
    }

    /* Upsell strip header */
    .cart-upsell-header {
      padding: 14px 16px 10px !important;
    }

    /* Upsell pills scroll area */
    .cart-upsell-scroll {
      padding: 0 16px 14px !important;
      gap: 10px !important;
    }

    /* Items list */
    .cart-items-list {
      padding: 14px 14px !important;
      gap: 10px !important;
    }

    /* Single cart item card */
    .cart-item-card {
      padding: 12px !important;
      gap: 12px !important;
      border-radius: 18px !important;
    }
    .cart-item-img {
      width: 68px !important;
      height: 68px !important;
      border-radius: 12px !important;
    }

    /* Footer — account for iPhone home bar */
    .cart-footer {
      padding: 16px 20px !important;
      padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px)) !important;
    }

    /* Checkout button — slightly taller */
    .cart-checkout-btn {
      padding-top: 15px !important;
      padding-bottom: 15px !important;
      font-size: 14px !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────
   DESKTOP UPSELL CARD  (left panel)
────────────────────────────────────────────────────────────────────────── */
function UpsellCard({ product: p, schoolName: sn, schoolSlug: ss, onClose }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: p.id, name: p.name, price: p.price,
      size: DETAIL_SIZES[0], quantity: 1, image: p.image || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <Link
      to={`/product/${p.id}${ss ? `?school=${ss}` : ''}`}
      onClick={onClose}
      className="group flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200"
      style={{ background: '#fff', border: '1.5px solid #e2e8f0', textDecoration: 'none' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(37,99,235,0.28)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(37,99,235,0.10)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div className="w-[60px] h-[60px] rounded-lg overflow-hidden flex-shrink-0"
        style={{ background: 'linear-gradient(145deg, #f0f5ff, #e5edff)' }}>
        {p.image
          ? <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
          : <div className="w-full h-full flex items-center justify-center">
              <ShoppingBag size={18} style={{ color: '#94a3b8' }} />
            </div>
        }
      </div>
      <div className="flex-1 min-w-0">
        {sn && (
          <p className="m-0 truncate"
            style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '9px', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {sn}
          </p>
        )}
        <p className="m-0 line-clamp-2 leading-snug group-hover:text-[#2563eb] transition-colors"
          style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '12.5px', color: '#0f172a' }}>
          {p.name}
        </p>
        <p className="m-0"
          style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '13px', color: '#0f172a' }}>
          ₹{p.price}
        </p>
      </div>
      <button type="button" onClick={handleAdd}
        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
          added
            ? 'bg-gradient-to-br from-green-400 via-green-500 to-green-600 shadow-[0_2px_10px_rgba(16,185,129,0.30)]'
            : 'bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 hover:shadow-[0_4px_16px_rgba(245,158,11,0.45)]'
        }`}
        style={{ border: 'none', cursor: 'pointer' }}>
        {added
          ? <Check size={13} strokeWidth={2.5} style={{ color: '#fff' }} />
          : <Plus size={13} strokeWidth={2.5} style={{ color: '#fff' }} />
        }
      </button>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MOBILE UPSELL PILL  (horizontal scroll strip) — premium redesign
────────────────────────────────────────────────────────────────────────── */
function MobileUpsellPill({ product: p, schoolSlug: ss, onClose }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: p.id, name: p.name, price: p.price,
      size: DETAIL_SIZES[0], quantity: 1, image: p.image || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <Link
      to={`/product/${p.id}${ss ? `?school=${ss}` : ''}`}
      onClick={onClose}
      className="flex-shrink-0 flex flex-col rounded-2xl overflow-hidden"
      style={{
        width: '130px',
        border: '1.5px solid #e2e8f0',
        background: '#fff',
        textDecoration: 'none',
        boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
      }}>

      {/* Image */}
      <div className="w-full overflow-hidden" style={{ height: '86px', background: 'linear-gradient(145deg, #f4f7ff, #eaefff)' }}>
        {p.image
          ? <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
          : <div className="w-full h-full flex items-center justify-center">
              <ShoppingBag size={20} style={{ color: '#c7d2fe' }} />
            </div>
        }
      </div>

      {/* Info */}
      <div style={{ padding: '8px 9px 9px' }}>
        <p className="m-0 leading-tight"
          style={{
            fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '11.5px',
            color: '#0f172a',
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
          {p.name}
        </p>
        <div className="flex items-center justify-between mt-1.5">
          <span style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '12.5px', color: '#0f172a' }}>
            ₹{p.price}
          </span>
          <button type="button" onClick={handleAdd}
            className={`w-[26px] h-[26px] rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
              added ? 'bg-emerald-500' : 'bg-gradient-to-br from-amber-400 to-amber-600 hover:shadow-md'
            }`}
            style={{ border: 'none', cursor: 'pointer', boxShadow: added ? '0 2px 8px rgba(16,185,129,0.3)' : '0 2px 8px rgba(245,158,11,0.25)' }}>
            {added
              ? <Check size={11} strokeWidth={2.5} style={{ color: '#fff' }} />
              : <Plus size={11} strokeWidth={2.5} style={{ color: '#fff' }} />
            }
          </button>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN EXPORT
────────────────────────────────────────────────────────────────────────── */
export function CartDrawer({ open, onClose }) {
  const { items, totalItems, totalAmount, removeItem, updateQuantity, clearBuyNow } = useCart();

  const recommendedItems = useMemo(() => {
    return getRecommendedForCart(items, 6);
  }, [items]);

  const hasRecommendations = recommendedItems.length > 0;

  return (
    <>
      <style>{CART_CSS}</style>

      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
        onClick={onClose}
        aria-hidden="true"
      />
        )}

        {open && (
          <motion.aside
            key="drawer"
            className="cart-aside fixed top-0 right-0 h-full z-50 flex flex-row"
            style={{
              width: hasRecommendations ? 'min(780px, 96vw)' : 'min(440px, 96vw)',
              boxShadow: '-8px 0 64px rgba(15,23,42,0.24)',
              fontFamily: "'Nunito', sans-serif",
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        aria-modal="true"
            aria-label="Shopping cart"
      >

            {/* ══ LEFT: Recommendations (desktop only) — premium, no gimmicks ══ */}
            {hasRecommendations && (
              <div className="hidden lg:flex flex-col w-[320px] flex-shrink-0 overflow-y-auto cart-scrollbar-hide"
                style={{ background: 'linear-gradient(180deg, #fafbff 0%, #f4f6fb 100%)', borderRight: '1px solid #e8ecf1' }}>

                <div className="px-5 pt-6 pb-4" style={{ borderBottom: '1px solid #e8ecf1' }}>
                  <p className="m-0 mb-0.5"
                    style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '17px', color: '#0f172a' }}>
                    Recommended for you
                  </p>
                  <p className="m-0"
                    style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: '12px', color: '#64748b' }}>
                    Pairs well with your selection
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 p-4 flex-1">
                  {recommendedItems.map(({ product: p, schoolName: sn, schoolSlug: ss }) => (
                    <UpsellCard key={p.id} product={p} schoolName={sn} schoolSlug={ss} onClose={onClose} />
                  ))}
                </div>

              </div>
            )}

            {/* ══ RIGHT: Cart panel ══ */}
            <div className="flex flex-col flex-1 min-w-0" style={{ background: '#f8f9fb' }}>

              {/* ── Header ── */}
              <div className="cart-header flex items-center justify-between px-5 py-4"
                style={{ borderBottom: '1px solid #e8ecf1', background: '#fff' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)' }}>
                    <ShoppingBag size={16} strokeWidth={2} style={{ color: '#0f172a' }} />
                  </div>
                  <p className="m-0"
                    style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '19px', color: '#0f172a' }}>
                    Your Cart
                  </p>
                  {totalItems > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-white"
                      style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '11px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', lineHeight: 1.5, boxShadow: '0 2px 8px rgba(37,99,235,0.30)' }}>
                      {totalItems}
                    </span>
                  )}
                </div>
                <button type="button" onClick={onClose}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-[#f1f5f9]"
                  style={{ border: '1.5px solid #e2e8f0', color: '#64748b', background: '#fff', cursor: 'pointer' }}
                  aria-label="Close cart">
                  <X size={15} strokeWidth={2} />
                </button>
              </div>

              {/* ── Mobile recommendations strip ── */}
              {hasRecommendations && items.length > 0 && (
                <div className="cart-upsell-header lg:hidden" style={{ background: '#fff', borderBottom: '1px solid #e8ecf1' }}>
                  <div className="px-4 pt-3.5 pb-2 flex items-center justify-between gap-2">
                    <div>
                      <p
                        className="m-0"
                        style={{
                          fontFamily: "'Baloo 2', cursive",
                          fontWeight: 900,
                          fontSize: '12px',
                          color: '#0f172a',
                          letterSpacing: '0.02em',
                        }}
                      >
                        Recommended for you
                      </p>
                      <p
                        className="m-0 mt-0.5"
                        style={{
                          fontFamily: "'Nunito', sans-serif",
                          fontWeight: 600,
                          fontSize: '11px',
                          color: '#64748b',
                        }}
                      >
                        Pairs well with your selection
                      </p>
                    </div>
                    {/* Extra close button for mobile, so users don't need to scroll */}
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex items-center justify-center rounded-xl"
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1.5px solid #e2e8f0',
                        background: '#fff',
                        color: '#64748b',
                        cursor: 'pointer',
                      }}
                      aria-label="Close cart"
                    >
                      <X size={15} strokeWidth={2} />
                    </button>
                  </div>
                  {/* Scroll strip */}
                  <div className="cart-upsell-scroll flex gap-2.5 overflow-x-auto pb-3.5 px-4 cart-scrollbar-hide">
                    {recommendedItems.map(({ product: p, schoolSlug: ss }) => (
                      <MobileUpsellPill key={p.id} product={p} schoolSlug={ss} onClose={onClose} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── Cart items ── */}
              <div className="flex-1 overflow-y-auto cart-scrollbar-hide">
                {items.length === 0 ? (

                  /* ── Empty state ── */
                  <div className="flex flex-col items-center justify-center h-full py-16 gap-4 px-6">
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(145deg, #f1f5f9, #e2e8f0)', border: '1.5px solid #e2e8f0' }}>
                      <ShoppingBag size={32} strokeWidth={1.5} style={{ color: '#cbd5e1' }} />
                    </div>
                    <div className="text-center">
                      <p className="m-0 mb-1"
                        style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '18px', color: '#0f172a' }}>
                        Your cart is empty
                      </p>
                      <p className="m-0"
                        style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: '13px', color: '#94a3b8' }}>
                        Add uniforms to get started ✦
                      </p>
                    </div>
                    <Link to="/schools" onClick={onClose}
                      className="cart-btn-browse mt-1 inline-flex items-center gap-2 px-6 py-3"
                      style={{ fontSize: '13px' }}>
                      Browse Uniforms <ArrowRight size={14} strokeWidth={2.5} />
                    </Link>
                  </div>

                ) : (

                  /* ── Items list ── */
                  <ul className="cart-items-list p-4 space-y-3 list-none m-0">
                    <AnimatePresence initial={false}>
                      {items.map((item) => {
                        const key = [item.productId, item.size, item.color].filter(Boolean).join('-');
                        return (
                          <motion.li key={key}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 60, transition: { duration: 0.22 } }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="cart-item-card flex gap-3 p-3 rounded-2xl"
                            style={{ background: '#fff', border: '1.5px solid #e8ecf1', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>

                            {/* Image */}
                            <div className="cart-item-img w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0"
                              style={{ background: 'linear-gradient(145deg, #f4f7ff, #eaefff)', border: '1px solid #e2e8f0' }}>
                              {item.image
                                ? <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                : <div className="w-full h-full flex items-center justify-center">
                                    <ShoppingBag size={22} style={{ color: '#cbd5e1' }} />
                                  </div>
                              }
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <p className="m-0 leading-snug line-clamp-2"
                                style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '13.5px', color: '#0f172a' }}>
                                {item.name}
                              </p>
                              <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                                {item.size && (
                                  <span className="cart-badge">
                                    Size: {item.size}
                                  </span>
                                )}
                                {item.color && (
                                  <span className="cart-badge">
                                    {item.color}
                                  </span>
                                )}
                              </div>
                              <p className="m-0 mt-1.5"
                                style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '14px', color: '#0f172a' }}>
                                ₹{item.price}
                                {item.quantity > 1 && (
                                  <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: '11px', color: '#94a3b8', marginLeft: '5px' }}>
                                    × {item.quantity} = ₹{item.price * item.quantity}
                                  </span>
                                )}
                              </p>
                            </div>

                            {/* Controls */}
                            <div className="flex flex-col items-end justify-between flex-shrink-0">
                              <button type="button"
                                onClick={() => removeItem(item.productId, item.size, item.color)}
                                className="w-6 h-6 rounded-lg flex items-center justify-center transition-all hover:bg-red-50"
                                style={{ background: '#f8f9fb', border: '1px solid #e2e8f0', color: '#94a3b8', cursor: 'pointer' }}
                                aria-label="Remove item">
                                <X size={11} strokeWidth={2.5} />
                              </button>
                              <div className="flex items-center rounded-xl overflow-hidden"
                                style={{ border: '1.5px solid #e2e8f0', background: '#fff' }}>
                                <button type="button"
                                  onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1, item.color)}
                                  className="w-7 h-7 flex items-center justify-center transition-colors hover:bg-[#f1f5f9]"
                                  style={{ color: '#374151', cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                  <Minus size={11} strokeWidth={2.5} />
                    </button>
                                <span className="w-7 text-center"
                                  style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '13px', color: '#0f172a' }}>
                      {item.quantity}
                    </span>
                                <button type="button"
                                  onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1, item.color)}
                                  className="w-7 h-7 flex items-center justify-center transition-colors hover:bg-[#f1f5f9]"
                                  style={{ color: '#374151', cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                  <Plus size={11} strokeWidth={2.5} />
                    </button>
                  </div>
                            </div>

                          </motion.li>
                        );
                      })}
                    </AnimatePresence>
            </ul>
          )}
        </div>

              {/* ── Footer ── */}
        {items.length > 0 && (
                <div className="cart-footer px-5 py-4"
                  style={{ borderTop: '1.5px solid #e8ecf1', background: '#fff' }}>

                  {/* Total */}
                  <div className="flex items-center justify-between mb-4">
                    <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '14px', color: '#64748b' }}>
                      Total
                    </span>
                    <span style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '26px', color: '#0f172a', letterSpacing: '-0.5px' }}>
                      ₹{totalAmount}
                    </span>
            </div>

                  {/* Checkout CTA */}
                  <Link to="/checkout" onClick={() => { clearBuyNow(); onClose(); }}
                    className="cart-checkout-btn flex items-center justify-center gap-2.5 w-full py-3.5 px-6"
                    style={{ fontSize: '14px' }}
                  >
                    <ShoppingBag size={16} strokeWidth={2.5} />
                    Proceed to Checkout
            </Link>

                  <p className="text-center mt-3 m-0"
                    style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: '11px', color: '#94a3b8' }}>
                    🔒 Secure checkout · COD available
                  </p>

                </div>
              )}

          </div>
            {/* ── end cart panel ── */}

          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
