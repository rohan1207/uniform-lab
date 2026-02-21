const team = [
  {
    name: 'Priyank Mota',
    role: 'Co-founder',
    bio: 'Background of strong family experience in garments retailing. First-hand experience in customer service has given us an edge to capture the clientele and turn them into long-term business associations.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Nivedita Mota',
    role: 'Co-founder',
    bio: 'Strong professional background in various industry verticals. Helps streamline traditional business into modern technology-based processes. Emphasizes process-driven organization and automated, customer-friendly systems.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
];

export default function TheBrains() {
  return (
    <section id="team" className="py-20 sm:py-28 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-navy)] text-center mb-4">
          The Brains
        </h2>
        <p className="text-[var(--color-text-muted)] text-center max-w-xl mx-auto mb-14">
          A young, enthusiastic, energetic, powerful couple driving The Uniform Lab.
        </p>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {team.map((person) => (
            <div
              key={person.name}
              className="rounded-2xl border border-[var(--color-border)] overflow-hidden bg-[var(--color-cream)] hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square relative">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-[var(--color-navy)]">{person.name}</h3>
                <p className="text-[var(--color-accent)] text-sm font-medium mb-3">{person.role}</p>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{person.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
