import React, { useEffect, useState } from 'react';
import { getEnquiries, updateEnquiryStatus, saveEnquiries } from './utils/store';

const STATUSES = ['New', 'Contacted', 'Converted'];
const STATUS_CLASS = { New: 'badge-status-new', Contacted: 'badge-status-contacted', Converted: 'badge-status-converted' };

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);

  const load = () => setEnquiries(getEnquiries());
  useEffect(() => { load(); }, []);

  const handleStatus = (id, status) => {
    updateEnquiryStatus(id, status);
    load();
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Enquiries</div>
          <div className="admin-page-sub">{enquiries.length} total · {enquiries.filter(e => e.status === 'New').length} new</div>
        </div>
      </div>

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
            {enquiries.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '36px' }}>No enquiries yet</td></tr>
            )}
            {enquiries.map(e => (
              <tr key={e.id}>
                <td>
                  <div style={{ fontWeight: 600 }}>{e.name}</div>
                  {e.message && <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2, maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.message}</div>}
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>{e.phone}</td>
                <td>{e.city}</td>
                <td style={{ maxWidth: 160 }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 13 }}>{e.product}</div>
                </td>
                <td style={{ color: 'var(--text-secondary)', fontSize: 13, whiteSpace: 'nowrap' }}>{e.date}</td>
                <td>
                  <select
                    className="status-select"
                    id={`status-${e.id}`}
                    value={e.status}
                    onChange={ev => handleStatus(e.id, ev.target.value)}
                    style={{
                      color: e.status === 'New' ? '#3b82f6' : e.status === 'Contacted' ? '#f59e0b' : '#22c55e',
                      borderColor: e.status === 'New' ? 'rgba(59,130,246,0.3)' : e.status === 'Contacted' ? 'rgba(245,158,11,0.3)' : 'rgba(34,197,94,0.3)',
                    }}
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
