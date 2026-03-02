import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

const footerLinks = {
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Size Guide', href: '/size-guide' },
  ],
  schools: [
    { label: 'Shop by Schools', href: '/schools' },
    { label: 'Partner with Us', href: '/schoolenquiry' },
  ],
};

const FONT_HEADING = { fontFamily: "'Baloo 2', cursive" };
const FONT_BODY = { fontFamily: "'Nunito', sans-serif" };

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-white" style={{ background: '#020617' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700&display=swap');`}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" style={FONT_BODY}>
        {/* Top border accent */}
        <div className="h-px w-full mb-8" style={{ background: 'linear-gradient(90deg, transparent, #1d4ed8 20%, #facc15 50%, transparent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand / summary */}
          <div className="lg:col-span-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span
                className="text-[10px] font-semibold tracking-[0.16em] uppercase text-slate-300"
                style={FONT_BODY}
              >
                Uniform Lab
              </span>
            </div>
            <h3
              className="text-2xl sm:text-3xl font-black text-white"
              style={FONT_HEADING}
            >
              The Uniform Lab
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Our aim is to make the child or person whoever is wearing the uniform look smart, feel
              comfortable and take pride in it. Uniform must not be the cage of fabric but the
              comfort of clothing.
            </p>
            <div className="space-y-2 text-sm text-slate-300">
              <p className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                  <MapPin size={16} />
                </span>
                <span>Pune, Maharashtra, India</span>
              </p>
              <a
                href="mailto:help@theuniformlab.in"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                  <Mail size={16} />
                </span>
                <span>help@theuniformlab.in</span>
              </a>
              <a
                href="tel:+919028552855"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                  <Phone size={16} />
                </span>
                <span>+91 9028552855</span>
              </a>
            </div>
          </div>

          {/* Columns */}
          <div>
            <h4
              className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-300 mb-4"
              style={FONT_BODY}
            >
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-300 hover:text-white transition-colors text-sm font-semibold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-300 mb-4"
              style={FONT_BODY}
            >
              Schools
            </h4>
            <ul className="space-y-2">
              {footerLinks.schools.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-300 hover:text-white transition-colors text-sm font-semibold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-700/60 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-sm text-slate-500">
          <p className="m-0">
            © {year} The Uniform Lab. All rights reserved.
          </p>
          <p className="m-0">
            Serving schools and institutions across India.
          </p>
        </div>

        <p className="mt-4 text-center text-[11px] sm:text-xs text-slate-600">
          Designed &amp; developed by TheSocialKollab
        </p>
      </div>
    </footer>
  );
}
