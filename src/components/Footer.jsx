import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ChevronDown, MessageCircle, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { config, waLink, igLink } from '../data/config';

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
      <div className={`overflow-hidden transition-all duration-300 sm:!max-h-none sm:!opacity-100 ${open ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
        {children}
      </div>
    </div>
  );
};

// Social icon button component
const SocialBtn = ({ href, icon: Icon, label, color }) => {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
      style={{ background: color }}
    >
      <Icon size={16} className="text-white" />
    </a>
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
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold font-poppins text-lg">A</div>
            <span className="font-poppins font-bold text-white text-lg">Ambika Tools</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400 mb-5">
            Precision industrial machines for cash counting, gold melting, weighing, and secure storage. Serving India since 2001.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-2 flex-wrap">
            <SocialBtn
              href={waLink('Hi, I found you on your website!')}
              icon={MessageCircle}
              label="WhatsApp"
              color="linear-gradient(135deg, #22c55e, #16a34a)"
            />
            <SocialBtn
              href={igLink()}
              icon={Instagram}
              label="Instagram"
              color="linear-gradient(135deg, #f43f5e, #ec4899, #a855f7)"
            />
            <SocialBtn
              href={config.facebook || null}
              icon={Facebook}
              label="Facebook"
              color="linear-gradient(135deg, #3b82f6, #1d4ed8)"
            />
            {config.youtube && (
              <SocialBtn
                href={config.youtube}
                icon={Youtube}
                label="YouTube"
                color="linear-gradient(135deg, #ef4444, #b91c1c)"
              />
            )}
            {config.linkedin && (
              <SocialBtn
                href={config.linkedin}
                icon={Linkedin}
                label="LinkedIn"
                color="linear-gradient(135deg, #0ea5e9, #0369a1)"
              />
            )}
          </div>
        </div>

        {/* Product Categories */}
        <FooterSection title="Our Products">
          <ul className="space-y-2.5">
            {CATEGORIES.map(cat => (
              <li key={cat.id}>
                <Link to={`/products/${cat.id}`} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 min-h-[36px] sm:min-h-0">
                  {cat.icon} {cat.label}
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
            <li className="flex gap-2 items-start"><Mail size={15} className="shrink-0 mt-0.5 text-blue-400" /><a href={`mailto:${config.salesEmail}`} className="hover:text-white">{config.salesEmail}</a></li>
            <li className="flex gap-2 items-start"><MapPin size={15} className="shrink-0 mt-0.5 text-blue-400" /><span>{config.address}</span></li>
          </ul>

          {/* WhatsApp CTA */}
          <a href={waLink()} target="_blank" rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors min-h-[44px]"
          >
            <MessageCircle size={16} /> WhatsApp Us
          </a>

          {/* Instagram CTA */}
          {igLink() && (
            <a href={igLink()} target="_blank" rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-white text-sm font-semibold px-4 py-2.5 rounded-lg min-h-[44px] transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #f43f5e, #ec4899, #a855f7)' }}
            >
              <Instagram size={16} /> Follow on Instagram
            </a>
          )}
        </FooterSection>
      </div>

      <div className="border-t border-gray-700/50 pt-5 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2 text-center sm:text-left">
        <p>&copy; {new Date().getFullYear()} Ambika Tools. All Rights Reserved.</p>
        <p>Made in India 🇮🇳</p>
      </div>
    </footer>
  );
};

export default Footer;
