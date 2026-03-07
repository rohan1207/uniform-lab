import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Building2,
  Shirt,
  Palette,
  Boxes,
  Truck,
  ClipboardList,
  Handshake,
} from "lucide-react";

/* ─── REVEAL HOOK ─────────────────────────────────────────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── CSS ─────────────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .eq-root, .eq-root * { font-family: 'Inter', sans-serif !important; }

  .eq-root {
    background: #f6f8ff;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── Hero ── */
  .eq-hero {
    position: relative;
    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #2563eb 100%);
    padding: clamp(90px, 14vw, 140px) clamp(20px, 5vw, 80px) clamp(100px, 16vw, 160px);
    text-align: center; overflow: hidden;
  }
  .eq-hero-dots {
    position: absolute; inset: 0; pointer-events: none;
    background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 28px 28px;
  }
  .eq-hero-glow {
    position: absolute; width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(96,165,250,0.16) 0%, transparent 70%);
    left: 50%; top: 50%; transform: translate(-50%, -50%); pointer-events: none;
  }
  .eq-hero-inner { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
  .eq-pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 16px; border-radius: 999px;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18);
    color: #bfdbfe; font-size: 11px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    margin-bottom: 22px; backdrop-filter: blur(8px);
  }
  .eq-h1 {
    font-size: clamp(28px, 5vw, 56px);
    color: #fff; font-weight: 800;
    line-height: 1.06; letter-spacing: -0.8px; margin: 0 0 16px;
  }
  .eq-h1 em { font-style: normal; color: #93c5fd; }
  .eq-hero-sub {
    color: #93c5fd; font-size: clamp(14px, 1.3vw, 17px);
    font-weight: 500; line-height: 1.7;
  }

  /* ── Main layout ── */
  .eq-main {
    max-width: 1200px; margin: -60px auto 0;
    padding: 0 clamp(16px, 3vw, 40px) 80px;
    position: relative; z-index: 10;
  }
  .eq-grid {
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 28px;
    align-items: start;
  }

  /* ── Left col ── */
  .eq-left { display: flex; flex-direction: column; gap: 20px; }

  /* Info card */
  .eq-info-card {
    background: #fff;
    border: 1px solid #e5edf9;
    border-radius: 24px;
    padding: 32px 28px;
    position: relative; overflow: hidden;
  }
  .eq-info-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, #1e3a8a, #2563eb, #0ea5e9);
  }
  .eq-info-sec-label {
    font-size: 10px; font-weight: 800; letter-spacing: 0.14em;
    text-transform: uppercase; color: #2563eb;
    display: flex; align-items: center; gap: 8px; margin-bottom: 12px;
  }
  .eq-info-sec-label::before {
    content: ''; width: 18px; height: 2px;
    background: #2563eb; border-radius: 2px;
  }
  .eq-info-h2 {
    font-size: clamp(20px, 2.2vw, 28px);
    color: #1a1a2e; font-weight: 800;
    line-height: 1.12; margin: 0 0 10px;
    letter-spacing: -0.4px;
  }
  .eq-info-h2 span { color: #2563eb; }
  .eq-info-p {
    color: #64748b; font-size: 14px; font-weight: 500;
    line-height: 1.75; margin: 0 0 24px;
  }

  /* Feature list inside info card */
  .eq-features { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
  .eq-feat {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 12px 14px; border-radius: 12px;
    background: #f8faff; border: 1px solid #e5edf9;
    transition: all 0.22s ease; cursor: default;
  }
  .eq-feat:hover { background: #eff6ff; border-color: #bfdbfe; transform: translateX(3px); }
  .eq-feat-icon { color: #2563eb; flex-shrink: 0; margin-top: 1px; }
  .eq-feat-text { font-size: 13px; font-weight: 500; color: #64748b; line-height: 1.55; }

  /* Feature grid — 2 cols */
  .eq-feat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .eq-feat-box {
    padding: 14px; border-radius: 14px;
    background: #f8faff; border: 1px solid #e5edf9;
    transition: all 0.22s ease; cursor: default;
  }
  .eq-feat-box:hover { background: #eff6ff; border-color: #bfdbfe; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(30,58,138,0.08); }
  .eq-feat-box-emoji {
    width: 32px; height: 32px;
    border-radius: 12px;
    background: linear-gradient(135deg, #e0edff 0%, #c7d2fe 100%);
    color: #1d4ed8;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 10px;
    flex-shrink: 0;
  }
  .eq-feat-box-title { font-size: 12px; font-weight: 800; color: #1e293b; margin-bottom: 2px; }
  .eq-feat-box-sub { font-size: 11px; font-weight: 500; color: #64748b; line-height: 1.4; }

  /* Contact info strip */
  .eq-contact-strip {
    background: linear-gradient(135deg, #0f172a, #1e3a8a);
    border-radius: 18px; padding: 22px 24px;
    display: flex; flex-direction: column; gap: 12px;
  }
  .eq-contact-item {
    display: flex; align-items: center; gap: 12px;
  }
  .eq-contact-ico {
    width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);
    display: flex; align-items: center; justify-content: center;
    color: #93c5fd;
  }
  .eq-contact-label { font-size: 10px; font-weight: 700; color: #64748b; letter-spacing: 0.08em; text-transform: uppercase; }
  .eq-contact-val { font-size: 13px; font-weight: 700; color: #fff; }

  /* ── Right col — Form card ── */
  .eq-form-card {
    background: #fff;
    border: 1px solid #e5edf9;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 12px 48px rgba(30,58,138,0.1);
  }
  .eq-form-top {
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    padding: 28px 32px 24px;
    border-bottom: 1px solid #dbeafe;
  }
  .eq-form-title {
    font-size: clamp(18px, 1.8vw, 24px);
    font-weight: 800; color: #1e293b; margin: 0 0 6px;
    letter-spacing: -0.3px;
  }
  .eq-form-subtitle { color: #64748b; font-size: 13px; font-weight: 500; }
  .eq-form-body { padding: 28px 32px 32px; }

  /* Form elements */
  .eq-field { margin-bottom: 18px; }
  .eq-field:last-of-type { margin-bottom: 0; }
  .eq-label {
    display: block; font-size: 12px; font-weight: 800;
    color: #475569; margin-bottom: 7px;
    letter-spacing: 0.04em; text-transform: uppercase;
  }
  .eq-input {
    width: 100%; padding: 12px 16px;
    border: 1.5px solid #e5edf9; border-radius: 12px;
    background: #f8faff;
    font-size: 15px; font-weight: 500; color: #1e293b;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    appearance: none; outline: none;
  }
  .eq-input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
    background: #fff;
  }
  .eq-input::placeholder { color: #cbd5e1; font-weight: 400; }
  .eq-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  textarea.eq-input { resize: none; }

  /* Submit button — NewHero-style pill */
  .eq-submit {
    width: 100%; padding: 14px 24px;
    border-radius: 999px; border: 1px solid rgba(0,76,153,0.6);
    cursor: pointer;
    background: linear-gradient(180deg, #1a6bb8 0%, #004C99 50%, #003d7a 100%);
    box-shadow: 0 2px 8px rgba(0,76,153,0.25), inset 0 1px 0 rgba(255,255,255,0.15);
    color: #fff; font-size: clamp(12px, 1vw, 14px);
    font-weight: 700; letter-spacing: 0.11em; text-transform: uppercase;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
    margin-top: 22px;
  }
  .eq-submit:hover { filter: brightness(1.04); transform: translateY(-1px); box-shadow: 0 6px 22px rgba(37,99,235,0.28); }
  .eq-submit:active { transform: translateY(1px); box-shadow: none; }

  /* Trust row under button */
  .eq-trust {
    display: flex; align-items: center; justify-content: center; gap: 18px;
    margin-top: 18px; flex-wrap: wrap;
  }
  .eq-trust-item { display: flex; align-items: center; gap: 5px; color: #94a3b8; font-size: 11px; font-weight: 700; }
  .eq-trust-item svg { color: #10b981; }

  /* Feature list toggle (used only on mobile render) */
  .eq-feat-toggle {
    margin-top: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    color: #2563eb;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, transform 0.12s ease;
  }
  .eq-feat-toggle:hover {
    background: #eff6ff;
    border-color: #bfdbfe;
    transform: translateY(-1px);
  }

  /* ── Success state ── */
  .eq-success {
    min-height: 80vh;
    display: flex; align-items: center; justify-content: center;
    padding: clamp(20px, 5vw, 60px);
  }
  .eq-success-card {
    background: #fff; border: 1px solid #e5edf9;
    border-radius: 28px; text-align: center;
    padding: clamp(40px, 6vw, 72px) clamp(28px, 5vw, 64px);
    max-width: 520px; width: 100%;
    box-shadow: 0 16px 60px rgba(30,58,138,0.11);
    position: relative; overflow: hidden;
  }
  .eq-success-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, #10b981, #2563eb);
  }
  .eq-success-icon {
    width: 72px; height: 72px; border-radius: 50%;
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 24px; color: #059669;
  }
  .eq-success-title {
    font-size: clamp(20px, 2.6vw, 30px);
    color: #1a1a2e; font-weight: 800;
    letter-spacing: -0.4px; margin: 0 0 12px;
  }
  .eq-success-sub { color: #64748b; font-size: 15px; font-weight: 500; line-height: 1.7; margin: 0 0 28px; }
  .eq-success-back {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 26px; border-radius: 999px;
    border: 1px solid rgba(0,76,153,0.6);
    background: linear-gradient(180deg, #1a6bb8 0%, #004C99 50%, #003d7a 100%);
    box-shadow: 0 2px 8px rgba(0,76,153,0.25), inset 0 1px 0 rgba(255,255,255,0.15);
    color: #fff; font-size: clamp(12px, 1vw, 14px);
    font-weight: 700; letter-spacing: 0.11em; text-transform: uppercase;
    text-decoration: none;
    transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
  }
  .eq-success-back:hover { filter: brightness(1.04); transform: translateY(-1px); box-shadow: 0 6px 22px rgba(37,99,235,0.28); }
  .eq-success-back:active { transform: translateY(1px); box-shadow: none; }

  /* ═══ MOBILE ════════════════════════════════════════════════════════════ */
  .eq-root { padding-top: 0; }
  @media (max-width: 900px) {
    .eq-grid { grid-template-columns: 1fr; gap: 24px; }
    .eq-main { margin-top: -40px; padding-bottom: 48px; }
  }
  @media (max-width: 767px) {
    .eq-root { padding-top: 72px; }
    .eq-hero { padding: clamp(48px, 10vw, 72px) 16px clamp(64px, 12vw, 88px); }
    .eq-pill { font-size: 10px; padding: 5px 12px; white-space: nowrap; }
    .eq-main { margin-top: -32px; padding: 0 16px 40px; }
    .eq-info-card { padding: 24px 20px; border-radius: 20px; }
    .eq-form-card { border-radius: 20px; }
    .eq-form-top { padding: 22px 20px 18px; flex-direction: column; align-items: center; text-align: center; }
    .eq-form-body { padding: 20px 20px 24px; }
    .eq-contact-strip { padding: 18px 20px; border-radius: 16px; }
  }
  @media (max-width: 600px) {
    .eq-row { grid-template-columns: 1fr; }
    .eq-feat-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
  }
  @media (max-width: 400px) {
    .eq-feat-grid { grid-template-columns: 1fr; }
    .eq-main { padding-left: 14px; padding-right: 14px; }
    .eq-success-card { padding: 32px 20px; border-radius: 20px; }
    .eq-success-back { width: 100%; justify-content: center; }
  }
`;

/* ─── COMPONENT ──────────────────────────────────────────────────────── */

const WHATSAPP_NUMBER = "919028552855"; // no + or spaces

function buildWhatsAppMessage(f) {
  const lines = [
    "🏫 *New School Enquiry — The Uniform Lab*",
    "─────────────────────────────",
    `🏛️ *School / College:* ${f.school}`,
    `👤 *Contact Person:* ${f.contact}`,
    `📧 *Email:* ${f.email}`,
    `📞 *Phone:* ${f.phone}`,
    `📍 *City / Location:* ${f.city}`,
  ];
  if (f.message && f.message.trim()) {
    lines.push("─────────────────────────────");
    lines.push(`💬 *Message:*\n${f.message.trim()}`);
  }
  lines.push("─────────────────────────────");
  lines.push("_Sent via theuniformlab.in_");
  return lines.join("\n");
}

function openWhatsApp(text) {
  // wa.me is the canonical deep-link supported on iOS, Android, WhatsApp Desktop & WhatsApp Web.
  // encodeURIComponent handles all special chars, emojis, newlines robustly.
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  // Use window.open with _blank so it works on desktop browsers too.
  // On mobile, browsers hand the wa.me scheme to the WhatsApp app automatically.
  const win = window.open(url, "_blank", "noopener,noreferrer");
  // Fallback: if popup was blocked, navigate in same tab
  if (!win || win.closed || typeof win.closed === "undefined") {
    window.location.href = url;
  }
}

export default function SchoolEnquiryPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [form, setForm] = useState({
    school: "",
    contact: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth <= 767);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const msg = buildWhatsAppMessage(form);
    openWhatsApp(msg);
    setSubmitted(true);
  }

  /* ── Success ── */
  if (submitted) {
    return (
      <>
        <style>{CSS}</style>
        <div className="eq-root">
          <div className="eq-success">
            <div className="eq-success-card">
              <div className="eq-success-icon">
                <CheckCircle2 size={36} strokeWidth={2} />
              </div>
              <h1 className="eq-success-title">Opening WhatsApp!</h1>
              <p className="eq-success-sub">
                Your enquiry details have been pre-filled in WhatsApp. Just hit
                <strong> Send</strong> to connect with our team directly.
                <br />
                <br />
                If WhatsApp didn't open,{" "}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(form))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#2563eb", fontWeight: 700 }}
                >
                  click here
                </a>
                .
              </p>
              <Link to="/" className="eq-success-back">
                Back to Home
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ── Form ── */
  return (
    <>
      <style>{CSS}</style>
      <div className="eq-root">
        {/* Hero */}
        <div className="eq-hero">
          <div className="eq-hero-dots" />
          <div className="eq-hero-glow" />
          <div className="eq-hero-inner">
            <div className="eq-pill">
              <Building2 size={12} strokeWidth={2} />
              For Schools &amp; Colleges
            </div>
            <h1 className="eq-h1">
              A uniform partner that
              <br />
              <em>thinks like a school.</em>
            </h1>
            <p className="eq-hero-sub">
              We bring an organised, process-first approach to uniforms — from
              fabric sourcing and patterning to branding and doorstep delivery
              for parents.
            </p>
          </div>
        </div>

        {/* Main */}
        <div className="eq-main">
          <div className="eq-grid">
            {/* ── LEFT ── */}
            <div className="eq-left">
              <Reveal delay={0.05}>
                <div className="eq-info-card">
                  <div className="eq-info-sec-label">What We Offer</div>
                  <h2 className="eq-info-h2">
                    Everything your school
                    <br />
                    <span>needs, handled.</span>
                  </h2>
                  <p className="eq-info-p">
                    From day-wear to sports kits, accessories to custom branding
                    — we manage the full uniform lifecycle so your
                    administration doesn't have to.
                  </p>

                  {(() => {
                    const allFeatures = [
                      {
                        icon: Shirt,
                        title: "Full Uniform Range",
                        sub: "Day-wear, sports, winter & rain gear",
                      },
                      {
                        icon: Palette,
                        title: "Custom Branding",
                        sub: "Embroidery, printing, custom trims",
                      },
                      {
                        icon: Boxes,
                        title: "Bulk Production",
                        sub: "Scalable for any school size",
                      },
                      {
                        icon: Truck,
                        title: "Parent Delivery",
                        sub: "Doorstep delivery & easy returns",
                      },
                      {
                        icon: ClipboardList,
                        title: "Size Management",
                        sub: "Standardised measurement mapping",
                      },
                      {
                        icon: Handshake,
                        title: "Long-Term Partner",
                        sub: "Process-driven, year-on-year",
                      },
                    ];
                    const visible =
                      !isMobile || showAllFeatures
                        ? allFeatures
                        : allFeatures.slice(0, 3);
                    return (
                      <>
                        <div
                          className="eq-feat-grid"
                          style={{ marginBottom: 12 }}
                        >
                          {visible.map(({ icon: FeatIcon, title, sub }) => (
                            <div className="eq-feat-box" key={title}>
                              <span className="eq-feat-box-emoji">
                                <FeatIcon size={18} strokeWidth={2} />
                              </span>
                              <div className="eq-feat-box-title">{title}</div>
                              <div className="eq-feat-box-sub">{sub}</div>
                            </div>
                          ))}
                        </div>
                        {isMobile && allFeatures.length > 3 && (
                          <button
                            type="button"
                            className="eq-feat-toggle"
                            onClick={() => setShowAllFeatures((v) => !v)}
                          >
                            {showAllFeatures ? "Show less" : "Show more"}
                          </button>
                        )}
                      </>
                    );
                  })()}
                </div>
              </Reveal>

              {/* Contact strip */}
              <Reveal delay={0.12}>
                <div className="eq-contact-strip">
                  {[
                    {
                      icon: <Phone size={15} />,
                      label: "Call us",
                      val: "+91 9028552855",
                    },
                    {
                      icon: <Mail size={15} />,
                      label: "Email us",
                      val: "help@theuniformlab.in",
                    },
                    {
                      icon: <MapPin size={15} />,
                      label: "Visit us",
                      val: (
                        <a
                          href="https://maps.app.goo.gl/FF2DvjnQ5tvCnFY87"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "inherit",
                            textDecoration: "underline",
                            textDecorationColor: "rgba(0,0,0,0.25)",
                          }}
                        >
                          Shop 23/24 , Anusuya Enclave, Jagtap Chowk, Wanowrie,
                          Pune – 411040
                        </a>
                      ),
                    },
                    {
                      icon: <Clock size={15} />,
                      label: "Store hours",
                      val: "Tue–Sun, 9:30 AM – 7:00 PM · Monday Closed ",
                    },
                  ].map(({ icon, label, val }) => (
                    <div className="eq-contact-item" key={label}>
                      <div className="eq-contact-ico">{icon}</div>
                      <div>
                        <div className="eq-contact-label">{label}</div>
                        <div className="eq-contact-val">{val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* ── RIGHT — FORM ── */}
            <Reveal delay={0.08}>
              <div className="eq-form-card">
                <div className="eq-form-top">
                  <div
                    className="eq-pill"
                    style={{
                      marginBottom: 14,
                      background: "rgba(37,99,235,0.1)",
                      border: "1px solid rgba(37,99,235,0.15)",
                      color: "#2563eb",
                    }}
                  >
                    <Sparkles size={11} />
                    Quick response guaranteed
                  </div>
                  <div className="eq-form-title">Share your details</div>
                  <div className="eq-form-subtitle">
                    Fill in the form and we'll get back to you within 24 hours.
                  </div>
                </div>

                <form className="eq-form-body" onSubmit={handleSubmit}>
                  <div className="eq-field">
                    <label className="eq-label">School / College Name *</label>
                    <input
                      required
                      type="text"
                      className="eq-input"
                      placeholder="e.g. St. Mary's High School"
                      value={form.school}
                      onChange={set("school")}
                    />
                  </div>

                  <div className="eq-field">
                    <label className="eq-label">Contact Person Name *</label>
                    <input
                      required
                      type="text"
                      className="eq-input"
                      placeholder="Principal / Admin / Coordinator"
                      value={form.contact}
                      onChange={set("contact")}
                    />
                  </div>

                  <div className="eq-field eq-row">
                    <div>
                      <label className="eq-label">Email Address *</label>
                      <input
                        required
                        type="email"
                        className="eq-input"
                        placeholder="admin@school.edu"
                        value={form.email}
                        onChange={set("email")}
                      />
                    </div>
                    <div>
                      <label className="eq-label">Contact Number *</label>
                      <input
                        required
                        type="tel"
                        className="eq-input"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={set("phone")}
                      />
                    </div>
                  </div>

                  <div className="eq-field">
                    <label className="eq-label">City / Location *</label>
                    <input
                      required
                      type="text"
                      className="eq-input"
                      placeholder="e.g. Pune, Maharashtra"
                      value={form.city}
                      onChange={set("city")}
                    />
                  </div>

                  <div className="eq-field">
                    <label className="eq-label">Message</label>
                    <textarea
                      className="eq-input"
                      rows={4}
                      placeholder="Share approximate student strength, current uniform setup, and what you're looking for..."
                      value={form.message}
                      onChange={set("message")}
                    />
                  </div>

                  <button type="submit" className="eq-submit">
                    Send via WhatsApp
                    <ArrowRight size={18} />
                  </button>

                  <div className="eq-trust">
                    {[
                      "100+ schools trust us",
                      "No spam, ever",
                      "Response within 24h",
                    ].map((t) => (
                      <div className="eq-trust-item" key={t}>
                        <CheckCircle2 size={13} strokeWidth={2.5} />
                        {t}
                      </div>
                    ))}
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── Google Map ── */}
        <div style={{ width: "100%", lineHeight: 0 }}>
          <a
            href="https://maps.app.goo.gl/FF2DvjnQ5tvCnFY87"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", width: "100%" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.8147672911623!2d73.89676472496227!3d18.492047732596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1a12ad1d09f%3A0xa39ce2ad906db1d5!2sThe%20Uniform%20Lab!5e0!3m2!1sen!2sin!4v1772799880642!5m2!1sen!2sin"
              width="100%"
              height="420"
              style={{ border: 0, display: "block", pointerEvents: "auto" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Uniform Lab location"
            />
          </a>
        </div>
      </div>
    </>
  );
}
