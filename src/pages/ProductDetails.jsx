import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle2, Phone, MessageCircle, X, Send, Search, Loader2 } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { config, waProductLink } from '../data/config';
import { getProducts, getProductById, submitEnquiry } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

/* ── Enquiry Modal ── */
const EnquiryModal = ({ product, onClose }) => {
  const [status, setStatus] = useState('idle');
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    const form = new FormData(e.target);
    const name    = form.get('name')    || '';
    const phone   = form.get('phone')   || '';
    const message = form.get('message') || '';
    // ── Save enquiry to backend (non-blocking) ────────────────
    submitEnquiry({
      name,
      phone,
      message,
      productName: product.name,
      productId:   product._id || product.id || null,
      category:    product.categoryId || '',
      source:      'product-page',
    }).catch(() => {}); // don't block WhatsApp redirect if API down
    // ── Open WhatsApp ─────────────────────────────────
    const msg = `Hi, I'm *${name}* (${phone}). I'm interested in: *${product.name}*. Please share details.`;
    window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    setStatus('sent');
  };

  return (
    <div className="fixed inset-0 z-200 flex items-end sm:items-center justify-center sm:p-4" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: 'rgba(6,12,31,0.7)', backdropFilter: 'blur(6px)' }} />
      <div className="relative bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl p-7 max-h-[90vh] overflow-y-auto"
        style={{ animation: 'slideUp 0.25s ease-out' }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
          <X size={16} className="text-gray-600" />
        </button>

        {status === 'sent' ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faWhatsapp} className="text-2xl text-green-600" />
            </div>
            <h3 className="font-poppins font-bold text-xl text-gray-900 mb-2">Enquiry Sent!</h3>
            <p className="text-gray-500 text-sm mb-5">You'll be redirected to WhatsApp. Our team will reply shortly.</p>
            <button onClick={onClose} className="text-blue-600 font-semibold text-sm hover:underline">Close</button>
          </div>
        ) : (
          <>
            <h2 className="font-poppins font-bold text-xl text-gray-900 mb-1">Send Enquiry</h2>
            <p className="text-sm text-blue-600 font-semibold mb-5">{product.name}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Your Name *</label>
                <input required name="name" type="text" placeholder="e.g. Ramesh Kumar"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Phone Number *</label>
                <input required name="phone" type="tel" placeholder="+91 XXXXX XXXXX"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Message</label>
                <textarea name="message" rows={3} placeholder="Any specific requirements?"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 resize-none" />
              </div>
              <button type="submit"
                className="w-full flex items-center justify-center gap-2 font-bold text-sm py-3 rounded-xl text-white transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', boxShadow: '0 6px 20px rgba(22,163,74,0.35)' }}>
                <FontAwesomeIcon icon={faWhatsapp} className="text-base" /> Send via WhatsApp
              </button>
              <Link to="/contact" onClick={onClose}
                className="flex items-center justify-center gap-1 text-sm text-blue-600 font-semibold hover:underline">
                Or fill contact form instead
              </Link>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [product,     setProduct]     = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then(res => setProduct(res.data))
      .catch(() => {
        // Fallback: find in static catalog
        const found = PRODUCTS.find(p => p.id === id);
        setProduct(found || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (product) {
      getProducts()
        .then(res => {
          const all = res.data || [];
          const matched = all
            .filter(p => 
              p.categoryId === product.categoryId && 
              (p._id || p.id) !== (product._id || product.id)
            )
            .slice(0, 4);
          setRelatedProducts(matched);
        })
        .catch(() => {
          const matched = PRODUCTS
            .filter(p => 
              p.categoryId === product.categoryId && 
              (p._id || p.id) !== (product._id || product.id)
            )
            .slice(0, 4);
          setRelatedProducts(matched);
        });
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={36} style={{ animation: 'spin 1s linear infinite', color: '#2563eb' }} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center py-20 px-4">
        <Search size={48} className="mx-auto mb-4 text-gray-300" />
        <h2 className="text-2xl font-poppins font-bold mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-6">This product may have been moved or removed.</p>
        <Link to="/products" className="btn-primary">Back to Products</Link>
      </div>
    );
  }

  const category = CATEGORIES.find(c => c.id === product.categoryId);
  const related  = relatedProducts;
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const imgSrc   = product.image
    ? (product.image.startsWith('data:') || product.image.startsWith('http') ? product.image : `${BASE_URL}${product.image}`)
    : '';

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-blue-700">Products</Link>
          <ChevronRight size={14} />
          <Link to={`/products/${product.categoryId}`} className="hover:text-blue-700">{category?.label}</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24 sm:pb-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-700 mb-6 group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-10">
          {/* Image */}
          <div className="flex items-center justify-center bg-gray-50 rounded-xl min-h-48 p-4 sm:p-8">
            {imgSrc && <img src={imgSrc} alt={product.name} className="max-h-64 object-contain" />}
          </div>

          {/* Details */}
          <div>
            {category && (
              <Link to={`/products/${category.id}`}
                className="inline-flex items-center gap-1 text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full mb-3 hover:bg-blue-100 transition-colors">
                {category.icon} {category.label}
              </Link>
            )}
            {product.badge && (
              <span className={`ml-2 ${product.badge === 'BESTSELLER' ? 'badge-bestseller' : product.badge === 'NEW' ? 'badge-new' : 'badge-popular'}`}>
                {product.badge}
              </span>
            )}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-poppins font-bold text-gray-900 mt-2 mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-5">{product.tagline}</p>

            {/* Specifications */}
            <div className="mb-6">
              <h3 className="font-poppins font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Key Specifications</h3>
              <ul className="space-y-2">
                {/* Handle both array-of-strings (static) and Map/object (backend) */}
                {Array.isArray(product.specs)
                  ? product.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                        <CheckCircle2 size={16} className="text-green-500 shrink-0" />{spec}
                      </li>
                    ))
                  : Object.entries(product.specs || {}).map(([k, v], i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                        <CheckCircle2 size={16} className="text-green-500 shrink-0" /><strong>{k}:</strong> {v}
                      </li>
                    ))
                }
              </ul>
            </div>

            {/* Price on Request badge */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Price</p>
                <p className="text-blue-700 font-bold text-xl font-poppins">On Request</p>
                <p className="text-xs text-gray-400 mt-0.5">GST Bill Available</p>
              </div>
              <a href={`tel:${config.phoneDial}`} className="flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900">
                <Phone size={16} /> Call for Quote
              </a>
            </div>

            {/* CTAs — sticky on mobile */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={waProductLink(product.name)} target="_blank" rel="noreferrer"
                className="btn-whatsapp justify-center flex-1 min-h-[48px]">
                <FontAwesomeIcon icon={faWhatsapp} className="text-base" /> WhatsApp Enquiry
              </a>
              <button onClick={() => setEnquiryOpen(true)}
                className="btn-primary text-center flex-1 min-h-[48px]">
                Send Enquiry
              </button>
            </div>
          </div>
        </div>

        {/* Mobile sticky bottom CTA */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-3 flex gap-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <a href={waProductLink(product.name)} target="_blank" rel="noreferrer"
            className="btn-whatsapp justify-center flex-1 text-xs py-3 min-h-[44px]">
            <FontAwesomeIcon icon={faWhatsapp} className="text-base" /> WhatsApp
          </a>
          <button onClick={() => setEnquiryOpen(true)}
            className="btn-primary justify-center flex-1 text-xs py-3 min-h-[44px]">
            Send Enquiry
          </button>
        </div>

        {/* ═══ RELATED PRODUCTS ═══ */}
        {related.length > 0 && (
          <section className="sec-gray sec-pad -mx-4 sm:-mx-6 px-4 sm:px-6 mt-8">
            <div className="text-center mb-8">
              <p className="section-label">Similar Products</p>
              <h2 className="section-heading">More in <span>{category?.label}</span></h2>
              <div className="section-accent" />
            </div>
            <div className="flex items-center justify-end mb-4 -mt-4">
              <Link to={`/products/${product.categoryId}`} className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="max-w-7xl mx-auto">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 sm:overflow-visible sm:pb-0 hide-scrollbar">
              {related.map(p => {
                const pId = p._id || p.id;
                const pImg = p.image
                  ? (p.image.startsWith('data:') || p.image.startsWith('http') || p.image.startsWith('/images/') ? p.image : `${BASE_URL}${p.image}`)
                  : '';
                return (
                  <Link key={pId} to={`/products/item/${pId}`} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 card-hover min-w-[260px] sm:min-w-0 snap-start shrink-0 sm:shrink">
                    <img src={pImg} alt={p.name} className="w-16 h-16 object-contain shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">{p.name}</h4>
                      <p className="text-gray-400 text-xs">{p.tagline}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            </div>
          </section>
        )}
      </div>

      {enquiryOpen && <EnquiryModal product={product} onClose={() => setEnquiryOpen(false)} />}
    </div>
  );
};

export default ProductDetails;
