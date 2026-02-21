import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, ExternalLink, Minus, Plus, Check, ArrowRight, Zap } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getProductColors, getProductImages, DETAIL_SIZES } from '@/data/schoolCatalog';

/* ─────────────────────────────────────────────────────────────────────────
   STYLES
────────────────────────────────────────────────────────────────────────── */
const QS_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700&display=swap');

  /* ── Scrollbar ── */
  .qs-scroll { scrollbar-width: none; }
  .qs-scroll::-webkit-scrollbar { display: none; }

  /* ── Panel base ── */
  .qs-panel {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: 100%; max-width: 420px;
    background: #fff;
    z-index: 60;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: -8px 0 64px rgba(15,23,42,0.20);
    transition: transform 0.34s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .qs-panel.qs-closed { transform: translateX(101%); pointer-events: none; }
  .qs-panel.qs-open  { transform: translateX(0);    pointer-events: all; }

  /* Desktop: start panel below navbar (no overlap) */
  @media (min-width: 768px) {
    .qs-panel {
      top: 84px !important;
      height: calc(100vh - 84px) !important;
      max-height: calc(100vh - 84px) !important;
    }
  }

  /* ── Backdrop ── */
  .qs-backdrop {
    position: fixed; inset: 0; z-index: 59;
    background: rgba(15,23,42,0.52);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    transition: opacity 0.28s ease;
  }
  .qs-backdrop.qs-closed { opacity: 0; pointer-events: none; }
  .qs-backdrop.qs-open  { opacity: 1; pointer-events: all; }

  /* ── Size pill ── */
  .qs-size {
    min-width: 2.6rem;
    padding: 6px 10px;
    border-radius: 8px;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    color: #374151;
    font-family: 'Nunito', sans-serif;
    font-size: 12.5px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.14s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }
  .qs-size:hover { border-color: #cbd5e1; background: #f8f9fb; color: #0f172a; }
  .qs-size.active {
    background: #0f172a; border-color: #0f172a; color: #fff;
    box-shadow: 0 3px 10px rgba(15,23,42,0.18);
  }

  /* ── School name: square badge, high visibility ── */
  .qs-school-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 10px;
    background: linear-gradient(135deg, #eef5ff 0%, #ddeaff 100%);
    border: 1.5px solid rgba(0,76,153,0.35);
    color: #004C99;
    font-family: 'Baloo 2', cursive;
    font-weight: 900;
    font-size: 12px;
    letter-spacing: 0.04em;
    text-decoration: none;
    box-shadow: 0 2px 6px rgba(0,76,153,0.12);
    transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease;
  }
  .qs-school-badge:hover {
    background: linear-gradient(135deg, #ddeaff 0%, #cce0ff 100%);
    box-shadow: 0 3px 10px rgba(0,76,153,0.18);
    transform: translateY(-0.5px);
  }

  /* ── Add to cart: NewHero gold pill ── */
  .qs-btn-cart {
    flex: 1;
    height: 46px;
    border: 1px solid rgba(229,167,50,0.6);
    border-radius: 9999px;
    cursor: pointer;
    background: linear-gradient(180deg, #fcd88a 0%, #F7BE4F 50%, #e5a732 100%);
    color: #5c3a0a;
    font-family: 'Baloo 2', cursive;
    font-weight: 900;
    font-size: clamp(11px, 1vw, 13px);
    letter-spacing: 0.11em;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    box-shadow: 0 2px 8px rgba(247,190,79,0.35), inset 0 1px 0 rgba(255,255,255,0.45);
    text-shadow: 0 1px 0 rgba(255,255,255,0.45);
    transition: transform 0.1s ease, box-shadow 0.1s ease, filter 0.12s ease;
  }
  .qs-btn-cart:hover  { filter: brightness(1.04); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(247,190,79,0.4), inset 0 1px 0 rgba(255,255,255,0.5); }
  .qs-btn-cart:active { transform: translateY(1px); box-shadow: 0 1px 4px rgba(247,190,79,0.25), inset 0 1px 0 rgba(255,255,255,0.35); }

  /* ── Buy now: NewHero blue pill ── */
  .qs-btn-buy {
    flex: 1;
    height: 46px;
    border: 1px solid rgba(0,76,153,0.6);
    border-radius: 9999px;
    cursor: pointer;
    background: linear-gradient(180deg, #1a6bb8 0%, #004C99 50%, #003d7a 100%);
    color: #fff;
    font-family: 'Baloo 2', cursive;
    font-weight: 900;
    font-size: clamp(11px, 1vw, 13px);
    letter-spacing: 0.11em;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    box-shadow: 0 2px 8px rgba(0,76,153,0.25), inset 0 1px 0 rgba(255,255,255,0.15);
    text-shadow: 0 1px 0 rgba(0,0,0,0.2);
    transition: transform 0.1s ease, box-shadow 0.1s ease, filter 0.12s ease;
  }
  .qs-btn-buy:hover  { filter: brightness(1.04); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,76,153,0.3), inset 0 1px 0 rgba(255,255,255,0.2); }
  .qs-btn-buy:active { transform: translateY(1px); box-shadow: 0 1px 4px rgba(0,76,153,0.2), inset 0 1px 0 rgba(255,255,255,0.1); }

  /* ═══════════════════════════════════════════════════════════════════════
     MOBILE — bottom sheet (< 768 px)
  ═══════════════════════════════════════════════════════════════════════ */
  @media (max-width: 767px) {

    /* Reposition as a bottom sheet */
    .qs-panel {
      top: auto !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      max-width: 100% !important;
      max-height: 92dvh !important;
      border-radius: 22px 22px 0 0 !important;
      box-shadow: 0 -8px 64px rgba(15,23,42,0.22) !important;
    }
    .qs-panel.qs-closed { transform: translateY(101%) !important; }
    .qs-panel.qs-open  { transform: translateY(0)    !important; }

    /* Drag handle */
    .qs-drag-handle {
      display: flex !important;
    }

    /* Hide desktop-only image column on mobile */
    .qs-desktop-image { display: none !important; }

    /* Mobile product strip (image + name + price) */
    .qs-mobile-strip { display: flex !important; }

    /* Tighter section padding on mobile */
    .qs-body { padding: 14px 18px !important; }

    /* Button row — slightly taller */
    .qs-btn-cart, .qs-btn-buy {
      height: 48px !important;
      font-size: 12.5px !important;
    }

    /* Footer padding + safe area */
    .qs-footer {
      padding: 14px 18px !important;
      padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px)) !important;
    }

    /* Size pills — compact */
    .qs-size { font-size: 12px !important; padding: 5px 9px !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────
   COMPONENT
────────────────────────────────────────────────────────────────────────── */
export function QuickShopDrawer({ open, onClose, product, schoolName, schoolSlug }) {
  const navigate = useNavigate();
  const { addItem, openCart, closeCart } = useCart();

  const colors  = product ? getProductColors(product) : [];
  const [selectedColor, setSelectedColor] = useState(colors[0] ?? null);
  const [selectedSize,  setSelectedSize]  = useState(DETAIL_SIZES[0]);
  const [quantity,      setQuantity]      = useState(1);
  const [addedFlash,    setAddedFlash]    = useState(false);

  /* Reset on product change */
  useEffect(() => {
    if (open && product) {
      const c = getProductColors(product);
      setSelectedColor(c[0] ?? null);
      setSelectedSize(DETAIL_SIZES[0]);
      setQuantity(1);
      setAddedFlash(false);
    }
  }, [open, product]);

  /* Keyboard + scroll lock */
  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!product) return null;

  const variantImages = getProductImages(product, selectedColor?.name);
  const displayImage  = variantImages[0] || product.image;
  const productUrl    = schoolSlug ? `/product/${product.id}?school=${schoolSlug}` : `/product/${product.id}`;

  function handleAddToCart() {
    addItem({ productId: product.id, name: product.name, price: product.price,
      size: selectedSize, quantity, color: selectedColor?.name, image: displayImage });
    setAddedFlash(true);
    setTimeout(() => {
      setAddedFlash(false);
    onClose();
    openCart();
    }, 700);
  }

  function handleBuyNow() {
    addItem({ productId: product.id, name: product.name, price: product.price,
      size: selectedSize, quantity, color: selectedColor?.name, image: displayImage });
    onClose();
    closeCart();
    navigate('/checkout');
  }

  return (
    <>
      <style>{QS_CSS}</style>

      {/* Backdrop */}
      <div
        role="presentation"
        className={`qs-backdrop ${open ? 'qs-open' : 'qs-closed'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`qs-panel ${open ? 'qs-open' : 'qs-closed'}`}
        aria-modal="true"
        aria-label="Quick Shop"
        role="dialog"
      >

        {/* ── Drag handle (mobile only) ── */}
        <div className="qs-drag-handle hidden w-full pt-3 pb-1 justify-center flex-shrink-0">
          <div style={{ width: '36px', height: '4px', borderRadius: '99px', background: '#e2e8f0' }} />
        </div>

        {/* ── Desktop header ── */}
        <div className="hidden md:flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid #e8ecf1' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', boxShadow: '0 2px 8px rgba(245,158,11,0.28)' }}>
              <Zap size={13} strokeWidth={2.5} style={{ color: '#fff' }} />
            </div>
            <h2 style={{ margin: 0, fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '18px', color: '#0f172a' }}>
              Quick Shop
            </h2>
          </div>
          <button type="button" onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-[#f1f5f9]"
            style={{ border: '1.5px solid #e2e8f0', color: '#64748b', background: '#fff', cursor: 'pointer' }}
            aria-label="Close">
            <X size={15} strokeWidth={2} />
          </button>
        </div>

        {/* ── Mobile header (name + close) ── */}
        <div className="md:hidden flex items-start justify-between px-5 pt-2 pb-3 flex-shrink-0"
          style={{ borderBottom: '1px solid #e8ecf1' }}>
          <div className="flex-1 min-w-0 pr-3">
            {schoolName && (
              <Link to={schoolSlug ? `/schools/${schoolSlug}` : '/schools'} onClick={onClose}
                className="qs-school-badge inline-block mb-2">
                🏫 {schoolName}
              </Link>
            )}
            <h2 className="m-0 leading-snug line-clamp-2"
              style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '16px', color: '#0f172a' }}>
              {product.name}
            </h2>
            <p className="m-0 mt-0.5"
              style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '18px', color: '#0f172a' }}>
              ₹{product.price}
            </p>
          </div>
          <button type="button" onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-[#f1f5f9] flex-shrink-0 mt-0.5"
            style={{ border: '1.5px solid #e2e8f0', color: '#64748b', background: '#fff', cursor: 'pointer' }}
            aria-label="Close">
            <X size={15} strokeWidth={2} />
            </button>
        </div>

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto qs-scroll">

          {/* Desktop image */}
          <div className="qs-desktop-image hidden md:block"
            style={{ aspectRatio: '4/5', background: 'linear-gradient(145deg, #f4f7ff, #eaefff)', flexShrink: 0 }}>
            {displayImage ? (
              <img src={displayImage} alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingBag style={{ width: 40, height: 40, color: '#c7d2fe', strokeWidth: 1 }} />
              </div>
            )}
          </div>

          {/* Mobile: compact image strip */}
          <div className="qs-mobile-strip md:hidden flex gap-3 items-center px-5 py-3 flex-shrink-0"
            style={{ background: '#f8f9fb', borderBottom: '1px solid #e8ecf1' }}>
            <div className="flex-shrink-0 rounded-xl overflow-hidden"
              style={{ width: '86px', height: '86px', background: 'linear-gradient(145deg, #f4f7ff, #eaefff)', border: '1px solid #e2e8f0' }}>
              {displayImage ? (
                <img src={displayImage} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShoppingBag style={{ width: 24, height: 24, color: '#c7d2fe', strokeWidth: 1 }} />
                </div>
              )}
            </div>
            {/* Quick size / color summary */}
            <div className="flex-1 min-w-0">
              <p className="m-0 mb-1" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Selected
              </p>
              <p className="m-0" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '12.5px', color: '#475569' }}>
                Size: <span style={{ color: '#0f172a', fontFamily: "'Baloo 2', cursive", fontWeight: 900 }}>{selectedSize}</span>
              </p>
              {selectedColor?.name && (
                <p className="m-0 mt-0.5" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '12.5px', color: '#475569' }}>
                  Colour: <span style={{ color: '#f59e0b', fontFamily: "'Baloo 2', cursive", fontWeight: 900 }}>{selectedColor.name}</span>
                </p>
              )}
              <p className="m-0 mt-0.5" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '12.5px', color: '#475569' }}>
                Qty: <span style={{ color: '#0f172a', fontFamily: "'Baloo 2', cursive", fontWeight: 900 }}>{quantity}</span>
              </p>
            </div>
          </div>

          {/* ── Info + selectors ── */}
          <div className="qs-body p-5 space-y-5">

            {/* Desktop-only: product name + price + school */}
            <div className="hidden md:block">
              {schoolName && (
                <Link to={schoolSlug ? `/schools/${schoolSlug}` : '/schools'} onClick={onClose}
                  className="qs-school-badge mb-3">
                  🏫 {schoolName}
                </Link>
              )}
              <h3 className="m-0 leading-tight mb-1"
                style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: 'clamp(17px, 1.5vw, 21px)', color: '#0f172a' }}>
                  {product.name}
                </h3>
              <p className="m-0"
                style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '22px', color: '#0f172a', letterSpacing: '-0.3px' }}>
                ₹{product.price}
              </p>
              </div>

            {/* Divider (desktop only) */}
            <div className="hidden md:block" style={{ height: '1px', background: '#e8ecf1' }} />

            {/* ── Colour picker ── */}
              {colors.length > 0 && (
                <div>
                <p className="m-0 mb-2.5"
                  style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '10.5px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Colour —{' '}
                  <span style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, color: '#f59e0b', textTransform: 'none', letterSpacing: 'normal' }}>
                    {selectedColor?.name}
                  </span>
                  </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {colors.map((c) => (
                    <button key={c.hex} type="button" title={c.name}
                        onClick={() => setSelectedColor(c)}
                      style={{
                        width: '26px', height: '26px', borderRadius: '50%',
                        backgroundColor: c.hex, border: 'none', cursor: 'pointer',
                        transition: 'all 0.18s ease',
                        boxShadow: selectedColor?.hex === c.hex
                          ? '0 0 0 2px #fff, 0 0 0 4px #2563eb'
                          : '0 1px 4px rgba(0,0,0,0.16)',
                        transform: selectedColor?.hex === c.hex ? 'scale(1.15)' : 'scale(1)',
                      }}
                      aria-label={`Colour ${c.name}`}
                        aria-pressed={selectedColor?.hex === c.hex}
                      />
                    ))}
                  </div>
                </div>
              )}

            {/* ── Size picker ── */}
              <div>
              <p className="m-0 mb-2.5"
                style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '10.5px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Size —{' '}
                <span style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, color: '#f59e0b', textTransform: 'none', letterSpacing: 'normal' }}>
                  {selectedSize}
                </span>
                </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                  {DETAIL_SIZES.map((s) => (
                  <button key={s} type="button"
                      onClick={() => setSelectedSize(s)}
                    className={`qs-size${selectedSize === s ? ' active' : ''}`}
                    aria-pressed={selectedSize === s}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

            {/* ── Quantity ── */}
              <div>
              <p className="m-0 mb-2.5"
                style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '10.5px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Quantity
                </p>
              <div className="inline-flex items-center rounded-xl overflow-hidden"
                style={{ border: '1.5px solid #e2e8f0', background: '#fff' }}>
                <button type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-[#f8f9fb]"
                  style={{ color: '#374151', cursor: 'pointer', border: 'none', background: 'transparent' }}
                  aria-label="Decrease quantity">
                  <Minus size={13} strokeWidth={2.5} />
                  </button>
                <span className="w-9 text-center"
                  style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '15px', color: '#0f172a' }}>
                    {quantity}
                  </span>
                <button type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-[#f8f9fb]"
                  style={{ color: '#374151', cursor: 'pointer', border: 'none', background: 'transparent' }}
                  aria-label="Increase quantity">
                  <Plus size={13} strokeWidth={2.5} />
                </button>
              </div>
              </div>

            {/* ── View full details ── */}
            <div style={{ borderTop: '1px solid #e8ecf1', paddingTop: '16px' }}>
              <Link to={productUrl} onClick={onClose}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-[#2563eb]"
                style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '12.5px', color: '#94a3b8', textDecoration: 'none' }}>
                <ExternalLink size={13} strokeWidth={2} />
                View full product details
                </Link>
            </div>

          </div>
          {/* ── end body ── */}
        </div>

        {/* ── Sticky footer: CTA buttons ── */}
        <div className="qs-footer flex-shrink-0 px-5 py-4"
          style={{ borderTop: '1.5px solid #e8ecf1', background: '#fff' }}>

          {/* Trust row */}
          <div className="flex items-center justify-center gap-4 mb-3">
            {['✓ Official uniform', '✓ 7-day exchange', '✓ COD available'].map((t) => (
              <span key={t} style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '10px', color: '#94a3b8' }}>
                {t}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" onClick={handleAddToCart} className="qs-btn-cart"
              aria-label="Add to cart"
              style={addedFlash ? { background: 'linear-gradient(135deg, #34d399, #10b981, #059669)', boxShadow: '0 3px 0 0 #047857, 0 4px 14px rgba(16,185,129,0.30)' } : {}}>
              {addedFlash
                ? <><Check size={15} strokeWidth={2.5} /> Added!</>
                : <><ShoppingBag size={14} strokeWidth={2} /> Add to Cart</>
              }
            </button>
            <button type="button" onClick={handleBuyNow} className="qs-btn-buy"
              aria-label="Buy now">
              Buy Now <ArrowRight size={13} strokeWidth={2.5} />
            </button>
          </div>

        </div>

      </div>
    </>
  );
}
