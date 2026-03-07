import { ArrowLeft, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  .ep-page, .ep-page * { font-family: 'Inter', sans-serif !important; }
  .ep-page {
    background: #f8fbff;
    min-height: 100vh;
    padding: 64px 0 96px;
  }
  .ep-hero {
    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
    padding: 56px 24px 52px;
    text-align: center;
    margin-bottom: 48px;
  }
  .ep-pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 16px;
    border-radius: 999px;
    background: rgba(59,130,246,0.15);
    border: 1px solid rgba(59,130,246,0.3);
    color: #93c5fd;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .ep-hero-h1 {
    margin: 0 0 14px;
    color: #fff;
    font-size: clamp(28px, 4vw, 46px);
    font-weight: 800;
    letter-spacing: -0.8px;
    line-height: 1.1;
  }
  .ep-hero-h1 span { color: #60a5fa; }
  .ep-hero-sub {
    margin: 0 auto;
    max-width: 580px;
    color: #94a3b8;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.7;
  }
  .ep-back {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: #2563eb;
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    margin-bottom: 32px;
    transition: color 0.15s;
  }
  .ep-back:hover { color: #1d4ed8; }
  .ep-wrap {
    max-width: 820px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .ep-card {
    background: #fff;
    border: 1px solid #e2eaf8;
    border-radius: 20px;
    padding: 36px 40px;
    margin-bottom: 20px;
    box-shadow: 0 2px 20px rgba(37,99,235,0.06);
  }
  .ep-section-title {
    font-size: 18px;
    font-weight: 800;
    color: #1a1a2e;
    margin: 0 0 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid #eff6ff;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ep-section-title-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #2563eb;
    flex-shrink: 0;
  }
  .ep-intro {
    font-size: 15px;
    color: #374151;
    line-height: 1.75;
    margin: 0 0 16px;
    font-weight: 500;
  }
  .ep-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .ep-list li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 14px;
    color: #475569;
    line-height: 1.7;
    font-weight: 500;
  }
  .ep-list li::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #3b82f6;
    flex-shrink: 0;
    margin-top: 8px;
  }
  .ep-para {
    font-size: 14px;
    color: #475569;
    line-height: 1.75;
    margin: 0 0 10px;
    font-weight: 500;
  }
  .ep-para:last-child { margin-bottom: 0; }
  .ep-highlight {
    background: #eff6ff;
    border-left: 3px solid #2563eb;
    border-radius: 0 10px 10px 0;
    padding: 12px 16px;
    font-size: 14px;
    color: #1e40af;
    font-weight: 600;
    margin: 14px 0 0;
    line-height: 1.6;
  }
  .ep-email {
    color: #2563eb;
    font-weight: 700;
    text-decoration: none;
  }
  .ep-email:hover { text-decoration: underline; }
  .ep-notice {
    background: linear-gradient(135deg, #fef9c3 0%, #fef3c7 100%);
    border: 1px solid #fcd34d;
    border-radius: 14px;
    padding: 16px 20px;
    font-size: 13.5px;
    color: #92400e;
    font-weight: 600;
    line-height: 1.6;
    margin-bottom: 20px;
  }
  @media (max-width: 767px) {
    .ep-card { padding: 24px 20px; }
    .ep-hero { padding: 44px 20px 40px; }
  }
`;

export default function ExchangePolicyPage() {
  return (
    <>
      <style>{CSS}</style>
      <div className="ep-page">
        {/* Hero */}
        <div className="ep-hero">
          <div className="ep-pill">
            <RefreshCw size={11} />
            Policy
          </div>
          <h1 className="ep-hero-h1">
            Exchange &amp; <span>Return Policy</span>
          </h1>
          <p className="ep-hero-sub">
            At Uniform Lab, we ensure you a hassle-free shopping experience,
            where you can confidently make purchases.
          </p>
        </div>

        <div className="ep-wrap">
          <Link to="/" className="ep-back">
            <ArrowLeft size={14} /> Back to Home
          </Link>

          {/* Quick notice */}
          <div className="ep-notice">
            ⚠️ Please note: <strong>Returns are not accepted</strong>. For
            uniforms, only exchange requests will be considered. We have a{" "}
            <strong>7-day exchange window</strong> from the date of delivery.
          </div>

          {/* General Policy */}
          <div className="ep-card">
            <div className="ep-section-title">
              <span className="ep-section-title-dot" />
              General Exchange Policy
            </div>
            <ul className="ep-list">
              <li>In case of uniforms, ONLY EXCHANGE requests will be considered.</li>
              <li>The exchange will be done for extra charges.</li>
              <li>
                For exchange requests for a higher or lower size, a convenience
                fee will apply along with any difference in amount payable on
                account of the size change.
              </li>
              <li>
                The product to be exchanged must be returned in its original
                condition within <strong>7 days of delivery</strong>.
              </li>
              <li>
                Please ensure clothes are not used, altered, washed, soiled, or
                damaged. Retain original tags and accessories (buttons etc.).
              </li>
              <li>
                Branded packaging should be intact and returned in a safe
                condition with the product.
              </li>
              <li>Damage due to misuse of product is not covered under this policy.</li>
              <li>Socks and clothing freebies are ineligible for exchange.</li>
              <li>Products with tampered or missing serial numbers are not eligible.</li>
              <li>
                Replacement can be for the full product or part(s) of the
                product, subject to availability.
              </li>
            </ul>
          </div>

          {/* Initiation */}
          <div className="ep-card">
            <div className="ep-section-title">
              <span className="ep-section-title-dot" />
              How to Initiate an Exchange
            </div>
            <p className="ep-para">
              Exchange can be initiated by contacting us at{" "}
              <a className="ep-email" href="mailto:help@theuniformlab.in">
                help@theuniformlab.in
              </a>
              . If your exchange is accepted, we will send you the instructions
              — you can either bring the product to our shop or ship it back to
              us.
            </p>
            <p className="ep-para">
              Items sent back to us without first requesting an exchange will
              not be accepted. Once received, the product will be checked before
              any further action is taken.
            </p>
            <ul className="ep-list" style={{ marginTop: 12 }}>
              <li>We have a 7-day exchange policy from the date of receiving your item.</li>
              <li>Exchanges are only possible for a size change in the same product.</li>
              <li>
                Your item must be in the same condition as received — unworn,
                unused, with tags, and in its original packaging.
              </li>
              <li>You'll also need the receipt or proof of purchase.</li>
            </ul>
            <div className="ep-highlight">
              Contact us anytime at{" "}
              <a className="ep-email" href="mailto:help@theuniformlab.in">
                help@theuniformlab.in
              </a>{" "}
              for any exchange-related questions.
            </div>
          </div>

          {/* Damages */}
          <div className="ep-card">
            <div className="ep-section-title">
              <span className="ep-section-title-dot" />
              Damages &amp; Issues
            </div>
            <p className="ep-para">
              Please inspect your order upon reception and contact us
              immediately if the item is defective, damaged, or if you receive
              the wrong item, so that we can evaluate the issue and make it
              right.
            </p>
          </div>

          {/* Exceptions */}
          <div className="ep-card">
            <div className="ep-section-title">
              <span className="ep-section-title-dot" />
              Exceptions / Non-Returnable Items
            </div>
            <p className="ep-para">
              Certain types of items cannot be returned or exchanged:
            </p>
            <ul className="ep-list">
              <li>Custom products (special orders, personalized items, hemmed pants).</li>
              <li>Personal care goods (such as beauty products).</li>
              <li>Customized products and wholesale orders.</li>
              <li>Sale items — we cannot accept returns or exchanges on sale items.</li>
            </ul>
            <p className="ep-para" style={{ marginTop: 12 }}>
              Please get in touch if you have questions or concerns about your
              specific item.
            </p>
          </div>

          {/* Exchanges detail */}
          <div className="ep-card">
            <div className="ep-section-title">
              <span className="ep-section-title-dot" />
              Exchange Process
            </div>
            <ul className="ep-list">
              <li>Exchange is accepted only for size change within 7 days of receiving the product.</li>
              <li>
                The fastest way is to return the item at our physical store and
                pick up the required size.
              </li>
              <li>
                Alternatively, ship the goods back to us and we will ship the
                required size back to you. Shipping charges are borne by the
                customer.
              </li>
            </ul>
            <div className="ep-highlight">
              Exchange questions?{" "}
              <a className="ep-email" href="mailto:help@theuniformlab.in">
                help@theuniformlab.in
              </a>
            </div>
          </div>

          {/* Refunds */}
          <div className="ep-card">
            <div className="ep-section-title">
              <span className="ep-section-title-dot" />
              Refunds
            </div>
            <p className="ep-para">
              <strong>Goods once purchased will not be refunded.</strong>
            </p>
            <p className="ep-para">
              For any refund-related queries, contact us at{" "}
              <a className="ep-email" href="mailto:help@theuniformlab.in">
                help@theuniformlab.in
              </a>
              .
            </p>
          </div>

          {/* Shipping Policy */}
          <div className="ep-card">
            <div className="ep-section-title">
              <span className="ep-section-title-dot" />
              Shipping Policy
            </div>
            <ul className="ep-list">
              <li>
                To ensure timely delivery, please provide accurate details:
                delivery address, name, and contact number of the addressee.
              </li>
              <li>Please allow <strong>2–3 working days</strong> for your order to be dispatched.</li>
              <li>
                Orders cannot be shipped to PO boxes or military addresses.
                Rural domestic addresses may require one or more additional days.
              </li>
              <li>
                For customization, personalized, or pre-ordered products,
                delivery timelines will be mentioned with the product details
                and will require additional time.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
