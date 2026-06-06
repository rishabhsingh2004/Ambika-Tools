import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { config } from '../data/config';

const Card = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className={`relative bg-white rounded-2xl p-5 sm:p-8 border border-gray-200 max-w-5xl mx-auto mb-6 ${className}`}
    style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 10px 40px rgba(37,99,235,0.08)' }}
  >
    <span 
      className="absolute select-none pointer-events-none"
      style={{ 
        top: '20px', 
        right: '24px', 
        fontSize: '64px', 
        color: '#2563eb', 
        opacity: 0.25, 
        fontFamily: 'Georgia, serif', 
        lineHeight: 1 
      }}
    >
      ❝
    </span>
    <div className="relative z-10">{children}</div>
  </motion.div>
);

const About = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className="min-h-screen pt-[72px]"
    style={{ background: 'linear-gradient(180deg, #f0f4ff 0%, #ffffff 40%)' }}
  >
    {/* HERO */}
    <section className="relative pt-16 pb-8 px-4 sm:px-6 text-center overflow-hidden">
      {/* Blue glow */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '200px',
        background: 'radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 className="text-4xl font-black text-gray-900 mb-3">
          <span className="text-gray-900">About </span>
          <span className="text-blue-600">Ambika Tools</span>
        </h1>
        <p className="text-gray-500 text-base max-w-[560px] mx-auto leading-relaxed">
          Trusted machinery partner for banks, jewellers and businesses across India
        </p>
      </div>
    </section>

    {/* CONTENT */}
    <div className="px-4 sm:px-6 pb-16">
      
      {/* Card 1 */}
      <Card>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Who We Are</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 text-base text-gray-600 leading-relaxed">
            <p className="mb-3">Founded in {config.founded}, <strong>Ambika Tools</strong> has grown from a small machine retailer to one of India's most trusted names in industrial precision equipment.</p>
            <p className="mb-3">We specialize in Cash Counting Machines, Gold Melting Machines, Precision Weighing Scales, and Safe Lockers. Our products are trusted by banks, jewellers, retailers, and government institutions across India.</p>
            <p>With a dedicated service team, factory-trained technicians, and a commitment to after-sales support, we ensure every customer gets the full value of their investment.</p>
          </div>
          <div className="lg:w-2/5">
            <div className="relative w-full rounded-xl overflow-hidden bg-gray-100" style={{ height: undefined, borderRadius: '12px', overflow: 'hidden' }}>
              <img 
                src="/owner.jpg"
                alt="Shiv Prakash Soni - Owner, Ambika Tools"
                className="w-full h-64 lg:h-[380px] object-cover object-top"
                style={{ borderRadius: '12px' }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Card 2 */}
      <Card>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Expertise</h2>
        <div className="text-base text-gray-600 leading-relaxed">
          <p className="mb-3">For over 25 years, we have brought world-class industrial machines to Indian businesses at fair prices. We understand the unique challenges of the Indian market—from voltage fluctuations to heavy daily use.</p>
          <p className="mb-3">Every machine we deliver is BIS & NABL certified, engineered for durability, and tested rigorously before it reaches your business.</p>
          <p>Our pan-India service network and factory-trained technicians ensure that you receive prompt support and maintenance whenever you need it.</p>
        </div>
      </Card>

      {/* Card 3 */}
      <Card>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Vision</h2>
        <div className="text-base text-gray-600 leading-relaxed">
          <p className="mb-3">We strive to empower Indian businesses with precision tools that boost efficiency and security. Our vision is to be the undisputed leader in industrial equipment, known for uncompromising quality and customer trust.</p>
          <p>We believe in transparent pricing, honest advice, and building long-term relationships with our clients. Your growth is our success.</p>
        </div>
      </Card>

      {/* CTA Card */}
      <Card className="text-center mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Want to Know More?</h2>
        <p className="text-base text-gray-600 mb-6">Visit our showroom or contact us for a product demo</p>
        <Link 
          to="/contact" 
          className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Contact Us
        </Link>
      </Card>

    </div>
  </motion.div>
);

export default About;
