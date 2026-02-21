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
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700;800&display=swap');
  .faq-sec {
    background: #fff;
    padding: 88px 0 98px;
    font-family: 'Nunito', sans-serif;
  }
  .faq-head { text-align: center; margin-bottom: 30px; }
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
    margin-bottom: 16px;
  }
  .faq-h2 {
    margin: 0 0 10px;
    font-family: 'Baloo 2', cursive;
    font-size: clamp(28px, 3.3vw, 42px);
    line-height: 1.12;
    color: #1a1a2e;
  }
  .faq-h2 span { color: #2563eb; }
  .faq-sub {
    margin: 0 auto;
    max-width: 620px;
    color: #64748b;
    font-size: 15px;
    line-height: 1.68;
    font-weight: 600;
  }
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 900px;
    margin: 0 auto 20px;
  }
  .faq-item {
    border: 1px solid #e6edf9;
    border-radius: 14px;
    background: #f8fbff;
    padding: 14px 16px;
  }
  .faq-q {
    margin: 0 0 6px;
    color: #1e293b;
    font-family: 'Baloo 2', cursive;
    font-size: 20px;
    line-height: 1.2;
    font-weight: 800;
  }
  .faq-a {
    margin: 0;
    color: #64748b;
    font-size: 14px;
    line-height: 1.62;
    font-weight: 600;
  }
  .faq-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: #1a1a2e;
    font-size: 14px;
    font-weight: 800;
  }
  .faq-cta:hover { color: #2563eb; }
  .faq-cta-wrap { text-align: center; }
  @media (max-width: 767px) {
    .faq-sec { padding: 58px 0 68px; }
    .faq-q { font-size: 19px; }
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
