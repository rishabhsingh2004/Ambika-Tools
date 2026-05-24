import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import * as api from '../../services/api';
import { getEnquiries as getLocalEnquiries, updateEnquiryStatus as updateLocalStatus } from './utils/store';

// Backend Enquiry.js enum: 'new' | 'read' | 'replied' | 'closed'
const STATUSES    = ['new', 'read', 'replied', 'closed'];
const STATUS_LABEL = { new: 'New', read: 'Read', replied: 'Replied', closed: 'Closed' };
const STATUS_CLASS = { new: 'badge-status-new', read: 'badge-status-contacted', replied: 'badge-status-contacted', closed: 'badge-status-converted' };

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.getEnquiries();
      setEnquiries(res.data || []);
    } catch {
      setEnquiries(getLocalEnquiries());
      setError('Backend offline — showing cached data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleStatus = async (id, status) => {
    // Optimistic update
    setEnquiries(prev => prev.map(e => (e._id || e.id) === id ? { ...e, status } : e));
    try {
      await api.updateEnquiryStatus(id, status);
    } catch {
      // Fallback: update in localStorage
      updateLocalStatus(id, status);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Enquiries</div>
          <div className="admin-page-sub">{enquiries.length} total · {enquiries.filter(e => e.status === 'new').length} new</div>
        </div>
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
                <th>Name</th><th>Phone</th><th>City</th><th>Product</th><th>Date</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '36px' }}>No enquiries yet</td></tr>
              )}
              {enquiries.map(e => {
                const eid = e._id || e.id;
                return (
                  <tr key={eid}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{e.name}</div>
                      {e.message && <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2, maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.message}</div>}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>{e.phone}</td>
                    <td>{e.city || e.category || '—'}</td>
                    <td style={{ maxWidth: 160 }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 13 }}>{e.productName || e.product || '—'}</div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: 13, whiteSpace: 'nowrap' }}>
                      {e.date || (e.createdAt ? new Date(e.createdAt).toLocaleDateString('en-IN') : '—')}
                    </td>
                    <td>
                      <select
                        className="status-select"
                        id={`status-${eid}`}
                        value={e.status}
                        onChange={ev => handleStatus(eid, ev.target.value)}
                        style={{
                          color:       e.status === 'new' ? '#3b82f6' : e.status === 'read' ? '#f59e0b' : e.status === 'replied' ? '#8b5cf6' : '#22c55e',
                          borderColor: e.status === 'new' ? 'rgba(59,130,246,0.3)' : e.status === 'read' ? 'rgba(245,158,11,0.3)' : e.status === 'replied' ? 'rgba(139,92,246,0.3)' : 'rgba(34,197,94,0.3)',
                        }}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                      </select>
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
