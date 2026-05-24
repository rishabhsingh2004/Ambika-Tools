// src/data/config.js
// Central config — update all values here once
// 👇 FILL IN YOUR REAL BUSINESS DETAILS BELOW

export const config = {
  businessName: "Ambika Tools",
  ownerName: "Shiv Prakash Soni",
  tagline: "Taaqat Bhi, Bharosa Bhi.",

  // ── Contact Details ─────────────────────────────────────
  phone: "+91 88904 38046",
  phoneDial: "918890438046",
  whatsapp: "918890438046",
  email: "ambikatools1994@gmail.com",

  // ── Business Info ────────────────────────────────────────
  address: "Sunaro Ki Gali, Sarafa Bazaar, Bhilwara, Rajasthan",
  city: "Bhilwara",
  state: "Rajasthan",
  businessHours: "Mon-Sun: 9:00 AM - 8:00 PM",
  founded: "1994",

  // ── Social Media ─────────────────────────────────────────
  instagram: "https://www.instagram.com/ambika.tools?igsh=MWRoNm9xNG52aHlkeA==",
  facebook: "https://www.facebook.com/share/1Bzc7tJrMp/",
};

// WhatsApp message builder
export const waLink = (msg = '') =>
  `https://wa.me/${config.whatsapp}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`;

export const waProductLink = (productName) =>
  waLink(`Hi, I'm interested in: ${productName}. Please share details and pricing.`);

// Instagram deep link
export const igLink = () => config.instagram || null;
