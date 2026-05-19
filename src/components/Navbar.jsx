import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, ArrowRight, MessageCircle, Search } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { config, waLink } from '../data/config';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [enquireOpen, setEnquireOpen] = useState(false);
  const searchRef = useRef(null);
  const enquireRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Body scroll lock when mobile menu open (iOS-compatible)
  useEffect(() => {
    if (mobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      window.history.pushState({ mobileMenu: true }, '');
      const onPopState = () => setMobileOpen(false);
      window.addEventListener('popstate', onPopState);

      return () => {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        window.removeEventListener('popstate', onPopState);
      };
    }
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
    setEnquireOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
      if (enquireRef.current && !enquireRef.current.contains(e.target)) {
        setEnquireOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    const q = searchQuery.toLowerCase();
    const results = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      CATEGORIES.find(c => c.id === p.categoryId)?.label?.toLowerCase().includes(q)
    ).slice(0, 6);
    setSearchResults(results);
  }, [searchQuery]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? 'border-gray-200/60 shadow-[0_4px_30px_rgba(0,0,0,0.06)]'
          : 'border-gray-100 bg-white'
      }`}
      style={scrolled ? {
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[72px] gap-6">

          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black font-poppins text-xl shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', boxShadow: '0 4px 14px rgba(37,99,235,0.35)' }}>
              A
            </div>
            <div>
              <div className="font-poppins font-black text-[1.25rem] leading-tight text-gray-900 tracking-tight">{config.businessName}</div>
              <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-blue-600 leading-none mt-0.5">{config.tagline}</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to}
                className={`relative px-4 py-2.5 rounded-lg transition-all duration-200 font-semibold group/link overflow-hidden ${location.pathname === to ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}>
                {label}
                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ${location.pathname === to ? 'w-4' : 'w-0 group-hover/link:w-4'}`} />
              </Link>
            ))}

            <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
              <Link to="/products"
                className={`relative flex items-center gap-1 px-4 py-2.5 rounded-lg transition-all duration-200 font-semibold group/prod overflow-hidden ${location.pathname.startsWith('/products') ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}>
                Products
                <ChevronDown size={14} className={`transition-transform duration-200 ${productsOpen ? 'rotate-180 text-blue-600' : location.pathname.startsWith('/products') ? 'text-blue-600' : ''}`} />
                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ${location.pathname.startsWith('/products') ? 'w-4' : 'w-0 group-hover/prod:w-4'}`} />
              </Link>
              {productsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-100 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.10)] py-2 z-50 overflow-hidden"
                  style={{ animation: 'fadeInUp 0.18s ease-out', minWidth: '240px' }}>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest px-4 py-2">Categories</p>
                  {CATEGORIES.map(cat => (
                    <Link key={cat.id} to={`/products/${cat.id}`}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors group/item">
                      <span className="text-xl w-8 text-center group-hover/item:scale-110 transition-transform">{cat.icon}</span>
                      <span className="text-sm font-semibold text-gray-700 group-hover/item:text-blue-600 transition-colors">{cat.label}</span>
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-2 pt-1">
                    <Link to="/products" className="flex items-center justify-between px-4 py-2.5 text-xs text-blue-600 font-bold hover:bg-blue-50 transition-colors">
                      View All Products <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            {/* Search */}
            <div ref={searchRef} className="relative hidden md:block">
              {searchOpen ? (
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input autoFocus type="text" placeholder="Search products..." value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-52 pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all" />
                  </div>
                  <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><X size={16} /></button>
                </div>
              ) : (
                <button onClick={() => setSearchOpen(true)}
                  className="p-2.5 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all" title="Search products">
                  <Search size={18} />
                </button>
              )}
              {searchOpen && searchQuery && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] z-50 overflow-hidden"
                  style={{ minWidth: '300px', animation: 'fadeInUp 0.15s ease-out' }}>
                  {searchResults.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-gray-400">No results for "<strong>{searchQuery}</strong>"</div>
                  ) : (
                    <>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest px-4 pt-3 pb-1">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''}</p>
                      {searchResults.map(p => {
                        const cat = CATEGORIES.find(c => c.id === p.categoryId);
                        return (
                          <Link key={p.id} to={`/products/item/${p.id}`}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors group/result">
                            <img src={p.image} alt={p.name} className="w-10 h-10 object-contain shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-800 group-hover/result:text-blue-600 transition-colors truncate">{p.name}</p>
                              <p className="text-[11px] text-gray-400">{cat?.icon} {cat?.label}</p>
                            </div>
                          </Link>
                        );
                      })}
                      <div className="border-t border-gray-100 mt-1">
                        <Link to="/products" className="flex items-center justify-between px-4 py-3 text-xs text-blue-600 font-bold hover:bg-blue-50 transition-colors">
                          See all products <ArrowRight size={13} />
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div ref={enquireRef} className="relative hidden md:block">
              <button onClick={() => setEnquireOpen(!enquireOpen)}
                className="flex items-center gap-2 text-[13px] font-bold px-5 py-2.5 rounded-xl text-white transition-all duration-200 hover:-translate-y-1 active:translate-y-0 hover:scale-[1.03] cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', boxShadow: '0 4px 14px rgba(37,99,235,0.30)' }}>
                Enquire Now
                <ChevronDown size={14} className={`transition-transform duration-200 ${enquireOpen ? 'rotate-180' : ''}`} />
              </button>
              {enquireOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] py-1.5 z-50 overflow-hidden"
                  style={{ animation: 'fadeInUp 0.15s ease-out', minWidth: '180px' }}>
                  <a href={waLink()} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors group/eq">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(22,163,74,0.1)' }}>
                      <MessageCircle size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 group-hover/eq:text-green-600 transition-colors">WhatsApp</p>
                      <p className="text-[11px] text-gray-400">Chat with us</p>
                    </div>
                  </a>
                  <div className="mx-3 h-px bg-gray-100" />
                  <a href={`tel:${config.phoneDial}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors group/eq">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(37,99,235,0.1)' }}>
                      <Phone size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 group-hover/eq:text-blue-600 transition-colors">Call Us</p>
                      <p className="text-[11px] text-gray-400">{config.phone}</p>
                    </div>
                  </a>
                </div>
              )}
            </div>

            <button className="md:hidden p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
              onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* ═══ MOBILE MENU ═══ */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[90]">
          {/* Backdrop — full screen dark overlay */}
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.7)', animation: 'fadeInUp 0.15s ease-out' }} />

          {/* Menu Panel — solid white, below navbar */}
          <div className="absolute top-[72px] left-0 right-0 z-[100]"
            style={{ background: '#FFFFFF', height: 'calc(100dvh - 72px)', overflow: 'hidden', animation: 'slideDown 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}>

            <div className="flex flex-col justify-between h-full" style={{ overflow: 'hidden' }}>

              {/* ── Top section ── */}
              <div className="px-4 pt-1" style={{ flex: '1 1 0', minHeight: 0, overflowY: 'auto', overflowX: 'hidden', maxHeight: '100%', WebkitOverflowScrolling: 'touch' }}>

                {/* ── X Close Button ── */}
                <div className="flex justify-end mb-1">
                  <button onClick={() => setMobileOpen(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    aria-label="Close menu">
                    <X size={18} className="text-gray-600" />
                  </button>
                </div>

                {/* ── Search Bar ── */}
                <div className="relative mb-1.5">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 bg-gray-50 focus:bg-white transition-all h-[36px]" />
                </div>

                {/* Search Results */}
                {searchQuery && searchResults.length > 0 && (
                  <div className="bg-gray-50 rounded-xl border border-gray-200 mb-2 overflow-hidden" style={{ maxHeight: '120px', overflowY: 'auto' }}>
                    {searchResults.map(p => (
                      <Link key={p.id} to={`/products/item/${p.id}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors text-sm font-semibold text-gray-700 border-b border-gray-100 last:border-0">
                        <img src={p.image} alt={p.name} className="w-9 h-9 object-contain shrink-0" />{p.name}
                      </Link>
                    ))}
                  </div>
                )}

                {/* ── Navigation Links ── */}
                <nav className="space-y-0.5">
                  {[
                    { to: '/', label: 'Home', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> },
                    { to: '/about', label: 'About Us', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> },
                    { to: '/contact', label: 'Contact', icon: <Phone size={20} /> },
                  ].map(link => {
                    const isActive = location.pathname === link.to;
                    return (
                      <Link key={link.to} to={link.to}
                        className={`flex items-center gap-3 px-3 h-[40px] rounded-xl text-[15px] font-bold transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 border-l-[3px] border-blue-600'
                            : 'text-gray-700 hover:bg-gray-50 active:bg-blue-50'
                        }`}>
                        <span className={`${isActive ? 'text-blue-600' : 'text-blue-500'}`}>{link.icon}</span>
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* ── Divider ── */}
                <div className="my-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                {/* ── Products Section ── */}
                <div>
                  <p className="text-[10px] text-blue-600 uppercase tracking-[0.2em] font-black mb-1 px-1">Products</p>
                  <div className="space-y-1" style={{ overflow: 'hidden' }}>
                    {[
                      { ...CATEGORIES.find(c => c.id === 'cash-counting'), color: '#16a34a', bg: '#f0fdf4', lucideIcon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg> },
                      { ...CATEGORIES.find(c => c.id === 'gold-melting'), color: '#ea580c', bg: '#fff7ed', lucideIcon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg> },
                      { ...CATEGORIES.find(c => c.id === 'weighing'), color: '#2563eb', bg: '#eff6ff', lucideIcon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg> },
                      { ...CATEGORIES.find(c => c.id === 'safe-locker'), color: '#7c3aed', bg: '#f5f3ff', lucideIcon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
                    ].filter(Boolean).map(cat => (
                      <Link key={cat.id} to={`/products/${cat.id}`}
                        className="flex items-center gap-3 px-2.5 rounded-xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] active:scale-[0.98] transition-all duration-200 h-[40px]">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: cat.bg, color: cat.color }}>
                          {cat.lucideIcon}
                        </div>
                        <span className="text-[14px] font-bold text-gray-800 flex-1">{cat.label}</span>
                        <ArrowRight size={16} className="text-gray-300" />
                      </Link>
                    ))}
                  </div>
                </div>

              </div>{/* end top section */}

              {/* ── Bottom section (pushed to bottom) ── */}
              <div className="mt-auto px-4 pb-4 pt-2.5 border-t border-gray-100" style={{ background: '#FFFFFF', paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest text-center mb-1.5">Enquire Now</p>
                <div className="flex gap-2">
                  <a href={waLink()} target="_blank" rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-white text-sm h-[44px]"
                    style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 4px 14px rgba(22,163,74,0.3)' }}>
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                  <a href={`tel:${config.phoneDial}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-white text-sm h-[44px]"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', boxShadow: '0 4px 14px rgba(37,99,235,0.3)' }}>
                    <Phone size={16} /> Call Us
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
