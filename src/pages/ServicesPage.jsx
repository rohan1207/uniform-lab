import { Settings, Building2, BriefcaseBusiness, Boxes, Truck } from 'lucide-react';

const SERVICES = [
  {
    icon: Building2,
    title: 'School Uniform Manufacturing',
    points: [
      'Custom uniform design aligned with school identity',
      'Fabric sourcing with colour stability control',
      'Standardised size charts and fit consistency',
      'Bulk production planning aligned with academic calendars',
      'Admission-season uniform readiness',
    ],
  },
  {
    icon: BriefcaseBusiness,
    title: 'Corporate Uniform Solutions',
    points: [
      'Role-based uniform design',
      'Logo embroidery and branding',
      'Durable fabric selection for industrial environments',
      'Scalable production for multi-location teams',
      'Structured bulk order management',
    ],
  },
  {
    icon: Boxes,
    title: 'Bulk Uniform Manufacturing',
    points: [
      'Centralised production planning',
      'Batch consistency control',
      'Quality checks at multiple stages',
      'Timely bulk dispatch',
      'Predictable output for institutional operations',
    ],
  },
  {
    icon: Truck,
    title: 'Distribution & Fulfilment Models',
    points: [
      'On-campus uniform camps during admissions and reopening',
      'Retail store support for direct purchases',
      'E-commerce ordering for parents and employees',
      'Structured corporate dispatch models',
      'Reduced administrative burden for institutions',
    ],
  },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700;800&display=swap');
  .svp-root {
    min-height: 100vh;
    background: #fff;
    padding-top: 98px;
    padding-bottom: 64px;
    font-family: 'Nunito', sans-serif;
  }
  .svp-head { text-align: center; margin-bottom: 34px; }
  .svp-pill {
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
  .svp-h1 {
    margin: 0 0 10px;
    color: #1a1a2e;
    font-family: 'Baloo 2', cursive;
    font-size: clamp(32px, 4vw, 50px);
    line-height: 1.08;
    letter-spacing: -0.4px;
  }
  .svp-h1 span { color: #2563eb; }
  .svp-sub {
    margin: 0 auto;
    max-width: 760px;
    color: #64748b;
    font-size: 15px;
    line-height: 1.7;
    font-weight: 600;
  }
  .svp-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
  .svp-card {
    border: 1px solid #e5edf9;
    border-radius: 18px;
    background: #f9fbff;
    padding: 20px;
  }
  .svp-icon {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2563eb;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    margin-bottom: 10px;
  }
  .svp-h2 {
    margin: 0 0 10px;
    font-family: 'Baloo 2', cursive;
    font-size: 24px;
    line-height: 1.2;
    color: #1e293b;
    font-weight: 800;
  }
  .svp-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .svp-item {
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    background: #fff;
    padding: 9px 11px;
    color: #475569;
    font-size: 13px;
    line-height: 1.55;
    font-weight: 700;
  }
  @media (max-width: 767px) {
    .svp-root { padding-top: 90px; }
    .svp-grid { grid-template-columns: 1fr; }
    .svp-h2 { font-size: 22px; }
  }
`;

export default function ServicesPage() {
  return (
    <>
      <style>{CSS}</style>
      <section className="svp-root">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="svp-head">
            <div className="svp-pill">
              <Settings size={11} />
              Our Services
            </div>
            <h1 className="svp-h1">
              End-to-End Uniform
              <span> Manufacturing & Distribution</span>
            </h1>
            <p className="svp-sub">
              We provide complete services for schools, corporates, and institutions with a focus
              on consistency, scalability, and operational ease.
            </p>
          </header>

          <div className="svp-grid">
            {SERVICES.map(({ icon: Icon, title, points }) => (
              <article className="svp-card" key={title}>
                <div className="svp-icon">
                  <Icon size={18} />
                </div>
                <h2 className="svp-h2">{title}</h2>
                <ul className="svp-list">
                  {points.map((point) => (
                    <li className="svp-item" key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
