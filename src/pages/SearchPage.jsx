import { useMemo, useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { ProductCard } from '@/components/schools/ProductCard';
import { getAllSchoolSlugs, getSchoolCatalog } from '@/data/schoolCatalog';

const FONT_HEADING = { fontFamily: "'Baloo 2', cursive" };
const FONT_BODY = { fontFamily: "'Nunito', sans-serif" };

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const allProducts = useMemo(() => {
    const slugs = getAllSchoolSlugs();
    const items = [];
    slugs.forEach((slug) => {
      const catalog = getSchoolCatalog(slug);
      if (!catalog?.categories) return;
      catalog.categories.forEach((cat) => {
        cat.products?.forEach((p) => {
          items.push({
            id: `${catalog.slug}:${p.id}`,
            product: p,
            schoolSlug: catalog.slug,
            schoolName: catalog.name,
            categoryName: cat.name,
          });
        });
      });
    });
    return items;
  }, []);

  const trimmed = query.trim();
  const results = useMemo(() => {
    if (!trimmed) return allProducts;
    const q = trimmed.toLowerCase();
    return allProducts.filter(({ product, schoolName, categoryName }) => {
      const haystack = [
        product.name,
        String(product.price ?? ''),
        schoolName,
        categoryName,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [allProducts, trimmed]);

  return (
    <main
      className="min-h-screen bg-[var(--page-bg)] pt-24 px-4 sm:px-6"
      style={FONT_BODY}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;600;700&display=swap');`}</style>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] mb-1"
            style={FONT_HEADING}
          >
            Search uniforms &amp; schools
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Type a product, category, or school name. We’ll show matching
            uniforms across all partner schools.
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <div className="relative rounded-2xl bg-white border border-[var(--color-border)] shadow-sm flex items-center px-3 py-2 sm:px-4 sm:py-3 gap-2">
            <SearchIcon className="text-[#64748b]" size={18} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for ‘white shirt’, ‘sports shoes’, ‘Bharati’, ‘Orbis’…"
              className="flex-1 bg-transparent outline-none text-sm sm:text-base text-slate-900 placeholder:text-slate-400"
            />
            {trimmed && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="flex items-center justify-center w-7 h-7 rounded-full border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                aria-label="Clear search"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Helper text */}
          <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-500">
            <span className="uppercase tracking-[0.12em] font-semibold text-slate-400">
              Try:
            </span>
            {['White shirt', 'Track pant', 'Sports', 'Bharati', 'Orbis'].map(
              (example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setQuery(example)}
                  className="px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50 hover:bg-[#eef5ff] text-[11px] font-semibold text-slate-600"
                >
                  {example}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Results summary */}
        <div className="flex items-baseline justify-between mb-4 gap-2">
          <p className="text-xs sm:text-sm text-slate-500">
            {trimmed ? (
              <>
                Showing{' '}
                <span className="font-semibold text-slate-700">
                  {results.length}
                </span>{' '}
                matches for{' '}
                <span className="font-semibold text-slate-800">
                  “{trimmed}”
                </span>
              </>
            ) : (
              <>
                Showing{' '}
                <span className="font-semibold text-slate-700">
                  {results.length}
                </span>{' '}
                uniforms from all schools
              </>
            )}
          </p>
        </div>

        {/* Results grid */}
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-[var(--color-border)] bg-white text-center">
            <div className="mb-3 text-slate-300">
              <SearchIcon size={36} />
            </div>
            <p
              className="mb-2 font-black text-[#1a1a2e]"
              style={FONT_HEADING}
            >
              No uniforms found
            </p>
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] max-w-sm">
              Try a broader term (for example just the school name or product
              type), or check your spelling.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {results.map((item) => (
              <ProductCard
                key={item.id}
                product={item.product}
                schoolName={item.schoolName}
                schoolSlug={item.schoolSlug}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

