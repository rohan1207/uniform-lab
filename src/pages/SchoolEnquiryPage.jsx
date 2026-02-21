import { useState } from 'react';

/* Page styles — aligned with NewHero (Baloo 2, Nunito, #FAF3F0, blue pill CTA) */
const PAGE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700&display=swap');

  .school-enquiry-page {
    font-family: 'Nunito', sans-serif;
    background: #FAF3F0;
  }
  .school-enquiry-page .seq-heading {
    font-family: 'Baloo 2', cursive;
    font-weight: 800;
    color: #1a1a2e;
  }
  .school-enquiry-page .seq-label {
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    color: #64748b;
  }
  .school-enquiry-page input,
  .school-enquiry-page textarea {
    font-family: 'Nunito', sans-serif;
  }
  .school-enquiry-page input:focus,
  .school-enquiry-page textarea:focus {
    border-color: #004C99;
    box-shadow: 0 0 0 1px rgba(0,76,153,0.25);
    outline: none;
  }

  /* NewHero-style blue pill submit button */
  .seq-submit-btn {
    display: inline-flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 24px;
    border-radius: 9999px;
    border: 1px solid rgba(0,76,153,0.6);
    background: linear-gradient(180deg, #1a6bb8 0%, #004C99 50%, #003d7a 100%);
    box-shadow: 0 2px 8px rgba(0,76,153,0.25), inset 0 1px 0 rgba(255,255,255,0.15);
    color: #fff;
    font-family: 'Baloo 2', cursive;
    font-weight: 900;
    font-size: clamp(12px, 1.1vw, 14px);
    letter-spacing: 0.11em;
    text-transform: uppercase;
    text-shadow: 0 1px 0 rgba(0,0,0,0.2);
    cursor: pointer;
    transition: transform 0.1s ease, box-shadow 0.1s ease, filter 0.12s ease;
  }
  .seq-submit-btn:hover {
    filter: brightness(1.04);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,76,153,0.3), inset 0 1px 0 rgba(255,255,255,0.2);
  }
  .seq-submit-btn:active {
    transform: translateY(1px);
    box-shadow: 0 1px 4px rgba(0,76,153,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
  }
`;

export default function SchoolEnquiryPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <>
        <style>{PAGE_CSS}</style>
        <main className="school-enquiry-page min-h-screen pt-[calc(7.5rem+env(safe-area-inset-top,0px))] sm:pt-[calc(8rem+env(safe-area-inset-top,0px))] pb-16 px-6 sm:px-8 lg:px-20 flex items-center justify-center">
          <div className="max-w-lg w-full text-center bg-white/90 border border-[var(--color-border)] rounded-3xl shadow-lg shadow-black/5 px-6 sm:px-10 py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#004C99] mb-3" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Thank you
            </p>
            <h1 className="seq-heading text-2xl sm:text-3xl mb-4">
              Our executive will get in touch with you shortly.
            </h1>
            <p className="text-[var(--color-text-muted)] text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
              We&apos;ve received your enquiry and will reach out on the provided contact details to
              understand your school&apos;s uniform requirements.
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <style>{PAGE_CSS}</style>
      <main className="school-enquiry-page min-h-screen pt-[calc(7.5rem+env(safe-area-inset-top,0px))] sm:pt-[calc(8rem+env(safe-area-inset-top,0px))] pb-16 sm:pb-20 px-6 sm:px-8 lg:px-20">
        <section className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#004C99] mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
              For schools & colleges
            </p>
            <h1 className="seq-heading text-3xl sm:text-4xl mb-4">
              A uniform partner that thinks like a school.
            </h1>
            <p className="text-[var(--color-text-muted)] mb-5" style={{ fontFamily: "'Nunito', sans-serif" }}>
              The Uniform Lab brings an organized, technology-first approach to uniforms — from
              fabric sourcing and patterning to branding and home delivery for parents.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white border border-[var(--color-border)]/80 p-4">
                <p className="seq-label text-xs uppercase tracking-[0.18em] mb-1">
                  What we provide
                </p>
                <ul className="text-sm text-[var(--color-text-muted)] space-y-1.5" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  <li>• End-to-end uniform design and production</li>
                  <li>• Seasonal wear – sports, winter, rain gear</li>
                  <li>• Accessories – belts, ties, socks, caps</li>
                  <li>• Branding – embroidery, printing, custom trims</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-[var(--color-cream-warm)] border border-[var(--color-border)]/60 p-4">
                <p className="seq-label text-xs uppercase tracking-[0.18em] mb-1">
                  Why schools choose us
                </p>
                <ul className="text-sm text-[var(--color-text-muted)] space-y-1.5" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  <li>• Consistent quality fabrics & stitching</li>
                  <li>• Hassle-free parent ordering & returns</li>
                  <li>• Young, responsive team based in Baramati</li>
                  <li>• Long-term, process-driven partnerships</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/95 border border-[var(--color-border)] rounded-3xl shadow-lg shadow-black/5 p-6 sm:p-8">
            <h2 className="seq-heading text-xl mb-2">Share your details</h2>
            <p className="text-xs text-[var(--color-text-muted)] mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
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
                <label className="seq-label block text-xs mb-1.5">
                  School / College name
                </label>
                <input
                  required
                  type="text"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2.5 text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="seq-label block text-xs mb-1.5">
                    Contact person email
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="seq-label block text-xs mb-1.5">
                    Contact number
                  </label>
                  <input
                    required
                    type="tel"
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2.5 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="seq-label block text-xs mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2.5 text-sm resize-none"
                  placeholder="Share approximate student strength, current uniform setup, and what you're looking for."
                />
              </div>
              <button type="submit" className="seq-submit-btn mt-2">
                Submit enquiry
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
