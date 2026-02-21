/**
 * Product lookup for detail page. Resolves product by id and optional school slug.
 */

import { getSchoolCatalog, getProductColors } from './schoolCatalog';
import { getAllSchoolSlugs } from './schoolCatalog';

export const latestProducts = [
  { id: 'summer-1', schoolId: 'nanded-city-public', name: 'Summer White Shirt', schoolName: "Vidya Pratishthan's Nanded City Public School", price: 449, image: '/school1.png' },
  { id: 'summer-2', schoolId: 'the-orbis-school', name: 'PT T-Shirt (Grey)', schoolName: 'The Orbis School', price: 299, image: '/school2.png' },
  { id: 'summer-3', schoolId: 'bharati-rabindranath-tagore', name: 'School Blazer', schoolName: "Bharati Vidyapeeth's Rabindranath Tagore School", price: 899, image: '/school3.png' },
  { id: 'summer-4', schoolId: 'school-4', name: 'Track Pants', schoolName: 'Featured School Four', price: 399, image: '/school4.png' },
  { id: 'summer-5', schoolId: 'school-5', name: 'Pinafore (Girls)', schoolName: 'Featured School Five', price: 549, image: '/school5.png' },
  { id: 'summer-6', schoolId: 'nanded-city-public', name: 'Navy Shorts', schoolName: "Vidya Pratishthan's Nanded City Public School", price: 349, image: '/school1.png' },
  { id: 'summer-7', schoolId: 'the-orbis-school', name: 'House T-Shirt', schoolName: 'The Orbis School', price: 279, image: '/school2.png' },
  { id: 'summer-8', schoolId: 'bharati-rabindranath-tagore', name: 'Full Sleeve Shirt', schoolName: "Bharati Vidyapeeth's Rabindranath Tagore School", price: 499, image: '/school3.png' },
  { id: 'summer-9', schoolId: 'school-4', name: 'School Tie', schoolName: 'Featured School Four', price: 199, image: '/school4.png' },
  { id: 'summer-10', schoolId: 'school-5', name: 'Sports Jersey', schoolName: 'Featured School Five', price: 429, image: '/school5.png' },
];

function findProductInCatalog(catalog) {
  return (productId) => {
    if (!catalog?.categories) return null;
    for (const cat of catalog.categories) {
      const p = cat.products.find((pr) => pr.id === productId);
      if (p) return { product: p, categoryId: cat.id, categoryName: cat.name };
    }
    return null;
  };
}

export function getProduct(productId, schoolSlug) {
  if (schoolSlug) {
    const catalog = getSchoolCatalog(schoolSlug);
    const found = findProductInCatalog(catalog)(productId);
    if (found) {
      return { product: found.product, schoolName: catalog.name, schoolSlug, categoryId: found.categoryId, categoryName: found.categoryName };
    }
  }
  const fromLatest = latestProducts.find((p) => p.id === productId);
  if (fromLatest) {
    return {
      product: { id: fromLatest.id, name: fromLatest.name, price: fromLatest.price, image: fromLatest.image, colors: getProductColors({ colors: [] }), sizes: [] },
      schoolName: fromLatest.schoolName,
      schoolSlug: fromLatest.schoolId,
    };
  }
  if (!schoolSlug) {
    for (const slug of getAllSchoolSlugs()) {
      const catalog = getSchoolCatalog(slug);
      const found = findProductInCatalog(catalog)(productId);
      if (found) return { product: found.product, schoolName: catalog.name, schoolSlug: slug, categoryId: found.categoryId, categoryName: found.categoryName };
    }
  }
  return null;
}

/**
 * Which catalog category IDs to recommend based on what's in the cart.
 * Shirt/tops → pant, blazer, accessories (tie, socks), shoes.
 * Sports T-Shirt → track pant (same color when available).
 * Shoes → socks (accessories).
 */
function getRecommendedCategoryIds(categoryId, productName) {
  const name = (productName || '').toLowerCase();
  const cat = (categoryId || '').toLowerCase();

  if (cat.includes('shoes')) {
    return ['accessories', 'acc', 'accessory'];
  }
  if (cat.includes('sport')) {
    if (name.includes('track') || name.includes('pant')) return [];
    return ['pants-trousers', 'pants'];
  }
  if (cat.includes('shirt') || cat === 'shirts-tops' || cat === 'uniform') {
    return ['pants-trousers', 'pants', 'accessories', 'acc', 'shoes', 'shirts-tops', 'uniform'];
  }
  if (cat.includes('pant') || cat.includes('trouser')) {
    return ['shirts-tops', 'shirts', 'accessories', 'acc', 'shoes', 'uniform'];
  }
  return [];
}

/**
 * Smart recommendations for cart: pant/shirt/tie/socks/shoes pairing, sport shirt → track pant, shoes → socks.
 * Returns items from same school(s) as cart, not already in cart. Premium upsell, not "complete your kit" gimmick.
 */
export function getRecommendedForCart(cartItems, limit = 8) {
  if (!cartItems?.length) return [];
  const cartIds = new Set(cartItems.map((i) => i.productId));
  const seen = new Set();
  const out = [];

  for (const item of cartItems) {
    const resolved = getProduct(item.productId);
    if (!resolved?.schoolSlug || !resolved.categoryId) continue;
    const catalog = getSchoolCatalog(resolved.schoolSlug);
    if (!catalog?.categories) continue;

    const wantedIds = getRecommendedCategoryIds(resolved.categoryId, resolved.product?.name);
    const wantedSet = new Set(wantedIds);

    for (const cat of catalog.categories) {
      const catId = (cat.id || '').toLowerCase();
      const matches = wantedIds.some((w) => catId.includes(w) || w.includes(catId));
      if (!matches) continue;
      for (const p of cat.products) {
        if (cartIds.has(p.id) || seen.has(p.id)) continue;
        seen.add(p.id);
        out.push({ product: p, schoolName: catalog.name, schoolSlug: resolved.schoolSlug });
        if (out.length >= limit) break;
      }
      if (out.length >= limit) break;
    }
  }

  const cartColors = new Set(cartItems.map((i) => i.color).filter(Boolean));
  if (cartColors.size) {
    out.sort((a, b) => {
      const aMatch = a.product.colors?.some((c) => cartColors.has(c.name));
      const bMatch = b.product.colors?.some((c) => cartColors.has(c.name));
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  }

  return out.slice(0, limit);
}

export function getRelatedProducts(productId, schoolSlug, limit = 6) {
  const out = [];
  if (schoolSlug) {
    const catalog = getSchoolCatalog(schoolSlug);
    if (catalog?.categories) {
      for (const cat of catalog.categories) {
        for (const p of cat.products) {
          if (p.id !== productId) out.push({ product: p, schoolName: catalog.name, schoolSlug });
          if (out.length >= limit) return out;
        }
      }
    }
  }
  for (const p of latestProducts) {
    if (p.id !== productId) {
      out.push({
        product: { id: p.id, name: p.name, price: p.price, image: p.image },
        schoolName: p.schoolName,
        schoolSlug: p.schoolId,
      });
    }
    if (out.length >= limit) break;
  }
  return out.slice(0, limit);
}
