import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle } from 'lucide-react';

const FAQ_PREVIEW = [
  {
    q: 'Are you a school uniform manufacturer in Pune?',
    a: 'Yes. The Uniform Lab is a Pune-based school uniform manufacturer with in-house production capabilities.',
  },
  {
    q: 'Can you handle large bulk uniform orders?',
    a: 'Yes. Our production processes are designed for bulk manufacturing with scalable capacity and timeline discipline.',
  },
  {
    q: 'Do you organise uniform camps in schools?',
    a: 'Yes. We conduct on-campus uniform camps during admissions and reopening to reduce admin burden for schools.',
  },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  .faq-sec, .faq-sec * { font-family: 'Inter', sans-serif !important; }
  .faq-sec {
    background: #fff;
    padding: 88px 0 98px;
    font-family: 'Inter', sans-serif;
  }
  .faq-head { margin-bottom: 30px; }
  .faq-pill {
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
    box-shadow: 0 1px 8px rgba(37,99,235,0.10);
    border: 1px solid rgba(37,99,235,0.12);
    margin-bottom: 16px;
  }
  .faq-h2 {
    margin: 0 0 10px;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: clamp(30px, 3.4vw, 52px);
    line-height: 1.08;
    letter-spacing: -0.8px;
    color: #1a1a2e;
  }
  .faq-h2 span { color: #2563eb; }
  .faq-sub {
    margin: 0;
    max-width: 560px;
    color: #64748b;
    font-size: 15px;
    line-height: 1.68;
    font-weight: 500;
  }
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 900px;
    margin: 0 0 20px;
  }
  .faq-item {
    border: 1px solid #e6edf9;
    border-radius: 14px;
    background: #f8fbff;
    padding: 14px 16px;
  }
  .faq-q {
    margin: 0 0 6px;
    color: #1a1a2e;
    font-family: 'Inter', sans-serif;
    font-size: 17px;
    line-height: 1.2;
    font-weight: 700;
  }
  .faq-a {
    margin: 0;
    color: #64748b;
    font-size: 14px;
    line-height: 1.62;
    font-weight: 500;
  }
  .faq-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: clamp(12px, 1vw, 14px);
    letter-spacing: 0.11em;
    text-transform: uppercase;
    white-space: nowrap;
    padding: 12px 24px;
    border-radius: 9999px;
    border: 1px solid rgba(0,76,153,0.6);
    background: linear-gradient(180deg, #1a6bb8 0%, #004C99 50%, #003d7a 100%);
    box-shadow: 0 2px 8px rgba(0,76,153,0.25), inset 0 1px 0 rgba(255,255,255,0.15);
    text-shadow: 0 1px 0 rgba(0,0,0,0.2);
    transition: transform 0.1s ease, box-shadow 0.1s ease, filter 0.12s ease;
  }
  .faq-cta:hover {
    filter: brightness(1.04);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,76,153,0.3), inset 0 1px 0 rgba(255,255,255,0.2);
  }
  .faq-cta:active {
    transform: translateY(1px);
    box-shadow: 0 1px 4px rgba(0,76,153,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
  }
  .faq-cta-wrap { text-align: left; }
  @media (max-width: 767px) {
    .faq-sec { padding: 58px 0 68px; }
    .faq-q { font-size: 16px; }
    .faq-sub { font-size: 14px; }
  }
`;

export default function FAQSection() {
  return (
    <>
      <style>{CSS}</style>
      <section className="faq-sec" id="faqs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="faq-head">
            <div className="faq-pill">
              <HelpCircle size={11} />
              FAQs
            </div>
            <h2 className="faq-h2">
              Common Questions,
              <span> Clear Answers</span>
            </h2>
            <p className="faq-sub">
              A quick snapshot of our most asked operational and partnership questions.
            </p>
          </div>

          <div className="faq-list">
            {FAQ_PREVIEW.map((item) => (
              <article className="faq-item" key={item.q}>
                <h3 className="faq-q">{item.q}</h3>
                <p className="faq-a">{item.a}</p>
              </article>
            ))}
          </div>

          <div className="faq-cta-wrap">
            <Link className="faq-cta" to="/faqs">
              Read all FAQs
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
