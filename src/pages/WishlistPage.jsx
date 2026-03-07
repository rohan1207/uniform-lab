import { Link } from "react-router-dom";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Heart, ShoppingBag, X } from "lucide-react";

const FONT_HEADING = { fontFamily: "'Inter', sans-serif", fontWeight: 800 };
const FONT_BODY = { fontFamily: "'Inter', sans-serif" };

const PAGE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  .wl-card, .wl-card * { font-family: 'Inter', sans-serif; }

  .wl-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 18px;
  }
  .wl-card {
    background: #fff;
    border: 1.5px solid #e5edf9;
    border-radius: 18px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    transition: box-shadow 0.25s, transform 0.25s;
  }
  .wl-card:hover {
    box-shadow: 0 8px 28px rgba(37,99,235,0.12);
    transform: translateY(-3px);
  }
  .wl-img-wrap {
    aspect-ratio: 3 / 4;
    background: #f1f5f9;
    position: relative;
    overflow: hidden;
  }
  .wl-img-wrap img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }
  .wl-img-placeholder {
    width: 100%; height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%);
  }
  .wl-remove-btn {
    position: absolute;
    top: 8px; right: 8px;
    width: 28px; height: 28px;
    border-radius: 50%;
    background: rgba(255,255,255,0.92);
    border: 1px solid #e2e8f0;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    color: #94a3b8;
    transition: color 0.15s, background 0.15s;
    backdrop-filter: blur(6px);
  }
  .wl-remove-btn:hover { color: #e11d48; background: #fff0f3; border-color: #fecdd3; }
  .wl-info {
    padding: 12px 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }
  .wl-name {
    font-weight: 800;
    font-size: 14px;
    color: #0f172a;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .wl-price {
    font-weight: 900;
    font-size: 15px;
    color: #1e3a8a;
  }
  .wl-atc {
    width: 100%;
    padding: 9px 12px;
    border-radius: 10px;
    background: linear-gradient(180deg, #1a6bb8 0%, #004C99 50%, #003d7a 100%);
    border: none;
    color: #fff;
    font-weight: 800;
    font-size: 13px;
    letter-spacing: 0.02em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: filter 0.15s;
    margin-top: auto;
  }
  .wl-atc:hover { filter: brightness(1.1); }

  @media (max-width: 480px) {
    .wl-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    .wl-info { padding: 10px 11px 12px; }
    .wl-name { font-size: 13px; }
    .wl-price { font-size: 14px; }
    .wl-atc { font-size: 12px; padding: 8px 10px; border-radius: 9px; }
  }
`;

function resolveImage(item) {
  if (item.image) return item.image;
  const m = item.meta;
  if (!m) return null;
  if (m.image) return m.image;
  if (m.mainImageUrl) return m.mainImageUrl;
  if (m.imagesByColor) {
    const first = Object.values(m.imagesByColor)[0];
    if (Array.isArray(first) && first[0]) return first[0];
  }
  if (Array.isArray(m.images) && m.images[0]) return m.images[0];
  return null;
}

export default function WishlistPage() {
  const { items, toggleWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = (item) => {
    addItem({
      productId: item.productId,
      name: item.name,
      price: item.price,
      size: item.meta?.sizes?.[0] || item.meta?.defaultSize || null,
      color: item.meta?.colors?.[0]?.name || null,
      quantity: 1,
      image: resolveImage(item) || undefined,
    });
  };

  return (
    <main
      className="min-h-screen bg-[var(--page-bg)] pt-24 pb-16 px-4 sm:px-6"
      style={FONT_BODY}
    >
      <style>{PAGE_CSS}</style>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1
              className="text-2xl font-bold text-[#1a1a2e] mb-1"
              style={FONT_HEADING}
            >
              Wishlist
              {items.length > 0 && (
                <span className="ml-2 text-base font-semibold text-slate-400">
                  ({items.length})
                </span>
              )}
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              Save uniforms you like and add to cart when ready.
            </p>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              className="text-xs font-semibold text-slate-500 hover:text-rose-600 px-3 py-1.5 rounded-full border border-slate-200 hover:border-rose-200 transition"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-[var(--color-border)] bg-white">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-4">
              <Heart size={28} className="text-rose-300" />
            </div>
            <p
              className="text-base font-bold text-slate-700 mb-1"
              style={FONT_HEADING}
            >
              Nothing saved yet
            </p>
            <p className="text-sm text-slate-400 mb-5">
              Tap the ♡ on any product to save it here.
            </p>
            <Link
              to="/schools"
              className="inline-flex items-center gap-2 py-2.5 px-6 rounded-full font-bold text-white hover:brightness-105 transition text-sm"
              style={{
                background:
                  "linear-gradient(180deg, #1a6bb8 0%, #004C99 50%, #003d7a 100%)",
                textDecoration: "none",
                ...FONT_HEADING,
              }}
            >
              Browse uniforms
            </Link>
          </div>
        ) : (
          <div className="wl-grid">
            {items.map((item) => {
              const imgSrc = resolveImage(item);
              return (
                <div key={item.productId} className="wl-card">
                  {/* Image */}
                  <Link
                    to={`/product/${item.productId}`}
                    style={{ display: "block", flexShrink: 0 }}
                  >
                    <div className="wl-img-wrap">
                      {imgSrc ? (
                        <img src={imgSrc} alt={item.name} />
                      ) : (
                        <div className="wl-img-placeholder">
                          <ShoppingBag
                            size={36}
                            strokeWidth={1}
                            style={{ color: "#93c5fd" }}
                          />
                        </div>
                      )}
                      {/* Remove button pinned on image */}
                      <button
                        type="button"
                        className="wl-remove-btn"
                        aria-label="Remove from wishlist"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist({ id: item.productId, ...item.meta });
                        }}
                      >
                        <X size={13} strokeWidth={2.5} />
                      </button>
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="wl-info" style={FONT_BODY}>
                    <div>
                      <Link
                        to={`/product/${item.productId}`}
                        className="wl-name hover:text-[#2563eb] transition-colors"
                        style={{ ...FONT_HEADING, textDecoration: "none" }}
                      >
                        {item.name}
                      </Link>
                      <div className="wl-price" style={FONT_HEADING}>
                        ₹{item.price}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="wl-atc"
                      style={FONT_HEADING}
                      onClick={() => handleMoveToCart(item)}
                    >
                      <ShoppingBag size={14} strokeWidth={2} />
                      Add to cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
