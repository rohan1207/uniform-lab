import { HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'Are you a school uniform manufacturer in Pune?',
    a: 'Yes. The Uniform Lab is a Pune-based school uniform manufacturer with in-house production capabilities, serving institutions in Maharashtra and across India.',
  },
  {
    q: 'Do you manufacture uniforms in-house or outsource production?',
    a: 'We operate with structured manufacturing oversight and controlled production processes to maintain consistency, fit standardisation, and quality at scale.',
  },
  {
    q: 'What types of uniforms do you specialise in?',
    a: 'We specialise in school uniforms, corporate uniforms, industrial and factory uniforms, institutional uniforms, and custom-designed bulk uniforms.',
  },
  {
    q: 'Do you provide customised uniform designs for schools?',
    a: 'Yes. We create customised designs aligned with school identity, colour palette, and practical requirements while maintaining long-term consistency.',
  },
  {
    q: 'Can you handle large bulk uniform orders?',
    a: 'Yes. Our production systems are designed for bulk manufacturing with scalable capacity and timeline discipline.',
  },
  {
    q: 'Do you organise uniform distribution camps in schools?',
    a: 'Yes. We conduct on-campus uniform camps during admissions and reopening seasons to reduce administrative load for schools.',
  },
  {
    q: 'Do you offer e-commerce ordering for parents or employees?',
    a: 'Yes. We support online ordering models along with retail store access for structured and convenient fulfilment.',
  },
  {
    q: 'How do you ensure quality consistency every year?',
    a: 'We follow controlled fabric sourcing, standardised size charts, structured workflows, and multi-level quality checks across stages.',
  },
  {
    q: 'Do you supply uniforms to corporates and industrial units?',
    a: 'Yes. We provide role-based customisation, branding, and scalable supply models for offices, factories, and institutional teams.',
  },
  {
    q: 'What makes The Uniform Lab different from other uniform suppliers?',
    a: 'We operate as a system-driven manufacturing partner focused on process discipline, predictable timelines, and long-term institutional partnerships.',
  },
  {
    q: 'Can you manage uniforms for multiple school branches or corporate locations?',
    a: 'Yes. Our production and distribution systems are structured for multi-location institutions and phased rollouts.',
  },
  {
    q: 'How can schools or corporates partner with The Uniform Lab?',
    a: 'Institutions can contact us through the website or visit our retail store in Wanowrie, Pune for pilot engagements and onboarding discussions.',
  },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700;800&display=swap');
  .fqp-root {
    min-height: 100vh;
    background: #f8faff;
    padding-top: 98px;
    padding-bottom: 64px;
    font-family: 'Nunito', sans-serif;
  }
  .fqp-head { text-align: center; margin-bottom: 34px; }
  .fqp-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 16px;
    border-radius: 999px;
    background: linear-gradient(135deg, #eef5ff 0%, #ddeaff 100%);
    color: #2563eb;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  .fqp-h1 {
    margin: 0 0 10px;
    color: #1a1a2e;
    font-family: 'Baloo 2', cursive;
    font-size: clamp(32px, 4vw, 50px);
    line-height: 1.08;
    letter-spacing: -0.4px;
  }
  .fqp-sub {
    margin: 0 auto;
    max-width: 740px;
    color: #64748b;
    font-size: 15px;
    line-height: 1.7;
    font-weight: 600;
  }
  .fqp-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 980px;
    margin: 0 auto;
  }
  .fqp-item {
    border: 1px solid #e5edf9;
    border-radius: 14px;
    background: #fff;
    padding: 14px 16px;
  }
  .fqp-q {
    margin: 0 0 6px;
    color: #1e293b;
    font-family: 'Baloo 2', cursive;
    font-size: 23px;
    line-height: 1.18;
    font-weight: 800;
  }
  .fqp-a {
    margin: 0;
    color: #64748b;
    font-size: 14px;
    line-height: 1.64;
    font-weight: 600;
  }
  @media (max-width: 767px) {
    .fqp-root { padding-top: 90px; }
    .fqp-q { font-size: 20px; }
    .fqp-sub { font-size: 14px; }
  }
`;

export default function FAQPage() {
  return (
    <>
      <style>{CSS}</style>
      <section className="fqp-root">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="fqp-head">
            <div className="fqp-pill">
              <HelpCircle size={11} />
              FAQs
            </div>
            <h1 className="fqp-h1">Frequently Asked Questions</h1>
            <p className="fqp-sub">
              Answers to common school and corporate uniform manufacturing, quality, and distribution queries.
            </p>
          </header>

          <div className="fqp-list">
            {FAQS.map(({ q, a }) => (
              <article className="fqp-item" key={q}>
                <h2 className="fqp-q">{q}</h2>
                <p className="fqp-a">{a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
