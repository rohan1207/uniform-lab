import NewHero from '@/components/NewHero';
import SchoolLogoStrip from '@/components/landing/SchoolLogoStrip';
import AboutSection from '@/components/landing/AboutSection';
import ServicesSection from '@/components/landing/ServicesSection';
import WhyChooseSection from '@/components/landing/WhyChooseSection';
import QualitySection from '@/components/landing/QualitySection';
import FAQSection from '@/components/landing/FAQSection';
import ShopByLookSection from '@/components/landing/ShopByLookSection';
import FeaturedSchools from '@/pages/FeaturedSchools';
import TrustedBy from '@/components/TrustedBy';
  
export default function HomePage() {
  return (
    <main
      className="min-h-screen flex flex-col relative overflow-x-hidden"
      style={{ backgroundColor: 'var(--page-bg)' }}
    >
      <NewHero />
      <SchoolLogoStrip />
      <FeaturedSchools />
      <ShopByLookSection />
      <ServicesSection />
     
      <WhyChooseSection />
      <QualitySection />
      <AboutSection />
      <TrustedBy />
      <FAQSection />
      {/* <ChoosePathSection id="choose-path" /> */}
    </main>
  );
}
