import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

const footerLinks = {
  shop: [
    { label: 'School Uniforms', href: '/shop/school' },
    { label: 'Accessories', href: '/shop/accessories' },
    { label: 'Corporate', href: '/shop/corporate' },
  ],
  company: [
    { label: 'About Us', href: '/#about' },
    { label: 'Latest Collection', href: '/home#collection' },
    { label: 'The Brains', href: '/#team' },
    { label: 'Contact', href: '/#contact' },
  ],
  partners: [
    { label: 'For Schools & Colleges', href: '/schools' },
    { label: 'For Parents', href: '/shop' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl text-white mb-4">The Uniform Lab</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Comfort and luxury of Uniforms, Redefined. Baramati-based. Your convenience is our priority.
            </p>
            <div className="space-y-2 text-sm text-slate-300">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="shrink-0" />
                Baramati, India
              </p>
              <a href="mailto:info@theuniformlab.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={16} className="shrink-0" />
                info@theuniformlab.com
              </a>
              <a href="tel:+91" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={16} className="shrink-0" />
                Contact for enquiries
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-slate-300 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-slate-300 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">Partners</h4>
            <ul className="space-y-2">
              {footerLinks.partners.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-slate-300 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} The Uniform Lab. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Proudly based in Baramati, India.
          </p>
        </div>

        <p className="mt-6 text-center text-slate-500 text-sm">
          Designed and developed by TheSocialKollab
        </p>
      </div>
    </footer>
  );
}
