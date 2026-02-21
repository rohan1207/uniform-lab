import NewHero from '@/components/NewHero';
import SchoolLogoStrip from '@/components/landing/SchoolLogoStrip';
import AboutSection from '@/components/landing/AboutSection';
import ServicesSection from '@/components/landing/ServicesSection';
import WhyChooseSection from '@/components/landing/WhyChooseSection';
import QualitySection from '@/components/landing/QualitySection';
import FAQSection from '@/components/landing/FAQSection';
import ShopByLookSection from '@/components/landing/ShopByLookSection';

export default function LandingPage() {
  return (
    <main
      className="min-h-screen flex flex-col relative overflow-x-hidden"
      style={{ backgroundColor: 'var(--page-bg)' }}
    >
      <NewHero />
      <SchoolLogoStrip />
      <ServicesSection />
      <ShopByLookSection />
      <WhyChooseSection />
      <QualitySection />
      <AboutSection />
      <FAQSection />
      {/* <ChoosePathSection id="choose-path" /> */}
    </main>
  );
}
