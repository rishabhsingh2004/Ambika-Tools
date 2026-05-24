import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Eye, MessageCircle, ArrowRight, Check, Phone } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { waProductLink } from '../data/config';

/* ─────────────────────────────────────────
   Badge
───────────────────────────────────────── */
const Badge = ({ badge }) => {
  if (!badge) return null;
  const styles = {
    BESTSELLER: { bg: 'linear-gradient(135deg,#f97316,#ef4444)', shadow: 'rgba(249,115,22,0.5)' },
    NEW:        { bg: 'linear-gradient(135deg,#10b981,#059669)', shadow: 'rgba(16,185,129,0.5)' },
    POPULAR:    { bg: 'linear-gradient(135deg,#6366f1,#4f46e5)', shadow: 'rgba(99,102,241,0.5)' },
  };
  const s = styles[badge] || styles.POPULAR;
  return (
    <span className="text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest" style={{
      background: s.bg, boxShadow: `0 4px 12px ${s.shadow}`
    }}>
      {badge}
    </span>
  );
};

/* ─────────────────────────────────────────
   Quick View Modal
───────────────────────────────────────── */
const QuickView = ({ product, onClose }) => (
  <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center sm:p-4" onClick={onClose}>
    <div className="absolute inset-0" style={{ background: 'rgba(6,12,31,0.75)', backdropFilter: 'blur(8px)' }} />
    <div
      className="relative bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      style={{ animation: 'slideUp 0.3s ease forwards', boxShadow: '0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(29,78,216,0.1)' }}
      onClick={e => e.stopPropagation()}
    >
      {/* Close */}
      <button onClick={onClose}
        className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
        <X size={16} className="text-gray-600" />
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Image panel */}
        <div className="relative flex items-center justify-center p-8 min-h-56" style={{
          background: 'linear-gradient(135deg, #eff6ff, #dbeafe)'
        }}>
          <div className="absolute inset-0 opacity-40" style={{
            background: 'radial-gradient(circle at 50% 60%, rgba(59,130,246,0.3), transparent 70%)'
          }} />
          <img src={product.image} alt={product.name}
            className="relative max-h-44 object-contain"
            style={{ filter: 'drop-shadow(0 12px 24px rgba(29,78,216,0.25))' }}
          />
          {product.badge && <div className="absolute top-4 left-4"><Badge badge={product.badge} /></div>}
        </div>

        {/* Info panel */}
        <div className="p-6 flex flex-col">
          <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mb-1">{product.categoryLabel || 'Machine'}</p>
          <h2 className="font-poppins font-black text-gray-900 text-xl leading-tight mb-2">{product.name}</h2>
          <p className="text-gray-500 text-sm mb-4">{product.tagline}</p>

          <ul className="space-y-1.5 mb-5 flex-1">
            {(Array.isArray(product.specs) ? product.specs : Object.entries(product.specs || {}).map(([k, v]) => `${k}: ${v}`))
              .slice(0, 5)
              .map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <FontAwesomeIcon icon={faCircleCheck} className="text-blue-500 text-xs mt-1 shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-xl p-3 mb-4" style={{ background: 'linear-gradient(135deg,#eff6ff,#e0ecff)', border: '1px solid rgba(59,130,246,0.15)' }}>
            <p className="text-xs text-blue-600 font-bold uppercase tracking-wide mb-0.5">Price on Request</p>
            <p className="text-[11px] text-gray-400">Contact us for best quote • GST Bill</p>
          </div>

          <div className="flex gap-2">
            <a href={waProductLink(product.name)} target="_blank" rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 font-bold text-sm py-2.5 rounded-xl transition-all hover:-translate-y-0.5 text-white"
              style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)', boxShadow: '0 6px 20px rgba(22,163,74,0.35)' }}>
              <MessageCircle size={15} /> WhatsApp
            </a>
            <Link to={`/products/item/${product.id}`} onClick={onClose}
              className="flex-1 flex items-center justify-center gap-1.5 font-bold text-sm py-2.5 rounded-xl transition-all hover:-translate-y-0.5 text-white"
              style={{ background: 'linear-gradient(135deg,#1d4ed8,#2563eb)', boxShadow: '0 6px 20px rgba(29,78,216,0.35)' }}>
              Full Details <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   Main ProductCard
───────────────────────────────────────── */
const ProductCard = ({ product, darkMode }) => {
  const [quickView, setQuickView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Don't navigate if clicking Enquire or Quick View
    if (e.target.closest('[data-stop-nav]')) return;
    navigate(`/products/item/${product.id}`);
  };

  return (
    <>
      <div
        className={`relative flex flex-col rounded-2xl overflow-hidden cursor-pointer ${darkMode ? 'bg-slate-800' : 'bg-white'}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleCardClick}
        style={{
          border: hovered ? '1px solid rgba(59,130,246,0.5)' : (darkMode ? '1px solid #334155' : '1px solid #e2e8f0'),
          boxShadow: hovered
            ? '0 24px 48px -8px rgba(29,78,216,0.22), 0 0 30px rgba(59,130,246,0.1), 0 0 0 1px rgba(59,130,246,0.12)'
            : (darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 10px rgba(15,23,42,0.07)'),
          transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* ── Image Area ── */}
        <div className="relative overflow-hidden" style={{
          height: '200px',
          background: darkMode ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' : 'linear-gradient(135deg, #f0f7ff 0%, #e8f0fe 100%)',
        }}>
          {/* Glow behind image */}
          <div className="absolute inset-0 transition-opacity duration-500" style={{
            background: 'radial-gradient(circle at 50% 65%, rgba(59,130,246,0.25), transparent 65%)',
            opacity: hovered ? 1 : 0.4
          }} />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <Badge badge={product.badge} />
            </div>
          )}

          {/* Product image */}
          <img
            src={product.image}
            alt={product.name}
            className="relative w-full h-full object-contain p-4"
            style={{
              filter: hovered
                ? 'drop-shadow(0 16px 32px rgba(29,78,216,0.35)) drop-shadow(0 0 12px rgba(99,102,241,0.2))'
                : (darkMode ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))' : 'drop-shadow(0 8px 16px rgba(15,23,42,0.15))'),
              transform: hovered ? 'scale(1.07)' : 'scale(1)',
              transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          />
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col flex-1 p-5">

          {/* Name + tagline */}
          <h3 className="font-poppins font-bold text-base leading-tight mb-1 transition-colors duration-200" style={{
            color: hovered ? '#2563eb' : (darkMode ? '#f8fafc' : '#111827')
          }}>
            {product.name}
          </h3>
          <p className={`text-xs mb-3 ${darkMode ? 'text-slate-400' : 'text-gray-400'}`}>{product.tagline}</p>

          {/* Specs */}
          <ul className="space-y-1.5 mb-4 flex-1">
            {(Array.isArray(product.specs) ? product.specs : Object.entries(product.specs || {}).map(([k, v]) => `${k}: ${v}`))
              .slice(0, 3)
              .map((spec, i) => (
              <li key={i} className={`flex items-start gap-2 text-xs ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                <FontAwesomeIcon icon={faCircleCheck} className="text-blue-500 text-xs mt-0.5 shrink-0" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>

          {/* ── Enquiry badge ── */}
          <div className="rounded-xl p-3 mb-4" style={{
            background: hovered 
              ? (darkMode ? 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))' : 'linear-gradient(135deg, #eff6ff, #e0ecff)') 
              : (darkMode ? 'linear-gradient(135deg, #0f172a, #1e293b)' : 'linear-gradient(135deg, #f8faff, #f1f5f9)'),
            border: darkMode ? '1px solid rgba(59,130,246,0.2)' : '1px solid rgba(59,130,246,0.12)',
            transition: 'background 0.3s ease'
          }}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-[10px] font-semibold uppercase tracking-wide mb-0.5 ${darkMode ? 'text-slate-400' : 'text-gray-400'}`}>Price</p>
                <p className="font-poppins font-black text-base" style={{ background: darkMode ? 'linear-gradient(90deg,#60a5fa,#3b82f6)' : 'linear-gradient(90deg,#1d4ed8,#3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>On Request</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-green-500 font-bold">✓ GST Bill</p>
              </div>
            </div>
          </div>

          {/* ── Action Buttons ── */}
          <div className="flex gap-2">
            <div
              className="flex-1 flex items-center justify-center gap-1 text-xs font-bold py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-white"
              style={{
                background: 'linear-gradient(135deg,#1d4ed8,#2563eb)',
                boxShadow: hovered ? '0 6px 20px rgba(29,78,216,0.4)' : '0 2px 8px rgba(29,78,216,0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              <Eye size={12} /> View Details
            </div>
            <a href={waProductLink(product.name)} target="_blank" rel="noreferrer" data-stop-nav
              className="flex-1 flex items-center justify-center gap-1 text-xs font-bold py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-white"
              style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)', boxShadow: hovered ? '0 6px 20px rgba(22,163,74,0.4)' : '0 2px 8px rgba(22,163,74,0.2)', transition: 'all 0.3s ease' }}>
              <FontAwesomeIcon icon={faWhatsapp} className="text-base" /> Enquire
            </a>
          </div>
        </div>

        {/* Glow border bottom accent on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-500" style={{
          background: hovered ? 'linear-gradient(90deg, #3b82f6, #6366f1, #3b82f6)' : 'transparent'
        }} />
      </div>

      {/* Quick View Modal */}
      {quickView && <QuickView product={product} onClose={() => setQuickView(false)} />}
    </>
  );
};

export default ProductCard;
