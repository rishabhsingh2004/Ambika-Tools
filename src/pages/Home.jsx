import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle, ArrowRight, Shield, Zap, Globe, CreditCard, MessageCircle, Factory, ShieldCheck, Truck, Headphones, BadgeCheck } from 'lucide-react';
import { CATEGORIES, PRODUCTS as STATIC_PRODUCTS } from '../data/products';
import catCashCounting from '../assets/categories/cat-cash-counting.png';
import catGoldMelting from '../assets/categories/cat-gold-melting.png';
import catWeighing from '../assets/categories/cat-weighing.png';
import catSafeLockers from '../assets/categories/cat-safe-metallic.png';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { config, waLink } from '../data/config';

const STATS = [
  { value: '25+', label: 'Years Experience' },
  { value: '10K+', label: 'Happy Clients' },
  { value: '4', label: 'Product Lines' },
  { value: '100%', label: 'BIS Certified' },
];

/* ── Scroll Reveal Hook ── */
const useScrollReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px 0px 0px' }
    );
    const elements = ref.current?.querySelectorAll('.reveal');
    elements?.forEach(el => observer.observe(el));

    // Fallback: force-reveal all sections after 1.5s if observer misses
    const fallback = setTimeout(() => {
      elements?.forEach(el => el.classList.add('visible'));
    }, 1500);

    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, []);
  return ref;
};

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Gupta",
    business: "Gupta Jewellers",
    city: "Jaipur",
    rating: 5,
    review: "Ambika Tools ne humari jewellery shop ke liye best weighing machine provide ki. 2 saal ho gaye, abhi bhi perfectly accurate hai. Service bhi bahut fast hai."
  },
  {
    id: 2,
    name: "Sunil Agarwal",
    business: "Agarwal Traders",
    city: "Mumbai",
    rating: 5,
    review: "Cash counting machine liya tha, speed aur accuracy dono mein best hai. Bank grade quality hai. Puri team bahut helpful thi installation ke time."
  },
  {
    id: 3,
    name: "Manoj Sharma",
    business: "Sharma Gold House",
    city: "Delhi",
    rating: 5,
    review: "Safe locker quality ekdum top class hai. Fire resistant aur burglar proof dono. Humari 3 branches mein Ambika ka hi safe use karte hain. Highly recommended!"
  },
  {
    id: 4,
    name: "Pradeep Mehta",
    business: "Punjab National Bank",
    city: "Ludhiana",
    rating: 5,
    review: "Bank ke liye strong room door install karwaya. Quality aur finish dono mein no compromise. Installation team professional thi aur time pe kaam kiya."
  },
  {
    id: 5,
    name: "Vikram Singh",
    business: "Singh Jewels & Co.",
    city: "Chandigarh",
    rating: 5,
    review: "Gold melting machine bahut reliable hai. Temperature control accurate hai aur build quality zabardast. After sales service bhi bahut acha hai Ambika ka."
  }
];

const Home = () => {
  const [allProducts, setAllProducts] = useState(STATIC_PRODUCTS);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const pageRef = useScrollReveal();

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const totalSlides = isMobile ? TESTIMONIALS.length : 1; // desktop shows all 3 at once

  useEffect(() => {
    getProducts()
      .then(res => { 
        if (res.data?.length) {
          const apiProducts = res.data.map(p => ({ ...p, id: p._id || p.id }));
          const apiCategoryIds = new Set(apiProducts.map(p => p.categoryId));
          const missingStaticProducts = STATIC_PRODUCTS.filter(p => !apiCategoryIds.has(p.categoryId));
          setAllProducts([...apiProducts, ...missingStaticProducts]);
        }
      })
      .catch(() => {}); // keep static fallback
  }, []);

  // Smart selection for 4 featured products (alternating categories)
  const featured = [];
  const usedIds = new Set();
  const availableCategories = [...new Set(allProducts.map(p => p.categoryId))];
  
  let catIndex = 0;
  while (featured.length < 4 && featured.length < allProducts.length) {
    const catId = availableCategories[catIndex % availableCategories.length];
    const product = allProducts.find(p => p.categoryId === catId && !usedIds.has(p.id));
    if (product) {
      featured.push(product);
      usedIds.add(product.id);
    }
    catIndex++;
    if (catIndex > 20) break;
  }

  return (
    <div ref={pageRef}>
      {/* ═══════════════════════════════════════════════
          PREMIUM HERO SECTION (DARK BLUE)
      ═══════════════════════════════════════════════ */}
      <section className="relative pt-16 sm:pt-20 md:pt-16 pb-24 md:pb-32 flex flex-col justify-center overflow-hidden" style={{
        background: 'linear-gradient(135deg, #020617 0%, #0f172a 40%, #1e3a8a 80%, #2563eb 100%)'
      }}>

        {/* ── Grid mesh background ── */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.1]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        {/* ── Large ambient glow orbs ── */}
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full pointer-events-none" style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 65%)',
          filter: 'blur(40px)'
        }} />
        <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full pointer-events-none" style={{
          background: 'radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 65%)',
          filter: 'blur(40px)'
        }} />

        {/* ── Main Content ── */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-center">

            {/* LEFT — Text content */}
            <div className="animate-fadein text-center lg:text-left">

              {/* Brand pill */}
              <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest uppercase bg-blue-500/10 border border-blue-400/20 text-blue-300">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" style={{ animation: 'pulse 2s infinite' }} />
                India's Most Trusted Industrial Machines
              </div>

              {/* Headline */}
              <h1 className="font-poppins font-black leading-[1.08] text-white mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.02em' }}>
                Precision Machines<br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-yellow-500">
                  Engineered for
                </span>{' '}
                <span className="text-white">
                  Excellence
                </span>
              </h1>

              <p className="text-blue-100/80 text-sm md:text-base leading-relaxed mb-8 max-w-[440px] mx-auto lg:mx-0 font-medium">
                Cash counters, gold melting furnaces, precision weighing scales & secure lockers.
                Pan-India delivery with on-site installation.
              </p>

              {/* Feature chips */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
                {[
                  { icon: <Shield size={12}/>, label: 'BIS Certified' },
                  { icon: <Zap size={12}/>, label: '1-Year Warranty' },
                  { icon: <Globe size={12}/>, label: 'Pan-India Delivery' },

                ].map((chip, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-200 backdrop-blur-sm">
                    <span className="text-blue-400">{chip.icon}</span>{chip.label}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
                <Link to="/products" className="group inline-flex items-center justify-center gap-2 text-sm font-bold px-6 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-1 text-white bg-blue-600 hover:bg-blue-500 shadow-[0_4px_20px_rgba(37,99,235,0.4)] min-h-[48px]">
                  Browse Products
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href={waLink()} target="_blank" rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-sm font-bold px-6 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-1 bg-white/5 border border-white/10 text-white hover:bg-white/10 backdrop-blur-md min-h-[48px]"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="text-xl" /> WhatsApp Us
                </a>
              </div>
            </div>

            {/* RIGHT — 3D Machine Showcase with ORBITAL ANIMATION */}
            <div className="hidden lg:flex justify-center items-center relative h-[500px] ml-10">
              <div className="relative w-[440px] h-[440px]">

                {/* Central glow platform */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-56 h-12 rounded-full pointer-events-none" style={{
                  background: 'radial-gradient(ellipse, rgba(234,179,8,0.3) 0%, transparent 70%)',
                  filter: 'blur(12px)',
                  animation: 'pulse 4s infinite alternate'
                }} />

                {/* Rotating ring 1 */}
                <div className="absolute inset-0 rounded-full border pointer-events-none" style={{
                  borderColor: 'rgba(234,179,8,0.2)',
                  animation: 'spin 18s linear infinite',
                  top: '8%', left: '8%', right: '8%', bottom: '8%'
                }} />
                
                {/* Rotating ring 2 */}
                <div className="absolute rounded-full border pointer-events-none" style={{
                  borderColor: 'rgba(255,255,255,0.15)',
                  animation: 'spin-reverse 26s linear infinite',
                  top: '2%', left: '2%', right: '2%', bottom: '2%',
                  borderStyle: 'dashed'
                }} />

                {/* Main logo — center */}
                <div className="absolute inset-0 flex items-center justify-center animate-float" style={{ animationDuration: '5s' }}>
                  <div className="relative group perspective-1000">
                    <div className="absolute inset-0 rounded-full pointer-events-none transition-all duration-700 group-hover:scale-125" style={{
                      background: 'radial-gradient(circle, rgba(234,179,8,0.4) 0%, rgba(217,119,6,0.15) 50%, transparent 70%)',
                      filter: 'blur(25px)',
                      transform: 'scale(1.4)'
                    }} />
                    <img src="/logo.png" alt="Ambika Tools Logo"
                      className="relative w-[380px] h-[380px] object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-y-12"
                      style={{ filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.6)) drop-shadow(0 0 20px rgba(234,179,8,0.4))' }}
                    />
                  </div>
                </div>

                {/* ORBITAL TRACK FOR CARDS */}
                <div className="absolute inset-0 pointer-events-none" style={{ animation: 'spin 20s linear infinite' }}>
                  
                  {/* Floating card — Speed */}
                  <div className="absolute top-[10%] right-[0%] -translate-x-1/2 -translate-y-1/2" style={{ animation: 'spin-reverse 20s linear infinite' }}>
                    <div className="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap bg-brand-dark/90 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                      <p className="text-gray-400 text-[9px] mb-0.5 uppercase tracking-wide">Speed</p>
                      <p className="text-white font-poppins font-black text-base leading-none">2000<span className="text-[9px] text-gray-400 font-normal ml-0.5">notes/min</span></p>
                    </div>
                  </div>

                  {/* Floating card — BIS */}
                  <div className="absolute bottom-[0%] left-[10%] -translate-x-1/2 -translate-y-1/2" style={{ animation: 'spin-reverse 20s linear infinite' }}>
                    <div className="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap bg-brand-dark/90 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                        <span className="text-green-400 text-[9px] font-bold uppercase tracking-wider">BIS Certified</span>
                      </div>
                      <p className="text-gray-300 font-semibold mt-0.5 text-[10px]">UV + MG + IR Detection</p>
                    </div>
                  </div>

                  {/* Floating card — Rating */}
                  <div className="absolute top-[20%] left-[-5%] -translate-x-1/2 -translate-y-1/2" style={{ animation: 'spin-reverse 20s linear infinite' }}>
                    <div className="px-3 py-1.5 rounded-xl whitespace-nowrap bg-brand-dark/90 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                      <p className="text-yellow-400 text-[9px] font-bold mb-0.5 tracking-wider">★★★★★ Rating</p>
                      <p className="text-gray-300 text-[9px] font-medium">10,000+ Customers</p>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OVERLAPPING STATS BAR ── */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 -mt-12 z-20">
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 p-4 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 md:divide-x divide-gray-100">
            {STATS.map((s, i) => (
              <div key={i} className="text-center px-4">
                <p className="font-poppins font-black text-2xl md:text-3xl text-blue-600 mb-1">{s.value}</p>
                <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ TRUST BAR ═══ */}
      <section className="sec-gray border-y border-gray-200 mt-10 sm:mt-12 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {['BIS Certified Products', 'Pan-India Delivery', '1-Year Warranty', 'On-Site Installation', 'WhatsApp Support'].map(t => (
            <span key={t} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <CheckCircle size={15} className="text-blue-600 shrink-0" />
              <span className="text-[13px] sm:text-sm">{t}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ═══ CATEGORY CARDS — Colorful Gradient Style ═══ */}
      <section className="sec-white sec-pad reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <p className="section-label">What We Offer</p>
            <h2 className="section-heading">Our <span>Product Categories</span></h2>
            <p className="section-subtitle">Click on any category to explore all available models</p>
            <div className="section-accent" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(() => {
              const CAT_DATA = {
                'cash-counting': {
                  desc: 'High-speed currency counters for banks, jewellers & businesses',
                  gradient: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                  btnBg: '#16a34a', btnText: '#fff', accent: '#16a34a',
                  image: catCashCounting,
                },
                'gold-melting': {
                  desc: 'Precision induction melters for gold, silver & metal processing',
                  gradient: 'linear-gradient(135deg, #fff7ed, #fed7aa)',
                  btnBg: '#ea580c', btnText: '#fff', accent: '#ea580c',
                  image: catGoldMelting,
                },
                'weighing': {
                  desc: 'Accurate digital scales for jewellery & bullion weighing',
                  gradient: 'linear-gradient(135deg, #eff6ff, #bfdbfe)',
                  btnBg: '#2563eb', btnText: '#fff', accent: '#2563eb',
                  image: catWeighing,
                },
                'safe-locker': {
                  desc: 'Heavy-duty security lockers for homes, offices & jewellery shops',
                  gradient: 'linear-gradient(135deg, #f5f3ff, #ddd6fe)',
                  btnBg: '#7c3aed', btnText: '#fff', accent: '#7c3aed',
                  image: catSafeLockers,
                },
              };
              return CATEGORIES.map((cat, i) => {
                const d = CAT_DATA[cat.id];
                const firstProduct = allProducts.find(p => p.categoryId === cat.id);
                return (
                  <Link key={cat.id} to={`/products/${cat.id}`}
                    className="group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.13)]"
                    style={{ background: d.gradient, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                  >
                    {/* Image area */}
                    <div className="relative w-full h-32 md:h-44 rounded-t-xl overflow-hidden">
                      <img 
                        src={d.image}
                        alt={cat.label}
                        className="w-full h-full object-contain p-4 drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                      {/* Big faded number overlay */}
                      <span className="absolute font-poppins leading-none select-none pointer-events-none"
                        style={{ 
                          top: '10px', 
                          right: '14px', 
                          zIndex: 20, 
                          color: '#ffffff', 
                          opacity: 0.9, 
                          fontSize: '28px', 
                          fontWeight: 900, 
                          textShadow: '0 2px 8px rgba(0,0,0,0.5)' 
                        }}>
                        0{i + 1}
                      </span>
                    </div>

                    {/* Content area */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-poppins font-bold text-[20px] text-gray-900 leading-tight mb-2">
                        {cat.label}
                      </h3>
                      <p className="text-gray-600 text-[13px] leading-relaxed mb-4 line-clamp-2 flex-1">
                        {d.desc}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full self-start transition-all duration-300 group-hover:gap-2.5 group-hover:shadow-lg"
                        style={{ background: d.btnBg, color: d.btnText, boxShadow: `0 4px 14px ${d.btnBg}40` }}>
                        View Models <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              });
            })()}
          </div>
        </div>
      </section>

      <div className="sec-divider" />

      {/* ═══ FEATURED PRODUCTS ═══ */}
      <section className="sec-gray sec-pad reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <p className="section-label">Top Picks</p>
            <h2 className="section-heading"><span>Featured</span> Products</h2>
            <p className="section-subtitle">Handpicked bestsellers trusted by thousands of businesses</p>
            <div className="section-accent" />
          </div>
          <div className="flex items-center justify-end mb-4 -mt-4">
            <Link to="/products" className="flex items-center gap-1 text-sm text-blue-600 font-semibold hover:gap-2 hover:text-blue-700 transition-all">
              View All <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <div className="sec-divider" />

      {/* ═══ WHY CHOOSE US ═══ */}
      <section className="sec-white sec-pad reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <p className="section-label">Our Promise</p>
            <h2 className="section-heading">Why Choose <span>Ambika Tools?</span></h2>
            <p className="section-subtitle">We stand by every machine we sell</p>
            <div className="section-accent" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              { icon: <Factory className="text-blue-600" size={24} />, title: `${new Date().getFullYear() - parseInt(config.founded)}+ Years Experience`, desc: `Trusted by thousands of businesses since ${config.founded}. Built on a foundation of quality and reliability.` },
              { icon: <ShieldCheck className="text-blue-600" size={24} />, title: '1-Year Full Warranty', desc: 'Every machine comes with a 1-year full parts & service warranty, with AMC options available.' },
              { icon: <Truck className="text-blue-600" size={24} />, title: 'Pan-India Delivery', desc: 'We deliver and install machines anywhere in India, with a dedicated service team in all major cities.' },
              { icon: <Headphones className="text-blue-600" size={24} />, title: '24/7 Support', desc: 'Our technical team is just a call away. We provide on-site support and remote troubleshooting.' },
              { icon: <BadgeCheck className="text-blue-600" size={24} />, title: 'BIS Certified', desc: 'All products meet BIS and NABL standards — suitable for banks, government, and enterprise use.' },
              { icon: <CreditCard className="text-blue-600" size={24} />, title: 'Flexible Payment', desc: 'We offer flexible payment terms for bulk orders. GST billing available.' },
            ].map((item, i) => (
              <div key={i}
                className="group flex gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-2xl card-hover cursor-default"
                style={{ border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(15,23,42,0.05)' }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', boxShadow: '0 4px 12px rgba(59,130,246,0.12)' }}
                >
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-gray-900 mb-1 text-xs sm:text-sm group-hover:text-blue-700 transition-colors">{item.title}</h4>
                  <p className="hidden md:block text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="border-t border-gray-100" />
      {/* ═══ CTA BANNER ═══ */}
      <section className="relative overflow-hidden sec-pad reveal"
        style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)' }}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #60a5fa, transparent)', filter: 'blur(60px)' }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center text-white">
          <p className="text-blue-300 font-bold text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">Expert Guidance</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-black mb-3">
            Need Help Choosing the <br className="hidden sm:block" />Right Machine?
          </h2>
          <p className="text-blue-200 mb-8 text-base sm:text-lg">Talk to our expert team — we'll recommend the best machine for your business volume and budget.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <a href={waLink()} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-green-500 to-emerald-500 text-white font-bold px-8 py-3.5 rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all hover:-translate-y-0.5 min-h-[48px]"
              style={{ boxShadow: '0 6px 20px rgba(22,163,74,0.4)' }}
            >
              <FontAwesomeIcon 
                icon={faWhatsapp} 
                className="text-xl"
              /> WhatsApp Now
            </a>
            <Link to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-all hover:-translate-y-0.5 min-h-[48px]"
              style={{ boxShadow: '0 6px 20px rgba(255,255,255,0.2)' }}
            >
              Get Free Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="sec-gray reveal" style={{ padding: '64px 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <p className="section-label">Reviews</p>
            <h2 className="section-heading">What Our <span>Customers Say</span></h2>
            <p className="section-subtitle">Hear from businesses that trust Ambika Tools</p>
            <div className="section-accent" />
          </div>

          {/* Slider wrapper */}
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-all duration-500"
              style={{
                transform: isMobile
                  ? `translateX(-${currentSlide * 100}%)`
                  : 'translateX(0)'
              }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="w-full md:w-1/3 flex-shrink-0 px-2 sm:px-3"
                >
                  <div
                    className="relative bg-white rounded-2xl p-6 card-hover h-full"
                    style={{ border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(15,23,42,0.07)' }}
                  >
                    <div className="absolute top-4 right-5 text-5xl font-poppins font-black text-blue-50 select-none pointer-events-none leading-none">&ldquo;</div>
                    <div className="flex text-yellow-400 text-lg mb-3">{'★'.repeat(t.rating)}</div>
                    <p className="text-gray-700 italic text-sm leading-relaxed break-words overflow-hidden mb-5">
                      &ldquo;{t.review}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-sm font-poppins shrink-0">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                        <p className="text-gray-400 text-xs">{t.business}, {t.city}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots — mobile only */}
          {isMobile && (
            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: currentSlide === i ? '24px' : '8px',
                    height: '8px',
                    background: currentSlide === i ? '#2563eb' : '#cbd5e1'
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
