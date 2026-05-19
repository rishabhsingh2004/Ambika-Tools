import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Tag, MessageSquare, Plus, ClipboardList, Settings } from 'lucide-react';
import { getProducts, getCategories, getEnquiries } from './utils/store';

const STATUS_CLASS = { New: 'badge-status-new', Contacted: 'badge-status-contacted', Converted: 'badge-status-converted' };

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, enquiries: 0 });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const products = getProducts();
    const categories = getCategories();
    const enquiries = getEnquiries();
    setStats({ products: products.length, categories: categories.length, enquiries: enquiries.length });
    setRecent(enquiries.slice(0, 5));
  }, []);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Dashboard</div>
          <div className="admin-page-sub">Welcome back, Admin</div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon stat-icon-blue"><Package size={22} /></div>
          <div>
            <div className="stat-value">{stats.products}</div>
            <div className="stat-label">Total Products</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-purple"><Tag size={22} /></div>
          <div>
            <div className="stat-value">{stats.categories}</div>
            <div className="stat-label">Categories</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-amber"><MessageSquare size={22} /></div>
          <div>
            <div className="stat-value">{stats.enquiries}</div>
            <div className="stat-label">Total Enquiries</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-green"><ClipboardList size={22} /></div>
          <div>
            <div className="stat-value">{recent.filter(e => e.status === 'New').length}</div>
            <div className="stat-label">New Enquiries</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/admin/products/add" className="btn-primary" id="dash-add-product"><Plus size={16} /> Add Product</Link>
        <Link to="/admin/enquiries" className="btn-ghost" id="dash-view-enquiries"><MessageSquare size={15} /> View Enquiries</Link>
        <Link to="/admin/settings" className="btn-ghost" id="dash-settings"><Settings size={15} /> Settings</Link>
      </div>

      {/* Recent Enquiries */}
      <div className="admin-card">
        <div className="section-title">Recent Enquiries</div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>City</th>
                <th>Product</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '28px' }}>No enquiries yet</td></tr>
              )}
              {recent.map(e => (
                <tr key={e.id}>
                  <td style={{ fontWeight: 600 }}>{e.name}</td>
                  <td>{e.phone}</td>
                  <td>{e.city}</td>
                  <td style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.product}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{e.date}</td>
                  <td><span className={`badge ${STATUS_CLASS[e.status]}`}>{e.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
