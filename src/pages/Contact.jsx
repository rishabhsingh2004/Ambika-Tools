import React, { useState, useRef } from 'react';
import { Send, CheckCircle, AlertCircle, Phone, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../data/products';
import { config, waLink } from '../data/config';
import { submitEnquiry } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Card = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className={`relative bg-white rounded-2xl p-5 sm:p-8 border border-gray-200 max-w-3xl mx-auto mb-8 ${className}`}
    style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 10px 40px rgba(37,99,235,0.08)' }}
  >
    <span 
      className="absolute select-none pointer-events-none"
      style={{ 
        top: '20px', 
        right: '24px', 
        fontSize: '64px', 
        color: '#2563eb', 
        opacity: 0.12, 
        fontFamily: 'Georgia, serif', 
        lineHeight: 1 
      }}
    >
      ❝
    </span>
    <div className="relative z-10">{children}</div>
  </motion.div>
);

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    const form = formRef.current;
    try {
      await submitEnquiry({
        name:     form.from_name?.value   || '',
        phone:    form.phone?.value       || '',
        email:    form.reply_to?.value    || '',
        city:     form.city?.value        || '',
        category: form.category?.value    || '',
        message:  form.message?.value     || '',
        source:   'contact-form',
      });
      setStatus('success');
      form.reset();
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen"
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
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-500 text-base max-w-[560px] mx-auto leading-relaxed">
            Have questions? Reach out to our team for demos, pricing, and support.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="px-4 sm:px-6 pb-8 sm:pb-12">
        
        {/* Main Card: Get in Touch */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          
          <div className="mb-3">
            <span className="font-semibold text-gray-900 text-sm mr-2">Support Phone:</span>
            <a href={`tel:${config.phoneDial}`} className="text-blue-600 text-sm font-medium hover:underline">{config.phone}</a>
          </div>
          <div className="mb-3">
            <span className="font-semibold text-gray-900 text-sm mr-2">Connect WhatsApp:</span>
            <a href={waLink()} target="_blank" rel="noreferrer" className="text-blue-600 text-sm font-medium hover:underline">{config.phone}</a>
          </div>
          <div className="mb-3">
            <span className="font-semibold text-gray-900 text-sm mr-2">Email:</span>
            <a href={`mailto:${config.email}`} className="text-blue-600 text-sm font-medium hover:underline">{config.email}</a>
          </div>
          <div className="mb-3">
            <span className="font-semibold text-gray-900 text-sm mr-2">Hours:</span>
            <span className="text-gray-500 text-sm font-medium">{config.businessHours}</span>
          </div>

          <hr className="border-gray-200 my-5" />
          
          <p className="text-sm text-gray-500 leading-relaxed">
            Whether you need a product demo, pricing, or technical support — our expert team is ready to help. We respond within 24 hours.
          </p>
        </Card>

        {/* Form Card */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          
          {status === 'success' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Inquiry Sent!</h3>
              <p className="text-gray-500 mb-5 text-base">Our team will contact you within 24 hours.</p>
              <button onClick={() => setStatus('idle')} className="text-blue-600 text-sm font-semibold hover:underline">
                Send another inquiry
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-5 flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 rounded-xl px-4 py-3 text-sm font-semibold">
              <AlertCircle size={18} className="shrink-0" />
              Failed to send. Please try WhatsApp or call us directly.
            </div>
          )}

          {status !== 'success' && (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5 block">Full Name *</label>
                  <input required type="text" name="from_name" placeholder="e.g. Ramesh Kumar"
                    className="w-full border border-gray-200 rounded-lg px-3 py-3 text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-300" />
                </div>
                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5 block">Phone Number *</label>
                  <input required type="tel" name="phone" placeholder="+91 XXXXX XXXXX"
                    className="w-full border border-gray-200 rounded-lg px-3 py-3 text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-300" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5 block">Email Address</label>
                  <input type="email" name="reply_to" placeholder="your@email.com"
                    className="w-full border border-gray-200 rounded-lg px-3 py-3 text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-300" />
                </div>
                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5 block">City / Location</label>
                  <input type="text" name="city" placeholder="e.g. Mumbai"
                    className="w-full border border-gray-200 rounded-lg px-3 py-3 text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-300" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5 block">Product Category *</label>
                <select required name="category" defaultValue=""
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-700 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer">
                  <option value="" disabled className="text-gray-400">Select a Category</option>
                  <option value="cash-counting">Cash Counting Machines</option>
                  <option value="gold-melting">Gold Melting Machines</option>
                  <option value="weighing">Gold & Silver Weighing Machines</option>
                  <option value="safe-locker">Safe Lockers</option>
                  <option value="other">Other / General Inquiry</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5 block">Message *</label>
                <textarea required name="message" rows={4} placeholder="Tell us your requirements, quantity needed..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-3 text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none transition-all placeholder:text-gray-300" />
              </div>
              <button type="submit" disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-2 font-bold text-base py-3 rounded-xl text-white transition-all hover:-translate-y-0.5 min-h-[48px] disabled:opacity-60 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700"
                style={{ boxShadow: '0 4px 14px rgba(29,78,216,0.35)' }}>
                <Send size={16} /> {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
              </button>
            </form>
          )}
        </Card>

      </div>

      {/* ═══ CTA — Need Immediate Help ═══ */}
      <section className="bg-white py-10 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-semibold text-3xl text-gray-900 mb-4">
            Need Immediate Help?
          </h2>
          <p className="text-gray-500 font-normal text-lg mb-5 sm:mb-10 max-w-md mx-auto leading-relaxed">
            Contact us directly via WhatsApp or phone for quick assistance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={`tel:${config.phoneDial}`}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all hover:-translate-y-0.5"
              style={{ boxShadow: '0 6px 20px rgba(37,99,235,0.35)' }}>
              <Phone size={18} /> Call Support
            </a>
            <a href={waLink()} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:opacity-90 transition-all hover:-translate-y-0.5"
              style={{ background: '#25D366', boxShadow: '0 6px 20px rgba(37,211,102,0.35)' }}>
              <FontAwesomeIcon icon={faWhatsapp} className="text-base" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
