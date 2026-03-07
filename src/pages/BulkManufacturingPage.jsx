import { Link } from "react-router-dom";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  .bulk-root, .bulk-root * { font-family: 'Inter', sans-serif !important; }
  .bulk-root {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    background: #f8f7ff;
    padding: 40px 24px;
  }
  .bulk-title {
    font-size: clamp(28px, 4vw, 48px);
    font-weight: 800; color: #1a1a2e;
    letter-spacing: -0.8px; margin: 0 0 16px;
  }
  .bulk-sub {
    font-size: 16px; font-weight: 500;
    color: #64748b; margin: 0 0 32px;
  }
  .bulk-back {
    color: #6366f1; font-size: 14px; font-weight: 600;
    text-decoration: none;
  }
  .bulk-back:hover { text-decoration: underline; }
`;

export default function BulkManufacturingPage() {
  return (
    <>
      <style>{CSS}</style>
      <div className="bulk-root">
        <h1 className="bulk-title">Bulk Manufacturing & Distribution</h1>
        <p className="bulk-sub">Our bulk manufacturing service is coming soon.</p>
        <Link to="/" className="bulk-back">← Back to Home</Link>
      </div>
    </>
  );
}
