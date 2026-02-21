import { useState } from 'react';

export default function SchoolEnquiryPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <main className="min-h-screen bg-[var(--color-cream)] pt-[calc(7.5rem+env(safe-area-inset-top,0px))] sm:pt-[calc(8rem+env(safe-area-inset-top,0px))] pb-16 px-6 sm:px-8 lg:px-20 flex items-center justify-center">
        <div className="max-w-lg w-full text-center bg-white/90 border border-[var(--color-border)] rounded-3xl shadow-lg shadow-black/5 px-6 sm:px-10 py-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3">
            Thank you
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl text-[var(--color-navy)] mb-4">
            Our executive will get in touch with you shortly.
          </h1>
          <p className="text-[var(--color-text-muted)] text-sm">
            We&apos;ve received your enquiry and will reach out on the provided contact details to
            understand your school&apos;s uniform requirements.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-cream)] pt-[calc(7.5rem+env(safe-area-inset-top,0px))] sm:pt-[calc(8rem+env(safe-area-inset-top,0px))] pb-16 sm:pb-20 px-6 sm:px-8 lg:px-20">
      <section className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start lg:gap-14">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)] mb-2">
            For schools & colleges
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-[var(--color-navy)] mb-4">
            A uniform partner that thinks like a school.
          </h1>
          <p className="text-[var(--color-text-muted)] mb-5">
            The Uniform Lab brings an organized, technology-first approach to uniforms — from
            fabric sourcing and patterning to branding and home delivery for parents.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white border border-[var(--color-border)]/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)] mb-1">
                What we provide
              </p>
              <ul className="text-sm text-[var(--color-text-muted)] space-y-1.5">
                <li>• End-to-end uniform design and production</li>
                <li>• Seasonal wear – sports, winter, rain gear</li>
                <li>• Accessories – belts, ties, socks, caps</li>
                <li>• Branding – embroidery, printing, custom trims</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-[var(--color-cream-warm)] border border-[var(--color-border)]/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)] mb-1">
                Why schools choose us
              </p>
              <ul className="text-sm text-[var(--color-text-muted)] space-y-1.5">
                <li>• Consistent quality fabrics & stitching</li>
                <li>• Hassle-free parent ordering & returns</li>
                <li>• Young, responsive team based in Baramati</li>
                <li>• Long-term, process-driven partnerships</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white/95 border border-[var(--color-border)] rounded-3xl shadow-lg shadow-black/5 p-6 sm:p-8">
          <h2 className="font-serif text-xl text-[var(--color-navy)] mb-2">Share your details</h2>
          <p className="text-xs text-[var(--color-text-muted)] mb-6">
            Tell us a little about your institution and we&apos;ll get back to you with next steps.
          </p>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5">
                School / College name
              </label>
              <input
                required
                type="text"
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-navy)] focus:ring-1 focus:ring-[var(--color-navy)]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5">
                  Contact person email
                </label>
                <input
                  required
                  type="email"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-navy)] focus:ring-1 focus:ring-[var(--color-navy)]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5">
                  Contact number
                </label>
                <input
                  required
                  type="tel"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-navy)] focus:ring-1 focus:ring-[var(--color-navy)]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5">
                Message
              </label>
              <textarea
                required
                rows={4}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none resize-none focus:border-[var(--color-navy)] focus:ring-1 focus:ring-[var(--color-navy)]"
                placeholder="Share approximate student strength, current uniform setup, and what you're looking for."
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-navy)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-[var(--color-navy-light)] transition-colors"
            >
              Submit enquiry
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
