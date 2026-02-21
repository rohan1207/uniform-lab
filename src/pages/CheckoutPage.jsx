import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function CheckoutPage() {
  const { items, totalItems, totalAmount } = useCart();

  return (
    <main className="min-h-screen bg-[var(--page-bg)] pt-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/schools"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-navy)] mb-8"
        >
          <ArrowLeft size={18} />
          Back to schools
        </Link>
        <h1 className="font-serif text-2xl text-[var(--color-navy)] mb-2">
          Checkout
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm mb-8">
          Payment and delivery details will be available here. For now, this is a placeholder.
        </p>
        {items.length > 0 ? (
          <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
            <p className="text-sm text-[var(--color-text-muted)] mb-2">
              {totalItems} item{totalItems !== 1 ? 's' : ''} in cart
            </p>
            <p className="text-lg font-semibold text-[var(--color-navy)]">
              Total: ₹{totalAmount}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-[var(--color-text-muted)] rounded-xl border border-[var(--color-border)] bg-white">
            <ShoppingBag size={48} className="mb-3 opacity-50" />
            <p className="text-sm mb-4">Your cart is empty</p>
            <Link
              to="/schools"
              className="text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              Browse schools
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
