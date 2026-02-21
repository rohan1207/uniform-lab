import { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Truck, Shield, RotateCcw, Ruler,
  ChevronLeft, ChevronRight,
  Check, Heart, Minus, Plus, BadgeCheck, Flame, Star, ArrowRight, ArrowLeft
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getProductColors, getProductImages, DETAIL_SIZES } from '@/data/schoolCatalog';
import { getRelatedProducts } from '@/data/productLookup';
import { ProductCard } from '@/components/schools/ProductCard';
import { QuickShopDrawer } from '@/components/schools/QuickShopDrawer';

/* ─────────────────────────────────────────────────────────────────────────
   STYLES
────────────────────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700&display=swap');

  .pdt-root {
    background: #f8f9fb;
    min-height: 100vh;
    font-family: 'Nunito', sans-serif;
    color: #0f172a;
    padding-top: 5.5rem; /* clear fixed navbar so breadcrumb sits below it */
  }

  /* ── Add to Cart — NewHero gold pill CTA ── */
  .pdt-btn-cart {
    font-family: 'Baloo 2', cursive;
    font-weight: 900;
    font-size: clamp(11px, 1vw, 13px);
    letter-spacing: 0.11em;
    text-transform: uppercase;
    color: #5c3a0a;
    background: linear-gradient(180deg, #fcd88a 0%, #F7BE4F 50%, #e5a732 100%);
    border: 1px solid rgba(229,167,50,0.6);
    border-radius: 9999px;
    cursor: pointer;
    padding: 0 26px;
    height: 46px;
    box-shadow: 0 2px 8px rgba(247,190,79,0.35), inset 0 1px 0 rgba(255,255,255,0.45);
    text-shadow: 0 1px 0 rgba(255,255,255,0.45);
    transition: transform 0.1s ease, box-shadow 0.1s ease, filter 0.12s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    white-space: nowrap;
  }
  .pdt-btn-cart:hover  { filter: brightness(1.04); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(247,190,79,0.4), inset 0 1px 0 rgba(255,255,255,0.5); }
  .pdt-btn-cart:active { transform: translateY(1px); box-shadow: 0 1px 4px rgba(247,190,79,0.25), inset 0 1px 0 rgba(255,255,255,0.35); }
  .pdt-btn-cart:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* ── Buy Now — NewHero blue pill CTA ── */
  .pdt-btn-buy {
    font-family: 'Baloo 2', cursive;
    font-weight: 900;
    font-size: clamp(11px, 1vw, 13px);
    letter-spacing: 0.11em;
    text-transform: uppercase;
    color: #fff;
    background: linear-gradient(180deg, #1a6bb8 0%, #004C99 50%, #003d7a 100%);
    border: 1px solid rgba(0,76,153,0.6);
    border-radius: 9999px;
    cursor: pointer;
    padding: 0 26px;
    height: 46px;
    box-shadow: 0 2px 8px rgba(0,76,153,0.25), inset 0 1px 0 rgba(255,255,255,0.15);
    text-shadow: 0 1px 0 rgba(0,0,0,0.2);
    transition: transform 0.1s ease, box-shadow 0.1s ease, filter 0.12s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    white-space: nowrap;
  }
  .pdt-btn-buy:hover  { filter: brightness(1.04); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,76,153,0.3), inset 0 1px 0 rgba(255,255,255,0.2); }
  .pdt-btn-buy:active { transform: translateY(1px); box-shadow: 0 1px 4px rgba(0,76,153,0.2), inset 0 1px 0 rgba(255,255,255,0.1); }
  .pdt-btn-buy:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* ── Size pill ── */
  .pdt-size {
    min-width: 2.8rem;
    padding: 6px 11px;
    border-radius: 8px;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    color: #374151;
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
  .pdt-size:hover { border-color: #cbd5e1; background: #f8f9fb; color: #0f172a; }
  .pdt-size.active {
    background: #0f172a;
    border-color: #0f172a;
    color: #fff;
    box-shadow: 0 3px 10px rgba(15,23,42,0.18);
  }

  /* ── Tab button ── */
  .pdt-tab {
    padding: 7px 16px;
    border-radius: 8px;
    font-family: 'Baloo 2', cursive;
    font-weight: 800;
    font-size: 13px;
    cursor: pointer;
    border: none;
    transition: all 0.18s ease;
    color: #64748b;
    background: transparent;
  }
  .pdt-tab.active {
    background: #fff;
    color: #0f172a;
    box-shadow: 0 1px 6px rgba(0,0,0,0.1);
  }

  /* ── Scrollbar hide ── */
  .scrollbar-hide { scrollbar-width: none; }
  .scrollbar-hide::-webkit-scrollbar { display: none; }

  /* ── Description column — desktop gets right border ── */
  .pdt-desc-col { border-right: 1px solid #e8ecf1; }

  /* ═══════════════════════════════════════════════════════════════════════
     MOBILE — phones (< 768 px)
  ═══════════════════════════════════════════════════════════════════════ */
  @media (max-width: 767px) {

    /* Clear fixed navbar (h = 5.5rem = 88px) */
    .pdt-root { padding-top: 88px !important; }

    /* Breadcrumb — tighter on mobile */
    .pdt-breadcrumb { padding: 8px 16px !important; overflow-x: auto; white-space: nowrap; scrollbar-width: none; }
    .pdt-breadcrumb::-webkit-scrollbar { display: none; }

    /* Hero section — less top/bottom padding */
    .pdt-hero-grid {
      padding-top: 12px !important;
      padding-bottom: 12px !important;
      gap: 20px !important;
    }

    /* Image slider — slightly smaller radius on mobile */
    .pdt-hero-grid .rounded-2xl { border-radius: 16px !important; }

    /* Info panel — NOT sticky on mobile, no top padding */
    .pdt-info-panel {
      position: static !important;
      top: auto !important;
      padding-top: 0 !important;
    }

    /* CTA buttons — full-width row on mobile */
    .pdt-cta-row {
      display: flex !important;
      width: 100% !important;
      gap: 10px !important;
    }
    .pdt-btn-cart, .pdt-btn-buy {
      flex: 1 !important;
      height: 44px !important;
      padding: 0 14px !important;
      font-size: 12px !important;
      border-radius: 9999px !important;
    }

    /* Size pills — compact */
    .pdt-size {
      min-width: 2.2rem !important;
      padding: 5px 8px !important;
      font-size: 11.5px !important;
    }

    /* Tab buttons — compact */
    .pdt-tab { font-size: 12px !important; padding: 6px 11px !important; }

    /* Description column — no right border on mobile (stacked layout) */
    .pdt-desc-col {
      border-right: none !important;
      padding-right: 0 !important;
      padding-top: 20px !important;
      padding-bottom: 20px !important;
    }

    /* FAQ column — less gap */
    .pdt-faq-col { padding-top: 0 !important; padding-bottom: 24px !important; }

    /* Desc+FAQ section — less top margin on mobile */
    .pdt-desc-section { margin-top: 20px !important; }

    /* "You May Also Like" section */
    .pdt-related-section {
      margin-top: 28px !important;
      padding-bottom: 48px !important;
    }
    .pdt-related-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 12px !important;
    }

    /* Social proof row — tighter */
    .pdt-social-proof {
      padding: 7px 12px !important;
      gap: 10px !important;
      font-size: 11px !important;
    }

    /* Trust pills — tighter padding */
    .pdt-trust-grid { gap: 8px !important; }
    .pdt-trust-grid > div { padding: 10px 6px !important; }

    /* Payment badges section */
    .pdt-payment-box { padding: 12px !important; }

    /* Pickup note */
    .pdt-pickup { padding: 10px 12px !important; }

    /* Help box */
    .pdt-help-box { padding: 14px !important; }

    /* "You May Also Like" heading */
    .pdt-related-heading { font-size: 18px !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────
   STATIC DATA
────────────────────────────────────────────────────────────────────────── */
const SHIPPING_INFO = {
  delivery: 'Delivery in 2–3 business days. We ship across Maharashtra and pan-India.',
  tracking: "Track your order via SMS and email. You'll get updates at every step.",
  cod: 'Cash on Delivery (COD) available. Secure online payment options also available.',
};
const FAQ_ITEMS = [
  { q: 'Is this the exact uniform my school specifies?', a: 'Yes. We work directly with schools to ensure colour, fabric, and design match exactly.' },
  { q: 'How do I choose the right size?', a: 'Use our size chart on this page. If in doubt, we recommend the next size up. Easy exchange available.' },
  { q: 'What if the size is wrong?', a: "We offer hassle-free exchange. Contact us within 7 days of delivery and we'll arrange a swap." },
  { q: 'When will I receive my order?', a: 'Orders are typically delivered in 2–3 business days with tracking via SMS and email.' },
  { q: 'Is delivery available in my area?', a: 'We deliver across Maharashtra and pan-India.' },
];

/* ─────────────────────────────────────────────────────────────────────────
   HELPERS
────────────────────────────────────────────────────────────────────────── */
function FadeUp({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className || ''}
    >{children}</motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   IMAGE SLIDER
────────────────────────────────────────────────────────────────────────── */
function ImageSlider({ images, productName }) {
  const [current, setCurrent] = useState(0);
  const count = images.length;
  const prev = () => setCurrent(c => c === 0 ? count - 1 : c - 1);
  const next = () => setCurrent(c => c === count - 1 ? 0 : c + 1);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl"
      style={{ aspectRatio: '4/5', background: '#ffffff' }}>
      <AnimatePresence mode="wait">
        <motion.img key={current} src={images[current]} alt={`${productName} ${current + 1}`}
          className="absolute inset-0 w-full h-full object-contain"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      {count > 1 && (
        <>
          <button onClick={prev} aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform z-10"
            style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.12)', border: '1px solid #e2e8f0' }}>
            <ChevronLeft size={16} strokeWidth={2} style={{ color: '#374151' }} />
          </button>
          <button onClick={next} aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform z-10"
            style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.12)', border: '1px solid #e2e8f0' }}>
            <ChevronRight size={16} strokeWidth={2} style={{ color: '#374151' }} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {images.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Image ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 h-1.5 bg-[#2563eb]' : 'w-1.5 h-1.5 bg-white/60 hover:bg-white/90'}`} />
            ))}
          </div>
          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(6px)', color: '#374151', fontFamily: "'Nunito', sans-serif", fontWeight: 700, boxShadow: '0 1px 6px rgba(0,0,0,0.10)' }}>
            {current + 1}/{count}
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   THUMBNAIL STRIP
────────────────────────────────────────────────────────────────────────── */
function ThumbnailStrip({ images, current, setCurrent }) {
  if (images.length <= 1) return null;
  return (
    <div className="flex gap-2 mt-3">
      {images.map((img, i) => (
        <button key={i} onClick={() => setCurrent(i)}
          className={`w-14 h-14 overflow-hidden rounded-xl flex-shrink-0 border transition-all duration-200 ${i === current ? 'border-[#2563eb] shadow-sm shadow-[#2563eb]/20' : 'border-[#e2e8f0] opacity-55 hover:opacity-100 hover:border-[#93c5fd]'}`}>
          <img src={img} alt={i + 1} className="w-full h-full object-contain" />
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FAQ ROW
────────────────────────────────────────────────────────────────────────── */
function FaqRow({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: '1px solid #e8ecf1' }}>
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group">
        <span className="font-bold text-[#0f172a] leading-snug"
          style={{ fontFamily: "'Nunito', sans-serif", fontSize: '14px', fontWeight: 700 }}>
          {item.q}
        </span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
          style={{ background: open ? '#0f172a' : '#f1f5f9', color: open ? '#fff' : '#64748b', border: '1px solid #e2e8f0' }}>
          <span className="text-sm leading-none font-light">+</span>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="ans"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden">
            <p className="pb-4 leading-relaxed text-[#64748b]"
              style={{ fontSize: '13px', fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────────────────
   MAIN EXPORT
────────────────────────────────────────────────────────────────────────── */
export function ProductDetailTemplate({ product, schoolName, schoolSlug, initialColor }) {
  const navigate = useNavigate();
  const { addItem, openCart } = useCart();

  const colors = getProductColors(product);
  const baseSizes = Array.from({ length: 15 }, (_, i) => String(18 + i * 2));
  const sizesFromProduct = (product.sizes && product.sizes.length) ? product.sizes : DETAIL_SIZES;
  const mergedSizes = Array.from(new Set([...baseSizes, ...sizesFromProduct]));

  const [selectedColor, setSelectedColor] = useState(() => {
    const urlColor = initialColor?.trim();
    if (urlColor && colors.length) {
      const found = colors.find(c => c.name.toLowerCase() === urlColor.toLowerCase());
      if (found) return found;
    }
    return colors[0];
  });
  const [selectedSize, setSelectedSize] = useState(mergedSizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [customSize, setCustomSize] = useState('');
  const [wishlist, setWishlist] = useState(false);
  const [descTab, setDescTab] = useState('description');
  const [sliderIndex, setSliderIndex] = useState(0);
  const [quickShopProduct, setQuickShopProduct] = useState(null);
  const openQuickShop = useCallback((payload) => setQuickShopProduct(payload), []);
  const closeQuickShop = useCallback(() => setQuickShopProduct(null), []);

  const gallery = (() => {
    const colorImages = getProductImages(product, selectedColor?.name);
    if (colorImages.length) return colorImages.slice(0, 5);
    const mainImage = product.image || '/school1.png';
    const raw = [mainImage, product.image || '/school2.png', product.image || '/school3.png'].filter(Boolean);
    return Array.from(new Set(raw)).slice(0, 5);
  })();

  const related = getRelatedProducts(product.id, schoolSlug, 8);
  const youMayAlsoLike = related.slice(0, 4);

  const variantImage = gallery[0];

  function handleAddToCart() {
    addItem({ productId: product.id, name: product.name, price: product.price, size: selectedSize, quantity, color: selectedColor?.name, image: variantImage });
    openCart();
  }
  function handleBuyNow() {
    addItem({ productId: product.id, name: product.name, price: product.price, size: selectedSize, quantity, color: selectedColor?.name, image: variantImage });
    navigate('/checkout');
  }

  return (
    <div className="pdt-root">
      <style>{GLOBAL_CSS}</style>

      {/* ── Breadcrumb ── */}
      <div style={{ borderBottom: '1px solid #e8ecf1', background: '#fff' }}>
        <div className="pdt-breadcrumb max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 py-3">
          <nav className="flex items-center flex-wrap gap-x-2 gap-y-1">
            {[
              { label: 'Home', to: '/' },
              schoolSlug && { label: 'Schools', to: '/schools' },
              schoolSlug && { label: schoolName, to: `/schools/${schoolSlug}` },
            ].filter(Boolean).map((item, i, arr) => (
              <span key={item.to} className="flex items-center gap-2">
                <Link to={item.to} className="hover:text-[#2563eb] transition-colors"
                  style={{ fontFamily: "'Nunito', sans-serif", fontSize: '12px', fontWeight: 600, color: '#94a3b8', textDecoration: 'none' }}>
                  {item.label}
                </Link>
                {i < arr.length - 1 && <span style={{ color: '#cbd5e1', fontSize: '12px' }}>›</span>}
              </span>
            ))}
            {(schoolSlug || true) && <span style={{ color: '#cbd5e1', fontSize: '12px' }}>›</span>}
            <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">

        {/* ══ HERO: Image + Info ══ */}
        <div className="pdt-hero-grid grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 pt-8 lg:pt-10 pb-8">

          {/* LEFT: Images — order-1 on mobile so image appears FIRST */}
          <motion.div className="order-1 lg:order-1"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <ImageSlider images={gallery} productName={product.name} />
            <ThumbnailStrip images={gallery} current={sliderIndex} setCurrent={setSliderIndex} />
          </motion.div>

          {/* RIGHT: Product Info — order-2 on mobile (comes after image) */}
          <motion.div className="pdt-info-panel order-2 lg:order-2 lg:sticky lg:top-6 lg:self-start lg:pt-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>

            {/* School label */}
            {schoolName && (
              <Link to={schoolSlug ? `/schools/${schoolSlug}` : '/schools'}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 font-bold"
                style={{ background: '#f1f5f9', color: '#475569', fontSize: '11px', fontFamily: "'Nunito', sans-serif", textDecoration: 'none', border: '1px solid #e2e8f0', letterSpacing: '0.04em' }}>
                🏫 {schoolName}
              </Link>
            )}

            {/* Product name */}
            <h1 className="m-0 text-[#0f172a] leading-tight mb-1"
              style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: 'clamp(22px, 2.6vw, 36px)', letterSpacing: '-0.3px' }}>
              {product.name}
            </h1>

            <p className="text-[#94a3b8] mb-4"
              style={{ fontFamily: "'Nunito', sans-serif", fontSize: '13px', fontWeight: 600 }}>
              Official School Uniform · Direct from Manufacturer
            </p>

            {/* Price + stars */}
            <div className="flex items-center gap-4 mb-4">
              <span className="font-black text-[#0f172a]"
                style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: 'clamp(24px, 2.4vw, 30px)' }}>
                ₹{product.price}
              </span>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-[#f59e0b] text-[#f59e0b]" />)}
                <span className="font-black text-[#0f172a] ml-1"
                  style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '13px' }}>4.9</span>
                <span className="text-[#94a3b8] ml-1"
                  style={{ fontSize: '12px', fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>(2,143)</span>
              </div>
            </div>

            {/* Social proof */}
            <div className="pdt-social-proof inline-flex items-center gap-3 rounded-xl px-4 py-2 mb-5"
              style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <span className="flex items-center gap-1.5 text-[#16a34a]"
                style={{ fontSize: '12px', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <strong>15</strong> viewing now
              </span>
              <span style={{ width: '1px', height: '14px', background: '#e2e8f0' }} />
              <span className="flex items-center gap-1.5 text-[#d97706]"
                style={{ fontSize: '12px', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                <Flame size={11} />
                <strong>30</strong> sold today
              </span>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: '#e8ecf1', marginBottom: '20px' }} />

            {/* Colour picker */}
            {colors.length > 0 && (
              <div className="mb-5">
                <p className="font-semibold uppercase tracking-wider mb-2.5"
                  style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '11px', color: '#64748b', letterSpacing: '0.08em' }}>
                  Colour — <span className="normal-case tracking-normal" style={{ color: '#f59e0b' }}>{selectedColor?.name}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {colors.map(c => (
                    <button key={c.hex} title={c.name} onClick={() => setSelectedColor(c)}
                      style={{ backgroundColor: c.hex, width: '26px', height: '26px', borderRadius: '50%', transition: 'all 0.2s ease',
                        boxShadow: selectedColor?.hex === c.hex ? `0 0 0 2px #fff, 0 0 0 4px #2563eb` : '0 1px 4px rgba(0,0,0,0.18)',
                        transform: selectedColor?.hex === c.hex ? 'scale(1.15)' : 'scale(1)',
                        border: 'none', cursor: 'pointer' }} />
                  ))}
                </div>
              </div>
            )}

            {/* Size picker */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2.5">
                <p className="font-semibold uppercase tracking-wider m-0"
                  style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '11px', color: '#64748b', letterSpacing: '0.08em' }}>
                  Size — <span className="normal-case tracking-normal" style={{ color: '#f59e0b' }}>{selectedSize}</span>
                </p>
                <Link to="/size-guide" className="flex items-center gap-1 hover:text-[#2563eb] transition-colors"
                  style={{ color: '#94a3b8', fontSize: '12px', fontFamily: "'Nunito', sans-serif", textDecoration: 'none', fontWeight: 600 }}>
                  <Ruler size={12} /> Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {mergedSizes.map(s => (
                  <button key={s} onClick={() => { setSelectedSize(s); setCustomSize(''); }}
                    className={`pdt-size ${selectedSize === s && !customSize ? 'active' : ''}`}>
                    {s}
                  </button>
                ))}
              </div>
              <input type="text" value={customSize}
                onChange={e => { const v = e.target.value.trim(); setCustomSize(v); if (v) setSelectedSize(v); }}
                placeholder="Custom size? Type here"
                className="mt-3"
                style={{ width: '180px', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '7px 14px', fontSize: '13px', fontFamily: "'Nunito', sans-serif", fontWeight: 600, color: '#0f172a', outline: 'none', background: '#fff', display: 'block' }}
                onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.10)'; }}
                onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center rounded-xl overflow-hidden"
                style={{ border: '1.5px solid #e2e8f0', background: '#fff' }}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} aria-label="Decrease"
                  className="w-10 h-10 flex items-center justify-center hover:bg-[#f8f9fb] transition-colors"
                  style={{ color: '#374151' }}>
                  <Minus size={13} strokeWidth={2} />
                </button>
                <span className="w-9 text-center font-black text-[#0f172a]"
                  style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '15px' }}>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} aria-label="Increase"
                  className="w-10 h-10 flex items-center justify-center hover:bg-[#f8f9fb] transition-colors"
                  style={{ color: '#374151' }}>
                  <Plus size={13} strokeWidth={2} />
                </button>
              </div>

              {/* Wishlist */}
              <button onClick={() => setWishlist(v => !v)} aria-label="Wishlist"
                className="w-10 h-10 flex items-center justify-center rounded-xl transition-all"
                style={{ border: '1.5px solid #e2e8f0', background: wishlist ? '#fef2f2' : '#fff', color: wishlist ? '#dc2626' : '#94a3b8' }}>
                <Heart size={15} strokeWidth={2} className={wishlist ? 'fill-current' : ''} />
              </button>
            </div>

            {/* Add to Cart + Buy Now — side by side, full-width on mobile */}
            <div className="pdt-cta-row flex items-center mb-5" style={{ gap: '12px' }}>
              <button onClick={handleAddToCart} className="pdt-btn-cart">
                <ShoppingBag size={15} strokeWidth={2} />
                Add to Cart
              </button>
              <button onClick={handleBuyNow} className="pdt-btn-buy">
                Buy Now
                <ArrowRight size={14} strokeWidth={2.5} />
              </button>
            </div>

            {/* Pickup note */}
            <div className="pdt-pickup flex items-center gap-2.5 rounded-xl px-4 py-3 mb-4"
              style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <Check size={14} strokeWidth={2.5} className="text-green-600 shrink-0" />
              <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: '13px', fontWeight: 700, color: '#166534' }}>
                Pickup available at Baramati
                <span style={{ color: '#4ade80', marginLeft: '6px', fontWeight: 400 }}>· Usually ready in 24 hours</span>
              </span>
            </div>

            {/* Trust pills */}
            <div className="pdt-trust-grid grid grid-cols-3 gap-2 mb-4">
              {[
                { icon: BadgeCheck, label: '2 Lakh+\nCustomers', color: '#0f172a' },
                { icon: Truck,      label: 'Free\nShipping',    color: '#0f172a' },
                { icon: RotateCcw, label: '7-Day\nExchange',   color: '#0f172a' },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 rounded-xl p-3"
                  style={{ background: '#fff', border: '1px solid #e8ecf1', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <Icon size={17} strokeWidth={1.8} style={{ color }} />
                  <p className="text-center leading-tight whitespace-pre-line font-bold text-[#374151] m-0"
                    style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '11px' }}>{label}</p>
                </div>
              ))}
            </div>

            {/* Payment badges */}
            <div className="pdt-payment-box rounded-xl p-4" style={{ border: '1px solid #e8ecf1', background: '#fff' }}>
              <p className="font-bold uppercase tracking-wider text-center mb-3"
                style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '10px', color: '#94a3b8', letterSpacing: '0.1em' }}>
                Guaranteed Safe Checkout
              </p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {['PayPal', 'Mastercard', 'VISA', 'Amex', 'UPI', 'COD'].map(name => (
                  <span key={name} className="px-2.5 py-1 rounded-lg font-bold"
                    style={{ background: '#f8f9fb', color: '#374151', fontSize: '11px', fontFamily: "'Nunito', sans-serif", fontWeight: 700, border: '1px solid #e8ecf1' }}>
                    {name}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>
        </div>

        {/* ══ DESCRIPTION + FAQ ══ */}
        <FadeUp>
          <div className="pdt-desc-section mt-8 lg:mt-10" style={{ borderTop: '1px solid #e8ecf1' }}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-16">

              {/* Description + Shipping */}
              <div className="pdt-desc-col lg:col-span-7 py-10 lg:pr-12">

                {/* Tabs */}
                <div className="flex gap-1 rounded-xl p-1 mb-7 w-fit"
                  style={{ background: '#f1f5f9' }}>
                  {['description', 'shipping'].map(tab => (
                    <button key={tab} onClick={() => setDescTab(tab)}
                      className={`pdt-tab ${descTab === tab ? 'active' : ''}`}>
                      {tab === 'shipping' ? '🚚 Shipping' : '📝 Description'}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {descTab === 'description' && (
                    <motion.div key="desc"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                      <p className="leading-relaxed text-[#374151] mb-3"
                        style={{ fontFamily: "'Nunito', sans-serif", fontSize: '14px', fontWeight: 600 }}>
                        The <strong style={{ color: '#0f172a', fontFamily: "'Baloo 2', cursive", fontWeight: 900 }}>{product.name}</strong> is part of our official school uniform range, crafted to match your school's exact specifications.
                      </p>
                      <p className="leading-relaxed text-[#94a3b8] mb-6"
                        style={{ fontFamily: "'Nunito', sans-serif", fontSize: '13px', fontWeight: 600 }}>
                        We partner directly with schools to ensure colour and design match perfectly. Easy exchange if the size isn't right.
                      </p>
                      <div style={{ borderTop: '1px solid #e8ecf1', paddingTop: '20px' }}>
                        <p className="font-black uppercase tracking-wider mb-4"
                          style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '12px', color: '#0f172a', letterSpacing: '0.08em' }}>
                          Key Features
                        </p>
                        <div className="space-y-3">
                          {[
                            'Premium soft fabric for warmth and comfort',
                            'Designed to school exact colour specifications',
                            'Durable construction for daily school wear',
                            'Easy care — machine washable',
                            'School-approved design and fit',
                          ].map(feat => (
                            <div key={feat} className="flex items-start gap-3">
                              <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-1"
                                style={{ background: '#f59e0b' }}>
                                <Check size={9} strokeWidth={3} style={{ color: '#fff' }} />
                              </div>
                              <p className="text-[#374151] m-0"
                                style={{ fontFamily: "'Nunito', sans-serif", fontSize: '14px', fontWeight: 600 }}>
                                {feat}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {descTab === 'shipping' && (
                    <motion.div key="ship"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
                      className="space-y-5">
                      {[
                        { icon: Truck,      color: '#0ea5e9', label: 'Delivery',          text: SHIPPING_INFO.delivery },
                        { icon: BadgeCheck, color: '#2563eb', label: 'Order Tracking',    text: SHIPPING_INFO.tracking },
                        { icon: Shield,     color: '#10b981', label: 'Payment',           text: SHIPPING_INFO.cod },
                        { icon: RotateCcw,  color: '#f59e0b', label: 'Returns & Exchange', text: "Easy 7-day return & exchange. Contact us and we'll arrange everything." },
                      ].map(({ icon: Icon, color, label, text }) => (
                        <div key={label} className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: `${color}14`, border: `1px solid ${color}22`, color }}>
                            <Icon size={17} strokeWidth={1.8} />
                          </div>
                          <div>
                            <p className="font-black text-[#0f172a] mb-1 m-0"
                              style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '14px' }}>{label}</p>
                            <p className="text-[#64748b] m-0"
                              style={{ fontFamily: "'Nunito', sans-serif", fontSize: '13px', fontWeight: 600 }}>{text}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* FAQ */}
              <div className="pdt-faq-col lg:col-span-5 py-10">
                <p className="font-black text-[#0f172a] mb-1"
                  style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '18px' }}>
                  FAQs
                </p>
                <p className="text-[#94a3b8] mb-5"
                  style={{ fontFamily: "'Nunito', sans-serif", fontSize: '13px', fontWeight: 600 }}>
                  Everything you need to know.
                </p>
                <div>
                  {FAQ_ITEMS.map((item, i) => <FaqRow key={i} item={item} />)}
                  <div style={{ borderTop: '1px solid #e8ecf1' }} />
                </div>

                {/* Still have questions */}
                <div className="pdt-help-box mt-5 rounded-2xl p-5 flex items-center gap-4"
                  style={{ background: '#0f172a', boxShadow: '0 8px 24px rgba(15,23,42,0.18)' }}>
                  <div>
                    <p className="font-black text-white mb-1 m-0"
                      style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '16px' }}>
                      Still have questions?
                    </p>
                    <p className="m-0"
                      style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Nunito', sans-serif", fontSize: '13px', fontWeight: 600 }}>
                      Our team is here to help.
                    </p>
                  </div>
                  <button className="ml-auto shrink-0 font-bold rounded-xl px-4 py-2 whitespace-nowrap"
                    style={{ background: '#fff', color: '#0f172a', fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '13px', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    Ask us →
                  </button>
                </div>
              </div>

            </div>
          </div>
        </FadeUp>

        {/* ══ BOUGHT TOGETHER — moved to cart drawer upsell panel ══ */}

        {/* ══ YOU MAY ALSO LIKE ══ */}
        {youMayAlsoLike.length > 0 && (
          <FadeUp className="pdt-related-section mt-12 lg:mt-14 pb-20">
            <div style={{ borderTop: '1px solid #e8ecf1', paddingTop: '32px' }}>
              <div className="flex items-center gap-3 mb-6">
                <h3 className="pdt-related-heading m-0 text-[#0f172a]"
                  style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: 'clamp(18px, 1.6vw, 24px)' }}>
                  You May Also Like
                </h3>
                <div style={{ flex: 1, height: '1px', background: '#e8ecf1', borderRadius: '99px' }} />
              </div>
              <div className="pdt-related-grid grid grid-cols-2 lg:grid-cols-4 gap-5">
                {youMayAlsoLike.map(({ product: p, schoolName: sn, schoolSlug: ss }) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    schoolName={sn}
                    schoolSlug={ss}
                    onQuickShop={openQuickShop}
                  />
                ))}
              </div>
            </div>
          </FadeUp>
        )}

      </div>

      <QuickShopDrawer
        open={Boolean(quickShopProduct)}
        onClose={closeQuickShop}
        product={quickShopProduct?.product ?? null}
        schoolName={quickShopProduct?.schoolName ?? null}
        schoolSlug={quickShopProduct?.schoolSlug ?? null}
      />
    </div>
  );
}
