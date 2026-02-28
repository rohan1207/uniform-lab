import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from "@/contexts/AuthContext";
import { WishlistProvider } from '@/contexts/WishlistContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartDrawerWrapper } from '@/components/CartDrawerWrapper';


import SchoolsPage from '@/pages/SchoolsPage';
import SchoolProductsPage from '@/pages/SchoolProductsPage';
import ProductPage from '@/pages/ProductPage';
import CheckoutPage from '@/pages/CheckoutPage';
import AccountPage from '@/pages/AccountPage';
import WishlistPage from '@/pages/WishlistPage';
import SchoolEnquiryPage from '@/pages/SchoolEnquiryPage';
import SizeGuidePage from '@/pages/SizeGuidePage';
import SearchPage from '@/pages/SearchPage';
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

  if (pathname.startsWith('/admin')) {
    return <AdminRoutes />;
  }

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
          <Route path="/account" element={<AccountPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/schoolenquiry" element={<SchoolEnquiryPage />} />
          <Route path="/size-guide" element={<SizeGuidePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/search" element={<SearchPage />} />
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
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <LayoutContent />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default function App() {
  return <AppLayout />;
}
