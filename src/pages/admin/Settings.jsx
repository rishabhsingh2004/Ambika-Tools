import React, { useEffect, useState } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { getSettings, saveSettings } from './utils/store';

const FIELDS = [
  { key: 'businessName', label: 'Business Name', type: 'text', placeholder: 'Ambika Tools' },
  { key: 'phone', label: 'Phone Number', type: 'text', placeholder: '+91 98765 43210' },
  { key: 'whatsapp', label: 'WhatsApp Number', type: 'text', placeholder: '919876543210' },
  { key: 'email', label: 'Email Address', type: 'email', placeholder: 'info@ambikatools.com' },
  { key: 'address', label: 'Business Address', type: 'textarea', placeholder: 'Industrial Zone, Mumbai, Maharashtra' },
  { key: 'businessHours', label: 'Business Hours (Weekdays)', type: 'text', placeholder: 'Mon–Sat: 9:00 AM – 7:00 PM' },
  { key: 'businessHoursSun', label: 'Business Hours (Sunday)', type: 'text', placeholder: 'Sunday: 10:00 AM – 4:00 PM' },
];

export default function AdminSettings() {
  const [form, setForm] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => { setForm(getSettings()); }, []);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    saveSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ maxWidth: 620 }}>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Settings</div>
          <div className="admin-page-sub">Business information saved to your browser</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {FIELDS.map(f => (
          <div key={f.key} className="admin-form-group">
            <label className="admin-label" htmlFor={`settings-${f.key}`}>{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea
                id={`settings-${f.key}`}
                className="admin-textarea"
                value={form[f.key] || ''}
                onChange={e => set(f.key, e.target.value)}
                placeholder={f.placeholder}
              />
            ) : (
              <input
                id={`settings-${f.key}`}
                type={f.type}
                className="admin-input"
                value={form[f.key] || ''}
                onChange={e => set(f.key, e.target.value)}
                placeholder={f.placeholder}
              />
            )}
          </div>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 6 }}>
          <button type="submit" className="btn-primary" id="settings-save">
            <Save size={15} /> Save Settings
          </button>
          {saved && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--success)', fontSize: 14, fontWeight: 600 }}>
              <CheckCircle size={16} /> Settings saved!
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
