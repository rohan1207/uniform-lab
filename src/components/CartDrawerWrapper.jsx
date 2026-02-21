import { useCart } from '@/contexts/CartContext';
import { CartDrawer } from '@/components/schools/CartDrawer';

export function CartDrawerWrapper() {
  const { cartDrawerOpen, closeCart } = useCart();
  return <CartDrawer open={cartDrawerOpen} onClose={closeCart} />;
}
