/**
 * Lightweight in-memory API cache with request deduplication.
 *
 * • Same URL fetched within `ttl` ms returns the cached response instantly.
 * • If a request is already in-flight, subsequent callers await the same
 *   Promise instead of firing a duplicate HTTP request.
 * • Cache entries are auto-evicted after `ttl` ms.
 */

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const cache = new Map();      // url → { data, ts }
const inflight = new Map();   // url → Promise

const DEFAULT_TTL = 2 * 60 * 1000; // 2 minutes

/**
 * Fetch with deduplication + in-memory cache.
 * @param {string} path  — relative path like `/api/public/schools`
 * @param {object} opts
 * @param {number} opts.ttl  — cache lifetime in ms (default 2 min)
 * @param {boolean} opts.forceRefresh — skip cache
 * @returns {Promise<any>}  — parsed JSON
 */
export async function cachedFetch(path, { ttl = DEFAULT_TTL, forceRefresh = false } = {}) {
  const url = `${API_BASE}${path}`;

  // 1. Return cached data if still fresh
  if (!forceRefresh && cache.has(url)) {
    const entry = cache.get(url);
    if (Date.now() - entry.ts < ttl) {
      return entry.data;
    }
    cache.delete(url);
  }

  // 2. If an identical request is already in-flight, piggyback on it
  if (inflight.has(url)) {
    return inflight.get(url);
  }

  // 3. Fire the request
  const promise = fetch(url)
    .then(async (res) => {
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      cache.set(url, { data, ts: Date.now() });
      return data;
    })
    .finally(() => {
      inflight.delete(url);
    });

  inflight.set(url, promise);
  return promise;
}

/**
 * Pre-warm the cache for a list of paths (fire-and-forget).
 */
export function prefetch(...paths) {
  paths.forEach((p) => cachedFetch(p).catch(() => {}));
}

/**
 * Invalidate one or all cache entries.
 */
export function invalidateCache(path) {
  if (path) {
    cache.delete(`${API_BASE}${path}`);
  } else {
    cache.clear();
  }
}
