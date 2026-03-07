import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Copy, Check, ExternalLink } from "lucide-react";

/* Font: Inter throughout */
const FONT_HEADING = { fontFamily: "'Inter', sans-serif", fontWeight: 800 };
const FONT_BODY = { fontFamily: "'Inter', sans-serif" };
const BTN_PRIMARY = {
  background: "linear-gradient(180deg, #1a6bb8 0%, #004C99 50%, #003d7a 100%)",
  border: "1px solid rgba(0,76,153,0.6)",
  boxShadow:
    "0 2px 8px rgba(0,76,153,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
  color: "#fff",
  borderRadius: "9999px",
  padding: "0.5rem 1.25rem",
  fontSize: "0.875rem",
  fontWeight: 700,
  letterSpacing: "0.02em",
};
const BTN_GOLD = {
  background: "linear-gradient(180deg, #fcd88a 0%, #F7BE4F 50%, #e5a732 100%)",
  border: "1px solid rgba(229,167,50,0.6)",
  boxShadow:
    "0 2px 8px rgba(247,190,79,0.35), inset 0 1px 0 rgba(255,255,255,0.45)",
  color: "#5c3a0a",
  borderRadius: "9999px",
  padding: "0.5rem 1.25rem",
  fontSize: "0.875rem",
  fontWeight: 700,
};
const PILL_TOGGLE_BG = {
  background: "linear-gradient(135deg, #eef5ff 0%, #ddeaff 100%)",
};
const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function AccountPage() {
  const { user, token, isAuthenticated, login, signup, logout, updateProfile } =
    useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("redirect");
  const validTabs = ["profile", "addresses", "orders", "returns"];
  const [activeTab, setActiveTab] = useState(() => {
    if (!isAuthenticated) return "login";
    const tabParam = searchParams.get("tab");
    return validTabs.includes(tabParam) ? tabParam : "profile";
  });
  const [authMode, setAuthMode] = useState("login");
  const [authStep, setAuthStep] = useState("email"); // 'email' | 'password' | 'signup'
  const [emailCheckValue, setEmailCheckValue] = useState("");
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [addresses, setAddresses] = useState([]);
  const [addressForm, setAddressForm] = useState({
    label: "",
    name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [orders, setOrders] = useState([]);
  const [returnForm, setReturnForm] = useState({
    orderId: "",
    itemKey: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exchangeSubmitting, setExchangeSubmitting] = useState(false);
  const [exchangeSuccess, setExchangeSuccess] = useState(false);
  const [exchangeError, setExchangeError] = useState("");

  const ADDRESS_STORAGE_KEY = "uniformlab_addresses";
  const ORDER_STORAGE_KEY = "uniformlab_orders";
  const RETURN_STORAGE_KEY = "uniformlab_returns";

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
      setActiveTab("login");
      return;
    }
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");
    if (validTabs.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [isAuthenticated, location.search]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        ADDRESS_STORAGE_KEY,
        JSON.stringify(addresses),
      );
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
        const ordersData = await ordersRes.json().catch(() => []);

        if (!cancelled && profileRes.ok && profileData && profileData.id) {
          setProfileForm({
            name: profileData.name || "",
            email: profileData.email || "",
            phone: profileData.phone || "",
          });
          if (Array.isArray(profileData.addresses)) {
            setAddresses(profileData.addresses);
          }
        }

        if (!cancelled && ordersRes.ok && Array.isArray(ordersData)) {
          const mappedOrders = ordersData.map((o) => ({
            id: o.uniqueOrderId || o._id,
            mongoId: o._id,
            createdAt: o.createdAt,
            total: o.totalAmount,
            schoolName: o.school && o.school.name ? o.school.name : "",
            fulfillmentStatus: o.fulfillmentStatus,
            deliveryStatus: o.deliveryStatus,
            deliveryReason: o.deliveryReason,
            trackingNumber: o.trackingNumber || null,
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
    setError("");
    setLoading(true);
    try {
      await login(loginForm);
      if (redirectTo) {
        navigate(redirectTo);
      } else {
        setActiveTab("profile");
      }
    } catch (err) {
      setError(err.message || "Could not log in");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(signupForm);
      if (redirectTo) {
        navigate(redirectTo);
      } else {
        setActiveTab("profile");
      }
    } catch (err) {
      setError(err.message || "Could not sign up");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailCheck = async (e) => {
    e.preventDefault();
    setError("");
    setCheckingEmail(true);
    try {
      const res = await fetch(`${API_BASE}/api/public/auth/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailCheckValue.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(data?.error?.message || "Could not check email");
      const normalised = emailCheckValue.trim().toLowerCase();
      if (data.exists) {
        setLoginForm((prev) => ({ ...prev, email: normalised }));
        setAuthMode("login");
        setAuthStep("password");
      } else {
        setSignupForm((prev) => ({ ...prev, email: normalised }));
        setAuthMode("signup");
        setAuthStep("signup");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setCheckingEmail(false);
    }
  };

  const goBackToEmail = () => {
    setAuthStep("email");
    setError("");
    setForgotMode(false);
    setForgotSent(false);
    setForgotError("");
    setLoginForm((prev) => ({ ...prev, password: "" }));
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotLoading(true);
    try {
      const emailToReset = (forgotEmail || loginForm.email)
        .trim()
        .toLowerCase();
      // Fire-and-forget: the backend always responds 200 to avoid enumeration
      await fetch(`${API_BASE}/api/public/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToReset }),
      });
      setForgotSent(true);
    } catch {
      setForgotError("Something went wrong. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
  };

  const addAddress = async (e) => {
    e.preventDefault();
    const trimmed = { ...addressForm };
    if (
      !trimmed.name ||
      !trimmed.phone ||
      !trimmed.line1 ||
      !trimmed.city ||
      !trimmed.state ||
      !trimmed.pincode
    ) {
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
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newAddress),
        });
        const data = await res.json().catch(() => []);
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
      label: "",
      name: "",
      phone: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      pincode: "",
    });
  };

  const removeAddress = async (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id && a._id !== id));

    if (!token) return;
    try {
      await fetch(`${API_BASE}/api/customer/addresses/${id}`, {
        method: "DELETE",
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
      })),
    );

    if (!token) return;
    try {
      const current = addresses.find((a) => a.id === id || a._id === id);
      if (!current) return;
      const res = await fetch(`${API_BASE}/api/customer/addresses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...current, isDefault: true }),
      });
      const data = await res.json().catch(() => []);
      if (res.ok && Array.isArray(data)) {
        setAddresses(data);
      }
    } catch {
      // ignore
    }
  };

  const submitReturnRequest = async (e) => {
    e.preventDefault();
    if (!returnForm.orderId || !returnForm.itemKey || !returnForm.reason.trim())
      return;
    setExchangeSubmitting(true);
    setExchangeError("");
    setExchangeSuccess(false);
    try {
      // itemKey format: "<displayOrderId>:<itemIndex>"
      const [, itemIdxStr] = returnForm.itemKey.split(":");
      const selectedOrder = orders.find((o) => o.id === returnForm.orderId);
      const mongoId = selectedOrder?.mongoId;
      if (!mongoId)
        throw new Error(
          "Could not resolve order. Please refresh and try again.",
        );

      const res = await fetch(`${API_BASE}/api/customer/exchange-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: mongoId,
          itemIndex: Number(itemIdxStr),
          reason: returnForm.reason.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error?.message || "Submission failed");
      setExchangeSuccess(true);
      setReturnForm({ orderId: "", itemKey: "", reason: "" });
    } catch (err) {
      setExchangeError(
        err.message || "Something went wrong. Please try again.",
      );
    } finally {
      setExchangeSubmitting(false);
    }
  };

  const renderLoginSignup = () => {
    /* ── Step 1: Ask for email ── */
    if (authStep === "email") {
      return (
        <div className="max-w-md mx-auto">
          <form
            onSubmit={handleEmailCheck}
            className="rounded-xl border border-[var(--color-border)] bg-white p-6 space-y-4 shadow-sm"
          >
            <div className="text-center mb-2">
              <h2
                className="text-xl font-bold text-[#1a1a2e]"
                style={FONT_HEADING}
              >
                Welcome
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your email to sign in or create an account
              </p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={emailCheckValue}
                onChange={(e) => setEmailCheckValue(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                placeholder="you@example.com"
                autoFocus
                required
              />
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={checkingEmail}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 rounded-full font-bold disabled:opacity-60 hover:brightness-105 transition"
              style={{ ...BTN_PRIMARY, ...FONT_HEADING }}
            >
              {checkingEmail ? "Checking…" : "Continue →"}
            </button>
          </form>
        </div>
      );
    }

    /* ── Step 2a: Returning user — just show password ── */
    if (authStep === "password") {
      /* ── Forgot-password sub-mode ── */
      if (forgotMode) {
        return (
          <div className="max-w-md mx-auto">
            <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
              <button
                type="button"
                onClick={() => {
                  setForgotMode(false);
                  setForgotSent(false);
                  setForgotError("");
                }}
                className="text-xs text-[#2563eb] font-semibold flex items-center gap-1 hover:underline mb-4"
              >
                ← Back to sign in
              </button>

              {forgotSent ? (
                <div className="text-center py-2 space-y-3">
                  <div className="text-5xl">📬</div>
                  <h2
                    className="text-lg font-bold text-[#1a1a2e]"
                    style={FONT_HEADING}
                  >
                    Check your email
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    If an account exists for{" "}
                    <span className="font-semibold text-slate-800">
                      {forgotEmail || loginForm.email}
                    </span>
                    , we&apos;ve sent a password reset link. Check your inbox
                    (and spam folder).
                  </p>
                  <p className="text-xs text-slate-400">
                    The link expires in 1 hour.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotMode(false);
                      setForgotSent(false);
                      setForgotError("");
                    }}
                    className="mt-3 w-full inline-flex items-center justify-center py-2.5 rounded-full font-bold hover:brightness-105 transition"
                    style={{ ...BTN_PRIMARY, ...FONT_HEADING }}
                  >
                    Back to sign in
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <h2
                      className="text-lg font-bold text-[#1a1a2e]"
                      style={FONT_HEADING}
                    >
                      Reset your password
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      We&apos;ll send a reset link to your email.
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={forgotEmail || loginForm.email}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                      autoFocus
                      required
                    />
                  </div>
                  {forgotError && (
                    <p className="text-xs text-red-600">{forgotError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full inline-flex items-center justify-center py-2.5 rounded-full font-bold disabled:opacity-60 hover:brightness-105 transition"
                    style={{ ...BTN_PRIMARY, ...FONT_HEADING }}
                  >
                    {forgotLoading ? "Sending…" : "Send reset link"}
                  </button>
                </form>
              )}
            </div>
          </div>
        );
      }

      /* ── Normal password login ── */
      return (
        <div className="max-w-md mx-auto">
          <form
            onSubmit={handleLogin}
            className="rounded-xl border border-[var(--color-border)] bg-white p-6 space-y-4 shadow-sm"
          >
            <button
              type="button"
              onClick={goBackToEmail}
              className="text-xs text-[#2563eb] font-semibold flex items-center gap-1 hover:underline mb-1"
            >
              ← Use a different email
            </button>
            <div>
              <h2
                className="text-lg font-bold text-[#1a1a2e]"
                style={FONT_HEADING}
              >
                Welcome back 👋
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-semibold">
                {loginForm.email}
              </p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                autoFocus
                required
              />
              <button
                type="button"
                onClick={() => {
                  setForgotMode(true);
                  setForgotEmail(loginForm.email);
                  setForgotError("");
                  setForgotSent(false);
                }}
                className="text-xs text-[#2563eb] hover:underline mt-1.5 font-semibold block text-right w-full"
              >
                Forgot password?
              </button>
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 rounded-full font-bold disabled:opacity-60 hover:brightness-105 transition"
              style={{ ...BTN_PRIMARY, ...FONT_HEADING }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      );
    }

    /* ── Step 2b: New user — show full signup form ── */
    return (
      <div className="max-w-md mx-auto">
        <form
          onSubmit={handleSignup}
          className="rounded-xl border border-[var(--color-border)] bg-white p-6 space-y-4 shadow-sm"
        >
          <button
            type="button"
            onClick={goBackToEmail}
            className="text-xs text-[#2563eb] font-semibold flex items-center gap-1 hover:underline mb-1"
          >
            ← Use a different email
          </button>
          <div>
            <h2
              className="text-lg font-bold text-[#1a1a2e]"
              style={FONT_HEADING}
            >
              Create your account
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Signing up as{" "}
              <span className="font-semibold text-slate-700">
                {signupForm.email}
              </span>
            </p>
          </div>
          <div className="grid gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                Full name
              </label>
              <input
                type="text"
                value={signupForm.name}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                autoFocus
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={signupForm.phone}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                Password
              </label>
              <input
                type="password"
                value={signupForm.password}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, password: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                required
              />
            </div>
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 rounded-full font-bold disabled:opacity-60 hover:brightness-105 transition"
            style={{ ...BTN_PRIMARY, ...FONT_HEADING }}
          >
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>
      </div>
    );
  };

  const renderProfile = () => (
    <form
      onSubmit={handleProfileSave}
      className="rounded-xl border border-[var(--color-border)] bg-white p-6 space-y-4 max-w-xl"
    >
      <h2
        className="text-lg font-bold text-[#1a1a2e] mb-1"
        style={FONT_HEADING}
      >
        Profile
      </h2>
      <p className="text-xs text-[var(--color-text-muted)] mb-3">
        Manage your basic details. We’ll use this to pre-fill checkout.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">
            Full name
          </label>
          <input
            type="text"
            value={profileForm.name}
            onChange={(e) =>
              setProfileForm({ ...profileForm, name: e.target.value })
            }
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">
            Email
          </label>
          <input
            type="email"
            value={profileForm.email}
            onChange={(e) =>
              setProfileForm({ ...profileForm, email: e.target.value })
            }
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={profileForm.phone}
            onChange={(e) =>
              setProfileForm({ ...profileForm, phone: e.target.value })
            }
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
        <h2
          className="text-lg font-bold text-[#1a1a2e] mb-1"
          style={FONT_HEADING}
        >
          Saved addresses
        </h2>
        {addresses.length === 0 ? (
          <p className="text-xs text-[var(--color-text-muted)]">
            You haven&apos;t added any addresses yet. Use the form on the right
            to save your first address. We&apos;ll connect this to backend
            later.
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
                      {addr.label || "Address"}
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
              );
            })}
          </div>
        )}
      </div>

      <form
        onSubmit={addAddress}
        className="rounded-xl border border-[var(--color-border)] bg-white p-6 space-y-3"
      >
        <h3 className="text-sm font-bold text-[#1a1a2e]" style={FONT_HEADING}>
          Add new address
        </h3>
        <div className="grid gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Label
            </label>
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
                  setAddressForm((prev) => ({
                    ...prev,
                    pincode: e.target.value,
                  }))
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

  const DELIVERY_STEPS = [
    { key: "Order confirmed", label: "Confirmed" },
    { key: "Packed", label: "Packed" },
    { key: "Shipped", label: "Shipped" },
    { key: "Delivered", label: "Delivered" },
  ];

  const [copiedTrackingId, setCopiedTrackingId] = useState(null);

  const getDeliveryStep = (status) => {
    switch (status) {
      case "Order confirmed":
        return 0;
      case "Packed":
        return 1;
      case "Shipped":
        return 2;
      case "Delivered":
        return 3;
      default:
        return 0;
    }
  };

  const renderOrders = () => (
    <div className="space-y-4">
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
        <h2
          className="text-lg font-bold text-[#1a1a2e] mb-1"
          style={FONT_HEADING}
        >
          Order history
        </h2>
        {orders.length === 0 ? (
          <p className="text-xs text-[var(--color-text-muted)]">
            Your past orders placed with this account will appear here with
            their details.
          </p>
        ) : (
          <div className="mt-3 space-y-4 text-sm">
            {orders.map((order) => {
              const isUndelivered = order.deliveryStatus === "Undelivered";
              const stepIdx = isUndelivered
                ? 2
                : getDeliveryStep(order.deliveryStatus);
              return (
                <div
                  key={order.id}
                  className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white"
                >
                  {/* ── Header row ── */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                        Order ID
                      </p>
                      <p
                        className="text-sm font-bold text-slate-900"
                        style={FONT_HEADING}
                      >
                        {order.id}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString()
                          : "Just now"}
                      </p>
                      <p
                        className="text-sm font-bold text-slate-900"
                        style={FONT_HEADING}
                      >
                        ₹{order.total}
                      </p>
                    </div>
                  </div>

                  {/* ── Items row ── */}
                  <div className="flex gap-3 items-center">
                    {order.items[0]?.image ? (
                      <img
                        src={order.items[0].image}
                        alt={order.items[0].name}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-slate-200"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] text-slate-400 flex-shrink-0">
                        No img
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-slate-500 truncate">
                        {order.schoolName || "Uniform Lab"}
                      </p>
                      <ul className="mt-0.5 text-xs text-slate-600 space-y-0.5">
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

                  {/* ── Inline delivery tracker ── */}
                  <div className="pt-1">
                    {isUndelivered && (
                      <p className="text-[10px] font-semibold text-amber-600 mb-2">
                        ⚠ Delivery attempt failed
                        {order.deliveryReason
                          ? ` — ${order.deliveryReason}`
                          : ""}
                        . Our team will retry.
                      </p>
                    )}
                    <div className="flex items-center">
                      {DELIVERY_STEPS.map((step, idx) => {
                        const done = idx <= stepIdx && !isUndelivered;
                        const current = idx === stepIdx;
                        const isLast = idx === DELIVERY_STEPS.length - 1;
                        return (
                          <div
                            key={step.key}
                            className="flex items-center"
                            style={{ flex: isLast ? "0 0 auto" : 1 }}
                          >
                            {/* Dot + label */}
                            <div className="flex flex-col items-center gap-1">
                              <div
                                style={{
                                  width: 10,
                                  height: 10,
                                  borderRadius: "50%",
                                  background: done
                                    ? "#10b981"
                                    : current && isUndelivered
                                      ? "#f59e0b"
                                      : "#e2e8f0",
                                  border: `2px solid ${
                                    done
                                      ? "#10b981"
                                      : current
                                        ? isUndelivered
                                          ? "#f59e0b"
                                          : "#10b981"
                                        : "#cbd5e1"
                                  }`,
                                  boxShadow: current
                                    ? "0 0 0 3px rgba(16,185,129,0.15)"
                                    : "none",
                                  flexShrink: 0,
                                }}
                              />
                              <span
                                style={{
                                  fontSize: 9,
                                  fontWeight: 700,
                                  color: done
                                    ? "#059669"
                                    : current
                                      ? "#374151"
                                      : "#94a3b8",
                                  whiteSpace: "nowrap",
                                  fontFamily: "'Inter', sans-serif",
                                }}
                              >
                                {step.label}
                              </span>
                            </div>
                            {/* Connector line */}
                            {!isLast && (
                              <div
                                style={{
                                  flex: 1,
                                  height: 2,
                                  borderRadius: 99,
                                  background:
                                    idx < stepIdx && !isUndelivered
                                      ? "#10b981"
                                      : "#e2e8f0",
                                  margin: "0 4px",
                                  marginBottom: 14 /* align with dots, not labels */,
                                }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ── Tracking number ── */}
                  <div
                    className="pt-3 border-t border-slate-100"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                      Tracking No.
                    </p>
                    {order.trackingNumber ? (
                      <>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="text-sm font-bold text-slate-800"
                            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800 }}
                          >
                            {order.trackingNumber}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                order.trackingNumber,
                              );
                              setCopiedTrackingId(order.id);
                              setTimeout(() => setCopiedTrackingId(null), 2000);
                            }}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
                            style={{ fontSize: 10, fontWeight: 700 }}
                            title="Copy tracking number"
                          >
                            {copiedTrackingId === order.id ? (
                              <>
                                <Check size={10} strokeWidth={3} />
                                &nbsp;Copied
                              </>
                            ) : (
                              <>
                                <Copy size={10} />
                                &nbsp;Copy
                              </>
                            )}
                          </button>
                        </div>
                        <p
                          className="mt-1.5 text-[11px] text-slate-500 leading-snug"
                          style={{ fontWeight: 600 }}
                        >
                          Use this no. to track your order once it&apos;s
                          shipped — copy this tracking no. and paste&nbsp;
                          <a
                            href="https://shreemaruti.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-black inline-flex items-center gap-0.5"
                          >
                            here <ExternalLink size={10} />
                          </a>
                        </p>
                      </>
                    ) : (
                      <p
                        className="text-[11px] text-slate-400 italic"
                        style={{ fontWeight: 600 }}
                      >
                        Tracking no. yet to assign
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  const renderReturns = () => {
    const selectedOrder =
      orders.find((o) => o.id === returnForm.orderId) || null;
    const items = selectedOrder?.items || [];

    return (
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Left: exchange request form */}
        <form
          onSubmit={submitReturnRequest}
          className="rounded-xl border border-[var(--color-border)] bg-white p-6 space-y-4"
        >
          <h2
            className="text-lg font-bold text-[#1a1a2e] mb-1"
            style={FONT_HEADING}
          >
            Exchange request
          </h2>
          <p className="text-xs text-[var(--color-text-muted)]">
            Select the order and item you'd like to exchange, then describe the
            reason. Our team will get back to you.
          </p>
          {exchangeSuccess && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.45)" }}
              onClick={() => setExchangeSuccess(false)}
            >
              <div
                className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 p-6"
                style={{ fontFamily: "inherit" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setExchangeSuccess(false)}
                  className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>

                {/* Checkmark */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 mx-auto mb-4">
                  <span style={{ fontSize: 24 }}>✅</span>
                </div>

                <h3 className="text-center font-bold text-slate-900 text-base mb-1">
                  Request Received!
                </h3>
                <p className="text-center text-slate-500 text-xs mb-4 leading-relaxed">
                  Please visit our store with the product. Our team will assist
                  you with the exchange.
                </p>

                <div className="bg-slate-50 rounded-xl px-4 py-3 text-center">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    Our Store
                  </p>
                  <a
                    href="https://maps.app.goo.gl/FF2DvjnQ5tvCnFY87"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline leading-snug"
                  >
                    Shop 23/24, Anusuya Enclave, Jagtap Chowk
                    <br />
                    Wanowrie, Pune – 411040
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setExchangeSuccess(false)}
                  className="mt-4 w-full py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
                >
                  Got it
                </button>
              </div>
            </div>
          )}
          {exchangeError && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {exchangeError}
            </p>
          )}

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
                    itemKey: "",
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
                  <option
                    key={`${selectedOrder.id}-${idx}`}
                    value={`${selectedOrder.id}:${idx}`}
                  >
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
              Convenience fee and any difference in product price will be
              applicable for exchanges, as mentioned in the policy.
            </p>
          </div>

          <button
            type="submit"
            disabled={exchangeSubmitting}
            className="inline-flex items-center justify-center py-2.5 px-5 rounded-full font-bold hover:brightness-105 transition disabled:opacity-60"
            style={{ ...BTN_PRIMARY, ...FONT_HEADING }}
          >
            {exchangeSubmitting ? "Submitting…" : "Submit exchange request"}
          </button>
        </form>

        {/* Right: policy (scrollable) */}
        <aside className="rounded-xl border border-[var(--color-border)] bg-white p-5 max-h-[460px] overflow-y-auto text-xs leading-relaxed text-slate-700">
          <h3
            className="text-sm font-bold text-[#1a1a2e] mb-2"
            style={FONT_HEADING}
          >
            Uniform Lab Exchange Policy
          </h3>
          <p className="mb-2">
            At Uniform Lab, we ensure you a hassle-free shopping experience,
            where you can confidently make purchases.
          </p>
          <ul className="list-disc pl-4 space-y-1 mb-3">
            <li>
              ONLY EXCHANGE requests will be considered for uniforms. No
              refunds.
            </li>
            <li>
              Exchange will be done for extra charges (convenience + size price
              difference).
            </li>
            <li>
              Exchange is allowed for size change in the same product within 7
              days of delivery.
            </li>
            <li>
              Items must be unused, unwashed, unaltered, with tags and
              accessories intact, and in original packaging.
            </li>
            <li>Socks and clothing freebies are ineligible for exchange.</li>
            <li>
              Products with tampered/missing serial numbers are not eligible.
            </li>
          </ul>
          <p className="font-semibold mb-1">Initiation of exchange</p>
          <p className="mb-2">
            Exchange can be initiated by contacting{" "}
            <span className="font-mono text-[11px]">help@theuniformlab.in</span>
            . You can either bring the product to our shop or ship it back to
            us. Items sent back without prior request will not be accepted.
          </p>
          <p className="mb-2">
            Once received, the product will be checked before any further action
            is taken.
          </p>
          <p className="font-semibold mb-1">Damages &amp; issues</p>
          <p className="mb-2">
            Please inspect your order on delivery and contact us immediately if
            the item is defective, damaged or if you receive the wrong item, so
            that we can evaluate the issue and make it right.
          </p>
          <p className="font-semibold mb-1">
            Exceptions / non-exchangeable items
          </p>
          <p className="mb-1">
            Customised products (special orders, personalised items, hemmed
            pants), personal care goods, wholesale orders and sale items are not
            eligible for exchange or refund.
          </p>
          <p>
            For any specific questions about your item or exchange, write to{" "}
            <span className="font-mono text-[11px]">help@theuniformlab.in</span>{" "}
            Or
            <span>+91 9028552855</span> with your order details, and we will
            assist you promptly .
          </p>
        </aside>
      </div>
    );
  };

  const showAuthForms = !isAuthenticated;

  return (
    <main
      className="min-h-screen account-root bg-[var(--page-bg)] pt-24 px-4 sm:px-6"
      style={FONT_BODY}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .min-h-screen, .min-h-screen * { font-family: 'Inter', sans-serif !important; }
        .account-root .text-xs { font-size: 13px; }
        .account-root [class~="text-[10px]"] { font-size: 12px; }
        .account-root [class~="text-[11px]"] { font-size: 13px; }
        .account-root .text-sm { font-size: 15px; }
        .account-root .text-base { font-size: 16px; }
        .account-root .text-lg { font-size: 20px; }
        .account-root .text-xl { font-size: 22px; }
        .account-root input, .account-root select, .account-root textarea { font-size: 15px !important; font-family: 'Inter', sans-serif !important; }
        .account-root label { font-size: 13px; }
      `}</style>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1
              className="text-[#1a1a2e] mb-1"
              style={{ ...FONT_HEADING, fontSize: "clamp(28px, 2.8vw, 38px)", letterSpacing: "-0.7px" }}
            >
              My Account
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              Manage your details, addresses, wishlist and orders in one clean
              place.
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
            {["profile", "addresses", "orders", "returns"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full border font-semibold transition ${
                  activeTab === tab
                    ? "text-white border-transparent"
                    : "border-slate-200 text-slate-700 bg-white hover:bg-[#eef5ff]"
                }`}
                style={
                  activeTab === tab
                    ? {
                        ...BTN_PRIMARY,
                        ...FONT_HEADING,
                        padding: "0.375rem 1rem",
                        fontSize: "13px",
                      }
                    : undefined
                }
              >
                {tab === "profile" && "Profile"}
                {tab === "addresses" && "Addresses"}
                {tab === "orders" && "Orders"}
                {tab === "returns" && "Exchange"}
              </button>
            ))}
          </div>
        )}

        {showAuthForms
          ? renderLoginSignup()
          : activeTab === "profile"
            ? renderProfile()
            : activeTab === "addresses"
              ? renderAddresses()
              : activeTab === "orders"
                ? renderOrders()
                : renderReturns()}
      </div>
    </main>
  );
}
