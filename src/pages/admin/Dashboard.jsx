import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Tag, MessageSquare, Plus, ClipboardList, Settings, Loader2, AlertCircle } from 'lucide-react';
import * as api from '../../services/api';
import { getProducts as getLocalProducts, getCategories as getLocalCategories, getEnquiries as getLocalEnquiries } from './utils/store';

const STATUS_CLASS = { new: 'badge-status-new', read: 'badge-status-contacted', replied: 'badge-status-contacted', closed: 'badge-status-converted' };
const STATUS_LABEL = { new: 'New', read: 'Read', replied: 'Replied', closed: 'Closed' };

export default function Dashboard() {
  const [stats,   setStats]   = useState({ products: 0, categories: 0, enquiries: 0 });
  const [recent,  setRecent]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const [prodRes, enqRes] = await Promise.all([
          api.getProducts(),
          api.getEnquiries(),
        ]);
        const products  = prodRes.data  || [];
        const enquiries = enqRes.data   || [];
        const cats      = getLocalCategories();
        setStats({ products: products.length, categories: cats.length, enquiries: enquiries.length });
        setRecent(enquiries.slice(0, 5));
      } catch {
        // Backend unavailable — fall back to localStorage
        const products  = getLocalProducts();
        const cats      = getLocalCategories();
        const enquiries = getLocalEnquiries();
        setStats({ products: products.length, categories: cats.length, enquiries: enquiries.length });
        setRecent(enquiries.slice(0, 5));
        setError('Backend offline — showing cached data.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Dashboard</div>
          <div className="admin-page-sub">Welcome back, Admin</div>
        </div>
      </div>

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: 10, padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#92400e' }}>
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {/* Stat Cards */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon stat-icon-blue"><Package size={22} /></div>
          <div>
            <div className="stat-value">{loading ? '—' : stats.products}</div>
            <div className="stat-label">Total Products</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-purple"><Tag size={22} /></div>
          <div>
            <div className="stat-value">{loading ? '—' : stats.categories}</div>
            <div className="stat-label">Categories</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-amber"><MessageSquare size={22} /></div>
          <div>
            <div className="stat-value">{loading ? '—' : stats.enquiries}</div>
            <div className="stat-label">Total Enquiries</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-green"><ClipboardList size={22} /></div>
          <div>
            <div className="stat-value">{loading ? '—' : recent.filter(e => e.status === 'new').length}</div>
            <div className="stat-label">New Enquiries</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/admin/products/add" className="btn-primary" id="dash-add-product"><Plus size={16} /> Add Product</Link>
        <Link to="/admin/enquiries"    className="btn-ghost"   id="dash-view-enquiries"><MessageSquare size={15} /> View Enquiries</Link>
        <Link to="/admin/settings"     className="btn-ghost"   id="dash-settings"><Settings size={15} /> Settings</Link>
      </div>

      {/* Recent Enquiries */}
      <div className="admin-card">
        <div className="section-title">Recent Enquiries</div>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <Loader2 size={24} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent)' }} />
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th><th>Phone</th><th>City</th><th>Product</th><th>Date</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.length === 0 && (
                  <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '28px' }}>No enquiries yet</td></tr>
                )}
                {recent.map(e => (
                  <tr key={e._id || e.id}>
                    <td style={{ fontWeight: 600 }}>{e.name}</td>
                    <td>{e.phone}</td>
                    <td>{e.city || e.category || '—'}</td>
                    <td style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.productName || e.product || '—'}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{e.date || (e.createdAt ? new Date(e.createdAt).toLocaleDateString('en-IN') : '—')}</td>
                    <td><span className={`badge ${STATUS_CLASS[e.status] || ''}`}>{STATUS_LABEL[e.status] || e.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
