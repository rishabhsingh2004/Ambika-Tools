import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, ImageOff, Loader2, AlertCircle } from 'lucide-react';
import * as api from '../../services/api';
import { getProducts as getLocalProducts, deleteProduct as deleteLocalProduct, getCategories } from './utils/store';

const BADGE_CLASS = { NEW: 'badge-new', BESTSELLER: 'badge-bestseller', POPULAR: 'badge-popular' };
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ProductsList() {
  const [products,   setProducts]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.getProducts();
      setProducts(res.data || []);
    } catch {
      // Fallback to localStorage
      setProducts(getLocalProducts());
      setError('Backend offline — showing cached data.');
    } finally {
      setLoading(false);
      setCategories(getCategories());
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await api.deleteProduct(id);
      setProducts(prev => prev.filter(p => (p._id || p.id) !== id));
    } catch {
      // Fallback: delete from localStorage
      deleteLocalProduct(id);
      setProducts(prev => prev.filter(p => (p._id || p.id) !== id));
    }
  };

  const getCatLabel = (catId) => categories.find(c => c.id === catId)?.label || catId;

  // Resolve image URL — handles both backend path (/uploads/...) and data URIs
  const resolveImg = (src) => {
    if (!src) return null;
    if (src.startsWith('data:') || src.startsWith('http')) return src;
    return `${BASE_URL}${src}`;
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Products</div>
          <div className="admin-page-sub">{products.length} products total</div>
        </div>
        <Link to="/admin/products/add" className="btn-primary" id="products-add-btn">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: 10, padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#92400e' }}>
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <Loader2 size={28} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent)' }} />
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th><th>Name</th><th>Category</th><th>Badge</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '36px' }}>No products found</td></tr>
              )}
              {products.map(p => {
                const pid = p._id || p.id;
                const imgSrc = resolveImg(p.image);
                return (
                  <tr key={pid}>
                    <td>
                      {imgSrc ? (
                        <img src={imgSrc} alt={p.name} className="product-thumb" />
                      ) : (
                        <div className="product-thumb-placeholder"><ImageOff size={18} /></div>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{p.name}</div>
                      {p.tagline && <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{p.tagline}</div>}
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{getCatLabel(p.categoryId)}</td>
                    <td>
                      {p.badge
                        ? <span className={`badge ${BADGE_CLASS[p.badge] || ''}`}>{p.badge}</span>
                        : <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>—</span>
                      }
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <Link to={`/admin/products/edit/${pid}`} className="btn-ghost" style={{ padding: '6px 10px' }} id={`edit-${pid}`}>
                          <Pencil size={14} />
                        </Link>
                        <button className="btn-danger" onClick={() => handleDelete(pid, p.name)} id={`delete-${pid}`} style={{ padding: '6px 10px' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
