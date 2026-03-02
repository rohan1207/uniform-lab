import { useMemo, useState, useCallback, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { ProductCard } from '@/components/schools/ProductCard';
import { QuickShopDrawer } from '@/components/schools/QuickShopDrawer';
import { ArrowLeft, ShoppingBag, Search, X } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

/* ─────────────────────────────────────────────────────────────────────────
   STYLES
────────────────────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Nunito:wght@400;600;700&display=swap');

  .spp-root {
    background: #f4f6fb;
    min-height: 100vh;
    font-family: 'Nunito', sans-serif;
  }

  /* ── Sticky top bar ── */
  .spp-topbar {
    background: rgba(255,255,255,0.96);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(15,23,42,0.07);
    box-shadow: 0 1px 12px rgba(0,0,0,0.05);
  }
  /* Desktop: left padding matches sidebar (18px) so "All Schools" aligns with search input */
  .spp-topbar-inner {
    padding-left: 18px;
    padding-right: 16px;
  }
  @media (min-width: 640px) { .spp-topbar-inner { padding-right: 24px; } }
  @media (min-width: 1024px) { .spp-topbar-inner { padding-right: 40px; } }

  /* ── Left sidebar ── */
  .spp-sidebar {
    background: #fff;
    border-right: 1px solid rgba(15,23,42,0.07);
    width: 240px;
    flex-shrink: 0;
    position: sticky;
    top: 57px;
    height: calc(100vh - 57px);
    overflow-y: auto;
    scrollbar-width: none;
    padding: 24px 18px;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }
  .spp-sidebar::-webkit-scrollbar { display: none; }

  /* ── Search ── */
  .spp-search {
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    outline: none;
    color: #0f172a;
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 600;
    transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
    width: 100%;
    padding: 9px 36px 9px 38px;
  }
  .spp-search:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
    background: #fff;
  }
  .spp-search::placeholder { color: #94a3b8; }

  /* ── Sidebar section label ── */
  .spp-section-label {
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    font-size: 10.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #94a3b8;
    margin-bottom: 8px;
  }

  /* ── Filter pill — vertical ── */
  .spp-pill {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 7px 12px;
    border-radius: 10px;
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 600;
    border: 1.5px solid transparent;
    background: transparent;
    color: #475569;
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: left;
    gap: 8px;
  }
  .spp-pill:hover {
    background: #f1f5f9;
    color: #1e3a8a;
  }
  .spp-pill.active {
    background: #eff6ff;
    color: #1d4ed8;
    border-color: #bfdbfe;
    font-weight: 700;
  }

  /* ── Grade select ── */
  .spp-select {
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    color: #0f172a;
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 600;
    padding: 8px 12px;
    outline: none;
    cursor: pointer;
    width: 100%;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  .spp-select:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
  }

  /* ── Cart button — refined amber ── */
  .spp-cart-btn {
    position: relative;
    width: 42px; height: 42px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 60%, #d97706 100%);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(245,158,11,0.25);
    transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.15s ease;
  }
  .spp-cart-btn:hover {
    filter: brightness(1.06);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(245,158,11,0.35);
  }
  .spp-cart-btn:active { transform: scale(0.94); box-shadow: none; }

  /* ── Category heading ── */
  .spp-cat-heading {
    font-family: 'Baloo 2', cursive;
    font-weight: 900;
    color: #0f172a;
    letter-spacing: -0.4px;
    font-size: clamp(17px, 1.8vw, 22px);
  }

  /* ── Clear filters ── */
  .spp-clear {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 7px 14px;
    border-radius: 10px;
    background: #fff5f5;
    border: 1.5px solid #fecaca;
    color: #dc2626;
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
    width: 100%;
    justify-content: center;
  }
  .spp-clear:hover { background: #fee2e2; border-color: #f87171; }

  /* ── Divider ── */
  .spp-divider {
    height: 1px;
    background: #f1f5f9;
    border: none;
    margin: 0;
  }

  /* ═══════════════════════════════════════════════════════════════════════
     MOBILE — phones (< 768 px)
  ═══════════════════════════════════════════════════════════════════════ */
  @media (max-width: 767px) {

    /* Root — let global layout handle navbar padding; only control bottom spacing here */
    .spp-root { padding-top: 0 !important; padding-bottom: 40px !important; }

    /* Force sidebar off — its own display:flex overrides Tailwind hidden */
    .spp-sidebar { display: none !important; }

    /* Topbar: don't sticky on mobile — let it scroll, filter bar handles sticky */
    .spp-topbar { position: relative !important; top: auto !important; }

    /* ── Sticky filter bar — sticks just below the fixed navbar ── */
    .spp-mobile-filters {
      position: sticky;
      top: 88px;
      z-index: 20;
      background: rgba(255,255,255,0.97);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid #e8ecf1;
      padding: 10px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* Search inside mobile filter bar */
    .spp-mobile-search {
      font-size: 13px !important;
      padding: 9px 36px 9px 38px !important;
      border-radius: 10px !important;
    }

    /* Horizontal scroll strip for grade + categories */
    .spp-filter-scroll {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding-bottom: 2px;
      scrollbar-width: none;
    }
    .spp-filter-scroll::-webkit-scrollbar { display: none; }

    /* Compact select on mobile */
    .spp-mobile-grade {
      flex-shrink: 0;
      font-size: 12px !important;
      padding: 6px 10px !important;
      border-radius: 8px !important;
      background: #f8fafc;
      border: 1.5px solid #e2e8f0;
      color: #0f172a;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
    }

    /* Compact category pills in scroll strip */
    .spp-chip {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      padding: 6px 12px;
      border-radius: 8px;
      font-family: 'Nunito', sans-serif;
      font-size: 12px;
      font-weight: 700;
      border: 1.5px solid #e2e8f0;
      background: #fff;
      color: #475569;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }
    .spp-chip.active {
      background: #eff6ff;
      color: #1d4ed8;
      border-color: #bfdbfe;
    }
    .spp-chip-clear {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 11px;
      border-radius: 8px;
      font-family: 'Nunito', sans-serif;
      font-size: 12px;
      font-weight: 700;
      border: 1.5px solid #fecaca;
      background: #fff5f5;
      color: #dc2626;
      cursor: pointer;
      white-space: nowrap;
    }

    /* Products area — no side padding wastage */
    .spp-products-area {
      padding: 16px 12px !important;
    }

    /* 2-column grid on mobile */
    .spp-product-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 12px !important;
    }

    /* Category section spacing */
    .spp-cat-section { margin-bottom: 28px !important; }
    .spp-cat-header { margin-bottom: 12px !important; gap: 8px !important; }
    .spp-cat-heading { font-size: 15px !important; }

    /* Hide desktop filter bar on mobile */
    .spp-desktop-filters { display: none !important; }

    /* Space between category sections */
    .spp-sections { gap: 28px !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────
   HELPERS
────────────────────────────────────────────────────────────────────────── */
function matchesSearch(name, query) {
  if (!query.trim()) return true;
  return name.toLowerCase().includes(query.trim().toLowerCase());
}
function matchesGradeFilter(product, selectedGradeId) {
  if (!selectedGradeId) return true;
  const gradeId = product.gradeId ?? product.grade?._id;
  return gradeId === selectedGradeId;
}

/* ─────────────────────────────────────────────────────────────────────────
   PAGE
────────────────────────────────────────────────────────────────────────── */
export default function SchoolProductsPage() {
  const { slug } = useParams();
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { totalItems, openCart } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [quickShopProduct, setQuickShopProduct] = useState(null);
  const quickShopOpen = Boolean(quickShopProduct);
  const openQuickShop = useCallback((payload) => setQuickShopProduct(payload), []);
  const closeQuickShop = useCallback(() => setQuickShopProduct(null), []);

  const toggleCategory = useCallback((categoryId) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedGradeFilter('');
    setSelectedCategoryIds([]);
  }, []);

  const filteredCategories = useMemo(() => {
    if (!catalog?.categories) return [];
    return catalog.categories
      .filter((cat) => selectedCategoryIds.length === 0 || selectedCategoryIds.includes(cat.id))
      .map((category) => ({
        ...category,
        products: category.products.filter(
          (p) => matchesSearch(p.name, searchQuery) && matchesGradeFilter(p, selectedGradeFilter)
        ),
      }))
      .filter((cat) => cat.products.length > 0);
  }, [catalog, searchQuery, selectedGradeFilter, selectedCategoryIds]);

  const hasActiveFilters = searchQuery.trim() || selectedGradeFilter || selectedCategoryIds.length > 0;
  const totalProducts = catalog?.categories?.reduce((acc, cat) => acc + cat.products.length, 0) ?? 0;

  const gradeFilterOptions = useMemo(() => {
    const all = { value: '', label: 'All grades' };
    const list = catalog?.grades ?? [];
    return [all, ...list.map((g) => ({ value: g._id, label: g.name }))];
  }, [catalog?.grades]);

  // Load school + categories + products from backend
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/public/schools/${slug}`);
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data || cancelled) {
          setCatalog(null);
          return;
        }
        const { school, categories = [], products = [] } = data;

        if (typeof window !== 'undefined') {
          console.log('[SchoolProductsPage] raw API data', {
            slug,
            school,
            productsSample: products.slice(0, 2).map((p) => ({
              _id: p._id,
              name: p.name,
              price: p.price,
              colors: p.colors,
              imagesByColor: p.imagesByColor,
            })),
          });
        }

        if (process.env.NODE_ENV !== 'production' && products.length > 0) {
          const first = products[0];
          console.log('[SchoolProductsPage] First product from API:', {
            _id: first._id,
            name: first.name,
            mainImageUrl: first.mainImageUrl,
            galleryImageUrls: first.galleryImageUrls,
            allKeys: Object.keys(first),
          });
        }

        const byCategory = {};
        products.forEach((p) => {
          const catId = p.category?._id || p.category;
          if (!catId) return;
          if (!byCategory[catId]) byCategory[catId] = [];

          // Same image logic as ProductPage (detail page) so card gets identical shape
          const mainImage = p.mainImageUrl || (Array.isArray(p.galleryImageUrls) ? p.galleryImageUrls[0] : null);
          const images = [p.mainImageUrl, ...(p.galleryImageUrls || [])].filter(Boolean);

          if (process.env.NODE_ENV !== 'production' && p.name && !mainImage) {
            console.warn('[SchoolProductsPage] Product has no image:', p.name, { mainImageUrl: p.mainImageUrl, galleryImageUrls: p.galleryImageUrls });
          }

          byCategory[catId].push({
            id: p._id,
            name: p.name,
            price: p.price,
            description: p.description || '',
            sizes: Array.isArray(p.sizes) ? p.sizes : [],
            sizeType: p.sizeType || 'none',
            colors: Array.isArray(p.colors) ? p.colors : [],
            image: mainImage,
            images,
            imagesByColor: p.imagesByColor || null,
            variants: Array.isArray(p.variants) ? p.variants : [],
            gradeId: p.grade?._id || null,
          });
        });
        const gradesSeen = new Map();
        products.forEach((p) => {
          const g = p.grade;
          if (g && g._id && g.name && !gradesSeen.has(g._id)) {
            gradesSeen.set(g._id, { _id: g._id, name: g.name });
          }
        });
        const schoolGrades = Array.from(gradesSeen.values()).sort((a, b) => a.name.localeCompare(b.name));
        const mappedCatalog = {
          id: school?._id || school?.slug,
          slug: school?.slug || slug,
          name: school?.name || slug,
          categories: categories.map((c) => ({
            id: c._id,
            name: c.name,
            products: byCategory[c._id] || [],
          })),
          grades: schoolGrades,
        };
        if (typeof window !== 'undefined') {
          console.log('[SchoolProductsPage] mapped catalog', mappedCatalog);
        }
        if (!cancelled) setCatalog(mappedCatalog);
      } catch {
        if (!cancelled) setCatalog(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [slug]);

  /* ── Loading state ── */
  if (loading) {
    return (
      <>
        <style>{GLOBAL_CSS}</style>
        <main className="spp-root flex items-center justify-center pt-24 px-6">
          <div className="text-center py-16">
            <p
              className="mb-2 font-black text-[#1a1a2e]"
              style={{ fontFamily: "'Baloo 2', cursive", fontSize: 'clamp(20px, 2.3vw, 28px)' }}
            >
              Loading school…
            </p>
          </div>
        </main>
      </>
    );
  }

  /* ── Not found ── */
  if (!catalog && !loading) {
    return (
      <>
        <style>{GLOBAL_CSS}</style>
        <main className="spp-root flex items-center justify-center pt-24 px-6">
          <div className="text-center py-16">
            <p className="mb-2 font-black text-[#1a1a2e]"
              style={{ fontFamily:"'Baloo 2', cursive", fontSize:'clamp(22px, 2.5vw, 32px)' }}>
              School not found 🏫
            </p>
            <Link to="/schools"
              className="inline-flex items-center gap-2 font-bold text-[#2563eb] hover:underline mt-3"
              style={{ fontFamily:"'Nunito', sans-serif", fontSize:'clamp(13px, 1vw, 15px)' }}>
            <ArrowLeft size={18} />
            Back to all schools
          </Link>
        </div>
      </main>
      </>
    );
  }

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <main className="spp-root pt-20 pb-16">

        {/* ══ Top bar ══ */}
        <div className="spp-topbar sticky top-0 z-30">
          <div className="w-full">

            {/* ── Desktop topbar: left padding matches sidebar (18px) so "All Schools" aligns with search ── */}
            <div className="spp-topbar-inner hidden md:flex items-center justify-between gap-4 py-4 pt-5">
              <Link to="/schools"
                className="inline-flex items-center gap-1.5 font-bold text-[#2563eb] hover:text-[#1d4ed8] transition-colors flex-shrink-0"
                style={{ fontFamily:"'Nunito', sans-serif", fontSize:'clamp(12px, 0.9vw, 14px)' }}>
                <ArrowLeft size={17} strokeWidth={2.5} />
                All Schools
            </Link>
              <div className="flex flex-col items-center flex-1 min-w-0">
                <h1 className="m-0 font-black leading-tight text-center truncate w-full"
                  style={{ fontFamily:"'Baloo 2', cursive", fontSize:'clamp(14px, 1.4vw, 19px)', letterSpacing:'-0.3px', color:'#0f172a' }}>
              {catalog.name}
            </h1>
                <p className="m-0 font-semibold"
                  style={{ fontFamily:"'Nunito',sans-serif", fontSize:'clamp(10px,0.8vw,11px)', color:'#94a3b8', marginTop:'2px' }}>
                  {totalProducts} products · {catalog.categories?.length ?? 0} categories
                </p>
              </div>
              <button type="button" onClick={openCart} className="spp-cart-btn flex-shrink-0" aria-label="Open cart">
                <ShoppingBag size={19} style={{ color:'#fff' }} strokeWidth={2.2} />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white text-xs font-black flex items-center justify-center"
                    style={{ background:'linear-gradient(135deg,#1e3a8a,#2563eb)', fontFamily:"'Baloo 2',cursive", boxShadow:'0 2px 6px rgba(37,99,235,0.5)', border:'2px solid #fff' }}>
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* ── Mobile topbar ── */}
            <div className="md:hidden px-4 py-3">
              {/* Row 1: back + cart */}
              <div className="flex items-center justify-between mb-1.5">
                <Link to="/schools"
                  className="inline-flex items-center gap-1 font-bold text-[#2563eb]"
                  style={{ fontFamily:"'Nunito', sans-serif", fontSize:'13px' }}>
                  <ArrowLeft size={15} strokeWidth={2.5} />
                  All Schools
                </Link>
                <button type="button" onClick={openCart} className="spp-cart-btn" aria-label="Open cart">
                  <ShoppingBag size={17} style={{ color:'#fff' }} strokeWidth={2.2} />
              {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white text-xs font-black flex items-center justify-center"
                      style={{ background:'linear-gradient(135deg,#1e3a8a,#2563eb)', fontFamily:"'Baloo 2',cursive", boxShadow:'0 2px 6px rgba(37,99,235,0.5)', border:'2px solid #fff' }}>
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>
          </div>
              {/* Row 2: school name */}
              <h1 className="m-0 font-black leading-snug"
                style={{ fontFamily:"'Baloo 2', cursive", fontSize:'15px', letterSpacing:'-0.2px', color:'#0f172a', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                {catalog.name}
              </h1>
              <p className="m-0" style={{ fontFamily:"'Nunito',sans-serif", fontSize:'11px', color:'#94a3b8', marginTop:'1px' }}>
                {totalProducts} products · {catalog.categories?.length ?? 0} categories
              </p>
            </div>

        </div>
      </div>

        {/* ══ Mobile sticky filter bar (below topbar) ══ */}
        <div className="spp-mobile-filters md:hidden">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color:'#2563eb' }} strokeWidth={2} />
            <input type="search" placeholder="Search products..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="spp-search spp-mobile-search" aria-label="Search products"
              style={{ paddingLeft:'36px' }} />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-gray-400"
                aria-label="Clear search">
                <X size={13} strokeWidth={2.5} />
              </button>
            )}
          </div>
          {/* Horizontal scroll: grade + category chips */}
          <div className="spp-filter-scroll">
            <select value={selectedGradeFilter} onChange={(e) => setSelectedGradeFilter(e.target.value)}
              className="spp-mobile-grade" aria-label="Grade filter">
              {gradeFilterOptions.map((opt) => (
                <option key={opt.value || 'all'} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button type="button" onClick={() => setSelectedCategoryIds([])}
              className={`spp-chip ${selectedCategoryIds.length === 0 ? 'active' : ''}`}>
              All
            </button>
            {catalog.categories.map((cat) => (
              <button key={cat.id} type="button" onClick={() => toggleCategory(cat.id)}
                className={`spp-chip ${selectedCategoryIds.includes(cat.id) ? 'active' : ''}`}>
                {cat.name}
              </button>
            ))}
            {hasActiveFilters && (
              <button type="button" onClick={clearFilters} className="spp-chip-clear">
                <X size={11} strokeWidth={2.5} /> Clear
              </button>
            )}
          </div>
        </div>

        {/* ══ Sidebar + Products layout: full width so sidebar is flush left (desktop) ══ */}
        <div className="w-full flex items-start">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="spp-sidebar hidden md:flex">

            {/* Search */}
            <div>
              <p className="spp-section-label">Search</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color:'#2563eb' }} strokeWidth={2} />
                <input type="search" placeholder="Search products..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="spp-search" aria-label="Search products" />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-[#eef5ff] text-gray-400"
                    aria-label="Clear search">
                    <X size={13} strokeWidth={2.5} />
                  </button>
                )}
              </div>
            </div>

            <hr className="spp-divider" />

            {/* Grade filter */}
            <div>
              <p className="spp-section-label">Grade</p>
              <select value={selectedGradeFilter} onChange={(e) => setSelectedGradeFilter(e.target.value)}
                className="spp-select" aria-label="Grade filter">
                {gradeFilterOptions.map((opt) => (
                  <option key={opt.value || 'all'} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <hr className="spp-divider" />

            {/* Category filter */}
            <div className="flex-1">
              <p className="spp-section-label">Category</p>
              <div className="flex flex-col gap-1">
                <button type="button" onClick={() => setSelectedCategoryIds([])}
                  className={`spp-pill ${selectedCategoryIds.length === 0 ? 'active' : ''}`}>
                  All categories
                </button>
                {catalog.categories.map((cat) => (
                  <button key={cat.id} type="button" onClick={() => toggleCategory(cat.id)}
                    className={`spp-pill ${selectedCategoryIds.includes(cat.id) ? 'active' : ''}`}>
                      {cat.name}
                    <span className="ml-auto text-xs font-bold opacity-50">{cat.products.length}</span>
                    </button>
                ))}
              </div>
              </div>

            {/* Clear */}
              {hasActiveFilters && (
              <>
                <hr className="spp-divider" />
                <button type="button" onClick={clearFilters} className="spp-clear">
                  <X size={13} strokeWidth={2.5} />
                  Clear all filters
                </button>
              </>
              )}
          </aside>

          {/* ── RIGHT: Products ── */}
          <div className="spp-products-area flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8">

        {filteredCategories.length === 0 ? (
          <div className="text-center py-16">
                <div className="text-5xl mb-4">{hasActiveFilters ? '🔍' : '🏫'}</div>
                <p className="mb-3 font-black text-[#1a1a2e]"
                  style={{ fontFamily:"'Baloo 2', cursive", fontSize:'clamp(18px, 2vw, 26px)' }}>
                  {hasActiveFilters ? 'No products match your filters' : 'No items yet'}
                </p>
                <p className="font-semibold text-gray-400 mb-4"
                  style={{ fontFamily:"'Nunito',sans-serif", fontSize:'clamp(12px,1vw,14px)' }}>
                  {hasActiveFilters ? 'Try adjusting or clearing your filters.' : 'Check back soon — products are being added!'}
            </p>
            {hasActiveFilters && (
                  <button type="button" onClick={clearFilters} className="spp-clear mx-auto mt-2" style={{ width:'auto' }}>
                    <X size={13} strokeWidth={2.5} /> Clear filters
              </button>
            )}
          </div>
        ) : (
              <div className="spp-sections space-y-14">
            {filteredCategories.map((category) => (
                  <section key={category.id} className="spp-cat-section">
                    <div className="spp-cat-header flex items-center gap-3 mb-6">
                      <h2 className="spp-cat-heading m-0">{category.name}</h2>
                      <span style={{
                        fontFamily:"'Nunito',sans-serif", fontSize:'11px', fontWeight:700,
                        color:'#64748b', background:'#f1f5f9', borderRadius:'6px',
                        padding:'2px 8px', flexShrink:0,
                      }}>
                        {category.products.length}
                      </span>
                      <div style={{ flex:1, height:'1px', background:'#e2e8f0', borderRadius:'99px' }} />
                    </div>
                    <div className="spp-product-grid grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.products.map((product) => (
                        <ProductCard key={product.id} product={product}
                          schoolName={catalog.name} schoolSlug={catalog.slug}
                          onQuickShop={openQuickShop} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
          </div>
      </div>

      <QuickShopDrawer
          open={quickShopOpen} onClose={closeQuickShop}
        product={quickShopProduct?.product ?? null}
        schoolName={quickShopProduct?.schoolName ?? null}
        schoolSlug={quickShopProduct?.schoolSlug ?? null}
      />

    </main>
    </>
  );
}
