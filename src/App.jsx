import React, { useState, useEffect } from 'react';
import { ScrollAnimationExperience } from './components/ScrollAnimationExperience';
import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailPage } from './components/shop/ProductDetailPage';
import { CheckoutPage } from './components/shop/CheckoutPage';
import { OrbitMenu } from './components/navigation/OrbitMenu';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'shop' | 'product' | 'checkout'
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sync hash changes for deep linking (e.g. #shop, #checkout, #home)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#shop') {
        setCurrentView('shop');
      } else if (hash === '#checkout') {
        setCurrentView('checkout');
      } else if (hash === '#home' || hash === '') {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenShop = () => {
    window.location.hash = '#shop';
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCheckout = () => {
    window.location.hash = '#checkout';
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    window.location.hash = '#home';
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    }, 250);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToShop = () => {
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#131417] text-white selection:bg-white selection:text-black">
      {/* Universal Sticky Header Bar & Orbit Studio Menu */}
      <OrbitMenu
        onOpenShop={handleOpenShop}
        onOpenCheckout={handleOpenCheckout}
        onNavigateHome={handleNavigateHome}
        currentView={currentView}
        isShopView={currentView !== 'home'}
      />

      {/* Main Views */}
      {currentView === 'home' && (
        <ScrollAnimationExperience
          onOpenShop={handleOpenShop}
          onNavigateHome={handleNavigateHome}
        />
      )}

      {currentView === 'shop' && (
        <ShopPage
          onSelectProduct={handleSelectProduct}
          onBackToHome={handleNavigateHome}
        />
      )}

      {currentView === 'product' && selectedProduct && (
        <ProductDetailPage
          product={selectedProduct}
          onBackToShop={handleBackToShop}
          onSelectProduct={handleSelectProduct}
          onOpenCheckout={handleOpenCheckout}
        />
      )}

      {currentView === 'checkout' && (
        <CheckoutPage
          onBackToShop={handleBackToShop}
          onNavigateHome={handleNavigateHome}
        />
      )}
    </div>
  );
}
