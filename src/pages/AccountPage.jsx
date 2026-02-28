import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

/* Match NewHero.jsx: Baloo 2 (headings), Nunito (body). Pill buttons: blue/gold gradients. */
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
const BTN_GOLD = {
  background: 'linear-gradient(180deg, #fcd88a 0%, #F7BE4F 50%, #e5a732 100%)',
  border: '1px solid rgba(229,167,50,0.6)',
  boxShadow: '0 2px 8px rgba(247,190,79,0.35), inset 0 1px 0 rgba(255,255,255,0.45)',
  color: '#5c3a0a',
  borderRadius: '9999px',
  padding: '0.5rem 1.25rem',
  fontSize: '0.8125rem',
  fontWeight: 700,
};
const PILL_TOGGLE_BG = { background: 'linear-gradient(135deg, #eef5ff 0%, #ddeaff 100%)' };
const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function AccountPage() {
  const { user, token, isAuthenticated, login, signup, logout, updateProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect');
  const validTabs = ['profile', 'addresses', 'orders', 'returns', 'track'];
  const [activeTab, setActiveTab] = useState(() => {
    if (!isAuthenticated) return 'login';
    const tabParam = searchParams.get('tab');
    return validTabs.includes(tabParam) ? tabParam : 'profile';
  });
  const [authMode, setAuthMode] = useState('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [addresses, setAddresses] = useState([]);
  const [addressForm, setAddressForm] = useState({
    label: '',
    name: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [orders, setOrders] = useState([]);
  const [returnForm, setReturnForm] = useState({
    orderId: '',
    itemKey: '',
    reason: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trackId, setTrackId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [trackError, setTrackError] = useState('');

  const ADDRESS_STORAGE_KEY = 'uniformlab_addresses';
  const ORDER_STORAGE_KEY = 'uniformlab_orders';
  const RETURN_STORAGE_KEY = 'uniformlab_returns';

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(ADDRESS_STORAGE_KEY);
      if (raw) setAddresses(JSON.parse(raw));
    } catch {
      // ignore
    }
    try {
      const rawOrders = window.localStorage.getItem(ORDER_STORAGE_KEY);
      if (rawOrders) setOrders(JSON.parse(rawOrders));
    } catch {
      // ignore
    }
  }, []);

  // Keep active tab in sync with URL and auth status
  useEffect(() => {
    if (!isAuthenticated) {
      setActiveTab('login');
      return;
    }
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (validTabs.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [isAuthenticated, location.search]);

  useEffect(() => {
    try {
      window.localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addresses));
    } catch {
      // ignore
    }
  }, [addresses]);

  // Load profile + addresses + orders from backend when authenticated
  useEffect(() => {
    if (!isAuthenticated || !token) return;

    let cancelled = false;
    async function load() {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [profileRes, ordersRes] = await Promise.all([
          fetch(`${API_BASE}/api/customer/me`, { headers }),
          fetch(`${API_BASE}/api/customer/orders`, { headers }),
        ]);

        const profileData = await profileRes.json().catch(() => ({}));
        const ordersData = await ordersRes.json().catch(() => ([]));

        if (!cancelled && profileRes.ok && profileData && profileData.id) {
          setProfileForm({
            name: profileData.name || '',
            email: profileData.email || '',
            phone: profileData.phone || '',
          });
          if (Array.isArray(profileData.addresses)) {
            setAddresses(profileData.addresses);
          }
        }

        if (!cancelled && ordersRes.ok && Array.isArray(ordersData)) {
          const mappedOrders = ordersData.map((o) => ({
            id: o.uniqueOrderId || o._id,
            createdAt: o.createdAt,
            total: o.totalAmount,
            schoolName: o.school && o.school.name ? o.school.name : '',
            fulfillmentStatus: o.fulfillmentStatus,
            deliveryStatus: o.deliveryStatus,
            deliveryReason: o.deliveryReason,
            items: Array.isArray(o.items)
              ? o.items.map((it) => ({
                  name: it.productName,
                  quantity: it.quantity,
                  size: it.size,
                  color: it.color,
                  image: it.imageUrl,
                }))
              : [],
          }));
          setOrders(mappedOrders);
        }
      } catch {
        // ignore – will fall back to any local data if present
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(loginForm);
      if (redirectTo) {
        navigate(redirectTo);
      } else {
        setActiveTab('profile');
      }
    } catch (err) {
      setError(err.message || 'Could not log in');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(signupForm);
      if (redirectTo) {
        navigate(redirectTo);
      } else {
        setActiveTab('profile');
      }
    } catch (err) {
      setError(err.message || 'Could not sign up');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
  };

  const addAddress = async (e) => {
    e.preventDefault();
    const trimmed = { ...addressForm };
    if (!trimmed.name || !trimmed.phone || !trimmed.line1 || !trimmed.city || !trimmed.state || !trimmed.pincode) {
      return;
    }

    const newAddress = {
      label: trimmed.label,
      name: trimmed.name,
      phone: trimmed.phone,
      line1: trimmed.line1,
      line2: trimmed.line2,
      city: trimmed.city,
      state: trimmed.state,
      pincode: trimmed.pincode,
      isDefault: addresses.length === 0,
    };

    // If not logged in, keep local-only behaviour
    if (!token) {
      const id = `${Date.now()}`;
      setAddresses((prev) => [
        ...prev,
        {
          id,
          ...newAddress,
        },
      ]);
    } else {
      try {
        const res = await fetch(`${API_BASE}/api/customer/addresses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newAddress),
        });
        const data = await res.json().catch(() => ([]));
        if (res.ok && Array.isArray(data)) {
          setAddresses(data);
        }
      } catch {
        // fall back to local push if backend fails
        const id = `${Date.now()}`;
        setAddresses((prev) => [
          ...prev,
          {
            id,
            ...newAddress,
          },
        ]);
      }
    }

    setAddressForm({
      label: '',
      name: '',
      phone: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      pincode: '',
    });
  };

  const removeAddress = async (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id && a._id !== id));

    if (!token) return;
    try {
      await fetch(`${API_BASE}/api/customer/addresses/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      // ignore; local state already updated
    }
  };

  const setDefaultAddress = async (id) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id || a._id === id,
      }))
    );

    if (!token) return;
    try {
      const current = addresses.find((a) => a.id === id || a._id === id);
      if (!current) return;
      const res = await fetch(`${API_BASE}/api/customer/addresses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...current, isDefault: true }),
      });
      const data = await res.json().catch(() => ([]));
      if (res.ok && Array.isArray(data)) {
        setAddresses(data);
      }
    } catch {
      // ignore
    }
  };

  const submitReturnRequest = (e) => {
    e.preventDefault();
    if (!returnForm.orderId || !returnForm.itemKey || !returnForm.reason.trim()) return;
    try {
      const raw = window.localStorage.getItem(RETURN_STORAGE_KEY);
      const current = raw ? JSON.parse(raw) : [];
      const newReq = {
        id: `RR-${Date.now()}`,
        orderId: returnForm.orderId,
        type: 'exchange', // Uniform Lab policy: exchange / size change only
        itemKey: returnForm.itemKey,
        reason: returnForm.reason,
        createdAt: new Date().toISOString(),
      };
      window.localStorage.setItem(RETURN_STORAGE_KEY, JSON.stringify([...current, newReq]));
      setReturnForm({ orderId: '', itemKey: '', reason: '' });
    } catch {
      // ignore
    }
  };

  const renderLoginSignup = () => (
    <div className="max-w-md mx-auto">
      <div className="inline-flex mb-6 rounded-full p-1 text-xs font-semibold text-slate-600" style={PILL_TOGGLE_BG}>
        <button
          type="button"
          onClick={() => setAuthMode('login')}
          className={`px-4 py-1.5 rounded-full transition-colors ${
            authMode === 'login' ? 'bg-white text-[#1a1a2e] shadow-sm' : 'bg-transparent text-[#2563eb]'
          }`}
          style={authMode === 'login' ? undefined : FONT_BODY}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setAuthMode('signup')}
          className={`px-4 py-1.5 rounded-full transition-colors ${
            authMode === 'signup' ? 'bg-white text-[#1a1a2e] shadow-sm' : 'bg-transparent text-[#2563eb]'
          }`}
          style={authMode === 'signup' ? undefined : FONT_BODY}
        >
          Create account
        </button>
      </div>

      {/* Login */}
      {authMode === 'login' && (
      <form
        onSubmit={handleLogin}
        className="rounded-xl border border-[var(--color-border)] bg-white p-6 space-y-4 shadow-sm"
      >
        <h2 className="text-lg font-bold text-[#1a1a2e]" style={FONT_HEADING}>Login</h2>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Email</label>
          <input
            type="email"
            value={loginForm.email}
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Password</label>
          <input
            type="password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            required
          />
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 rounded-full font-bold disabled:opacity-60 hover:brightness-105 transition"
          style={{ ...BTN_PRIMARY, ...FONT_HEADING }}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      )}

      {/* Signup */}
      {authMode === 'signup' && (
      <form
        onSubmit={handleSignup}
        className="rounded-xl border border-[var(--color-border)] bg-white p-6 space-y-4 shadow-sm"
      >
        <h2 className="text-lg font-bold text-[#1a1a2e]" style={FONT_HEADING}>Create account</h2>
        <div className="grid gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Full name</label>
            <input
              type="text"
              value={signupForm.name}
              onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Email</label>
            <input
              type="email"
              value={signupForm.email}
              onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Phone</label>
            <input
              type="tel"
              value={signupForm.phone}
              onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Password</label>
            <input
              type="password"
              value={signupForm.password}
              onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 rounded-full font-bold disabled:opacity-60 hover:brightness-105 transition"
          style={{ ...BTN_PRIMARY, ...FONT_HEADING }}
        >
          {loading ? 'Creating…' : 'Create account'}
        </button>
      </form>
      )}
    </div>
  );

  const renderProfile = () => (
    <form
      onSubmit={handleProfileSave}
      className="rounded-xl border border-[var(--color-border)] bg-white p-6 space-y-4 max-w-xl"
    >
      <h2 className="text-lg font-bold text-[#1a1a2e] mb-1" style={FONT_HEADING}>Profile</h2>
      <p className="text-xs text-[var(--color-text-muted)] mb-3">
        Manage your basic details. We’ll use this to pre-fill checkout.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Full name</label>
          <input
            type="text"
            value={profileForm.name}
            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Email</label>
          <input
            type="email"
            value={profileForm.email}
            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Phone</label>
          <input
            type="tel"
            value={profileForm.phone}
            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center py-2.5 px-5 rounded-full font-bold hover:brightness-105 transition"
        style={{ ...BTN_PRIMARY, ...FONT_HEADING }}
      >
        Save changes
      </button>
    </form>
  );

  // For now addresses, orders, tracking are read-only placeholder UIs.
  const renderAddresses = () => (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 max-w-xl">
        <h2 className="text-lg font-bold text-[#1a1a2e] mb-1" style={FONT_HEADING}>Saved addresses</h2>
        {addresses.length === 0 ? (
          <p className="text-xs text-[var(--color-text-muted)]">
            You haven&apos;t added any addresses yet. Use the form on the right to save your first
            address. We&apos;ll connect this to backend later.
          </p>
        ) : (
          <div className="mt-3 space-y-3 text-sm">
            {addresses.map((addr) => {
              const addrId = addr.id || addr._id;
              return (
              <div
                key={addrId}
                className="border border-slate-200 rounded-lg p-3 flex items-start justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-900 flex items-center gap-2">
                    {addr.label || 'Address'}
                    {addr.isDefault && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                        Default
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-slate-600">
                    {addr.name} · {addr.phone}
                  </p>
                  <p className="text-xs text-slate-600">
                    {addr.line1}
                    {addr.line2 && `, ${addr.line2}`}
                  </p>
                  <p className="text-xs text-slate-600">
                    {addr.city}, {addr.state} – {addr.pincode}
                  </p>
                </div>
                <div className="flex flex-col gap-1 text-[10px]">
                  {!addr.isDefault && (
                    <button
                      type="button"
                      onClick={() => setDefaultAddress(addrId)}
                      className="px-2.5 py-1 rounded-full border border-slate-200 hover:opacity-90 text-slate-700 text-[10px] font-semibold"
                      style={PILL_TOGGLE_BG}
                    >
                      Make default
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeAddress(addrId)}
                    className="px-2.5 py-1 rounded-full border border-rose-200 hover:bg-rose-50 text-rose-600 text-[10px] font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ); })}
          </div>
        )}
      </div>

      <form
        onSubmit={addAddress}
        className="rounded-xl border border-[var(--color-border)] bg-white p-6 space-y-3"
      >
        <h3 className="text-sm font-bold text-[#1a1a2e]" style={FONT_HEADING}>Add new address</h3>
        <div className="grid gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Label</label>
            <input
              type="text"
              value={addressForm.label}
              onChange={(e) =>
                setAddressForm((prev) => ({ ...prev, label: e.target.value }))
              }
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              placeholder="e.g. Home, Office"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Full name
              </label>
              <input
                type="text"
                required
                value={addressForm.name}
                onChange={(e) =>
                  setAddressForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Phone
              </label>
              <input
                type="tel"
                required
                value={addressForm.phone}
                onChange={(e) =>
                  setAddressForm((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Address line 1
            </label>
            <input
              type="text"
              required
              value={addressForm.line1}
              onChange={(e) =>
                setAddressForm((prev) => ({ ...prev, line1: e.target.value }))
              }
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Address line 2
            </label>
            <input
              type="text"
              value={addressForm.line2}
              onChange={(e) =>
                setAddressForm((prev) => ({ ...prev, line2: e.target.value }))
              }
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                City
              </label>
              <input
                type="text"
                required
                value={addressForm.city}
                onChange={(e) =>
                  setAddressForm((prev) => ({ ...prev, city: e.target.value }))
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                State
              </label>
              <input
                type="text"
                required
                value={addressForm.state}
                onChange={(e) =>
                  setAddressForm((prev) => ({ ...prev, state: e.target.value }))
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Pincode
              </label>
              <input
                type="text"
                required
                value={addressForm.pincode}
                onChange={(e) =>
                  setAddressForm((prev) => ({ ...prev, pincode: e.target.value }))
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center py-2.5 rounded-full font-bold hover:brightness-105 transition"
          style={{ ...BTN_GOLD, ...FONT_HEADING }}
        >
          Save address (local)
        </button>
      </form>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-4">
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
        <h2 className="text-lg font-bold text-[#1a1a2e] mb-1" style={FONT_HEADING}>Order history</h2>
        {orders.length === 0 ? (
          <p className="text-xs text-[var(--color-text-muted)]">
            Your past orders placed with this account will appear here with their details.
          </p>
        ) : (
          <div className="mt-3 space-y-3 text-sm">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-slate-200 rounded-lg p-4 space-y-3 bg-white"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Order ID</p>
                    <p className="text-sm font-semibold text-slate-900">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : 'Just now'}
                    </p>
                    <p className="text-sm font-semibold text-slate-900">₹{order.total}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  {order.items[0]?.image ? (
                    <img
                      src={order.items[0].image}
                      alt={order.items[0].name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-slate-200"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] text-slate-400 flex-shrink-0">
                      No image
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-500 truncate">
                      {order.schoolName || 'Uniform Lab'}
                    </p>
                    <ul className="mt-1 text-xs text-slate-600 space-y-0.5">
                      {order.items.map((item, idx) => (
                        <li key={`${order.id}-${idx}`} className="truncate">
                          {item.name} · Qty {item.quantity}
                          {item.size && ` · Size ${item.size}`}
                          {item.color && ` · ${item.color}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderTrack = () => {
    const steps = ['Order confirmed', 'Packed', 'Shipped', 'Delivered'];

    const getStepIndex = (status) => {
      switch (status) {
        case 'Order confirmed':
          return 0;
        case 'Packed':
          return 1;
        case 'Shipped':
          return 2;
        case 'Delivered':
          return 3;
        case 'Undelivered':
          return 3;
        default:
          return 0;
      }
    };

    const currentStep =
      trackedOrder && trackedOrder.deliveryStatus
        ? getStepIndex(trackedOrder.deliveryStatus)
        : null;

    const handleTrack = () => {
      const trimmed = trackId.trim();
      if (!trimmed) {
        setTrackError('Please enter your order ID.');
        setTrackedOrder(null);
        return;
      }
      const found =
        orders.find((o) => (o.id || '').toLowerCase() === trimmed.toLowerCase()) || null;
      if (!found) {
        setTrackError('No order found with this ID for your account.');
        setTrackedOrder(null);
      } else {
        setTrackError('');
        setTrackedOrder(found);
      }
    };

    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 max-w-xl space-y-4">
        <h2 className="text-lg font-bold text-[#1a1a2e] mb-1" style={FONT_HEADING}>Track order</h2>
        <p className="text-xs text-[var(--color-text-muted)]">
          Paste your Uniform Lab order ID (e.g. UL-20260227-00001) to see the latest delivery
          status.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            placeholder="UL-YYYYMMDD-00001"
            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
          <button
            type="button"
            onClick={handleTrack}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-bold hover:brightness-105 transition mt-1 sm:mt-0"
            style={{ ...BTN_PRIMARY, ...FONT_HEADING }}
          >
            Track
          </button>
        </div>
        {trackError && <p className="text-xs text-red-600">{trackError}</p>}
        {trackedOrder && (
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-xs font-semibold text-slate-500">Order ID</p>
                <p className="text-sm font-semibold text-slate-900">{trackedOrder.id}</p>
                {trackedOrder.schoolName && (
                  <p className="text-xs text-slate-600 mt-0.5">{trackedOrder.schoolName}</p>
                )}
              </div>
              <div className="text-sm text-slate-700">
                <span className="font-semibold">{trackedOrder.deliveryStatus}</span>
                {trackedOrder.deliveryReason && (
                  <span className="text-xs text-slate-500"> — {trackedOrder.deliveryReason}</span>
                )}
              </div>
            </div>
            <div className="mt-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {steps.map((label, idx) => {
                  const isActive = currentStep != null && idx <= currentStep;
                  const isLast = idx === steps.length - 1;
                  return (
                    <div key={label} className="flex items-center sm:flex-1">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3.5 h-3.5 rounded-full border ${
                            isActive
                              ? 'bg-emerald-500 border-emerald-500'
                              : 'bg-slate-100 border-slate-300'
                          }`}
                        />
                        <span className="text-xs text-slate-700">{label}</span>
                      </div>
                      {!isLast && (
                        <div className="hidden sm:block flex-1 h-px mx-2">
                          <div
                            className={`h-px ${
                              isActive ? 'bg-emerald-400' : 'bg-slate-200'
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderReturns = () => {
    const selectedOrder = orders.find((o) => o.id === returnForm.orderId) || null;
    const items = selectedOrder?.items || [];

    return (
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Left: exchange request form */}
        <form
          onSubmit={submitReturnRequest}
          className="rounded-xl border border-[var(--color-border)] bg-white p-6 space-y-4"
        >
          <h2 className="text-lg font-bold text-[#1a1a2e] mb-1" style={FONT_HEADING}>
            Exchange request (size change only)
          </h2>
          <p className="text-xs text-[var(--color-text-muted)]">
            As per Uniform Lab policy, only exchanges for size change are allowed. No refunds.
          </p>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Select order
              </label>
              <select
                required
                value={returnForm.orderId}
                onChange={(e) =>
                  setReturnForm((prev) => ({
                    ...prev,
                    orderId: e.target.value,
                    itemKey: '',
                  }))
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              >
                <option value="">Choose order ID</option>
                {orders.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.id} — ₹{o.total}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Select item to exchange
              </label>
              <select
                required
                disabled={!selectedOrder}
                value={returnForm.itemKey}
                onChange={(e) =>
                  setReturnForm((prev) => ({
                    ...prev,
                    itemKey: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] disabled:bg-slate-50"
              >
                <option value="">Choose item</option>
                {items.map((item, idx) => (
                  <option key={`${selectedOrder.id}-${idx}`} value={`${selectedOrder.id}:${idx}`}>
                    {item.name} · Qty {item.quantity}
                    {item.size && ` · Size ${item.size}`}
                    {item.color && ` · ${item.color}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Reason for exchange
              </label>
              <textarea
                required
                rows={3}
                value={returnForm.reason}
                onChange={(e) =>
                  setReturnForm((prev) => ({
                    ...prev,
                    reason: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                placeholder="e.g. Size too small / large, defect, wrong item received"
              />
            </div>

            <p className="text-[10px] text-[var(--color-text-muted)]">
              Convenience fee and any difference in product price will be applicable for exchanges,
              as mentioned in the policy.
            </p>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center py-2.5 px-5 rounded-full font-bold hover:brightness-105 transition"
            style={{ ...BTN_PRIMARY, ...FONT_HEADING }}
          >
            Submit exchange request (local)
          </button>
        </form>

        {/* Right: policy (scrollable) */}
        <aside className="rounded-xl border border-[var(--color-border)] bg-white p-5 max-h-[460px] overflow-y-auto text-xs leading-relaxed text-slate-700">
          <h3 className="text-sm font-bold text-[#1a1a2e] mb-2" style={FONT_HEADING}>
            Uniform Lab Exchange &amp; Return Policy
          </h3>
          <p className="mb-2">
            At Uniform Lab, we ensure you a hassle-free shopping experience, where you can
            confidently make purchases.
          </p>
          <ul className="list-disc pl-4 space-y-1 mb-3">
            <li>ONLY EXCHANGE requests will be considered for uniforms. No refunds.</li>
            <li>Exchange will be done for extra charges (convenience + size price difference).</li>
            <li>Exchange is allowed for size change in the same product within 7 days of delivery.</li>
            <li>
              Items must be unused, unwashed, unaltered, with tags and accessories intact, and in
              original packaging.
            </li>
            <li>Socks and clothing freebies are ineligible for exchange.</li>
            <li>Products with tampered/missing serial numbers are not eligible.</li>
          </ul>
          <p className="font-semibold mb-1">Initiation of exchange</p>
          <p className="mb-2">
            Exchange can be initiated by contacting{' '}
            <span className="font-mono text-[11px]">help@theuniformlab.in</span>. You can either
            bring the product to our shop or ship it back to us. Items sent back without prior
            request will not be accepted.
          </p>
          <p className="mb-2">
            Once received, the product will be checked before any further action is taken.
          </p>
          <p className="font-semibold mb-1">Damages &amp; issues</p>
          <p className="mb-2">
            Please inspect your order on delivery and contact us immediately if the item is
            defective, damaged or if you receive the wrong item, so that we can evaluate the issue
            and make it right.
          </p>
          <p className="font-semibold mb-1">Exceptions / non-exchangeable items</p>
          <p className="mb-1">
            Customised products (special orders, personalised items, hemmed pants), personal care
            goods, wholesale orders and sale items are not eligible for exchange or refund.
          </p>
          <p>
            For any specific questions about your item or exchange, write to{' '}
            <span className="font-mono text-[11px]">help@theuniformlab.in</span>.
          </p>
        </aside>
      </div>
    );
  };

  const showAuthForms = !isAuthenticated;

  return (
    <main className="min-h-screen bg-[var(--page-bg)] pt-24 px-4 sm:px-6" style={FONT_BODY}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;600;700&display=swap');`}</style>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e] mb-1" style={FONT_HEADING}>My Account</h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              Manage your details, addresses, wishlist and orders in one clean place.
            </p>
          </div>
          {isAuthenticated && (
            <button
              type="button"
              onClick={logout}
              className="text-xs font-semibold text-slate-500 hover:text-[#004C99] px-3 py-1.5 rounded-full border border-slate-200 hover:border-[#004C99]/40 transition"
            >
              Log out
            </button>
          )}
        </div>

        {/* Tabs – visible when logged in */}
        {isAuthenticated && (
          <div className="flex flex-wrap gap-2 mb-6 text-xs justify-center md:justify-start">
            {['profile', 'addresses', 'orders', 'returns', 'track'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full border font-semibold transition ${
                  activeTab === tab
                    ? 'text-white border-transparent'
                    : 'border-slate-200 text-slate-700 bg-white hover:bg-[#eef5ff]'
                }`}
                style={activeTab === tab ? { ...BTN_PRIMARY, ...FONT_HEADING, padding: '0.375rem 1rem', fontSize: '0.75rem' } : undefined}
              >
                {tab === 'profile' && 'Profile'}
                {tab === 'addresses' && 'Addresses'}
                {tab === 'orders' && 'Orders'}
                {tab === 'returns' && 'Exchange / returns'}
                {tab === 'track' && 'Track order'}
              </button>
            ))}
          </div>
        )}

        {showAuthForms ? (
          renderLoginSignup()
        ) : activeTab === 'profile' ? (
          renderProfile()
        ) : activeTab === 'addresses' ? (
          renderAddresses()
        ) : activeTab === 'orders' ? (
          renderOrders()
        ) : activeTab === 'returns' ? (
          renderReturns()
        ) : (
          renderTrack()
        )}
      </div>
    </main>
  );
}

