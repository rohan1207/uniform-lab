import { useMemo, useState, useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { ProductCard } from "@/components/schools/ProductCard";
import { QuickShopDrawer } from "@/components/schools/QuickShopDrawer";
import { ArrowLeft, ShoppingBag, Search, X } from "lucide-react";
import { cachedFetch } from "@/lib/apiCache";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

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
    font-size: 16px;
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
    .spp-root { padding-top: 0 !important; padding-bottom: 40px !important; overflow-x: hidden; }

    /* Force sidebar off — its own display:flex overrides Tailwind hidden */
    .spp-sidebar { display: none !important; }

    /* Topbar: don't sticky on mobile — let it scroll, filter bar handles sticky */
    .spp-topbar { position: relative !important; top: auto !important; }

    /* ── Sticky filter bar — sticks just below the fixed navbar ── */
    .spp-mobile-filters {
      position: sticky;
      top: 60px;
      z-index: 20;
      background: #f4f6fb;
      border-bottom: 1px solid #e8ecf1;
      padding: 10px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      /* Prevent gap above when sticking — extend bg upward behind navbar */
      box-shadow: 0 -12px 0 0 #f4f6fb;
    }

    /* Search inside mobile filter bar */
    .spp-mobile-search {
      font-size: 16px !important;
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

    /* 2-column grid on mobile — minmax(0,1fr) strictly caps column to available space */
    .spp-product-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 10px !important;
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

  /* ═══════════════════════════════════════════════════════════
     SKELETON SHIMMER
  ═══════════════════════════════════════════════════════════ */
  @keyframes spp-shimmer {
    0%   { background-position: -800px 0; }
    100% { background-position:  800px 0; }
  }
  .spp-skel {
    background: linear-gradient(90deg, #edf2f7 0%, #dce8f5 40%, #edf2f7 80%);
    background-size: 1600px 100%;
    animation: spp-shimmer 1.6s ease-in-out infinite;
    border-radius: 6px;
  }
  .spp-skel-sidebar {
    background: #fff;
    border-right: 1px solid rgba(15,23,42,0.07);
    width: 240px;
    flex-shrink: 0;
    position: sticky;
    top: 57px;
    height: calc(100vh - 57px);
    overflow: hidden;
    padding: 24px 18px;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }
  .spp-skel-card {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
`;

/* ─────────────────────────────────────────────────────────────────────────
   HELPERS
────────────────────────────────────────────────────────────────────────── */
function matchesSearch(name, query) {
  if (!query.trim()) return true;
  return name.toLowerCase().includes(query.trim().toLowerCase());
}
function matchesTagFilter(product, selectedTags) {
  if (!selectedTags.length) return true;
  return selectedTags.some((tag) => product.tags && product.tags.includes(tag));
}

/**
 * Convert a grade/class name to a numeric sort key so grades sort
 * descending (Class 12 → Class 1 → KG → Nursery) automatically,
 * without any manual ordering in the admin panel.
 */
function gradeToSortKey(name) {
  const n = (name || "").toLowerCase().trim();
  if (/nursery/.test(n)) return -3;
  if (/lkg|jr\.?\s*kg|lower\s*k/i.test(n)) return -2;
  if (/ukg|sr\.?\s*kg|upper\s*k/i.test(n)) return -1;
  if (/\bkg\b/.test(n)) return 0;
  const m = n.match(/\d+/);
  if (m) return parseInt(m[0], 10);
  return 99; // unrecognised names sort last
}

/**
 * Priority order (lower score = shown first):
 *
 *  10  Formal Shirt / Blouse / Kurta          (non-sports)
 *  20  Regular T-Shirt / Polo                 (non-sports, non-track)
 *  30  Half Pant / Shorts
 *  40  Full Pant / Trouser                    (non-sports, non-track)
 *  50  Skirt / Tunic / Pinafore / Midi / Frock / Salwar  (girls)
 *  60  Sports T-Shirt / Sports Shirt / Sports Top
 *  70  Sports Track Pant / Track Pant / Sports Pant
 *  80  Outerwear — Hoodie, Blazer, Sweater, Jacket, Coat (sports or not)
 *  90  Accessories — Belt, Tie, Cap, Socks, Shoes, Bag, Mat …
 * 100  Fabric / raw material
 *  85  Unknown / unrecognised (between outerwear and accessories)
 */
function productSortScore(name) {
  const n = (name || "").toLowerCase();
  const is = (re) => re.test(n);

  // ── Fabric / raw material — always last (checked FIRST so "Shirt Fabric" doesn't match shirt) ──
  if (is(/\bfabrics?\b|\bcloth\b|\bmaterial\b|\bmetre\b|\bmeter\b|\byards?\b/))
    return 100;

  const isSports = is(/\bsport s?\b|\bsports\b/); // "sport" OR "sports"
  const isTrack = is(/\btrack\b/);

  // ── Accessories ───────────────────────────────────────────────────────
  if (
    is(
      /\bbelt\b|\btie\b|\bcap\b|\bhat\b|\bbadge\b|\bscarf\b|\blanyard\b|\bbag\b|\bsock\b|\bstocking\b|\bmat\b|\bshoe\b|\bboot\b|\bfootwear\b/,
    )
  )
    return 90;

  // ── Outerwear (sports jacket counts here too) ─────────────────────────
  if (
    is(
      /\bhoodie\b|\bblazer\b|\bsweater\b|\bjacket\b|\bcoat\b|\bcardigan\b|\bpullover\b/,
    )
  )
    return 80;

  // ── Sports Track Pant / Track Pant / Sports Pant ─────────────────────
  if (isTrack || (isSports && is(/\bpant\b|\btrouser\b|\bbottom\b/))) return 70;

  // ── Sports T-Shirt / Sports Shirt / Sports Top / Sports Polo ─────────
  if (isSports && is(/\bt[\s-]?shirt\b|\btshirt\b|\bshirt\b|\btop\b|\bpolo\b/))
    return 60;

  // ── Girls bottom / dress items ────────────────────────────────────────
  if (
    is(
      /\bskirt\b|\btunic\b|\bpinafore\b|\bpinop\b|\bmidi\b|\bfrock\b|\bsalwar\b|\bdress\b/,
    )
  )
    return 50;

  // ── Full Pant / Trouser (non-sports, non-track) ───────────────────────
  if (
    !isSports &&
    !isTrack &&
    is(/\bfull[\s-]?pant\b|\btrouser\b|\bpant\b|\bbottom\b/)
  )
    return 40;

  // ── Half Pant / Shorts ────────────────────────────────────────────────
  if (is(/\bhalf[\s-]?pant\b|\bshorts\b/)) return 30;

  // ── Regular T-Shirt / Polo (non-sports, non-track) ───────────────────
  if (!isSports && !isTrack && is(/\bt[\s-]?shirt\b|\btshirt\b|\bpolo\b/))
    return 20;

  // ── Formal Shirt / Blouse / Kurta (non-sports) ───────────────────────
  if (!isSports && is(/\bshirt\b|\bblouse\b|\bkurta\b/)) return 10;

  return 85; // unrecognised — after outerwear, before accessories
}

/* ─────────────────────────────────────────────────────────────────────────
   PAGE
────────────────────────────────────────────────────────────────────────── */
export default function SchoolProductsPage() {
  const { slug } = useParams();
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { totalItems, openCart } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTagFilters, setSelectedTagFilters] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [quickShopProduct, setQuickShopProduct] = useState(null);
  const quickShopOpen = Boolean(quickShopProduct);
  const openQuickShop = useCallback(
    (payload) => setQuickShopProduct(payload),
    [],
  );
  const closeQuickShop = useCallback(() => setQuickShopProduct(null), []);

  const toggleCategory = useCallback((categoryId) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  }, []);

  const toggleTag = useCallback((tag) => {
    setSelectedTagFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedTagFilters([]);
    setSelectedCategoryIds([]);
  }, []);

  const filteredProducts = useMemo(() => {
    if (!catalog?.allProducts) return [];
    return catalog.allProducts.filter(
      (p) =>
        matchesSearch(p.name, searchQuery) &&
        matchesTagFilter(p, selectedTagFilters) &&
        (selectedCategoryIds.length === 0 ||
          p.productCategoryIds.some((id) => selectedCategoryIds.includes(id))),
    );
  }, [catalog, searchQuery, selectedTagFilters, selectedCategoryIds]);

  const hasActiveFilters = !!(
    searchQuery.trim() ||
    selectedTagFilters.length > 0 ||
    selectedCategoryIds.length > 0
  );
  const totalProducts = catalog?.allProducts?.length ?? 0;

  // Load school + categories + products from backend
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await cachedFetch(`/api/public/schools/${slug}`, {
          ttl: 60000,
        });
        if (!data || cancelled) {
          setCatalog(null);
          return;
        }
        const { school, products = [] } = data;

        // Build a deduplicated, sorted categories list from the products themselves
        // (supports both legacy single `category` and new `categories` array)
        // Always normalize IDs to plain strings to avoid ObjectId vs string mismatches
        const categoriesMap = new Map();
        products.forEach((p) => {
          const allCats =
            p.categories && p.categories.length > 0
              ? p.categories
              : p.category
                ? [p.category]
                : [];
          allCats.forEach((cat) => {
            if (!cat) return;
            const id = String(cat._id ?? cat);
            const name = typeof cat === "object" ? (cat.name ?? null) : null;
            if (id && name !== null && !categoriesMap.has(id)) {
              categoriesMap.set(id, {
                _id: id,
                name,
                sortOrder: cat.sortOrder ?? 0,
              });
            }
          });
        });
        const categories = Array.from(categoriesMap.values()).sort((a, b) => {
          // Respect explicit sortOrder if admin has set different values
          const aSO = a.sortOrder ?? 0;
          const bSO = b.sortOrder ?? 0;
          if (aSO !== bSO) return aSO - bSO;
          // Otherwise auto-sort by grade number descending (12 → 1 → KG → Nursery)
          return gradeToSortKey(b.name) - gradeToSortKey(a.name);
        });

        if (typeof window !== "undefined") {
          console.log("[SchoolProductsPage] raw API data", {
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

        if (process.env.NODE_ENV !== "production" && products.length > 0) {
          const first = products[0];
          console.log("[SchoolProductsPage] First product from API:", {
            _id: first._id,
            name: first.name,
            mainImageUrl: first.mainImageUrl,
            galleryImageUrls: first.galleryImageUrls,
            allKeys: Object.keys(first),
          });
        }

        // Build a shared product-data builder to avoid duplication
        const buildProductEntry = (p) => {
          const mainImage =
            p.mainImageUrl ||
            (Array.isArray(p.galleryImageUrls) ? p.galleryImageUrls[0] : null);
          const images = [p.mainImageUrl, ...(p.galleryImageUrls || [])].filter(
            Boolean,
          );

          if (process.env.NODE_ENV !== "production" && p.name && !mainImage) {
            console.warn("[SchoolProductsPage] Product has no image:", p.name, {
              mainImageUrl: p.mainImageUrl,
              galleryImageUrls: p.galleryImageUrls,
            });
          }

          // Grade: prefer gradeLabel string (new), fall back to grade._id (legacy)
          const gradeId = p.gradeLabel || p.grade?._id || null;

          // Category IDs for the Grade sidebar filter
          const toId = (v) => (v ? String(v?._id ?? v) : null);
          const allCatRefs =
            Array.isArray(p.categories) && p.categories.length
              ? p.categories
              : p.category
                ? [p.category]
                : [];
          const productCategoryIds = allCatRefs.map(toId).filter(Boolean);

          return {
            id: p._id,
            name: p.name,
            price: p.price,
            displayOrder: p.displayOrder ?? null,
            productCategoryIds,
            description: p.description || "",
            sizes: Array.isArray(p.sizes) ? p.sizes : [],
            sizeType: p.sizeType || "none",
            colors: Array.isArray(p.colors) ? p.colors : [],
            image: mainImage,
            images,
            imagesByColor: p.imagesByColor || null,
            variants: Array.isArray(p.variants) ? p.variants : [],
            gradeId, // string label (new) or ObjectId string (legacy)
            gradeLabel: p.gradeLabel || null,
            tags: Array.isArray(p.tags) ? p.tags : [],
          };
        };

        // Build flat deduplicated product list sorted by displayOrder → productSortScore → name
        const seenProductIds = new Set();
        const allProductsFlat = [];
        products.forEach((p) => {
          if (seenProductIds.has(p._id)) return;
          seenProductIds.add(p._id);
          allProductsFlat.push(buildProductEntry(p));
        });
        allProductsFlat.sort((a, b) => {
          const aOrd = a.displayOrder ?? Infinity;
          const bOrd = b.displayOrder ?? Infinity;
          if (aOrd !== bOrd) return aOrd - bOrd;
          const scoreDiff = productSortScore(a.name) - productSortScore(b.name);
          if (scoreDiff !== 0) return scoreDiff;
          return a.name.localeCompare(b.name);
        });
        // Per-category product counts for Grade filter pill badges
        const productCountByCategory = {};
        allProductsFlat.forEach((p) => {
          (p.productCategoryIds || []).forEach((catId) => {
            productCountByCategory[catId] =
              (productCountByCategory[catId] || 0) + 1;
          });
        });

        // Build grade filter options: support gradeLabel strings AND legacy grade._id
        const gradesSeen = new Map();
        products.forEach((p) => {
          if (p.gradeLabel) {
            if (!gradesSeen.has(p.gradeLabel)) {
              gradesSeen.set(p.gradeLabel, {
                _id: p.gradeLabel,
                name: p.gradeLabel,
              });
            }
          } else if (p.grade && p.grade._id && p.grade.name) {
            if (!gradesSeen.has(p.grade._id)) {
              gradesSeen.set(p.grade._id, {
                _id: p.grade._id,
                name: p.grade.name,
              });
            }
          }
        });
        const schoolGrades = Array.from(gradesSeen.values()).sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        // Collect unique tags across all products for the Categories filter
        const tagsSeen = new Set();
        products.forEach((p) => {
          (p.tags || []).forEach((t) => {
            if (t && t.trim()) tagsSeen.add(t.trim());
          });
        });
        const productTags = Array.from(tagsSeen).sort();

        const mappedCatalog = {
          id: school?._id || school?.slug,
          slug: school?.slug || slug,
          name: school?.name || slug,
          allProducts: allProductsFlat,
          categories: categories.map((c) => ({
            id: c._id,
            name: c.name,
            productCount: productCountByCategory[c._id] || 0,
          })),
          grades: schoolGrades,
          productTags,
        };
        if (typeof window !== "undefined") {
          console.log("[SchoolProductsPage] mapped catalog", mappedCatalog);
        }
        if (!cancelled) setCatalog(mappedCatalog);
      } catch {
        if (!cancelled) setCatalog(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  /* ── Loading state ── */
  if (loading) {
    return (
      <>
        <style>{GLOBAL_CSS}</style>
        <main className="spp-root">
          {/* ══ Skeleton Topbar ══ */}
          <div className="spp-topbar sticky top-0 z-30">
            {/* Desktop */}
            <div className="spp-topbar-inner hidden md:flex items-center justify-between gap-4 py-4 pt-5">
              <div
                className="spp-skel"
                style={{ width: 84, height: 15, borderRadius: 8 }}
              />
              <div className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="spp-skel"
                  style={{ width: 230, height: 18, borderRadius: 8 }}
                />
                <div
                  className="spp-skel"
                  style={{ width: 130, height: 11, borderRadius: 6 }}
                />
              </div>
              <div
                className="spp-skel"
                style={{ width: 42, height: 42, borderRadius: 12 }}
              />
            </div>
            {/* Mobile */}
            <div className="md:hidden px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <div
                  className="spp-skel"
                  style={{ width: 72, height: 14, borderRadius: 6 }}
                />
                <div
                  className="spp-skel"
                  style={{ width: 42, height: 42, borderRadius: 12 }}
                />
              </div>
              <div
                className="spp-skel"
                style={{
                  width: "52%",
                  height: 16,
                  borderRadius: 8,
                  marginBottom: 5,
                }}
              />
              <div
                className="spp-skel"
                style={{ width: "30%", height: 11, borderRadius: 6 }}
              />
            </div>
          </div>

          {/* ══ Mobile filter bar skeleton ══ */}
          <div className="spp-mobile-filters md:hidden">
            <div
              className="spp-skel"
              style={{ height: 40, borderRadius: 10 }}
            />
            <div className="spp-filter-scroll">
              {[82, 60, 74, 68, 80].map((w, i) => (
                <div
                  key={i}
                  className="spp-skel flex-shrink-0"
                  style={{ width: w, height: 32, borderRadius: 8 }}
                />
              ))}
            </div>
          </div>

          {/* ══ Sidebar + Products ══ */}
          <div className="w-full flex items-start">
            {/* Sidebar */}
            <aside className="spp-skel-sidebar hidden md:flex">
              <div>
                <div
                  className="spp-skel"
                  style={{
                    width: 48,
                    height: 10,
                    borderRadius: 4,
                    marginBottom: 10,
                  }}
                />
                <div
                  className="spp-skel"
                  style={{ height: 40, borderRadius: 12 }}
                />
              </div>
              <div className="spp-skel" style={{ height: 1 }} />
              <div>
                <div
                  className="spp-skel"
                  style={{
                    width: 40,
                    height: 10,
                    borderRadius: 4,
                    marginBottom: 10,
                  }}
                />
                <div
                  className="spp-skel"
                  style={{ height: 36, borderRadius: 10 }}
                />
              </div>
              <div className="spp-skel" style={{ height: 1 }} />
              <div>
                <div
                  className="spp-skel"
                  style={{
                    width: 60,
                    height: 10,
                    borderRadius: 4,
                    marginBottom: 10,
                  }}
                />
                <div className="flex flex-col gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="spp-skel"
                      style={{ height: 34, borderRadius: 10 }}
                    />
                  ))}
                </div>
              </div>
            </aside>

            {/* Products area */}
            <div className="spp-products-area flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8">
              {/* Category 1 */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="spp-skel"
                  style={{ width: 148, height: 22, borderRadius: 8 }}
                />
                <div
                  className="spp-skel"
                  style={{ width: 26, height: 18, borderRadius: 6 }}
                />
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "#e2e8f0",
                    borderRadius: 99,
                  }}
                />
              </div>
              <div className="spp-product-grid grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-4 mb-14">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="spp-skel-card">
                    <div
                      className="spp-skel"
                      style={{
                        aspectRatio: "3/4",
                        width: "100%",
                        borderRadius: 0,
                      }}
                    />
                    <div style={{ padding: "12px 14px 14px" }}>
                      <div
                        className="spp-skel"
                        style={{
                          height: 13,
                          borderRadius: 6,
                          width: "78%",
                          marginBottom: 7,
                        }}
                      />
                      <div
                        className="spp-skel"
                        style={{
                          height: 13,
                          borderRadius: 6,
                          width: "52%",
                          marginBottom: 12,
                        }}
                      />
                      <div
                        className="spp-skel"
                        style={{ height: 18, borderRadius: 6, width: "38%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Category 2 */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="spp-skel"
                  style={{ width: 112, height: 22, borderRadius: 8 }}
                />
                <div
                  className="spp-skel"
                  style={{ width: 26, height: 18, borderRadius: 6 }}
                />
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "#e2e8f0",
                    borderRadius: 99,
                  }}
                />
              </div>
              <div className="spp-product-grid grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="spp-skel-card">
                    <div
                      className="spp-skel"
                      style={{
                        aspectRatio: "3/4",
                        width: "100%",
                        borderRadius: 0,
                      }}
                    />
                    <div style={{ padding: "12px 14px 14px" }}>
                      <div
                        className="spp-skel"
                        style={{
                          height: 13,
                          borderRadius: 6,
                          width: "78%",
                          marginBottom: 7,
                        }}
                      />
                      <div
                        className="spp-skel"
                        style={{
                          height: 13,
                          borderRadius: 6,
                          width: "52%",
                          marginBottom: 12,
                        }}
                      />
                      <div
                        className="spp-skel"
                        style={{ height: 18, borderRadius: 6, width: "38%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
            <p
              className="mb-2 font-black text-[#1a1a2e]"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontSize: "clamp(22px, 2.5vw, 32px)",
              }}
            >
              School not found 🏫
            </p>
            <Link
              to="/schools"
              className="inline-flex items-center gap-2 font-bold text-[#2563eb] hover:underline mt-3"
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "clamp(13px, 1vw, 15px)",
              }}
            >
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
              <Link
                to="/schools"
                className="inline-flex items-center gap-1.5 font-bold text-[#2563eb] hover:text-[#1d4ed8] transition-colors flex-shrink-0"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "clamp(12px, 0.9vw, 14px)",
                }}
              >
                <ArrowLeft size={17} strokeWidth={2.5} />
                All Schools
              </Link>
              <div className="flex flex-col items-center flex-1 min-w-0">
                <h1
                  className="m-0 font-black leading-tight text-center truncate w-full"
                  style={{
                    fontFamily: "'Baloo 2', cursive",
                    fontSize: "clamp(14px, 1.4vw, 19px)",
                    letterSpacing: "-0.3px",
                    color: "#0f172a",
                  }}
                >
                  {catalog.name}
                </h1>
                <p
                  className="m-0 font-semibold"
                  style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontSize: "clamp(10px,0.8vw,11px)",
                    color: "#94a3b8",
                    marginTop: "2px",
                  }}
                >
                  {totalProducts} products · {catalog.categories?.length ?? 0}{" "}
                  Categories
                </p>
              </div>
              <button
                type="button"
                onClick={openCart}
                className="spp-cart-btn flex-shrink-0"
                aria-label="Open cart"
              >
                <ShoppingBag
                  size={19}
                  style={{ color: "#fff" }}
                  strokeWidth={2.2}
                />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white text-xs font-black flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg,#1e3a8a,#2563eb)",
                      fontFamily: "'Baloo 2',cursive",
                      boxShadow: "0 2px 6px rgba(37,99,235,0.5)",
                      border: "2px solid #fff",
                    }}
                  >
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* ── Mobile topbar ── */}
            <div className="md:hidden px-4 py-3">
              {/* Row 1: back + cart */}
              <div className="flex items-center justify-between mb-1.5">
                <Link
                  to="/schools"
                  className="inline-flex items-center gap-1 font-bold text-[#2563eb]"
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "13px",
                  }}
                >
                  <ArrowLeft size={15} strokeWidth={2.5} />
                  All Schools
                </Link>
                <button
                  type="button"
                  onClick={openCart}
                  className="spp-cart-btn"
                  aria-label="Open cart"
                >
                  <ShoppingBag
                    size={17}
                    style={{ color: "#fff" }}
                    strokeWidth={2.2}
                  />
                  {totalItems > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white text-xs font-black flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg,#1e3a8a,#2563eb)",
                        fontFamily: "'Baloo 2',cursive",
                        boxShadow: "0 2px 6px rgba(37,99,235,0.5)",
                        border: "2px solid #fff",
                      }}
                    >
                      {totalItems > 99 ? "99+" : totalItems}
                    </span>
                  )}
                </button>
              </div>
              {/* Row 2: school name */}
              <h1
                className="m-0 font-black leading-snug"
                style={{
                  fontFamily: "'Baloo 2', cursive",
                  fontSize: "15px",
                  letterSpacing: "-0.2px",
                  color: "#0f172a",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {catalog.name}
              </h1>
              <p
                className="m-0"
                style={{
                  fontFamily: "'Nunito',sans-serif",
                  fontSize: "11px",
                  color: "#94a3b8",
                  marginTop: "1px",
                }}
              >
                {totalProducts} products · {catalog.categories?.length ?? 0}{" "}
                grades
              </p>
            </div>
          </div>
        </div>

        {/* ══ Mobile sticky filter bar (below topbar) ══ */}
        <div className="spp-mobile-filters md:hidden">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "#2563eb" }}
              strokeWidth={2}
            />
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="spp-search spp-mobile-search"
              aria-label="Search products"
              style={{ paddingLeft: "36px" }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-gray-400"
                aria-label="Clear search"
              >
                <X size={13} strokeWidth={2.5} />
              </button>
            )}
          </div>
          {/* Horizontal scroll: categories (tags) + grade (category) chips */}
          <div className="spp-filter-scroll">
            {/* Category tag chips */}
            {catalog.productTags?.length > 0 && (
              <>
                {catalog.productTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`spp-chip ${selectedTagFilters.includes(tag) ? "active" : ""}`}
                  >
                    {tag}
                  </button>
                ))}
                <span
                  style={{
                    flexShrink: 0,
                    alignSelf: "center",
                    color: "#cbd5e1",
                    fontSize: 18,
                    lineHeight: 1,
                    padding: "0 2px",
                  }}
                >
                  ·
                </span>
              </>
            )}
            {/* Grade chips (product categories) */}
            <button
              type="button"
              onClick={() => setSelectedCategoryIds([])}
              className={`spp-chip ${selectedCategoryIds.length === 0 ? "active" : ""}`}
            >
              All
            </button>
            {catalog.categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={`spp-chip ${selectedCategoryIds.includes(cat.id) ? "active" : ""}`}
              >
                {cat.name}
              </button>
            ))}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="spp-chip-clear"
              >
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
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "#2563eb" }}
                  strokeWidth={2}
                />
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="spp-search"
                  aria-label="Search products"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-[#eef5ff] text-gray-400"
                    aria-label="Clear search"
                  >
                    <X size={13} strokeWidth={2.5} />
                  </button>
                )}
              </div>
            </div>

            <hr className="spp-divider" />

            {/* Grade filter (product categories) */}
            <div>
              <p className="spp-section-label">Categories</p>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategoryIds([])}
                  className={`spp-pill ${selectedCategoryIds.length === 0 ? "active" : ""}`}
                >
                  All categories
                </button>
                {catalog.categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={`spp-pill ${selectedCategoryIds.includes(cat.id) ? "active" : ""}`}
                  >
                    {cat.name}
                    <span className="ml-auto text-xs font-bold opacity-50">
                      {cat.productCount}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <hr className="spp-divider" />

            {/* Categories filter (product tags)
            <div className="flex-1">
              <p className="spp-section-label">Categories</p>
              <div className="flex flex-col gap-1">
                {catalog.productTags?.length > 0 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedTagFilters([])}
                      className={`spp-pill ${selectedTagFilters.length === 0 ? "active" : ""}`}
                    >
                      All categories
                    </button>
                    {catalog.productTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`spp-pill ${selectedTagFilters.includes(tag) ? "active" : ""}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </>
                ) : (
                  <p className="text-xs text-gray-400 px-1 py-1">
                    No categories added yet
                  </p>
                )}
              </div>
            </div> */}

            {/* Clear */}
            {hasActiveFilters && (
              <>
                <hr className="spp-divider" />
                <button
                  type="button"
                  onClick={clearFilters}
                  className="spp-clear"
                >
                  <X size={13} strokeWidth={2.5} />
                  Clear all filters
                </button>
              </>
            )}
          </aside>

          {/* ── RIGHT: Products ── */}
          <div className="spp-products-area flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8">
            {/* Disclaimer */}
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "11px",
                color: "#94a3b8",
                fontWeight: 600,
                marginBottom: "18px",
                lineHeight: 1.5,
              }}
            >
              📷 Images are for visual representation only. Actual colours may
              vary slightly but are accurate as per the official school uniform
              specification.
            </p>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">
                  {hasActiveFilters ? "🔍" : "🏫"}
                </div>
                <p
                  className="mb-3 font-black text-[#1a1a2e]"
                  style={{
                    fontFamily: "'Baloo 2', cursive",
                    fontSize: "clamp(18px, 2vw, 26px)",
                  }}
                >
                  {hasActiveFilters
                    ? "No products match your filters"
                    : "No items yet"}
                </p>
                <p
                  className="font-semibold text-gray-400 mb-4"
                  style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontSize: "clamp(12px,1vw,14px)",
                  }}
                >
                  {hasActiveFilters
                    ? "Try adjusting or clearing your filters."
                    : "Check back soon — products are being added!"}
                </p>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="spp-clear mx-auto mt-2"
                    style={{ width: "auto" }}
                  >
                    <X size={13} strokeWidth={2.5} /> Clear filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="spp-product-grid grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      schoolName={catalog.name}
                      schoolSlug={catalog.slug}
                      onQuickShop={openQuickShop}
                    />
                  ))}
                </div>
                <p
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "11px",
                    color: "#94a3b8",
                    fontWeight: 600,
                    textAlign: "center",
                    marginTop: "32px",
                    lineHeight: 1.5,
                  }}
                >
                  * Images are for visual representation only. Actual colours
                  may vary slightly but are accurate as per the official school
                  uniform specification.
                </p>
              </>
            )}
          </div>
        </div>

        <QuickShopDrawer
          open={quickShopOpen}
          onClose={closeQuickShop}
          product={quickShopProduct?.product ?? null}
          schoolName={quickShopProduct?.schoolName ?? null}
          schoolSlug={quickShopProduct?.schoolSlug ?? null}
          initialColor={quickShopProduct?.selectedColor ?? null}
        />
      </main>
    </>
  );
}
