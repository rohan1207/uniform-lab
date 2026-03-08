import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "FAQs", href: "/faqs" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Exchange Policy", href: "/exchange-policy" },
];

const SCHOOL_LINKS = [
  { label: "Shop by Schools", href: "/schools" },
  { label: "Partner with Us", href: "/schoolenquiry" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#060d1f",
        color: "#fff",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        footer, footer * { font-family: 'Inter', sans-serif !important; }
        .ftl-link { color: #94a3b8; font-size: 13.5px; font-weight: 600; text-decoration: none; transition: color 0.15s; display: inline-block; }
        .ftl-link:hover { color: #fff; }
        .ftl-col-label {
          font-size: 10px; font-weight: 800; letter-spacing: 0.15em;
          text-transform: uppercase; color: #94a3b8; margin-bottom: 14px;
          padding-bottom: 8px; border-bottom: 1px solid #1e293b;
        }
        .ftl-contact-row { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; }
        .ftl-contact-row:last-child { margin-bottom: 0; }
        .ftl-contact-ico { color: #3b82f6; margin-top: 2px; flex-shrink: 0; }
        .ftl-contact-text { font-size: 13px; color: #cbd5e1; line-height: 1.5; }
        .ftl-contact-text a { color: #cbd5e1; text-decoration: none; transition: color 0.15s; }
        .ftl-contact-text a:hover { color: #fff; }
        .ftl-contact-sub { font-size: 11.5px; color: #94a3b8; margin-top: 1px; }
            .ftl-logo { height: 38px; display: block; filter: drop-shadow(0 1px 4px rgba(0,0,0,0.12)); }
            @media (min-width: 640px) {
              .ftl-logo { height: 95px; }
            }
            @media (min-width: 1024px) {
              .ftl-logo { height: 95px; }
            }
            @media (max-width: 480px) {
              .ftl-logo { height: 80px; }
            }
          `}</style>

          {/* ── Accent line ── */}
          <div
            style={{
              height: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, #1d4ed8 30%, #facc15 55%, transparent 100%)",
            }}
          />

          {/* ── Main content ── */}
          <div
            style={{
              maxWidth: 1200, margin: "0 auto", padding: "52px 24px 36px",
            }}
          >
            {/* 3-col grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "48px 40px",
                alignItems: "start",
              }}
            >
              {/* ── Col 1 : Brand ── */}
          <div>
            <div
              style={{
                display: "inline-block",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#3b82f6",
                background: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.18)",
                borderRadius: 20,
                padding: "3px 10px",
                marginBottom: 12,
              }}
            >
              School Uniforms
            </div>
                <img
                  src="/logo.png"
                  alt="The Uniform Lab Logo"
                  className="ftl-logo"
                  style={{
                    margin: "0 0 0px",
                   
                  }}
                />
            
            <p
              style={{
                fontSize: 13,
                color: "#94a3b8",
                lineHeight: 1.7,
                margin: "0 0 0",
                maxWidth: 280,
              }}
            >
              Uniforms that make students look smart, feel comfortable, and wear
              with pride crafted for schools across Pune & India.
            </p>
          </div>

          {/* ── Col 2 : Contact ── */}
          <div>
            <div className="ftl-col-label">Contact & Hours</div>

            <div className="ftl-contact-row">
              <MapPin size={14} className="ftl-contact-ico" />
              <div className="ftl-contact-text">
                <a
                  href="https://maps.app.goo.gl/FF2DvjnQ5tvCnFY87"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "inherit",
                    textDecoration: "underline",
                    textDecorationColor: "rgba(255,255,255,0.3)",
                  }}
                >
                  Shop 23/24 , Anusuya Enclave, Jagtap Chowk
                  <br />
                  Wanowrie, Pune – 411040
                </a>
              </div>
            </div>

            <div className="ftl-contact-row">
              <Phone size={14} className="ftl-contact-ico" />
              <div className="ftl-contact-text">
                <a href="tel:+919028552855">+91 9028552855</a>
              </div>
            </div>

            <div className="ftl-contact-row">
              <Mail size={14} className="ftl-contact-ico" />
              <div className="ftl-contact-text">
                <a href="mailto:help@theuniformlab.in">help@theuniformlab.in</a>
              </div>
            </div>

            <div className="ftl-contact-row">
              <Clock size={14} className="ftl-contact-ico" />
              <div className="ftl-contact-text">
                9:30 AM – 7:00 PM
                <div className="ftl-contact-sub">
                  Tue – Sun &nbsp;·&nbsp; Monday Closed
                </div>
              </div>
            </div>
          </div>

          {/* ── Col 3 : Links ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0 24px",
            }}
          >
            <div>
              <div className="ftl-col-label">Explore</div>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                }}
              >
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="ftl-link">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="ftl-col-label">Schools</div>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                }}
              >
                {SCHOOL_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="ftl-link">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            marginTop: 40,
            paddingTop: 20,
            borderTop: "1px solid #1e293b",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "8px 24px",
            fontSize: 12,
            fontWeight: 500,
            color: "#94a3b8",
          }}
        >
              <span>
                © {year} The Uniform Lab. All rights reserved.
              </span>
          <span>Serving schools &amp; institutions across India.</span>
          <span>Designed &amp; developed by TheSocialKollab</span>
        </div>
      </div>
    </footer>
  );
}
