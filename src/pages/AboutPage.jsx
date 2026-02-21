import { Link } from 'react-router-dom';
import { Building2, Users, ShieldCheck, Factory, ArrowRight } from 'lucide-react';

const SPECIALISATIONS = [
  'School uniform manufacturing with consistent fabric and colour control',
  'Corporate uniform supply for offices, factories, and institutional teams',
  'Bulk uniform production and distribution with scalable processes',
  'On-campus uniform camps during admissions and reopening seasons',
  'Retail and e-commerce uniform distribution models',
  'Custom design and role-based uniform solutions',
];

const WHY_CHOOSE = [
  'System-Driven Operations with year-on-year consistency',
  'In-House Manufacturing Control for stronger accountability',
  'Scalable Production Capacity for single and multi-campus rollouts',
  'Reduced Administrative Burden through structured fulfilment models',
  'Transparent & Accountable Processes in tracking and documentation',
  'Long-Term Partnership Approach with institutions',
];

const QUALITY_POINTS = [
  'Fabric sourcing and standardisation for composition and colour stability',
  'Structured production workflow: pattern, cutting, stitching, finishing',
  'Multi-level quality checks: pre-production, mid-production, final stage',
  'Fit and size consistency through standardised measurement mapping',
  'Timely production planning aligned to academic and corporate cycles',
  'Traceability and accountability through documented production cycles',
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700;800&display=swap');
  .abp-root {
    min-height: 100vh;
    background: #f8faff;
    padding-top: 98px;
    padding-bottom: 64px;
    font-family: 'Nunito', sans-serif;
  }
  .abp-header { text-align: center; margin-bottom: 38px; }
  .abp-pill {
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
  .abp-h1 {
    margin: 0 0 12px;
    font-family: 'Baloo 2', cursive;
    font-size: clamp(32px, 4.1vw, 52px);
    line-height: 1.08;
    color: #1a1a2e;
  }
  .abp-h1 span { color: #2563eb; }
  .abp-sub {
    margin: 0 auto;
    max-width: 760px;
    color: #64748b;
    font-size: 15px;
    line-height: 1.7;
    font-weight: 600;
  }
  .abp-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 20px;
    margin-bottom: 20px;
  }
  .abp-card {
    background: #fff;
    border: 1px solid #e5edf9;
    border-radius: 18px;
    padding: 22px;
  }
  .abp-h2 {
    margin: 0 0 10px;
    color: #1e293b;
    font-family: 'Baloo 2', cursive;
    font-size: 25px;
    line-height: 1.16;
    font-weight: 800;
  }
  .abp-text {
    margin: 0;
    color: #475569;
    font-size: 14px;
    line-height: 1.72;
    font-weight: 600;
  }
  .abp-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 9px;
  }
  .abp-item {
    border: 1px solid #e6edf9;
    border-radius: 11px;
    background: #f9fbff;
    padding: 10px 12px;
    color: #475569;
    font-size: 13px;
    line-height: 1.55;
    font-weight: 700;
  }
  .abp-founder {
    border-top: 1px solid #e6edf9;
    margin-top: 12px;
    padding-top: 12px;
  }
  .abp-role {
    margin: 0 0 4px;
    color: #2563eb;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 700;
  }
  .abp-name {
    margin: 0 0 4px;
    color: #1e293b;
    font-family: 'Baloo 2', cursive;
    font-size: 21px;
    font-weight: 800;
  }
  .abp-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: #1a1a2e;
    font-size: 13px;
    font-weight: 800;
    margin-top: 12px;
  }
  .abp-link:hover { color: #2563eb; }
  @media (max-width: 767px) {
    .abp-root { padding-top: 90px; }
    .abp-grid { grid-template-columns: 1fr; }
    .abp-h2 { font-size: 23px; }
  }
`;

export default function AboutPage() {
  return (
    <>
      <style>{CSS}</style>
      <section className="abp-root">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="abp-header">
            <div className="abp-pill">
              <Building2 size={11} />
              About Uniform Lab
            </div>
            <h1 className="abp-h1">
              Process-Led Uniform Manufacturing
              <span> for Long-Term Reliability</span>
            </h1>
            <p className="abp-sub">
              The Uniform Lab is a system-driven school and corporate uniform manufacturer in Pune,
              built to deliver consistency, quality, and reliability at scale across India.
            </p>
          </header>

          <div className="abp-grid">
            <article className="abp-card">
              <h2 className="abp-h2">About Us</h2>
              <p className="abp-text">
                We specialise in designing, manufacturing, and distributing uniforms for schools,
                corporates, and institutions. With in-house production capabilities and structured
                quality control processes, we ensure fabric consistency, fit standardisation, and
                timely deliveries year after year. Our goal is to eliminate uniform-related stress
                for administrators, parents, and employees.
              </p>
            </article>
            <article className="abp-card">
              <h2 className="abp-h2">About Mota Group</h2>
              <p className="abp-text">
                The Uniform Lab operates under the legacy and discipline of the Mota Group, built
                on operational integrity, structured processes, and long-term partnerships.
              </p>
              <div className="abp-founder">
                <p className="abp-role">Founder</p>
                <p className="abp-name">Priyank Mota</p>
                <p className="abp-text">Focus on systems, scale, and structured growth.</p>
              </div>
              <div className="abp-founder">
                <p className="abp-role">Co-Founder</p>
                <p className="abp-name">Nivedita Mota</p>
                <p className="abp-text">Focus on experience design and customer-centric clarity.</p>
              </div>
            </article>
          </div>

          <div className="abp-grid">
            <article className="abp-card">
              <h2 className="abp-h2">Our Specialisations</h2>
              <ul className="abp-list">
                {SPECIALISATIONS.map((item) => (
                  <li className="abp-item" key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="abp-card" id="why-choose">
              <h2 className="abp-h2">
                <ShieldCheck size={17} style={{ marginRight: 8, verticalAlign: '-3px' }} />
                Why Choose The Uniform Lab
              </h2>
              <ul className="abp-list">
                {WHY_CHOOSE.map((item) => (
                  <li className="abp-item" key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <article className="abp-card" id="quality-control">
            <h2 className="abp-h2">
              <Factory size={17} style={{ marginRight: 8, verticalAlign: '-3px' }} />
              Manufacturing & Quality Control
            </h2>
            <ul className="abp-list">
              {QUALITY_POINTS.map((item) => (
                <li className="abp-item" key={item}>{item}</li>
              ))}
            </ul>
            <Link className="abp-link" to="/faqs">
              Explore all FAQs
              <ArrowRight size={14} />
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
