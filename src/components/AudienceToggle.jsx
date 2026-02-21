import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, ArrowRight } from 'lucide-react';

export default function AudienceToggle() {
  const [active, setActive] = useState('parents');

  return (
    <section id="audience" className="py-20 sm:py-28 bg-[var(--color-cream)] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-navy)] text-center mb-4">
          Who are you?
        </h2>
        <p className="text-[var(--color-text-muted)] text-center max-w-xl mx-auto mb-12">
          Choose your path for a tailored experience.
        </p>

        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-[var(--color-cream-warm)] border border-[var(--color-border)] shadow-sm">
            <button
              type="button"
              onClick={() => setActive('parents')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                active === 'parents'
                  ? 'bg-white text-[var(--color-navy)] shadow'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-navy)]'
              }`}
            >
              <Users size={20} />
              Parents / Students
            </button>
            <button
              type="button"
              onClick={() => setActive('schools')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                active === 'schools'
                  ? 'bg-white text-[var(--color-navy)] shadow'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-navy)]'
              }`}
            >
              <GraduationCap size={20} />
              Schools / Colleges
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {active === 'parents' ? (
            <>
              <div className="bg-white rounded-2xl p-8 border border-[var(--color-border)] shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                  <Users className="text-[var(--color-accent)]" size={24} />
                </div>
                <h3 className="font-serif text-xl text-[var(--color-navy)] mb-2">Parents & Students</h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6">
                  Buy school uniforms online. Easy ordering, hassle-free returns, and reordering. We make the process time-saving and smooth.
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-[var(--color-accent)] font-medium text-sm hover:gap-3 transition-all"
                >
                  Shop uniforms <ArrowRight size={16} />
                </Link>
              </div>
              <div className="bg-[var(--color-navy)] rounded-2xl p-8 text-white">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <GraduationCap size={24} />
                </div>
                <h3 className="font-serif text-xl mb-2">Schools & Colleges</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Partner with us for bulk uniforms, custom designs, and branding. Long-lasting quality and organized supply.
                </p>
                <Link
                  to="/schools"
                  className="inline-flex items-center gap-2 text-amber-300 font-medium text-sm hover:gap-3 transition-all"
                >
                  Partner with us <ArrowRight size={16} />
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="bg-[var(--color-navy)] rounded-2xl p-8 text-white">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <Users size={24} />
                </div>
                <h3 className="font-serif text-xl mb-2">Parents & Students</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Buy school uniforms online. Easy ordering, hassle-free returns, and reordering.
                </p>
                <Link to="/shop" className="inline-flex items-center gap-2 text-amber-300 font-medium text-sm hover:gap-3 transition-all">
                  Shop uniforms <ArrowRight size={16} />
                </Link>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-[var(--color-border)] shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                  <GraduationCap className="text-[var(--color-accent)]" size={24} />
                </div>
                <h3 className="font-serif text-xl text-[var(--color-navy)] mb-2">Schools & Colleges</h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6">
                  Tie up with us for uniforms tailored to your institution. Custom designs, emblems, embroidery, and competitive prices.
                </p>
                <Link
                  to="/schools"
                  className="inline-flex items-center gap-2 text-[var(--color-accent)] font-medium text-sm hover:gap-3 transition-all"
                >
                  Partner with us <ArrowRight size={16} />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
