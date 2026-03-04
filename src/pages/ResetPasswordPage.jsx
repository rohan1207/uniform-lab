import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const FONT_HEADING = { fontFamily: "'Baloo 2', cursive" };
const FONT_BODY = { fontFamily: "'Nunito', sans-serif" };

const BTN_PRIMARY = {
  background: 'linear-gradient(180deg, #1a6bb8 0%, #004C99 50%, #003d7a 100%)',
  border: '1px solid rgba(0,76,153,0.6)',
  boxShadow: '0 2px 8px rgba(0,76,153,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
  color: '#fff',
  borderRadius: '9999px',
  padding: '0.65rem 1.5rem',
  fontSize: '0.875rem',
  fontWeight: 700,
  letterSpacing: '0.02em',
  cursor: 'pointer',
  border: 'none',
};

export default function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get('token') || '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  /* ── Validation ── */
  function validate() {
    if (!token) return 'Invalid or missing reset token. Please request a new link.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (password !== confirm) return 'Passwords do not match.';
    return null;
  }

  /* ── Submit ── */
  async function handleSubmit(e) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/public/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error?.message || 'Password reset failed. Please try again.');
      }

      setSuccess(true);

      // Auto-redirect countdown
      let secs = 5;
      const interval = setInterval(() => {
        secs -= 1;
        setCountdown(secs);
        if (secs <= 0) {
          clearInterval(interval);
          navigate('/account');
        }
      }, 1000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  /* ── No token in URL ── */
  if (!token) {
    return (
      <div style={{ ...FONT_BODY, minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px', background: '#f0f4f8' }}>
        <div style={{ maxWidth: 440, width: '100%', background: '#fff', borderRadius: 18, padding: '40px 36px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ ...FONT_HEADING, margin: '0 0 10px', color: '#1a1a2e', fontSize: 22 }}>Invalid Link</h2>
          <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          <Link
            to="/account"
            style={{ ...BTN_PRIMARY, display: 'inline-block', textDecoration: 'none', padding: '12px 32px' }}
          >
            Back to Account
          </Link>
        </div>
      </div>
    );
  }

  /* ── Success State ── */
  if (success) {
    return (
      <div style={{ ...FONT_BODY, minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px', background: '#f0f4f8' }}>
        <div style={{ maxWidth: 440, width: '100%', background: '#fff', borderRadius: 18, padding: '40px 36px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <h2 style={{ ...FONT_HEADING, margin: '0 0 10px', color: '#059669', fontSize: 22 }}>Password Updated!</h2>
          <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>
            Your password has been changed successfully. You can now sign in with your new password.
          </p>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 28 }}>
            Redirecting to sign in in <strong>{countdown}</strong> second{countdown !== 1 ? 's' : ''}…
          </p>
          <Link
            to="/account"
            style={{ ...BTN_PRIMARY, display: 'inline-block', textDecoration: 'none', padding: '12px 32px' }}
          >
            Sign in now →
          </Link>
        </div>
      </div>
    );
  }

  /* ── Main Form ── */
  return (
    <div
      style={{
        ...FONT_BODY,
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px',
        background: '#f0f4f8',
      }}
    >
      <div
        style={{
          maxWidth: 440,
          width: '100%',
          background: '#fff',
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}
      >
        {/* Header stripe */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1a6bb8 0%, #004C99 100%)',
            padding: '28px 36px',
            textAlign: 'center',
          }}
        >
          <h1 style={{ ...FONT_HEADING, margin: 0, color: '#fff', fontSize: 22, fontWeight: 800 }}>
            The Uniform Lab
          </h1>
          <p style={{ margin: '6px 0 0', color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
            Set a new password
          </p>
        </div>

        {/* Form */}
        <div style={{ padding: '32px 36px' }}>
          <h2 style={{ ...FONT_HEADING, margin: '0 0 6px', color: '#1a1a2e', fontSize: 20 }}>
            Create new password
          </h2>
          <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24, lineHeight: 1.6 }}>
            Choose a strong password for your account. Minimum 6 characters.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* New Password */}
            <div>
              <label
                style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}
              >
                New password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="Min. 6 characters"
                  autoFocus
                  required
                  style={{
                    width: '100%',
                    padding: '10px 44px 10px 12px',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: 10,
                    fontSize: 14,
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: "'Nunito', sans-serif",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  tabIndex={-1}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94a3b8',
                    fontSize: 15,
                    padding: 0,
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              {/* Strength indicator */}
              {password.length > 0 && (
                <div style={{ marginTop: 6, display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[1, 2, 3, 4].map((lvl) => {
                    const strength =
                      password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)
                        ? 4
                        : password.length >= 8
                        ? 3
                        : password.length >= 6
                        ? 2
                        : 1;
                    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e'];
                    return (
                      <div
                        key={lvl}
                        style={{
                          height: 4,
                          flex: 1,
                          borderRadius: 4,
                          background: lvl <= strength ? colors[strength - 1] : '#e2e8f0',
                          transition: 'background 0.3s',
                        }}
                      />
                    );
                  })}
                  <span style={{ fontSize: 10, color: '#94a3b8', marginLeft: 4 }}>
                    {password.length < 6
                      ? 'Too short'
                      : password.length < 8
                      ? 'Weak'
                      : password.length < 10
                      ? 'Good'
                      : 'Strong'}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}
              >
                Confirm new password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => { setConfirm(e.target.value); setError(''); }}
                placeholder="Repeat your password"
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1.5px solid ${confirm && confirm !== password ? '#ef4444' : '#e2e8f0'}`,
                  borderRadius: 10,
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Nunito', sans-serif",
                }}
              />
              {confirm && confirm !== password && (
                <p style={{ color: '#ef4444', fontSize: 11, marginTop: 4 }}>Passwords do not match</p>
              )}
            </div>

            {/* Error banner */}
            {error && (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fca5a5',
                  borderRadius: 10,
                  padding: '10px 14px',
                  color: '#dc2626',
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                ⚠️ {error}
                {(error.toLowerCase().includes('expired') || error.toLowerCase().includes('invalid')) && (
                  <div style={{ marginTop: 6 }}>
                    <Link to="/account" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline', fontSize: 12 }}>
                      Request a new reset link →
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !password || !confirm}
              style={{
                ...BTN_PRIMARY,
                width: '100%',
                padding: '13px',
                fontSize: 15,
                opacity: loading || !password || !confirm ? 0.6 : 1,
                transition: 'opacity 0.2s, filter 0.2s',
              }}
            >
              {loading ? 'Updating password…' : 'Set new password'}
            </button>

            <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: 12, margin: 0 }}>
              <Link to="/account" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>
                ← Back to sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
