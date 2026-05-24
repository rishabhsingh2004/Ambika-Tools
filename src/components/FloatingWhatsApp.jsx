import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { waLink } from '../data/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const FloatingWhatsApp = () => {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    // Show tooltip once after 4s
    const tipTimer = setTimeout(() => {
      if (!dismissed) setShowTooltip(true);
    }, 4000);
    // Auto-hide tooltip after 6s
    const hideTimer = setTimeout(() => setShowTooltip(false), 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(tipTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Build a context-aware WhatsApp message
  const buildMessage = () => {
    const page = window.location.pathname;
    if (page.startsWith('/products/') && page.length > 10) {
      const slug = decodeURIComponent(page.split('/products/')[1]);
      return waLink(`Hi! I'm interested in ${slug} machines. Please share details and pricing.`);
    }
    return waLink(`Hi! I visited your website and would like to know more about your products.`);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2">
      {/* Tooltip bubble */}
      {showTooltip && !dismissed && (
        <div className="relative flex items-center gap-2 bg-white text-gray-800 text-xs font-semibold px-3 py-2 rounded-xl shadow-lg border border-gray-100 max-w-[180px]"
          style={{ animation: 'fadeInUp 0.3s ease' }}>
          <span>Chat with us! 👋</span>
          <button
            onClick={() => { setShowTooltip(false); setDismissed(true); }}
            className="ml-1 text-gray-400 hover:text-gray-600"
            aria-label="Dismiss"
          >
            <X size={12} />
          </button>
          {/* Arrow */}
          <div className="absolute -bottom-2 right-5 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45" />
        </div>
      )}

      {/* WhatsApp button */}
      <a
        href={buildMessage()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={() => setShowTooltip(false)}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(34,197,94,0.4)] hover:shadow-[0_8px_30px_rgba(34,197,94,0.5)] transition-all duration-300 hover:scale-110 active:scale-95 group"
        style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', animation: 'fadeInUp 0.5s cubic-bezier(0.34,1.56,0.64,1)' }}
      >
        <FontAwesomeIcon 
          icon={faWhatsapp} 
          className="text-2xl text-white"
        />
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
