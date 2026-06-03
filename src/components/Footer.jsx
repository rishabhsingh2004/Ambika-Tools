import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ChevronDown, MessageCircle } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { config, waLink, igLink } from '../data/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';

/* ── Accordion Section (mobile only) ── */
const FooterSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-700/50 sm:border-0">
      {/* Mobile: clickable header */}
      <button
        onClick={() => setOpen(!open)}
        className="sm:hidden w-full flex items-center justify-between py-4 text-white font-semibold text-sm uppercase tracking-wide"
      >
        {title}
        <ChevronDown size={16} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {/* Desktop: always-visible header */}
      <h4 className="hidden sm:block text-white font-semibold mb-4 text-sm uppercase tracking-wide">{title}</h4>
      {/* Content */}
      <div className={`overflow-hidden transition-all duration-300 sm:max-h-none! sm:opacity-100! ${open ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-gray-300 pt-10 sm:pt-14 pb-6 mt-16">
      {/* Top gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, #6366f1, #3b82f6, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:gap-10 mb-10">
        {/* Brand — always visible */}
        <div className="pb-6 sm:pb-0">
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="Ambika Tools Logo" className="w-16 h-16 object-contain" />
            <span className="font-poppins font-black text-white text-2xl tracking-tight">{config.businessName}</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400 mb-5">
            Precision industrial machines for cash counting, gold melting, weighing, and secure storage. Serving India since {config.founded}.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a href={config.instagram || '#'} target="_blank" rel="noreferrer" aria-label="Instagram"
              className="text-gray-400 hover:text-pink-500 transition-transform duration-200 hover:scale-110">
              <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
            </a>
            {/* WhatsApp */}
            <a href={waLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp"
              className="text-gray-400 hover:text-green-500 transition-transform duration-200 hover:scale-110">
              <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
            </a>
            {/* Facebook */}
            <a href={config.facebook || '#'} target="_blank" rel="noreferrer" aria-label="Facebook"
              className="text-gray-400 hover:text-blue-500 transition-transform duration-200 hover:scale-110">
              <FontAwesomeIcon icon={faFacebookF} className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Product Categories */}
        <FooterSection title="Our Products">
          <ul className="space-y-2.5">
            {CATEGORIES.map(cat => (
              <li key={cat.id}>
                <Link to={`/products/${cat.id}`} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 min-h-[36px] sm:min-h-0">
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterSection>

        {/* Quick Links */}
        <FooterSection title="Quick Links">
          <ul className="space-y-2.5">
            {[{ name: 'Home', path: '/' }, { name: 'Products', path: '/products' }, { name: 'About Us', path: '/about' }, { name: 'Contact Us', path: '/contact' }].map(l => (
              <li key={l.name}>
                <Link to={l.path} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center min-h-[36px] sm:min-h-0">{l.name}</Link>
              </li>
            ))}
          </ul>
        </FooterSection>

        {/* Contact */}
        <FooterSection title="Contact Us">
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex gap-2 items-start"><Phone size={15} className="shrink-0 mt-0.5 text-blue-400" /><a href={`tel:${config.phoneDial}`} className="hover:text-white">{config.phone}</a></li>
            <li className="flex gap-2 items-start"><Mail size={15} className="shrink-0 mt-0.5 text-blue-400" /><a href={`mailto:${config.email}`} className="hover:text-white">{config.email}</a></li>
            <li className="flex gap-2 items-start"><MapPin size={15} className="shrink-0 mt-0.5 text-blue-400" /><span>{config.address}</span></li>
          </ul>

          {/* WhatsApp CTA */}
          <a href={waLink()} target="_blank" rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors min-h-[44px]"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="text-xl" /> WhatsApp Us
          </a>

          {/* Instagram CTA */}
          <a href={config.instagram || '#'} target="_blank" rel="noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-white text-sm font-semibold px-4 py-2.5 rounded-lg min-h-[44px] transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #f43f5e, #ec4899, #a855f7)' }}
          >
            <FontAwesomeIcon icon={faInstagram} className="text-xl" /> Follow on Instagram
          </a>
        </FooterSection>
      </div>

      <div className="border-t border-gray-700/50 pt-5 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2 text-center sm:text-left">
        <p>&copy; {new Date().getFullYear()} {config.businessName}. All Rights Reserved.</p>
        <p>Made in India 🇮🇳</p>
      </div>
    </footer>
  );
};

export default Footer;
