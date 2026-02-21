import { Suspense } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getProduct } from '@/data/productLookup';
import { ProductDetailTemplate } from '@/components/product/ProductDetailTemplate';
import { ArrowLeft } from 'lucide-react';

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700&display=swap');
`;

/* ── Loading skeleton ───────────────────────────────────────────────────── */
function LoadingState() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <main
        className="min-h-screen flex items-center justify-center"
        style={{ background: '#f8f9fb', fontFamily: "'Nunito', sans-serif" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 rounded-full border-[3px] border-[#e2e8f0] border-t-[#2563eb] animate-spin"
            style={{ boxShadow: '0 4px 14px rgba(37,99,235,0.14)' }}
          />
          <p
            className="text-[#0f172a]"
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 900,
              fontSize: 'clamp(15px, 1.4vw, 20px)',
              letterSpacing: '-0.2px',
            }}
          >
            Loading product…
          </p>
          <p
            className="text-[#94a3b8]"
            style={{ fontSize: '13px', fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}
          >
            Hang tight, fetching the details ✦
          </p>
        </div>
      </main>
    </>
  );
}

/* ── Not found state ────────────────────────────────────────────────────── */
function NotFoundState() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <main
        className="min-h-screen flex items-center justify-center px-6 py-24"
        style={{ background: '#f8f9fb', fontFamily: "'Nunito', sans-serif" }}
      >
        <div className="text-center max-w-sm mx-auto">

          {/* Icon bubble */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{
              background: '#fff',
              border: '1px solid #e8ecf1',
              boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
              fontSize: '36px',
            }}
          >
            🔍
          </div>

          {/* Heading */}
          <h1
            className="m-0 text-[#0f172a] leading-tight mb-2"
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 900,
              fontSize: 'clamp(22px, 2.6vw, 32px)',
              letterSpacing: '-0.3px',
            }}
          >
            Product Not Found
          </h1>

          {/* Subtext */}
          <p
            className="text-[#94a3b8] mb-7 leading-snug"
            style={{ fontSize: '14px', fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}
          >
            This product may have been removed or the link is incorrect.
          </p>

          {/* Divider */}
          <div
            className="mx-auto mb-7"
            style={{
              height: '1px',
              width: '48px',
              borderRadius: '99px',
              background: '#e2e8f0',
            }}
          />

          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-bold text-white rounded-xl px-6 py-3"
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 900,
              fontSize: '13px',
              background: 'linear-gradient(180deg, #60a5fa 0%, #2563eb 52%, #1d4ed8 100%)',
              boxShadow: '0 5px 0 0 #1e3a8a, inset 0 1px 0 rgba(255,255,255,0.35)',
              textDecoration: 'none',
              letterSpacing: '0.03em',
              transition: 'transform 0.1s ease, box-shadow 0.1s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 7px 0 0 #1e3a8a, inset 0 1px 0 rgba(255,255,255,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 5px 0 0 #1e3a8a, inset 0 1px 0 rgba(255,255,255,0.35)'; }}
          >
            <ArrowLeft size={15} strokeWidth={2.5} />
            Back to Home
          </Link>

        </div>
      </main>
    </>
  );
}

/* ── Page content ───────────────────────────────────────────────────────── */
function ProductPageContent() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const schoolSlug = searchParams?.get('school') ?? undefined;

  const data = id ? getProduct(id, schoolSlug) : null;

  if (!data) return <NotFoundState />;

  const initialColor = searchParams?.get('color') ?? undefined;
  return (
    <ProductDetailTemplate
      product={data.product}
      schoolName={data.schoolName}
      schoolSlug={data.schoolSlug}
      initialColor={initialColor}
    />
  );
}

/* ── Export ─────────────────────────────────────────────────────────────── */
export default function ProductPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ProductPageContent />
    </Suspense>
  );
}
