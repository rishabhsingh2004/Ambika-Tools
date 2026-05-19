import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { config, waLink } from '../data/config';

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen">
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6"
        style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <p className="text-blue-300 font-bold text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">Get In Touch</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold mb-2">Contact Us</h1>
          <p className="text-blue-100 text-sm sm:text-base max-w-lg mx-auto">Get in touch for demo bookings, pricing inquiries, or technical support</p>
          <div className="w-12 h-1 rounded-full mx-auto mt-5" style={{ background: 'linear-gradient(90deg, #60a5fa, #a5b4fc)' }} />
        </div>
      </section>

      <div className="sec-white sec-pad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
        {/* Info Cards */}
        <div className="space-y-5">
          {[
            { icon: Phone, label: 'Call / WhatsApp', value: config.phone, href: `tel:${config.phoneDial}` },
            { icon: Mail, label: 'Email Us', value: config.salesEmail, href: `mailto:${config.salesEmail}` },
            { icon: MapPin, label: 'Our Office', value: config.address, href: '#' },
          ].map((info, i) => (
            <a key={i} href={info.href} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-5 card-hover">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                <info.icon size={20} className="text-blue-700" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{info.label}</p>
                <p className="text-gray-900 font-semibold text-sm mt-0.5">{info.value}</p>
              </div>
            </a>
          ))}

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
            <p className="font-semibold text-blue-800 mb-2 text-sm">Business Hours</p>
            <p className="text-sm text-gray-600">{config.businessHours}</p>
            <p className="text-sm text-gray-600">{config.businessHoursSun}</p>
          </div>

          <a href={waLink()} target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-colors text-sm min-h-[48px]">
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>
        </div>

        {/* Inquiry Form */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-7">
          <h2 className="font-poppins font-bold text-xl text-gray-900 mb-5">Send an Inquiry</h2>

          {status === 'success' && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Inquiry Sent!</h3>
              <p className="text-gray-500 mb-5">Our team will contact you within 24 hours.</p>
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
            <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name *</label>
                <input required type="text" name="from_name" placeholder="e.g. Ramesh Kumar"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone Number *</label>
                <input required type="tel" name="phone" placeholder="+91 XXXXX XXXXX"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email Address</label>
                <input type="email" name="reply_to" placeholder="your@email.com"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">City / Location</label>
                <input type="text" name="city" placeholder="e.g. Mumbai"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Product Category *</label>
                <select required name="category" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 bg-white">
                  <option value="">-- Select a Category --</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.label}>{cat.icon} {cat.label}</option>
                  ))}
                  <option value="Other">Other / General Inquiry</option>
                </select>
              </div>
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Message / Requirements *</label>
                <textarea required name="message" rows={4} placeholder="Tell us your requirements, quantity needed, usage details..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none" />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" disabled={status === 'submitting'}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3 min-h-[48px] disabled:opacity-60 disabled:cursor-not-allowed">
                  <Send size={16} /> {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      </div>
      </div>
  );
};

export default Contact;
