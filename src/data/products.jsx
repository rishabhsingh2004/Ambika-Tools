// src/data/products.jsx
import React from 'react';
import { Banknote, Flame, Scale, Lock } from 'lucide-react';

export const CATEGORIES = [
  { id: 'cash-counting', label: 'Cash Counting Machines', icon: <Banknote size={18} />, color: '#1d4ed8' },
  { id: 'gold-melting', label: 'Gold Melting Machines', icon: <Flame size={18} />, color: '#b45309' },
  { id: 'weighing', label: 'Gold & Silver Weighing Machines', icon: <Scale size={18} />, color: '#15803d' },
  { id: 'safe-locker', label: 'Safe Lockers', icon: <Lock size={18} />, color: '#6d28d9' },
];

export const PRODUCTS = [
  {
    id: "6a1ff1fb25258745de0ef81c",
    categoryId: "safe-locker",
    name: "Bank Lockers",
    tagline: "Secure lockers for financial institutions",
    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479587/ambika_tools_products/03-bank-lockers.jpg",
    price: "Ask for Price",
    specs: [
      "Units: Up to 90+ compartments",
      "Lock Type: Dual Key",
      "Numbering: A1 to A90+",
      "Material: Heavy Steel",
      "Usage: Banks, Financial Institutions"
    ],
    badge: null
  },
  {
    id: "6a1ff1fb25258745de0ef824",
    categoryId: "safe-locker",
    name: "2.5ft Safe",
    tagline: "Heavy-duty mid-range protection",
    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479602/ambika_tools_products/11-25ft-safe.jpg",
    price: "Ask for Price",
    specs: [
      "Dimensions: 24\" W x 24\" D x 30\" H",
      "Weight: 537 kg ±5%",
      "Lock Type: Digital + Key",
      "Resistance: Fire, Drill, Torch, Burglar",
      "Interior: Red Carpet"
    ],
    badge: null
  },
  {
    id: "6a1ff1fb25258745de0ef828",
    categoryId: "weighing",
    name: "Contech CTL Series Scale",
    tagline: "High precision digital weighing",
    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479606/ambika_tools_products/15-contech-ctl-series-scale.jpg",
    price: "Ask for Price",
    specs: [
      "Brand: Contech",
      "Series: CTL Series",
      "Display: Green LED",
      "Readability: 0.01g",
      "Usage: Lab, Jewellery, Gold shops"
    ],
    badge: null
  },
  {
    id: "6a1ff1fb25258745de0ef821",
    categoryId: "safe-locker",
    name: "Home & Office Safe",
    tagline: "Everyday security for home & workplace",
    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479597/ambika_tools_products/08-home-office-safe.jpg",
    price: "Ask for Price",
    specs: [
      "Lock Type: Key + Digital",
      "Interior: Red Carpet Lining",
      "Shelf: 1 Adjustable Shelf",
      "Color: Ivory/White",
      "Usage: Home, Office, Shop"
    ],
    badge: null
  },
  {
    id: "6a1ff1fb25258745de0ef823",
    categoryId: "safe-locker",
    name: "AS-6 Single Door Safe — 2.25ft",
    tagline: "India's trusted fire & burglar safe",
    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479601/ambika_tools_products/10-as6-single-door-safe-225ft.jpg",
    price: "Ask for Price",
    specs: [
      "Weight: 370 kg ±5%",
      "Volume: 56 litres",
      "Inner Dims: 14.3\" W x 11.7\" D x 20.3\" H",
      "Bolts: 30mm, 2-sided locking",
      "Lock: Digital / Fingerprint / SMS / 4G",
      "Colors: Black, Ivory, Grey, Black & Gold"
    ],
    badge: null
  },
  {
    id: "6a1ff1fb25258745de0ef826",
    categoryId: "weighing",
    name: "AND EK-610GD Weighing Scale",
    tagline: "Precision weighing for jewellers",
    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479605/ambika_tools_products/13-and-ek610gd-weighing-scale.jpg",
    price: "Ask for Price",
    specs: [
      "Brand: AND (A&D Japan)",
      "Model: EK-610GD",
      "Capacity: 600g",
      "Readability: 0.01g",
      "Usage: Jewellery, Gold weighing"
    ],
    badge: null
  },
  {
    id: "6a1ff1fb25258745de0ef829",
    categoryId: "weighing",
    name: "Essae Jewellery Scale",
    tagline: "Trusted precision for jewellers",
    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479607/ambika_tools_products/16-essae-jewellery-scale.jpg",
    price: "Ask for Price",
    specs: [
      "Brand: Essae",
      "Capacity: 620g",
      "Readability: 0.01g",
      "Platform: Stainless Steel",
      "Usage: Jewellery, Gold, Silver"
    ],
    badge: null
  },
  {
    id: "6a1ff1fb25258745de0ef81d",
    categoryId: "safe-locker",
    name: "Drop-In Safes",
    tagline: "Secure cash drop for retail & petrol pumps",
    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479589/ambika_tools_products/04-drop-in-safes.jpg",
    price: "Ask for Price",
    specs: [
      "Drop Slot: Top Cash Slot",
      "Lock Type: Digital / Mechanical",
      "Handle: Anti-Spoke Rotating",
      "Colors: Beige, Grey",
      "Usage: Petrol Pumps, Retail, Hotels"
    ],
    badge: null
  },
  {
    id: "6a1ff1fb25258745de0ef81b",
    categoryId: "safe-locker",
    name: "Heavy Duty Fire & Burglar Safe",
    tagline: "Indestructible — Nisho Series",
    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479585/ambika_tools_products/02-heavy-duty-fire-burglar-safe.jpg",
    price: "Ask for Price",
    specs: [
      "Lock Type: Digital + Key",
      "Handle: Anti-Spoke Rotating",
      "Resistance: Fire, Drill, Torch, Burglar",
      "Color: Grey & White",
      "Series: Nisho",
      "Usage: Jewellers, Offices, Banks"
    ],
    badge: null
  },
  {
    id: "6a1ff1fb25258745de0ef81e",
    categoryId: "safe-locker",
    name: "Hotel Safes",
    tagline: "Compact in-room security for hotels",
    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479591/ambika_tools_products/05-hotel-safes.jpg",
    price: "Ask for Price",
    specs: [
      "Lock Type: Digital Circular Keypad",
      "Handle: D-Handle",
      "Color: Black",
      "Form: Compact Horizontal",
      "Usage: Hotel Rooms, Resorts"
    ],
    badge: null
  },
  {
    id: "6a1ff1fb25258745de0ef81f",
    categoryId: "safe-locker",
    name: "Luxury Safes — Tiger Series",
    tagline: "Security that makes a statement",
    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479593/ambika_tools_products/06-luxury-safes-tiger-series.jpg",
    price: "Ask for Price",
    specs: [
      "Design: Tiger Print Laser Cut",
      "Lock Type: Digital",
      "Interior: Glass Shelves + Velvet Drawer",
      "Color: Ivory with Black Print",
      "Usage: Home, Bedroom, Luxury Office"
    ],
    badge: null
  },
  {
    id: "6a1ff1fb25258745de0ef820",
    categoryId: "safe-locker",
    name: "Gun Safes",
    tagline: "Licensed firearm storage — max security",
    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479595/ambika_tools_products/07-gun-safes.jpg",
    price: "Ask for Price",
    specs: [
      "Lock Type: Digital + Dual Key",
      "Inner Lockbox: Digital (ammo/docs)",
      "Handle: Spanner Rotating",
      "Color: Grey & White",
      "Usage: Licensed Owners, Police, Army"
    ],
    badge: null
  },
  {
    id: "6a1ff1fb25258745de0ef822",
    categoryId: "safe-locker",
    name: "Counter Safes",
    tagline: "Under-counter security for jewellers",
    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479600/ambika_tools_products/09-counter-safes.jpg",
    price: "Ask for Price",
    specs: [
      "Units/Set: 6-8 compartments",
      "Lock Type: Key + Spanner Handle",
      "Color: Ivory/Cream",
      "Mounting: Under Counter",
      "Usage: Jewellery Shops, Gold Shops"
    ],
    badge: null
  },
  {
    id: "6a1ff1fb25258745de0ef825",
    categoryId: "safe-locker",
    name: "AS-10 Safe — 3.5ft",
    tagline: "Tall, powerful & premium features",
    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479604/ambika_tools_products/12-as10-safe-35ft.jpg",
    price: "Ask for Price",
    specs: [
      "Dimensions: 24\" W x 21\" D x 42\" H",
      "Weight: 612 kg ±5%",
      "Volume: 105 litres",
      "Interior: Auto LED + Luxury Carpet",
      "Door: Double Step Fire Resistance",
      "Protection: 4 Sides + 4 Corner Bolts"
    ],
    badge: null
  },
  {
    id: "6a1ff1fb25258745de0ef827",
    categoryId: "weighing",
    name: "AND EK-610V Gold Weighing Scale",
    tagline: "Accurate gold weighing solution",
    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479605/ambika_tools_products/14-and-ek610v-gold-weighing-scale.jpg",
    price: "Ask for Price",
    specs: [
      "Brand: AND (A&D)",
      "Model: EK-610V",
      "Capacity: 610g",
      "Readability: 0.01g",
      "Color: Black"
    ],
    badge: null
  },
  {
    id: "6a1ff1fb25258745de0ef81a",
    categoryId: "safe-locker",
    name: "Strong Room Door",
    tagline: "Bank-grade vault protection",
    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479582/ambika_tools_products/01-strong-room-door.jpg",
    price: "Ask for Price",
    specs: [
      "Lock Type: Electronic + Key Lock",
      "Inner Door: Grill Door",
      "Handle: Spanner Rotating",
      "Locking: Multi-point bolts",
      "Color: Ivory/White",
      "Usage: Banks, Vaults, Jewellers"
    ],
    badge: null
  },
  {
    id: "cc-001",
    categoryId: "cash-counting",
    name: "AT-50 Basic Cash Counter",
    tagline: "Best for small shops & retail",
    image: "/cash_counting.png",
    price: "Ask for Price",
    specs: [
      "Speed: 1,000 notes/min",
      "UV + MG Detection",
      "LCD Display",
      "Auto-Start/Stop"
    ],
    badge: null
  },
  {
    id: "gm-001",
    categoryId: "gold-melting",
    name: "AT-GM 1 KG Induction Melter",
    tagline: "Melt up to 1 kg of gold per cycle",
    image: "/gold_melting.png",
    price: "Ask for Price",
    specs: [
      "Capacity: 1 Kg Gold",
      "Max Temp: 1300°C",
      "Induction Technology",
      "Digital Temperature Control"
    ],
    badge: null
  }
];
