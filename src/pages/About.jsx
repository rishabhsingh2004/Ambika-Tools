import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const About = () => (
  <div className="min-h-screen">
    {/* ═══ HERO ═══ */}
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6"
      style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />
      <div className="relative max-w-4xl mx-auto text-center text-white">
        <p className="text-blue-300 font-bold text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">Who We Are</p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold mb-3 sm:mb-4">About Ambika Tools</h1>
        <p className="text-blue-100 text-base sm:text-lg max-w-xl mx-auto">Precision machines you can trust. 25+ years of excellence in industrial hardware.</p>
        <div className="w-12 h-1 rounded-full mx-auto mt-5" style={{ background: 'linear-gradient(90deg, #60a5fa, #a5b4fc)' }} />
      </div>
    </section>

    {/* ═══ OUR STORY ═══ */}
    <section className="sec-white sec-pad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div>
          <p className="section-label">Our Journey</p>
          <h2 className="section-heading">The <span>Ambika Story</span></h2>
          <div className="section-accent !mx-0 mb-6" />
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
            <p>Founded in 2001, Ambika Tools has grown from a small machine retailer to one of India's most trusted names in industrial precision equipment.</p>
            <p>We specialize in Cash Counting Machines, Gold Melting Machines, Precision Weighing Scales, and Safe Lockers. Our products are trusted by banks, jewellers, retailers, and government institutions across India.</p>
            <p>With a dedicated service team, factory-trained technicians, and a commitment to after-sales support, we ensure every customer gets the full value of their investment.</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 flex items-center justify-center min-h-48 sm:min-h-64 border border-gray-100">
          <img src="/weighing_machine.png" alt="Our Products" className="max-h-48 sm:max-h-60 object-contain" />
        </div>
      </div>
    </section>

    <div className="sec-divider" />

    {/* ═══ STATS ═══ */}
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6"
      style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)' }}>
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{
        background: 'radial-gradient(circle at 30% 50%, #60a5fa, transparent 50%), radial-gradient(circle at 70% 50%, #818cf8, transparent 50%)',
        filter: 'blur(40px)'
      }} />
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-blue-300 font-bold text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">Our Track Record</p>
          <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white">Numbers That <span className="text-yellow-300">Speak</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          {[
            { num: '25+', label: 'Years in Business' },
            { num: '10,000+', label: 'Happy Customers' },
            { num: '4', label: 'Product Categories' },
            { num: 'Pan India', label: 'Service Network' },
          ].map((s, i) => (
            <div key={i} className="py-4 px-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-2xl sm:text-3xl font-poppins font-bold text-yellow-300 mb-1">{s.num}</p>
              <p className="text-blue-100 text-xs sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ VALUES / WHY TRUST US ═══ */}
    <section className="sec-gray sec-pad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <p className="section-label">Why Us</p>
          <h2 className="section-heading">Why Businesses <span>Trust Us</span></h2>
          <p className="section-subtitle">Industry-leading standards and customer commitment</p>
          <div className="section-accent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {[
            'BIS & NABL certified products for compliance-heavy industries',
            'Factory-trained engineers for installation & calibration',
            'Genuine spare parts & consumables always in stock',
            'Detailed user manuals and video tutorials with every machine',
            'Annual Maintenance Contracts (AMC) available',
            'Transparent pricing with GST billing',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-white border border-gray-200 p-4 rounded-xl min-h-[56px]">
              <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ CTA ═══ */}
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      <div className="relative max-w-3xl mx-auto text-center text-white">
        <p className="text-blue-400 font-bold text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">Get Started</p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-poppins font-bold mb-3 sm:mb-4">Ready to Get Started?</h2>
        <p className="text-gray-400 mb-8 text-sm sm:text-base max-w-lg mx-auto">Browse our complete product range or get in touch with our expert team today.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
          <Link to="/products" className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 font-bold px-6 py-3.5 rounded-xl hover:bg-yellow-300 transition-all min-h-[48px]">
            Browse Products <ArrowRight size={16} />
          </Link>
          <Link to="/contact" className="inline-flex items-center justify-center border border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white hover:text-gray-900 transition-all min-h-[48px]">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default About;
