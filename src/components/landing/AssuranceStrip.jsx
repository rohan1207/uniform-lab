import { Headset, ShieldCheck, Truck, CreditCard } from 'lucide-react';

const FONT_HEADING = { fontFamily: "'Baloo 2', cursive" };
const FONT_BODY = { fontFamily: "'Nunito', sans-serif" };

const ITEMS = [
  {
    icon: Headset,
    title: 'Customer support',
    text: 'Dedicated assistance before, during, and after admissions.',
  },
  {
    icon: ShieldCheck,
    title: 'High quality uniforms',
    text: 'Fabric, stitching, and fit checked at every batch.',
  },
  {
    icon: Truck,
    title: 'Fast, reliable delivery',
    text: 'Doorstep shipping and on-campus pick-up options.',
  },
  {
    icon: CreditCard,
    title: 'Secure payments',
    text: 'Trusted payment partners and encrypted checkout.',
  },
];

export default function AssuranceStrip() {
  return (
    <section className="bg-[#020617] text-white">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;600;700&display=swap');`}</style>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {ITEMS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex items-start gap-3 sm:gap-4"
              style={FONT_BODY}
            >
              <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10">
                <Icon size={18} strokeWidth={2} className="text-white" />
              </div>
              <div className="min-w-0">
                <p
                  className="text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] mb-1 text-slate-100"
                  style={FONT_HEADING}
                >
                  {title}
                </p>
                <p className="text-[11px] sm:text-xs text-slate-300 leading-snug">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

