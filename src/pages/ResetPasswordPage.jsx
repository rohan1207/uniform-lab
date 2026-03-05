import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

/* ── Scoped responsive styles ──────────────────────────────────────── */
const PAGE_STYLES = `
  .rp-page {
    min-height: 100vh;
    /* 84px fixed navbar (desktop) + 20px breathing room */
    padding: 104px 16px 48px;
    background: #f0f4f8;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    font-family: 'Nunito', sans-serif;
    box-sizing: border-box;
  }
  @media (max-width: 640px) {
    /* 60px mobile sticky bar + 16px */
    .rp-page { padding: 80px 12px 40px; }
  }
  .rp-card {
    width: 100%;
    max-width: 440px;
    background: #fff;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 4px 32px rgba(0,0,0,0.09);
  }
  .rp-card-header {
    background: linear-gradient(135deg, #1a6bb8 0%, #004C99 100%);
    padding: 26px 32px;
    text-align: center;
  }
  @media (max-width: 480px) {
    .rp-card-header { padding: 20px 18px; }
  }
  .rp-card-body {
    padding: 28px 32px 32px;
  }
  @media (max-width: 480px) {
    .rp-card-body { padding: 20px 16px 24px; }
  }
  .rp-simple-card {
    width: 100%;
    max-width: 440px;
    background: #fff;
    border-radius: 18px;
    padding: 36px 32px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    text-align: center;
    box-sizing: border-box;
  }
  @media (max-width: 480px) {
    .rp-simple-card { padding: 28px 16px; }
  }
  .rp-input {
    width: 100%;
    padding: 11px 44px 11px 13px;
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    font-size: 15px;
    font-family: 'Nunito', sans-serif;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }
  .rp-input:focus { border-color: #3b82f6; }
  .rp-input-plain {
    width: 100%;
    padding: 11px 13px;
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    font-size: 15px;
    font-family: 'Nunito', sans-serif;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }
  .rp-input-plain:focus { border-color: #3b82f6; }
  .rp-input-error { border-color: #ef4444 !important; }
  .rp-btn-primary {
    display: block;
    width: 100%;
    padding: 13px;
    background: linear-gradient(180deg, #1a6bb8 0%, #004C99 50%, #003d7a 100%);
    color: #fff;
    border: none;
    border-radius: 9999px;
    font-size: 15px;
    font-weight: 700;
    font-family: 'Baloo 2', cursive;
    letter-spacing: 0.02em;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,76,153,0.3);
    transition: opacity 0.2s, filter 0.2s;
  }
  .rp-btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }
  .rp-btn-primary:not(:disabled):hover { filter: brightness(1.08); }
  .rp-btn-link {
    display: inline-block;
    text-decoration: none;
    padding: 12px 32px;
    background: linear-gradient(180deg, #1a6bb8 0%, #004C99 100%);
    color: #fff;
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 700;
    font-family: 'Baloo 2', cursive;
  }
  .rp-label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: #475569;
    margin-bottom: 6px;
  }
  .rp-strength-bar {
    display: flex;
    gap: 4px;
    align-items: center;
    margin-top: 6px;
  }
  .rp-strength-seg {
    height: 4px;
    flex: 1;
    border-radius: 4px;
    transition: background 0.3s;
  }
`;

const strengthColors = ["#ef4444", "#f97316", "#eab308", "#22c55e"];
const strengthLabels = ["Too short", "Weak", "Good", "Strong"];

export default function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  function validate() {
    if (!token)
      return "Invalid or missing reset token. Please request a new link.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirm) return "Passwords do not match.";
    return null;
  }

  function getStrength() {
    if (password.length === 0) return 0;
    if (
      password.length >= 10 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    )
      return 4;
    if (password.length >= 8) return 3;
    if (password.length >= 6) return 2;
    return 1;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/public/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          data?.error?.message || "Password reset failed. Please try again.",
        );
      setSuccess(true);
      let secs = 5;
      const interval = setInterval(() => {
        secs -= 1;
        setCountdown(secs);
        if (secs <= 0) {
          clearInterval(interval);
          navigate("/account");
        }
      }, 1000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const strength = getStrength();

  /* ── No token in URL ── */
  if (!token) {
    return (
      <>
        <style>{PAGE_STYLES}</style>
        <div className="rp-page">
          <div className="rp-simple-card">
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <h2
              style={{
                margin: "0 0 10px",
                color: "#1a1a2e",
                fontSize: 22,
                fontWeight: 800,
                fontFamily: "'Baloo 2', cursive",
              }}
            >
              Invalid Link
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: 14,
                lineHeight: 1.6,
                marginBottom: 24,
              }}
            >
              This password reset link is invalid or has expired. Please request
              a new one.
            </p>
            <Link to="/account" className="rp-btn-link">
              Back to Account
            </Link>
          </div>
        </div>
      </>
    );
  }

  /* ── Success State ── */
  if (success) {
    return (
      <>
        <style>{PAGE_STYLES}</style>
        <div className="rp-page">
          <div className="rp-simple-card">
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
            <h2
              style={{
                margin: "0 0 10px",
                color: "#059669",
                fontSize: 22,
                fontWeight: 800,
                fontFamily: "'Baloo 2', cursive",
              }}
            >
              Password Updated!
            </h2>
            <p
              style={{
                color: "#475569",
                fontSize: 14,
                lineHeight: 1.6,
                marginBottom: 8,
              }}
            >
              Your password has been changed successfully. You can now sign in
              with your new password.
            </p>
            <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 28 }}>
              Redirecting to sign in in <strong>{countdown}</strong> second
              {countdown !== 1 ? "s" : ""}…
            </p>
            <Link to="/account" className="rp-btn-link">
              Sign in now →
            </Link>
          </div>
        </div>
      </>
    );
  }

  /* ── Main Form ── */
  return (
    <>
      <style>{PAGE_STYLES}</style>
      <div className="rp-page">
        <div className="rp-card">
          {/* Header stripe */}
          <div className="rp-card-header">
            <h1
              style={{
                margin: 0,
                color: "#fff",
                fontSize: 22,
                fontWeight: 800,
                fontFamily: "'Baloo 2', cursive",
              }}
            >
              The Uniform Lab
            </h1>
            <p
              style={{
                margin: "6px 0 0",
                color: "rgba(255,255,255,0.7)",
                fontSize: 12,
              }}
            >
              Set a new password
            </p>
          </div>

          {/* Form body */}
          <div className="rp-card-body">
            <h2
              style={{
                margin: "0 0 6px",
                color: "#1a1a2e",
                fontSize: 20,
                fontWeight: 800,
                fontFamily: "'Baloo 2', cursive",
              }}
            >
              Create new password
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: 13,
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              Choose a strong password. Minimum 6 characters.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              {/* New Password */}
              <div>
                <label className="rp-label">New password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Min. 6 characters"
                    autoFocus
                    required
                    className="rp-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    tabIndex={-1}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#94a3b8",
                      fontSize: 15,
                      padding: 0,
                    }}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                {/* Strength meter */}
                {password.length > 0 && (
                  <div className="rp-strength-bar">
                    {[1, 2, 3, 4].map((lvl) => (
                      <div
                        key={lvl}
                        className="rp-strength-seg"
                        style={{
                          background:
                            lvl <= strength
                              ? strengthColors[strength - 1]
                              : "#e2e8f0",
                        }}
                      />
                    ))}
                    <span
                      style={{ fontSize: 10, color: "#94a3b8", marginLeft: 4 }}
                    >
                      {strengthLabels[Math.max(0, strength - 1)]}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="rp-label">Confirm new password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                    setError("");
                  }}
                  placeholder="Repeat your password"
                  required
                  className={`rp-input-plain${confirm && confirm !== password ? " rp-input-error" : ""}`}
                />
                {confirm && confirm !== password && (
                  <p style={{ color: "#ef4444", fontSize: 11, marginTop: 4 }}>
                    Passwords do not match
                  </p>
                )}
              </div>

              {/* Error banner */}
              {error && (
                <div
                  style={{
                    background: "#fef2f2",
                    border: "1px solid #fca5a5",
                    borderRadius: 10,
                    padding: "10px 14px",
                    color: "#dc2626",
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  ⚠️ {error}
                  {(error.toLowerCase().includes("expired") ||
                    error.toLowerCase().includes("invalid")) && (
                    <div style={{ marginTop: 6 }}>
                      <Link
                        to="/account"
                        style={{
                          color: "#2563eb",
                          fontWeight: 600,
                          textDecoration: "underline",
                          fontSize: 12,
                        }}
                      >
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
                className="rp-btn-primary"
              >
                {loading ? "Updating password…" : "Set new password"}
              </button>

              <p
                style={{
                  textAlign: "center",
                  color: "#94a3b8",
                  fontSize: 12,
                  margin: 0,
                }}
              >
                <Link
                  to="/account"
                  style={{
                    color: "#2563eb",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  ← Back to sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
