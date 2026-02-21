import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { latestProducts } from '@/data/productLookup';

export default function LatestCollection() {
  const { addItem, openCart } = useCart();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
    openCart();
  };

  return (
    <section id="collection" className="py-16 sm:py-24 bg-[var(--color-cream)] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-2">
            Latest Collection
          </h2>
          <p className="text-[var(--color-text-muted)] text-base sm:text-lg max-w-xl mx-auto">
            Summer essentials — quality uniforms for your school. Shop the new arrivals.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {latestProducts.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm hover:shadow-lg hover:border-[var(--color-navy)]/20 transition-all duration-300"
            >
              <Link to={`/product/${product.id}?school=${product.schoolId}`} className="aspect-[3/4] relative bg-[var(--color-cream-warm)] overflow-hidden block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); handleAddToCart(e, product); }}
                  className="absolute bottom-3 right-3 flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-navy)] text-white shadow-lg hover:bg-[var(--color-navy-light)] transition-colors z-10"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <ShoppingCart size={20} strokeWidth={2} />
                </button>
              </Link>
              <div className="p-4 flex flex-col flex-1">
                <Link to={`/product/${product.id}?school=${product.schoolId}`}>
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] mb-1.5 line-clamp-2 hover:underline" title={product.schoolName}>
                    {product.schoolName}
                  </p>
                  <h3 className="font-serif text-base sm:text-lg text-[var(--color-navy)] font-semibold mb-2 line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="mt-auto text-lg font-bold text-[var(--color-navy)]">
                  ₹{product.price}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
