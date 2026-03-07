import { Link } from "react-router-dom";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  .corp-root, .corp-root * { font-family: 'Inter', sans-serif !important; }
  .corp-root {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    background: #f8faff;
    padding: 40px 24px;
  }
  .corp-title {
    font-size: clamp(28px, 4vw, 48px);
    font-weight: 800; color: #1a1a2e;
    letter-spacing: -0.8px; margin: 0 0 16px;
  }
  .corp-sub {
    font-size: 16px; font-weight: 500;
    color: #64748b; margin: 0 0 32px;
  }
  .corp-back {
    color: #2563eb; font-size: 14px; font-weight: 600;
    text-decoration: none;
  }
  .corp-back:hover { text-decoration: underline; }
`;

export default function CorporatePage() {
  return (
    <>
      <style>{CSS}</style>
      <div className="corp-root">
        <h1 className="corp-title">Corporate Uniform Solutions</h1>
        <p className="corp-sub">
          Our corporate uniform service is coming soon.
        </p>
        <Link to="/" className="corp-back">
          ← Back to Home
        </Link>
      </div>
    </>
  );
}
