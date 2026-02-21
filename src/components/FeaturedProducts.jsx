import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { featuredSchools as schools } from '@/data/featuredSchools';

export default function FeaturedProducts() {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? schools.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.level.toLowerCase().includes(query.toLowerCase())
      )
    : schools;

  return (
    <section className="pt-12 pb-16 sm:pt-16 sm:pb-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-navy)] mb-3 leading-tight">
            Featured Schools
          </h2>
          <p className="text-[var(--color-text-muted)] text-base sm:text-lg max-w-2xl mx-auto mb-2 leading-relaxed">
            Shop everything you need for your school – uniforms, blazers, ties, socks and all
            accessories at competitive prices.
          </p>
          <p className="text-[var(--color-navy)] font-semibold text-sm sm:text-base mt-3">
            Select your school below to see your items.
          </p>
        </div>

        <div className="relative mb-8 max-w-md mx-auto">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]"
            strokeWidth={1.8}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your school..."
            className="w-full pl-12 pr-4 py-3.5 rounded-full border border-[var(--color-border)] bg-[var(--color-cream)] text-[var(--color-navy)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)]/50 transition-all"
            aria-label="Search school"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {filtered.map((school) => (
            <Link
              key={school.id}
              to={`/schools/${school.id}`}
              className="group flex flex-col overflow-hidden border border-[var(--color-border)] bg-white transition-colors hover:border-[var(--color-navy)]/30 hover:shadow-md"
            >
              <div className="aspect-[3/4] relative bg-[var(--color-cream)]">
                <img
                  src={school.image}
                  alt={school.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-4 text-left">
                <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-[0.2em] mb-1.5">
                  {school.level}
                </p>
                <p className="font-serif text-base sm:text-lg text-[var(--color-navy)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2 font-semibold">
                  {school.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[var(--color-text-muted)] py-8">
            No school found. Try a different search.
          </p>
        )}

        <div className="text-center mt-6">
          <Link
            to="/schools"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[var(--color-navy)] text-[var(--color-navy)] font-medium hover:bg-[var(--color-navy)] hover:text-white transition-colors"
          >
            View all schools
          </Link>
        </div>
      </div>
    </section>
  );
}
