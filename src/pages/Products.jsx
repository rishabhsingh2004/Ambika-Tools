import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, X, Folders, MessageCircle, Frown, Loader2 } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { CATEGORIES, PRODUCTS as STATIC_PRODUCTS } from '../data/products';
import { config, waLink } from '../data/config';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import SEO from '../components/SEO';

const Products = () => {
  const { categoryId } = useParams();
  const [activeCategory, setActiveCategory] = useState(categoryId || 'all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState(STATIC_PRODUCTS);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setActiveCategory(categoryId || 'all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categoryId]);

  // Fetch products from API on mount
  useEffect(() => {
    getProducts()
      .then(res => { if (res.data?.length) setProducts(res.data); })
      .catch((err) => { console.error('API Error:', err); setLoading(false); })
      .finally(() => setLoading(false));
  }, []);

  // Body scroll lock when filter sidebar open on mobile
  React.useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [sidebarOpen]);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.categoryId === activeCategory);

  const currentCategory = CATEGORIES.find(c => c.id === activeCategory);

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    setSidebarOpen(false);
  };

  /* ── Sidebar content (reused in desktop + mobile) ── */
  const SidebarContent = () => (
    <>
      <div className="bg-blue-700 text-white px-4 py-3 font-poppins font-semibold text-sm flex items-center justify-between">
        Product Categories
        {/* Close btn — mobile only */}
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
          <X size={14} />
        </button>
      </div>
      <ul className="divide-y divide-gray-100">
        <li>
          <button
            onClick={() => handleCategoryClick('all')}
            className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between font-medium transition-colors ${
              activeCategory === 'all' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center gap-2"><Folders size={16} className="text-gray-500" /> All Products</span>
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{products.length}</span>
          </button>
        </li>
        {CATEGORIES.map(cat => {
          const count = products.filter(p => p.categoryId === cat.id).length;
          return (
            <li key={cat.id}>
              <button
                onClick={() => handleCategoryClick(cat.id)}
                className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between font-medium transition-colors ${
                  activeCategory === cat.id ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2">{cat.icon} {cat.label}</span>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{count}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="m-3 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
        <p className="text-xs text-gray-600 mb-2">Not sure which machine fits you?</p>
        <a href={waLink()} target="_blank" rel="noreferrer"
          className="text-xs font-bold text-green-700 hover:underline flex items-center justify-center gap-1"><FontAwesomeIcon icon={faWhatsapp} className="text-base" /> Ask on WhatsApp</a>
      </div>
    </>
  );

  return (
    <div className="min-h-screen pt-[72px]">
      <SEO 
        title="Our Products" 
        description="Browse our wide range of weighing scales, cash counters, gold melting machines, and more."
      />
      {/* Breadcrumb */}
      <div className="sec-white border-b border-gray-200 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-blue-700">Products</Link>
          {currentCategory && (
            <>
              <ChevronRight size={14} />
              <span className="text-gray-800 font-medium">{currentCategory.label}</span>
            </>
          )}
        </div>
      </div>

      <div className="sec-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Mobile Filter Toggle ── */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors self-start mb-4"
          >
            <SlidersHorizontal size={16} /> Filter Categories
            {activeCategory !== 'all' && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full ml-1">
                {currentCategory?.label}
              </span>
            )}
          </button>

          {/* ── Mobile Sidebar Overlay ── */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-100 lg:hidden" onClick={() => setSidebarOpen(false)}>
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              <aside
                className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl overflow-y-auto"
                style={{ animation: 'slideInLeft 0.25s ease-out' }}
                onClick={e => e.stopPropagation()}
              >
                <SidebarContent />
              </aside>
            </div>
          )}

          {/* ── Desktop Sidebar (always visible) ── */}
          <aside className="hidden lg:block lg:w-60 shrink-0">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden sticky top-24">
              <SidebarContent />
            </div>
          </aside>

          {/* ── Product Grid ── */}
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-poppins font-bold text-gray-900">
                {currentCategory ? <span className="flex items-center gap-2">{currentCategory.icon} {currentCategory.label}</span> : <span className="flex items-center gap-2"><Folders size={24} className="text-blue-600" /> All Products</span>}
              </h1>
              <p className="text-gray-500 text-sm mt-1">{filteredProducts.length} products found</p>
            </div>

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
                <Loader2 size={28} style={{ animation: 'spin 1s linear infinite', color: '#2563eb' }} />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Products Available
                </h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  This category is coming soon. 
                  Please enquire on WhatsApp for 
                  availability.
                </p>
                <a 
                  href={`https://wa.me/${config.whatsapp}`}
                  target="_blank"
                  className="mt-6 bg-green-500 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faWhatsapp} />
                  Ask on WhatsApp
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product._id || product.id} product={{ ...product, id: product._id || product.id }} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Products;
