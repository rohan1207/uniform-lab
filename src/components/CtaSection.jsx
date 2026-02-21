import { Link } from 'react-router-dom';

export default function CtaSection() {
  return (
    <section id="contact" className="py-20 sm:py-28 section-dark scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">
          Ready to get started?
        </h2>
        <p className="text-slate-300 mb-10">
          Whether you're a parent ordering uniforms or a school looking for a tie-up, we're here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[var(--color-accent)] text-white font-medium hover:bg-[var(--color-accent-light)] transition-all premium-cta-button"
          >
            Shop as parent
          </Link>
          <Link
            to="/schools"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:text-[var(--color-navy)] transition-all premium-cta-button"
          >
            Partner as school / college
          </Link>
        </div>
      </div>
    </section>
  );
}
