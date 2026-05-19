import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, X, Upload, ArrowLeft, Save } from 'lucide-react';
import { getProducts, addProduct, updateProduct, getCategories } from './utils/store';

const BADGES = ['', 'NEW', 'BESTSELLER', 'POPULAR'];

const EMPTY = {
  name: '', categoryId: '', tagline: '',
  specs: [''], badge: '', image: '',
};

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const fileRef = useRef();

  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(getCategories());
    if (isEdit) {
      const products = getProducts();
      const p = products.find(x => x.id === id);
      if (p) {
        setForm({
          name: p.name || '',
          categoryId: p.categoryId || '',
          tagline: p.tagline || '',
          specs: p.specs?.length ? p.specs : [''],
          badge: p.badge || '',
          image: p.image || '',
        });
      }
    }
  }, [id]);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const setSpec = (i, val) => setForm(f => {
    const specs = [...f.specs];
    specs[i] = val;
    return { ...f, specs };
  });

  const addSpec = () => setForm(f => ({ ...f, specs: [...f.specs, ''] }));
  const removeSpec = (i) => setForm(f => ({ ...f, specs: f.specs.filter((_, idx) => idx !== i) }));

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set('image', ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      specs: form.specs.filter(s => s.trim()),
      badge: form.badge || null,
    };
    setTimeout(() => {
      if (isEdit) {
        updateProduct(id, payload);
      } else {
        addProduct(payload);
      }
      navigate('/admin/products');
    }, 400);
  };

  return (
    <div style={{ maxWidth: 680 }}>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">{isEdit ? 'Edit Product' : 'Add Product'}</div>
          <div className="admin-page-sub">{isEdit ? `Editing ID: ${id}` : 'Fill in product details below'}</div>
        </div>
        <button className="btn-ghost" onClick={() => navigate('/admin/products')} id="product-form-back">
          <ArrowLeft size={15} /> Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {/* Product Name */}
        <div className="admin-form-group">
          <label className="admin-label">Product Name *</label>
          <input id="pf-name" className="admin-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. AT-100 Smart Counter" required />
        </div>

        {/* Category */}
        <div className="admin-form-group">
          <label className="admin-label">Category *</label>
          <select id="pf-category" className="admin-select" value={form.categoryId} onChange={e => set('categoryId', e.target.value)} required>
            <option value="">Select category…</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>

        {/* Tagline */}
        <div className="admin-form-group">
          <label className="admin-label">Tagline</label>
          <input id="pf-tagline" className="admin-input" value={form.tagline} onChange={e => set('tagline', e.target.value)} placeholder="Short description shown on cards" />
        </div>

        {/* Badge */}
        <div className="admin-form-group">
          <label className="admin-label">Badge</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {BADGES.map(b => (
              <button type="button" key={b} id={`pf-badge-${b || 'none'}`}
                onClick={() => set('badge', b)}
                style={{
                  padding: '7px 16px', borderRadius: 20,
                  border: `2px solid ${form.badge === b ? '#3b82f6' : 'var(--border)'}`,
                  background: form.badge === b ? 'var(--accent-light)' : 'transparent',
                  color: form.badge === b ? 'var(--accent)' : 'var(--text-secondary)',
                  fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s',
                }}>
                {b || 'None'}
              </button>
            ))}
          </div>
        </div>

        {/* Specifications */}
        <div className="admin-form-group">
          <label className="admin-label">Specifications</label>
          {form.specs.map((spec, i) => (
            <div key={i} className="spec-row">
              <input className="admin-input" id={`pf-spec-${i}`} value={spec} onChange={e => setSpec(i, e.target.value)} placeholder={`Spec ${i + 1}`} />
              <button type="button" onClick={() => removeSpec(i)} className="btn-danger" style={{ padding: '8px 10px' }} disabled={form.specs.length === 1}>
                <X size={14} />
              </button>
            </div>
          ))}
          <button type="button" className="btn-ghost" onClick={addSpec} id="pf-add-spec" style={{ marginTop: 6 }}>
            <Plus size={14} /> Add Spec
          </button>
        </div>

        {/* Image Upload */}
        <div className="admin-form-group">
          <label className="admin-label">Product Image</label>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} id="pf-image-input" />
          <div className="img-upload-area" onClick={() => fileRef.current.click()}>
            <Upload size={24} style={{ color: 'var(--text-muted)', margin: '0 auto 8px', display: 'block' }} />
            <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Click to upload image</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 4 }}>PNG, JPG, WebP supported</div>
            {form.image && <img src={form.image} alt="Preview" className="img-preview" />}
          </div>
          {form.image && !form.image.startsWith('data:') && (
            <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
              Current: <span style={{ color: 'var(--text-primary)' }}>{form.image}</span>
            </div>
          )}
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
          <button type="submit" className="btn-primary" id="pf-submit" disabled={saving}>
            {saving ? 'Saving…' : <><Save size={15} /> {isEdit ? 'Update Product' : 'Add Product'}</>}
          </button>
          <button type="button" className="btn-ghost" onClick={() => navigate('/admin/products')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
