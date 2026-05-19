// src/data/config.js
// Central config — update all values here once
// 👇 FILL IN YOUR REAL BUSINESS DETAILS BELOW

export const config = {
  businessName: "Ambika Tools",
  tagline: "Precision Machines",

  // ── Contact Details ─────────────────────────────────────
  phone: "+91 98765 43210",          // Display format
  phoneDial: "+919876543210",        // For tel: links (no spaces)
  whatsapp: "919876543210",          // For wa.me links (country code, no +)
  email: "info@ambikatools.com",
  salesEmail: "sales@ambikatools.com",

  // ── Business Info ────────────────────────────────────────
  address: "Industrial Zone, Mumbai, Maharashtra, India",
  businessHours: "Mon–Sat: 9:00 AM – 7:00 PM",
  businessHoursSun: "Sunday: 10:00 AM – 4:00 PM",
  foundedYear: "2001",
  gstBilling: true,
  emiAvailable: true,

  // ── Social Media ─────────────────────────────────────────
  // Fill in your actual handles/URLs below:
  instagram: "https://www.instagram.com/ambikatools",  // your IG URL
  facebook: "https://www.facebook.com/ambikatools",    // your FB URL
  youtube: "",                                          // your YouTube channel URL (leave blank to hide)
  linkedin: "",                                         // your LinkedIn URL (leave blank to hide)
};

// WhatsApp message builder
export const waLink = (msg = '') =>
  `https://wa.me/${config.whatsapp}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`;

export const waProductLink = (productName) =>
  waLink(`Hi, I'm interested in: ${productName}. Please share details and pricing.`);

// Instagram deep link
export const igLink = () => config.instagram || null;
