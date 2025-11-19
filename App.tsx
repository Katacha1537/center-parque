import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Catalog from './components/Catalog';
import Footer from './components/Footer';
import FloatingWhatsapp from './components/FloatingWhatsapp';
import Terms from './components/Terms';
import Privacy from './components/Privacy';

// Admin
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProducts from './components/admin/AdminProducts';
import AdminCategories from './components/admin/AdminCategories';
import AdminGallery from './components/admin/AdminGallery';

import { CartProvider } from './context/CartContext';
import { DataProvider } from './context/DataContext';
import CartDrawer from './components/CartDrawer';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <DataProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-brand-red selection:text-white flex flex-col">
            <Routes>
              {/* Admin Routes (No Header/Footer) */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/produtos" element={<AdminProducts />} />
              <Route path="/admin/categorias" element={<AdminCategories />} />
              <Route path="/admin/galeria" element={<AdminGallery />} />

              {/* Public Routes */}
              <Route path="*" element={
                <>
                  <Header />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/catalogo" element={<Catalog />} />
                      <Route path="/produto/:id" element={<ProductDetails />} />
                      <Route path="/termos" element={<Terms />} />
                      <Route path="/privacidade" element={<Privacy />} />
                    </Routes>
                  </main>
                  <Footer />
                  <FloatingWhatsapp />
                  <CartDrawer />
                </>
              } />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </DataProvider>
  );
}

export default App;