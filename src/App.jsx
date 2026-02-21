import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CartProvider } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartDrawerWrapper } from '@/components/CartDrawerWrapper';

import LandingPage from '@/pages/LandingPage';
import SchoolsPage from '@/pages/SchoolsPage';
import SchoolProductsPage from '@/pages/SchoolProductsPage';
import ProductPage from '@/pages/ProductPage';
import CheckoutPage from '@/pages/CheckoutPage';
import SchoolEnquiryPage from '@/pages/SchoolEnquiryPage';
import SizeGuidePage from '@/pages/SizeGuidePage';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import FAQPage from '@/pages/FAQPage';
import HomePage from '@/pages/HomePage';
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LayoutContent() {
  const { pathname } = useLocation();
  const isLanding = pathname === '/';

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/schools" element={<SchoolsPage />} />
          <Route path="/schools/:slug" element={<SchoolProductsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/schoolenquiry" element={<SchoolEnquiryPage />} />
          <Route path="/size-guide" element={<SizeGuidePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/faqs" element={<FAQPage />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawerWrapper />
    </>
  );
}

function AppLayout() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <LayoutContent />
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default function App() {
  return <AppLayout />;
}
