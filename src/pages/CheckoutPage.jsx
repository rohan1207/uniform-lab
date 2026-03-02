import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, ShoppingBag, ShoppingCart, Plus, X } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items: cartItems, totalItems, addItem, clearCart, buyNowItem, clearBuyNow } = useCart();
  const { user, token, isAuthenticated } = useAuth();

  // "Include cart items" toggle — starts false (Buy Now = only that item)
  const [includeCart, setIncludeCart] = useState(false);
  // Once the user dismisses the card, don't show it again during this checkout session
  const [cartCardDismissed, setCartCardDismissed] = useState(false);

  // Determine which items to show in checkout
  const checkoutItems = useMemo(() => {
    if (buyNowItem) {
      // Buy Now flow: show only the buy-now item, optionally merge cart
      const buyNowList = [{
        ...buyNowItem,
        size: buyNowItem.size || null,
        color: buyNowItem.color || null,
      }];
      if (includeCart && cartItems.length > 0) {
        // Merge: buy-now item first, then cart items (avoid duplicates)
        const buyNowKey = [buyNowItem.productId, buyNowItem.size, buyNowItem.color].join('-');
        const filtered = cartItems.filter(i =>
          [i.productId, i.size, i.color].join('-') !== buyNowKey
        );
        return [...buyNowList, ...filtered];
      }
      return buyNowList;
    }
    // Normal cart checkout
    return cartItems;
  }, [buyNowItem, cartItems, includeCart]);

  const items = checkoutItems;
  const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Clean up buyNowItem when navigating away
  useEffect(() => {
    return () => {
      // Don't clear on unmount if we're going to payment — clearBuyNow is called after order
    };
  }, []);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [hasSavedAddress, setHasSavedAddress] = useState(false);
  const [saveAddress, setSaveAddress] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Redirect unauthenticated users to account page before checkout
  useEffect(() => {
    if (!items.length && !buyNowItem) return;
    if (!isAuthenticated) {
      navigate('/account?redirect=/checkout', { replace: true });
    }
  }, [items.length, buyNowItem, isAuthenticated, navigate]);

  // Prefill form from customer profile (addresses) if available
  useEffect(() => {
    if (!isAuthenticated || !token) return;
    let cancelled = false;
    async function loadProfile() {
      try {
        const res = await fetch(`${API_BASE}/api/customer/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data) return;
        if (cancelled) return;
        const addrs = Array.isArray(data.addresses) ? data.addresses : [];
        const hasAny = addrs.length > 0;
        setHasSavedAddress(hasAny);
        setSaveAddress(false);
        const defaultAddr =
          addrs.length ? addrs.find((a) => a.isDefault) || addrs[0] : null;
        setForm((prev) => ({
          ...prev,
          name: data.name || prev.name || '',
          email: data.email || prev.email || '',
          phone: data.phone || prev.phone || '',
          line1: defaultAddr?.line1 || prev.line1 || '',
          line2: defaultAddr?.line2 || prev.line2 || '',
          city: defaultAddr?.city || prev.city || '',
          state: defaultAddr?.state || prev.state || '',
          pincode: defaultAddr?.pincode || prev.pincode || '',
        }));
      } catch {
        // ignore
      }
    }
    loadProfile();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!items.length) return;
    setSubmitting(true);

    try {
      const payload = {
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        address: {
          name: form.name,
          line1: form.line1,
          line2: form.line2,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          phone: form.phone,
        },
        items: items.map((i) => ({
          productId: i.productId,
          productName: i.name,
          price: i.price,
          quantity: i.quantity,
          size: i.size,
          color: i.color,
          imageUrl: i.image || null,
        })),
        totalAmount,
      };

      const res = await fetch(`${API_BASE}/api/public/payments/instamojo/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.paymentUrl) {
        throw new Error(data?.error?.message || 'Could not start payment');
      }

      // Persist address to customer profile:
      // - First address is always saved
      // - Subsequent addresses only when user opts in via checkbox
      const shouldSaveAddress = !!token && (!hasSavedAddress || saveAddress);
      if (shouldSaveAddress) {
        try {
          await fetch(`${API_BASE}/api/customer/addresses`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              label: 'Default',
              name: form.name,
              phone: form.phone,
              line1: form.line1,
              line2: form.line2,
              city: form.city,
              state: form.state,
              pincode: form.pincode,
              isDefault: !hasSavedAddress,
            }),
          });
          if (!hasSavedAddress) {
            setHasSavedAddress(true);
          }
        } catch {
          // non-fatal
        }
      }

      // Redirect to Instamojo hosted payment page
      // Clear buyNowItem; if includeCart was selected, also clear cart
      if (buyNowItem) {
        clearBuyNow();
        if (includeCart) clearCart();
      } else {
        clearCart();
      }
      window.location.href = data.paymentUrl;
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err.message || 'Could not start payment');
      setSubmitting(false);
    }
  };

  if (!items.length && orderId) {
    return (
      <main className="min-h-screen bg-[#f8f9fb] pt-24 px-4 sm:px-6 pb-16">
        <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl border border-[#e2e8f0] px-6 sm:px-10 py-10 shadow-sm">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#e0f2fe] mb-4">
            <ShoppingBag className="text-[#0f172a]" size={24} />
          </div>
          <h1
            className="mb-2 text-[#0f172a]"
            style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: 'clamp(22px,2.4vw,30px)' }}
          >
            Thank you for your order
          </h1>
          <p
            className="mb-4 text-[#64748b]"
            style={{ fontFamily: "'Nunito', sans-serif", fontSize: '14px', fontWeight: 600 }}
          >
            Your Uniform Lab order ID is{' '}
            <span className="font-black text-[#0f172a]" style={{ fontFamily: "'Baloo 2', cursive" }}>
              {orderId}
            </span>
            . We&apos;ll confirm your order and share delivery details shortly.
          </p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-black tracking-[0.12em] uppercase shadow-sm"
            style={{
              fontFamily: "'Baloo 2', cursive",
              background: 'linear-gradient(180deg,#60a5fa 0%,#2563eb 52%,#1d4ed8 100%)',
              color: '#fff',
            }}
          >
            Back to home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f9fb] pt-24 px-4 sm:px-6 pb-16">
      <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(260px,1fr)]">
        <div>
          <Link
            to="/schools"
            className="inline-flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#94a3b8] hover:text-[#0f172a]"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            <ArrowLeft size={18} />
            Back to schools
          </Link>
          <h1
            className="mb-1 text-[#0f172a]"
            style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: 'clamp(22px,2.6vw,32px)' }}
          >
            Checkout
          </h1>
          <p
            className="mb-6 text-[#64748b]"
            style={{ fontFamily: "'Nunito', sans-serif", fontSize: '14px', fontWeight: 600 }}
          >
            Enter your details and delivery address. On the next step we&apos;ll take you to a secure
            payment page.
          </p>

          {/* ── Buy Now + Cart merge card ── */}
          {buyNowItem && cartItems.length > 0 && !cartCardDismissed && (
            <div
              className="mb-5 rounded-2xl border bg-white p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
              style={{
                borderColor: '#dbeafe',
                background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)',
                boxShadow: '0 2px 12px rgba(37,99,235,0.06)',
              }}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: '#dbeafe', color: '#2563eb' }}
                >
                  <ShoppingCart size={17} />
                </div>
                <div className="min-w-0">
                  <p
                    className="text-[#0f172a] m-0"
                    style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: '14px', lineHeight: 1.3 }}
                  >
                    You have {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
                  </p>
                  <p
                    className="text-[#64748b] m-0"
                    style={{ fontFamily: "'Nunito', sans-serif", fontSize: '12px', fontWeight: 600 }}
                  >
                    Want to add them to this order?
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {!includeCart ? (
                  <button
                    type="button"
                    onClick={() => setIncludeCart(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black tracking-[0.08em] uppercase"
                    style={{
                      fontFamily: "'Baloo 2', cursive",
                      background: 'linear-gradient(180deg,#60a5fa 0%,#2563eb 52%,#1d4ed8 100%)',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <Plus size={13} /> Add cart items
                  </button>
                ) : (
                  <span
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold"
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      background: '#dcfce7',
                      color: '#15803d',
                    }}
                  >
                    ✓ Cart items included
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => { setCartCardDismissed(true); setIncludeCart(false); }}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#f1f5f9] transition-colors"
                  style={{ color: '#94a3b8', border: 'none', cursor: 'pointer', background: 'transparent' }}
                  aria-label="Dismiss"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 bg-white border border-[#e2e8f0] rounded-2xl text-[#94a3b8]">
              <div className="flex items-center justify-center w-14 h-14 mb-3 rounded-2xl bg-[#eff6ff]">
                <ShoppingBag size={26} className="text-[#2563eb]" />
              </div>
              <p
                className="mb-2"
                style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '16px', color: '#0f172a' }}
              >
                Your cart is empty
              </p>
              <p
                className="mb-4 text-center"
                style={{ fontFamily: "'Nunito', sans-serif", fontSize: '13px', fontWeight: 600 }}
              >
                Add some uniforms to your bag before checking out.
              </p>
              <Link
                to="/schools"
                className="text-xs font-black tracking-[0.12em] uppercase px-4 py-2 rounded-full"
                style={{
                  fontFamily: "'Baloo 2', cursive",
                  background: 'linear-gradient(180deg,#60a5fa 0%,#2563eb 52%,#1d4ed8 100%)',
                  color: '#fff',
                }}
              >
                Browse schools
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-[#e2e8f0] bg-white p-6 space-y-6 shadow-sm"
            >
              {/* Contact */}
              <section className="space-y-3">
                <h2
                  className="text-xs font-extrabold tracking-[0.16em] uppercase text-[#0f172a]"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  Contact details
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-xs font-semibold text-slate-500" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      Full name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs font-semibold text-slate-500" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs font-semibold text-slate-500" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    />
                  </div>
                </div>
              </section>

              {/* Address */}
              <section className="space-y-3">
                <h2
                  className="text-xs font-extrabold tracking-[0.16em] uppercase text-[#0f172a]"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  Delivery address
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="block mb-1 text-xs font-semibold text-slate-500" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      Address line 1
                    </label>
                    <input
                      type="text"
                      required
                      value={form.line1}
                      onChange={(e) => handleChange('line1', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs font-semibold text-slate-500" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      Address line 2 (optional)
                    </label>
                    <input
                      type="text"
                      value={form.line2}
                      onChange={(e) => handleChange('line2', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block mb-1 text-xs font-semibold text-slate-500" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={form.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-xs font-semibold text-slate-500" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={form.state}
                        onChange={(e) => handleChange('state', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-xs font-semibold text-slate-500" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        Pincode
                      </label>
                      <input
                        type="text"
                        required
                        value={form.pincode}
                        onChange={(e) => handleChange('pincode', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 text-xs font-semibold text-slate-500" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      Note for delivery (optional)
                    </label>
                    <textarea
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    />
                  </div>
                  {isAuthenticated && hasSavedAddress && (
                    <label
                      className="mt-1 flex items-center gap-2 text-xs text-slate-600"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      <input
                        type="checkbox"
                        checked={saveAddress}
                        onChange={(e) => setSaveAddress(e.target.checked)}
                        className="w-3.5 h-3.5 rounded border-slate-300 text-[#2563eb] focus:ring-[#2563eb]"
                      />
                      <span>Save this address for future orders</span>
                    </label>
                  )}
                </div>
              </section>

              <div className="pt-4 border-t border-[#e2e8f0] flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <p
                  className="text-[11px] text-[#94a3b8]"
                  style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}
                >
                  You&apos;ll be securely redirected to a payment page. We never store your card or UPI
                  details.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-black tracking-[0.14em] uppercase disabled:opacity-60"
                  style={{
                    fontFamily: "'Baloo 2', cursive",
                    background: 'linear-gradient(180deg,#fcd88a 0%,#F7BE4F 50%,#e5a732 100%)',
                    color: '#5c3a0a',
                  }}
                >
                  {submitting ? 'Processing…' : 'Place order'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Summary */}
        <aside className="space-y-4 lg:pt-1 lg:sticky lg:top-24 h-fit">
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
            <h2
              className="mb-3 text-[#0f172a]"
              style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 900, fontSize: '16px' }}
            >
              Order summary
            </h2>
            {items.length === 0 ? (
              <p
                className="text-sm text-[#94a3b8]"
                style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}
              >
                Your cart is empty. Add items from any school to continue.
              </p>
            ) : (
              <>
                <ul
                  className="mb-3 space-y-3 text-sm max-h-60 overflow-y-auto"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {items.map((i) => (
                    <li key={`${i.productId}-${i.size}-${i.color}`} className="flex justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-[#0f172a]">{i.name}</p>
                        <p className="text-xs text-[#94a3b8]">
                          Qty {i.quantity}
                          {i.size && ` · Size ${i.size}`}
                          {i.color && ` · ${i.color}`}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-[#0f172a]">₹{i.price * i.quantity}</p>
                    </li>
                  ))}
                </ul>
                <div
                  className="pt-3 space-y-1 text-sm border-t border-[#e2e8f0]"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  <div className="flex justify-between">
                    <span className="text-[#94a3b8]">Items total</span>
                    <span className="font-semibold text-[#0f172a]">₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94a3b8]">Delivery</span>
                    <span className="font-semibold text-emerald-700">Free</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="font-extrabold text-[#0f172a]">Total payable</span>
                    <span className="font-extrabold text-[#0f172a]">₹{totalAmount}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div
            className="p-4 text-xs rounded-2xl border border-[#e2e8f0] bg-white space-y-2"
            style={{ fontFamily: "'Nunito', sans-serif", color: '#94a3b8' }}
          >
            <p className="font-semibold text-sm text-[#0f172a]">Secure payment</p>
            <p>UPI, netbanking and cards are processed by our payment partner.</p>
            <p>Uniform Lab never stores your payment credentials.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
