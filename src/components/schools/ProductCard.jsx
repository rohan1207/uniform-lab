import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { getProductColors, getProductImages } from '@/data/schoolCatalog';
import { ShoppingBag, Check, Zap, Heart } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────
   STYLES
────────────────────────────────────────────────────────────────────────── */
const CARD_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700&display=swap');

  /* ── Card shell ── */
  .pc-card {
    background: #fff;
    border: 1.5px solid rgba(15,23,42,0.08);
    border-radius: 18px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03);
    transition: box-shadow 0.32s cubic-bezier(0.25,0.46,0.45,0.94),
                transform   0.32s cubic-bezier(0.34,1.4,0.64,1),
                border-color 0.32s ease;
  }
  .pc-card:hover {
    box-shadow: 0 8px 32px rgba(37,99,235,0.12), 0 2px 8px rgba(0,0,0,0.06);
    transform: translateY(-6px);
    border-color: rgba(37,99,235,0.18);
  }

  /* ── Price chip (frosted) ── */
  .pc-price {
    position: absolute;
    top: 10px; right: 10px;
    background: rgba(255,255,255,0.88);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 8px;
    padding: 3px 10px;
    font-family: 'Baloo 2', cursive;
    font-weight: 900;
    font-size: 13px;
    color: #0f172a;
    box-shadow: 0 2px 8px rgba(0,0,0,0.09);
    z-index: 2;
    letter-spacing: -0.2px;
  }

  /* ── Quick Shop ── dark navy, premium game feel */
  .pc-btn-quick {
    flex: 1;
    height: 38px;
    border: none;
    border-radius: 10px;
    background: #0f172a;
    color: #cbd5e1;
    font-family: 'Baloo 2', cursive;
    font-weight: 900;
    font-size: 10.5px;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    white-space: nowrap;
    transition: background 0.22s ease, color 0.22s ease,
                box-shadow 0.22s ease, transform 0.15s ease;
  }
  .pc-btn-quick:hover {
    background: #1e3a8a;
    color: #fff;
    box-shadow: 0 6px 22px rgba(37,99,235,0.28);
    transform: translateY(-1px);
  }
  .pc-btn-quick:active { transform: translateY(1px); box-shadow: none; }

  /* ── Add to Cart ── refined amber */
  .pc-btn-cart {
    width: 38px; height: 38px;
    border: none;
    border-radius: 10px;
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 60%, #d97706 100%);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 2px 10px rgba(245,158,11,0.22);
    transition: box-shadow 0.22s ease, transform 0.15s ease, filter 0.15s ease;
  }
  .pc-btn-cart:hover {
    box-shadow: 0 6px 22px rgba(245,158,11,0.38);
    transform: translateY(-1px) scale(1.06);
    filter: brightness(1.05);
  }
  .pc-btn-cart:active { transform: scale(0.94); box-shadow: none; }

  /* ── Added — emerald flash ── */
  .pc-btn-cart.added {
    background: linear-gradient(135deg, #34d399, #10b981, #059669);
    box-shadow: 0 2px 10px rgba(16,185,129,0.28);
  }

  /* ── Swatch ── */
  .pc-swatch {
    width: 15px; height: 15px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    flex-shrink: 0;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .pc-swatch:hover { transform: scale(1.18); }
  .pc-swatch.sel {
    box-shadow: 0 0 0 2px #fff, 0 0 0 3.5px #2563eb;
    transform: scale(1.18);
  }

  /* ── Card info body ── */
  .pc-info {
    padding: 14px 15px 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }

  /* ═══════════════════════════════════════════════════════════════════════
     MOBILE — phones (< 768 px)
  ═══════════════════════════════════════════════════════════════════════ */
  @media (max-width: 767px) {

    /* Subtle lift only — no big jump on tiny cards */
    .pc-card:hover { transform: translateY(-2px); }

    /* Tighter rounded corners */
    .pc-card { border-radius: 14px; }

    /* Price chip — smaller, less obtrusive */
    .pc-price {
      font-size: 11px;
      padding: 2px 7px;
      top: 6px;
      right: 6px;
      border-radius: 6px;
      box-shadow: 0 1px 5px rgba(0,0,0,0.08);
    }

    /* Info body — tighter padding */
    .pc-info {
      padding: 10px 11px 12px;
      gap: 7px;
    }

    /* Quick Shop button — slimmer */
    .pc-btn-quick {
      height: 30px;
      font-size: 9px;
      letter-spacing: 0.06em;
      border-radius: 8px;
      gap: 3px;
    }

    /* Add to Cart button — slimmer square */
    .pc-btn-cart {
      width: 30px;
      height: 30px;
      border-radius: 8px;
    }

    /* Swatch dots — slightly smaller */
    .pc-swatch { width: 13px; height: 13px; }
  }
`;

function productImageForColor(product, schoolSlug, colorName) {
  if (!product?.image || !schoolSlug || !colorName) return product?.image;
  const base = product.image.replace(/\/[^/]+\.(jpg|jpeg|png)$/i, '');
  const slug = (product.name || '').toLowerCase().replace(/\s*\([^)]*\)/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const colorSlug = (colorName || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const ext = (product.image.match(/\.(jpg|jpeg|png)$/i) || ['', 'jpg'])[1];
  return `${base}/${slug}-${colorSlug}.${ext}`;
}

export function ProductCard({ product, schoolName, schoolSlug, onQuickShop }) {
  const { addItem } = useCart();
  const colors = getProductColors(product);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const productUrl = schoolSlug ? `/product/${product.id}?school=${schoolSlug}` : `/product/${product.id}`;

  const variantPrices = Array.isArray(product.variants)
    ? product.variants.map((v) => Number(v.saleRate)).filter((n) => Number.isFinite(n) && n > 0)
    : [];
  const displayPrice = variantPrices.length ? Math.min(...variantPrices) : product.price;

  const sizeOptions = useMemo(() => {
    if (Array.isArray(product.variants) && product.variants.length) {
      return [...new Set(product.variants.map((v) => (v.sizeLabel || '').trim()).filter(Boolean))];
    }
    if (Array.isArray(product.sizes) && product.sizes.length) return product.sizes;
    return [];
  }, [product.variants, product.sizes]);

  const defaultVariant = useMemo(() => {
    if (Array.isArray(product.variants) && product.variants.length) {
      return product.variants[0];
    }
    return null;
  }, [product.variants]);

  const displayImage = useMemo(() => {
    // Same behaviour as ProductDetailTemplate: prefer getProductImages (imagesByColor / images),
    // then fall back to product.image
    const colorImages = getProductImages(product, selectedColor?.name);
    if (colorImages.length) return colorImages[0];
    if (product?.image && String(product.image).trim()) return String(product.image).trim();
    if (Array.isArray(product?.images) && product.images[0] && String(product.images[0]).trim()) {
      return String(product.images[0]).trim();
    }
    return null;
  }, [product, selectedColor?.name]);

  useEffect(() => { setImageError(false); }, [displayImage]);

  const handleAddToCart = (e) => {
    e?.preventDefault?.();
    const selectedSize = defaultVariant?.sizeLabel || sizeOptions[0] || null;
    const price = defaultVariant?.saleRate ?? displayPrice;
    const variantCode = defaultVariant?.code;
    addItem({
      productId: product.id,
      name: product.name,
      price,
      size: selectedSize,
      quantity: 1,
      variantCode,
      color: selectedColor?.name || undefined,
      image: displayImage || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleQuickShop = (e) => {
    e?.preventDefault?.();
    onQuickShop?.({ product, schoolName, schoolSlug });
  };

  return (
    <>
      <style>{CARD_CSS}</style>

      <div className="pc-card group">

        {/* ── Image ── */}
        <Link to={productUrl} style={{ textDecoration: 'none', display: 'block', flexShrink: 0 }}>
          <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1/1', background: '#f1f5f9' }}>
        {displayImage && !imageError ? (
          <img
            src={displayImage}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
            className="group-hover:scale-[1.04]"
            onError={() => setImageError(true)}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag style={{ width: 44, height: 44, color: '#94a3b8', opacity: 0.4, strokeWidth: 1 }} />
          </div>
        )}
            {/* Wishlist — pinned top-right on image */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product);
              }}
              aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 bg-white/90 hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors"
              style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}
            >
              <Heart
                size={14}
                className={isInWishlist(product.id) ? 'fill-current text-rose-500' : ''}
              />
            </button>
          </div>
      </Link>

        {/* ── Info ── */}
        <div className="pc-info">

          {/* Name + price row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
            <Link to={productUrl} style={{ textDecoration: 'none', flex: 1, minWidth: 0 }}>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Baloo 2', cursive",
                  fontWeight: 900,
                  fontSize: 'clamp(14px, 1.15vw, 17px)',
                  color: '#0f172a',
                  lineHeight: 1.25,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  transition: 'color 0.18s ease',
                }}
                className="group-hover:text-[#2563eb]"
              >
                {product.name}
              </h3>
            </Link>
            <span
              style={{
                marginLeft: '4px',
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 900,
                fontSize: 'clamp(13px, 1vw, 16px)',
                color: '#0f172a',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              ₹{displayPrice}
            </span>
          </div>

          {/* Swatches + color name */}
        {colors.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              {colors.map((c) => (
                <button
                  key={c.hex} type="button"
                  className={`pc-swatch${selectedColor?.hex === c.hex ? ' sel' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => setSelectedColor(c)}
                  title={c.name} aria-label={`Color ${c.name}`} aria-pressed={selectedColor?.hex === c.hex}
                />
              ))}
              {selectedColor?.name && (
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: '11px', fontWeight: 600, color: '#94a3b8' }}>
                  {selectedColor.name}
                </span>
              )}
          </div>
        )}

          {/* Separator */}
          <div style={{ height: '1px', background: 'linear-gradient(to right, #e2e8f0 60%, transparent)', borderRadius: 99 }} />

          {/* Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto' }}>
            <button type="button" onClick={handleQuickShop} className="pc-btn-quick" aria-label="Quick shop">
              <Zap size={11} strokeWidth={2.5} />
              Quick Shop
          </button>
            <button type="button" onClick={handleAddToCart} className={`pc-btn-cart${added ? ' added' : ''}`} aria-label="Add to cart">
              {added
                ? <Check size={15} strokeWidth={2.5} style={{ color: '#fff' }} />
                : <ShoppingBag size={14} strokeWidth={2} style={{ color: '#fff' }} />
              }
          </button>
          </div>

        </div>
      </div>
    </>
  );
}
