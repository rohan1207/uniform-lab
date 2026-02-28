import { Link } from 'react-router-dom';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Heart, ShoppingBag } from 'lucide-react';

/* Match NewHero / AccountPage: Baloo 2 (headings), Nunito (body), pill buttons */
const FONT_HEADING = { fontFamily: "'Baloo 2', cursive" };
const FONT_BODY = { fontFamily: "'Nunito', sans-serif" };
const BTN_PRIMARY = {
  background: 'linear-gradient(180deg, #1a6bb8 0%, #004C99 50%, #003d7a 100%)',
  border: '1px solid rgba(0,76,153,0.6)',
  boxShadow: '0 2px 8px rgba(0,76,153,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
  color: '#fff',
  borderRadius: '9999px',
  padding: '0.5rem 1.25rem',
  fontSize: '0.8125rem',
  fontWeight: 700,
  letterSpacing: '0.02em',
};

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
      image: item.image || undefined,
    });
  };

  return (
    <main className="min-h-screen bg-[var(--page-bg)] pt-24 px-4 sm:px-6" style={FONT_BODY}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;600;700&display=swap');`}</style>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e] mb-1" style={FONT_HEADING}>Wishlist</h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              Save uniforms you like and move them to the cart when you’re ready.
            </p>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              className="text-xs font-semibold text-slate-500 hover:text-[#004C99] px-3 py-1.5 rounded-full border border-slate-200 hover:border-[#004C99]/40 transition"
            >
              Clear all
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 rounded-xl border border-[var(--color-border)] bg-white">
            <Heart size={40} className="mb-3 text-[var(--color-border)]" />
            <p className="text-sm text-[var(--color-text-muted)] mb-3">
              Your wishlist is empty.
            </p>
            <Link
              to="/schools"
              className="inline-flex items-center justify-center py-2.5 px-5 rounded-full font-bold text-white hover:brightness-105 transition"
              style={{ ...BTN_PRIMARY, ...FONT_HEADING, textDecoration: 'none' }}
            >
              Browse schools &amp; uniforms
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-white p-4"
              >
                <div className="w-20 h-20 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ShoppingBag size={28} className="text-slate-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.productId}`}
                    className="block text-sm font-semibold text-slate-900 truncate hover:text-[var(--color-accent)]"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-slate-700 mt-0.5">₹{item.price}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => handleMoveToCart(item)}
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full font-bold hover:brightness-105 transition"
                    style={{ ...BTN_PRIMARY, ...FONT_HEADING }}
                  >
                    <ShoppingBag size={14} />
                    Add to cart
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist({ id: item.productId, ...item.meta })}
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full text-xs font-semibold text-slate-500 border border-slate-200 hover:bg-[#eef5ff] hover:text-[#004C99] hover:border-[#004C99]/40 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

