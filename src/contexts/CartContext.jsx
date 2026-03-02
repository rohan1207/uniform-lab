import { createContext, useContext, useReducer, useCallback, useState } from 'react';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'uniformlab_cart';

function itemKey(item) {
  const parts = [item.productId];
  if (item.size) parts.push(item.size);
  if (item.color) parts.push(String(item.color).trim());
  return parts.join('-');
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { productId, name, price, size, color, quantity = 1, image, variantCode } = action.payload;
      const newItem = {
        productId,
        name,
        price,
        size: size || null,
        color: color || null,
        quantity,
        image: image || null,
        variantCode: variantCode || null,
      };
      const key = itemKey(newItem);
      const existing = state.items.find((i) => itemKey(i) === key);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            itemKey(i) === key ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      }
      return { ...state, items: [...state.items, newItem] };
    }
    case 'REMOVE': {
      const key = itemKey(action.payload);
      return {
        ...state,
        items: state.items.filter((i) => itemKey(i) !== key),
      };
    }
    case 'UPDATE_QTY': {
      const { productId, size, color, quantity } = action.payload;
      const key = itemKey({ productId, size: size || null, color: color || null });
      if (quantity < 1) {
        return { ...state, items: state.items.filter((i) => itemKey(i) !== key) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          itemKey(i) === key ? { ...i, quantity } : i
        ),
      };
    }
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    () => {
      try {
        if (typeof window !== 'undefined') {
          const raw = window.localStorage.getItem(CART_STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && Array.isArray(parsed.items)) {
              return { items: parsed.items };
            }
          }
        }
      } catch {
        // ignore
      }
      return { items: [] };
    }
  );
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Buy Now: a single item that bypasses the cart and goes straight to checkout
  const [buyNowItem, setBuyNowItemRaw] = useState(null);

  const setBuyNowItem = useCallback((item) => {
    setBuyNowItemRaw(item);
  }, []);

  const clearBuyNow = useCallback(() => {
    setBuyNowItemRaw(null);
  }, []);

  const addItem = useCallback((item) => {
    dispatch({ type: 'ADD', payload: item });
  }, []);

  const removeItem = useCallback((productId, size = null, color = null) => {
    dispatch({ type: 'REMOVE', payload: { productId, size, color } });
  }, []);

  const updateQuantity = useCallback((productId, size, quantity, color = null) => {
    dispatch({ type: 'UPDATE_QTY', payload: { productId, size, color, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const openCart = useCallback(() => setCartDrawerOpen(true), []);
  const closeCart = useCallback(() => setCartDrawerOpen(false), []);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Persist cart to localStorage so it survives reloads
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items: state.items }));
    } catch {
      // ignore
    }
  }

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        totalAmount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartDrawerOpen,
        openCart,
        closeCart,
        buyNowItem,
        setBuyNowItem,
        clearBuyNow,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
