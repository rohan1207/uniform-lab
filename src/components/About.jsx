export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[var(--color-cream)] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-cream-warm)]">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
              alt="The Uniform Lab – quality uniforms"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-navy)] mb-6">
              About The Uniform Lab
            </h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              The Uniform Lab was started to bring an organized approach to supplying uniforms to schools as well as parents. We are committed to quality, which ensures that our association with schools is long-lasting and fulfilling.
            </p>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              Schools can rest assured that our fabrics, designs, and stitching are of top-notch quality. This ensures that children wearing uniforms are comfortable in them throughout the day.
            </p>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              We believe in making the process of procuring uniforms easy and time-saving for parents. Therefore, we have an online purchase system for parents. Our team ensures purchase, returns, and reordering of the uniforms are extremely hassle free and smooth.
            </p>
            <p className="text-[var(--color-navy)] font-medium">
              &quot;Your convenience is our Priority.&quot;
            </p>
            <p className="text-[var(--color-text-muted)] text-sm mt-6">
              We are an Indian, Baramati-based company, owned by young, energetic entrepreneurs. Our dedicated team of management and employees are constantly striving to adhere to quality standards so that we can offer our customers nothing but the best products.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
