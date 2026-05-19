import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, ImageOff } from 'lucide-react';
import { getProducts, deleteProduct, getCategories } from './utils/store';

const BADGE_CLASS = { NEW: 'badge-new', BESTSELLER: 'badge-bestseller', POPULAR: 'badge-popular' };

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const load = () => {
    setProducts(getProducts());
    setCategories(getCategories());
  };

  useEffect(() => { load(); }, []);

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      deleteProduct(id);
      load();
    }
  };

  const getCatLabel = (catId) => categories.find(c => c.id === catId)?.label || catId;

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

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Badge</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '36px' }}>No products found</td></tr>
            )}
            {products.map(p => (
              <tr key={p.id}>
                <td>
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="product-thumb" />
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
                  {p.badge ? <span className={`badge ${BADGE_CLASS[p.badge] || ''}`}>{p.badge}</span> : <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>—</span>}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <Link to={`/admin/products/edit/${p.id}`} className="btn-ghost" style={{ padding: '6px 10px' }} id={`edit-${p.id}`}>
                      <Pencil size={14} />
                    </Link>
                    <button className="btn-danger" onClick={() => handleDelete(p.id, p.name)} id={`delete-${p.id}`} style={{ padding: '6px 10px' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
