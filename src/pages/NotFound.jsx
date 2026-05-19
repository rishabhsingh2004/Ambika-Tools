import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Search } from 'lucide-react';

const NotFound = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-20">
    {/* Big 404 */}
    <div className="relative mb-8">
      <p className="font-poppins font-black text-[10rem] leading-none select-none"
        style={{
          background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
        404
      </p>
      <div className="absolute inset-0 flex items-center justify-center">
        <Search size={64} className="text-gray-400" />
      </div>
    </div>

    <h1 className="font-poppins font-black text-3xl text-gray-900 mb-3">Page Not Found</h1>
    <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
      The page you're looking for doesn't exist or has been moved. Let's get you back on track.
    </p>

    <div className="flex flex-wrap gap-4 justify-center">
      <Link to="/"
        className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-xl text-white transition-all hover:-translate-y-1"
        style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', boxShadow: '0 6px 20px rgba(37,99,235,0.35)' }}>
        <Home size={16} /> Go Home
      </Link>
      <Link to="/products"
        className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-xl text-blue-700 bg-blue-50 border border-blue-100 transition-all hover:-translate-y-1 hover:bg-blue-100">
        Browse Products <ArrowRight size={16} />
      </Link>
    </div>
  </div>
);

export default NotFound;
