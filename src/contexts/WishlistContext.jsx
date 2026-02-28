import { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'uniformlab_wishlist';

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const isInWishlist = (productId) => items.some((i) => i.productId === productId);

  const toggleWishlist = (product) => {
    setItems((prev) => {
      if (prev.some((i) => i.productId === product.id)) {
        return prev.filter((i) => i.productId !== product.id);
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image || product.mainImageUrl || null,
          meta: product,
          addedAt: new Date().toISOString(),
        },
      ];
    });
  };

  const clearWishlist = () => setItems([]);

  return (
    <WishlistContext.Provider
      value={{
        items,
        isInWishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}

