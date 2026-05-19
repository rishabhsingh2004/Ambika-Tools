// Admin data store — reads/writes to localStorage
import { PRODUCTS_KEY, ENQUIRIES_KEY, SETTINGS_KEY } from './auth';
import { config as INITIAL_CONFIG } from '../../../data/config.js';

// ─── Seed data (no JSX icons, plain objects) ─────────────────────────────────
const SEED_CATEGORIES = [
  { id: 'cash-counting', label: 'Cash Counting Machines', color: '#1d4ed8' },
  { id: 'gold-melting', label: 'Gold Melting Machines', color: '#b45309' },
  { id: 'weighing', label: 'Gold & Silver Weighing Machines', color: '#15803d' },
  { id: 'safe-locker', label: 'Safe Lockers', color: '#6d28d9' },
];

const SEED_PRODUCTS = [
  { id: 'cc-001', categoryId: 'cash-counting', name: 'AT-50 Basic Cash Counter', tagline: 'Best for small shops & retail', image: '/cash_counting.png', specs: ['Speed: 1,000 notes/min', 'UV + MG Detection', 'LCD Display', 'Auto-Start/Stop'], badge: null },
  { id: 'cc-002', categoryId: 'cash-counting', name: 'AT-100 Smart Note Counter', tagline: 'Ideal for banks & supermarkets', image: '/cash_counter2.png', specs: ['Speed: 1,500 notes/min', 'UV + MG + IR Detection', 'Multi-Currency Support', 'Auto Half-note Detection'], badge: 'BESTSELLER' },
  { id: 'cc-003', categoryId: 'cash-counting', name: 'AT-200 Heavy Duty Counter', tagline: 'For high-volume cash operations', image: '/cash_counting.png', specs: ['Speed: 2,000 notes/min', 'CIS Sensor Technology', 'Batch Counting Mode', 'Thermal Printer Compatible'], badge: null },
  { id: 'cc-004', categoryId: 'cash-counting', name: 'AT-300 Loose Note Sorter', tagline: 'Sort & count simultaneously', image: '/cash_counter2.png', specs: ['Speed: 900 notes/min', 'Note Sorting + Counting', 'UV Detection Built-in', 'Compact Desktop Design'], badge: null },
  { id: 'cc-005', categoryId: 'cash-counting', name: 'AT-500 Floor Model Counter', tagline: 'Professional floor-standing unit', image: '/cash_counting.png', specs: ['Speed: 2,500 notes/min', 'Full CIS + UV + MG + IR', 'Floor Model – Heavy Duty', 'Touchscreen Interface'], badge: 'NEW' },
  { id: 'gm-001', categoryId: 'gold-melting', name: 'AT-GM 1 KG Induction Melter', tagline: 'Melt up to 1 kg of gold per cycle', image: '/gold_melting.png', specs: ['Capacity: 1 Kg Gold', 'Max Temp: 1300°C', 'Induction Technology', 'Digital Temperature Control'], badge: null },
  { id: 'gm-002', categoryId: 'gold-melting', name: 'AT-GM 3 KG Furnace', tagline: 'Industrial capacity furnace', image: '/gold_melting.png', specs: ['Capacity: 3 Kg Gold', 'Max Temp: 1400°C', 'Energy Efficient Design', 'Auto Shutoff Safety'], badge: 'POPULAR' },
  { id: 'gm-003', categoryId: 'gold-melting', name: 'AT-GM Silver Melter', tagline: 'Optimized for gold & silver alloys', image: '/gold_melting.png', specs: ['Capacity: 2 Kg', 'Gold & Silver Compatible', 'Graphite Crucible Included', 'Compact Design'], badge: null },
  { id: 'wm-001', categoryId: 'weighing', name: 'AT-W 200g Precision Scale', tagline: 'Milligram accuracy for jewelry', image: '/weighing_machine.png', specs: ['Capacity: 200g', 'Readability: 0.001g', 'LCD Backlit Display', 'Tare Function'], badge: null },
  { id: 'wm-002', categoryId: 'weighing', name: 'AT-W 500g Gold Weigher', tagline: 'Standard for gold traders', image: '/gold_weighing.png', specs: ['Capacity: 500g', 'Readability: 0.01g', 'Multi-Unit: g/oz/ct', 'RS232 Port'], badge: 'BESTSELLER' },
  { id: 'wm-003', categoryId: 'weighing', name: 'AT-W 1 KG Bullion Scale', tagline: 'For bullion dealers & refineries', image: '/weighing_machine.png', specs: ['Capacity: 1 Kg', 'Readability: 0.05g', 'Steel Pan Construction', 'NABL Certifiable'], badge: null },
  { id: 'wm-004', categoryId: 'weighing', name: 'AT-W 5 KG Silver Scale', tagline: 'Heavy-duty for silver bars', image: '/gold_weighing.png', specs: ['Capacity: 5 Kg', 'Readability: 0.1g', 'Stainless Steel Platform', 'GLP Printout'], badge: 'NEW' },
  { id: 'sl-001', categoryId: 'safe-locker', name: 'AT-Safe 20L Personal Locker', tagline: 'For home & small office use', image: '/safe_locker.png', specs: ['Volume: 20 Litres', 'Electronic Digital Lock', 'Anchor Bolt Holes', 'Emergency Key Backup'], badge: null },
  { id: 'sl-002', categoryId: 'safe-locker', name: 'AT-Safe 50L Office Locker', tagline: 'Secure your documents & cash', image: '/safe_locker.png', specs: ['Volume: 50 Litres', 'Biometric + Pin Access', 'Fire Resistant (30 min)', '10mm Steel Door'], badge: 'POPULAR' },
  { id: 'sl-003', categoryId: 'safe-locker', name: 'AT-Safe 100L Bank Vault', tagline: 'Commercial bank-grade security', image: '/safe_locker.png', specs: ['Volume: 100 Litres', 'Dual Lock – Key + Code', 'Fire + Drill Resistant', 'Certified by BIS'], badge: null },
  { id: 'sl-004', categoryId: 'safe-locker', name: 'AT-Safe Jewellery Locker', tagline: 'Designed for jewellers & showrooms', image: '/safe_locker.png', specs: ['Multiple Shelves & Drawers', 'Velvet-lined Compartments', 'Biometric Lock', 'Anchor-bolted Base'], badge: 'NEW' },
];

// ─── Products ────────────────────────────────────────────────────────────────

export const getProducts = () => {
  try {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(SEED_PRODUCTS));
    return SEED_PRODUCTS;
  } catch {
    return [];
  }
};

export const saveProducts = (products) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = { ...product, id: `prod-${Date.now()}`, createdAt: Date.now() };
  products.unshift(newProduct);
  saveProducts(products);
  return newProduct;
};

export const updateProduct = (id, updates) => {
  const products = getProducts();
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return null;
  products[idx] = { ...products[idx], ...updates, updatedAt: Date.now() };
  saveProducts(products);
  return products[idx];
};

export const deleteProduct = (id) => {
  const products = getProducts().filter(p => p.id !== id);
  saveProducts(products);
};

// ─── Categories ──────────────────────────────────────────────────────────────

export const getCategories = () => SEED_CATEGORIES;

// ─── Enquiries ───────────────────────────────────────────────────────────────

const SEED_ENQUIRIES = [
  { id: 'enq-001', name: 'Ramesh Sharma', phone: '+91 98001 11234', city: 'Mumbai', product: 'AT-100 Smart Note Counter', date: '2026-05-15', status: 'New', message: 'Need 3 units for our bank branch.' },
  { id: 'enq-002', name: 'Priya Mehta', phone: '+91 90002 22345', city: 'Delhi', product: 'AT-GM 3 KG Furnace', date: '2026-05-14', status: 'Contacted', message: 'Interested in bulk order.' },
  { id: 'enq-003', name: 'Suresh Joshi', phone: '+91 87003 33456', city: 'Pune', product: 'AT-Safe 50L Office Locker', date: '2026-05-13', status: 'Converted', message: 'Want to visit showroom.' },
  { id: 'enq-004', name: 'Anjali Verma', phone: '+91 99004 44567', city: 'Ahmedabad', product: 'AT-W 500g Gold Weigher', date: '2026-05-12', status: 'New', message: 'Request for demo.' },
  { id: 'enq-005', name: 'Kiran Patil', phone: '+91 96005 55678', city: 'Nagpur', product: 'AT-500 Floor Model Counter', date: '2026-05-11', status: 'New', message: 'Annual maintenance query.' },
];

export const getEnquiries = () => {
  try {
    const stored = localStorage.getItem(ENQUIRIES_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(SEED_ENQUIRIES));
    return SEED_ENQUIRIES;
  } catch {
    return [];
  }
};

export const saveEnquiries = (enquiries) => {
  localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(enquiries));
};

export const updateEnquiryStatus = (id, status) => {
  const enquiries = getEnquiries();
  const idx = enquiries.findIndex(e => e.id === id);
  if (idx === -1) return;
  enquiries[idx] = { ...enquiries[idx], status };
  saveEnquiries(enquiries);
};

// ─── Settings ────────────────────────────────────────────────────────────────

const DEFAULT_SETTINGS = {
  businessName: INITIAL_CONFIG.businessName,
  phone: INITIAL_CONFIG.phone,
  whatsapp: INITIAL_CONFIG.whatsapp,
  email: INITIAL_CONFIG.email,
  address: INITIAL_CONFIG.address,
  businessHours: INITIAL_CONFIG.businessHours,
  businessHoursSun: INITIAL_CONFIG.businessHoursSun,
};

export const getSettings = () => {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = (settings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};
