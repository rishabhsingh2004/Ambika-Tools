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
    tagline: "Secure lockers for financial institutions",\n    description: "Bank Lockers by Ambika Tools offer the ultimate security solution for financial institutions, banks, and high-security vaults across India. Designed with premium heavy steel and equipped with dual key locking mechanisms, these lockers ensure that valuables remain protected against forced entry, fire, and drilling. Whether you are setting up a new branch in Jaipur or upgrading your existing vault facilities anywhere in Pan India, our bank lockers provide peace of mind. The customizable units can house up to 90+ compartments, clearly numbered from A1 to A90+ for easy management. Trusted by leading financial institutions, Ambika Tools is recognized as a top manufacturer and supplier of secure storage solutions. Choose our bank lockers for unmatched durability, compliance with industry safety standards, and robust protection.",\n    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479587/ambika_tools_products/03-bank-lockers.jpg",
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
    tagline: "Heavy-duty mid-range protection",\n    description: "The 2.5ft Safe from Ambika Tools is a heavy-duty mid-range protection unit ideal for jewellers, corporate offices, and cash-intensive businesses. Weighing in at approximately 537 kg, this safe offers formidable resistance against fire, drills, torches, and burglar attacks. It features a dual locking system combining a high-security digital keypad and a traditional key lock for double protection. Inside, the red carpet lining ensures that delicate valuables like gold, cash, and important documents are stored securely without scratches. As a premier industrial supplier in Jaipur and Pan India, Ambika Tools guarantees that this safe meets the highest security standards. Invest in the 2.5ft Safe for reliable, round-the-clock protection of your most critical assets.",\n    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479602/ambika_tools_products/11-25ft-safe.jpg",
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
    tagline: "High precision digital weighing",\n    description: "The Contech CTL Series Scale is a high-precision digital weighing machine designed specifically for laboratories, jewellery shops, and gold merchants. Delivering an exceptional readability of 0.01g, this scale ensures every measurement is 100% accurate, which is critical for the gold and silver industry. Featuring a clear, bright green LED display, it allows for easy reading under any lighting condition. Ambika Tools, a leading supplier of weighing machines in Jaipur and Pan India, brings you the reliability of the Contech brand. Whether you are weighing precious metals or conducting precise lab experiments, this scale is built for continuous, rigorous use. Upgrade your business operations with the trusted accuracy of the Contech CTL Series.",\n    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479606/ambika_tools_products/15-contech-ctl-series-scale.jpg",
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
    tagline: "Everyday security for home & workplace",\n    description: "Secure your everyday valuables with the Home & Office Safe by Ambika Tools. This compact yet highly secure safe is perfect for storing cash, documents, and jewellery in your home, office, or retail shop. It features a convenient dual lock system (Key + Digital) that allows for quick access while keeping unauthorized users out. The interior is lined with a soft red carpet and includes one adjustable shelf, allowing you to organize your items efficiently. Available in elegant Ivory/White colors, it seamlessly blends into any room decor. As a trusted manufacturer and supplier in India, Ambika Tools ensures that even our compact safes provide robust security. Safeguard your peace of mind with this versatile security solution.",\n    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479597/ambika_tools_products/08-home-office-safe.jpg",
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
    tagline: "India's trusted fire & burglar safe",\n    description: "The AS-6 Single Door Safe (2.25ft) is one of India's most trusted fire and burglar-resistant safes, manufactured and supplied by Ambika Tools. Weighing 370 kg with a 56-litre volume, it is built to withstand extreme attacks and temperatures. The safe features massive 30mm bolts with 2-sided locking for maximum door security. It comes with advanced locking options including Digital, Fingerprint, SMS alerts, and 4G connectivity, putting complete control in your hands. Available in premium finishes like Black, Ivory, Grey, and Black & Gold, it is ideal for jewellers and high-net-worth individuals across Jaipur and Pan India. Protect your highly valuable assets with the uncompromised security of the AS-6 Safe.",\n    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479601/ambika_tools_products/10-as6-single-door-safe-225ft.jpg",
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
    tagline: "Precision weighing for jewellers",\n    description: "Achieve flawless precision with the AND EK-610GD Weighing Scale, proudly supplied by Ambika Tools. Sourced from the renowned A&D Japan brand, this scale is a staple in the jewellery industry for weighing gold and silver with extreme accuracy. It offers a capacity of 600g with a readability of 0.01g, ensuring that even the smallest variations are captured accurately. Designed for durability and consistent performance, the EK-610GD is the preferred choice for jewellers in Jaipur and across India who demand perfection. Its compact footprint and easy-to-use interface make it an essential tool for retail counters and workshops alike. Partner with Ambika Tools for genuine products and top-tier industrial solutions.",\n    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479605/ambika_tools_products/13-and-ek610gd-weighing-scale.jpg",
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
    tagline: "Trusted precision for jewellers",\n    description: "The Essae Jewellery Scale stands as a symbol of trusted precision for jewellers and gold merchants. Featuring a robust stainless steel platform, it offers a weighing capacity of 620g with an ultra-precise 0.01g readability. This scale is engineered to deliver fast, stable, and accurate readings, which are crucial for trading precious metals like gold and silver. As a leading dealer of industrial and commercial scales in India, Ambika Tools highly recommends the Essae brand for its long-lasting reliability and minimal maintenance. Whether you are running a busy retail shop or a wholesale operation, this scale will streamline your weighing processes and ensure complete transparency with your customers.",\n    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479607/ambika_tools_products/16-essae-jewellery-scale.jpg",
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
    tagline: "Secure cash drop for retail & petrol pumps",\n    description: "Optimize your cash management with Drop-In Safes from Ambika Tools. Specifically designed for retail stores, petrol pumps, and hotels, these safes feature a top cash slot that allows employees to securely deposit cash without needing access to the main compartment. Equipped with your choice of digital or mechanical locks and an anti-spoke rotating handle, they provide superior protection against internal theft and external break-ins. Available in discreet Beige and Grey colors, they can easily be installed under counters or in back offices. As a premier supplier in Jaipur and Pan India, Ambika Tools provides innovative security solutions that streamline your daily operations while keeping your cash deposits 100% secure.",\n    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479593/ambika_tools_products/06-luxury-safes-tiger-series.jpg",
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
    tagline: "Indestructible — Nisho Series",\n    description: "The Heavy Duty Fire & Burglar Safe from the Nisho Series is the ultimate indestructible security vault, offered by Ambika Tools. Engineered for jewellers, large corporate offices, and banks, this safe provides top-tier resistance against fire, drills, torches, and burglar tools. It features a robust dual locking system (Digital + Key) and a heavy-duty anti-spoke rotating handle for maximum door reinforcement. Finished in a professional Grey & White exterior, it combines aesthetic appeal with military-grade security. When it comes to protecting high-value inventory and cash across India, businesses trust Ambika Tools as their premier manufacturer and supplier. Invest in the Nisho Series for uncompromising, lifelong protection.",\n    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479585/ambika_tools_products/02-heavy-duty-fire-burglar-safe.jpg",
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
    tagline: "Compact in-room security for hotels",\n    description: "Ensure the safety of your guests' valuables with our premium Hotel Safes by Ambika Tools. These compact, horizontal in-room safes are perfectly sized to fit inside closets or under desks in hotel rooms and resorts. Featuring a user-friendly digital circular keypad and a sturdy D-Handle, guests can easily secure their passports, electronics, and cash. The sleek black finish adds a touch of modern elegance to any room decor. As a trusted B2B supplier in Jaipur and Pan India, Ambika Tools provides high-quality hospitality security solutions that enhance guest satisfaction and reduce liability. Equip your property with our reliable hotel safes for seamless, secure hospitality.",\n    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479591/ambika_tools_products/05-hotel-safes.jpg",
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
    tagline: "Security that makes a statement",\n    description: "Make a bold statement with the Luxury Safes — Tiger Series by Ambika Tools. This safe redefines security by combining high-end aesthetics with impenetrable protection. Featuring a stunning laser-cut tiger print design on an ivory finish, it is designed for luxury homes, master bedrooms, and executive offices. The interior is just as impressive, boasting elegant glass shelves and a velvet-lined drawer to protect your most delicate jewellery and watches. Secured by an advanced digital lock, it ensures quick yet exclusive access. Ambika Tools is proud to be a top supplier of luxury security solutions in India, offering products that do not compromise on style or safety.",\n    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479589/ambika_tools_products/04-drop-in-safes.jpg",
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
    tagline: "Licensed firearm storage — max security",\n    description: "The Gun Safes by Ambika Tools provide maximum security for licensed firearm storage. Designed for licensed owners, police forces, and army personnel, these safes ensure that firearms and ammunition are kept out of unauthorized hands. They feature a dual locking mechanism (Digital + Dual Key) and a robust spanner rotating handle for enhanced door security. Inside, a separate digital lockbox is provided for the safe storage of ammunition or sensitive documents. Finished in a stealthy Grey & White color, our gun safes meet strict safety regulations. Trust Ambika Tools, a leading security manufacturer in India, to deliver heavy-duty protection for your critical defense assets.",\n    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479595/ambika_tools_products/07-gun-safes.jpg",
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
    tagline: "Under-counter security for jewellers",\n    description: "Counter Safes by Ambika Tools offer the perfect under-counter security solution for busy jewellery shops and gold merchants. Designed to be mounted discreetly under the display counter, these safes allow staff to quickly and securely store cash and small valuables during business hours. Each unit features 6-8 individual compartments, secured by a reliable key lock and a spanner handle. The elegant Ivory/Cream color blends seamlessly with commercial interiors. As a specialized B2B supplier in Jaipur and Pan India, Ambika Tools understands the unique security needs of the retail sector. Enhance your store's security and efficiency with our purpose-built counter safes.",\n    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479600/ambika_tools_products/09-counter-safes.jpg",
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
    tagline: "Tall, powerful & premium features",\n    description: "The AS-10 Safe (3.5ft) is a tall, powerful, and premium security vault from Ambika Tools. Weighing a massive 612 kg with a 105-litre capacity, it is designed for businesses that require high-volume secure storage. The safe features a double-step fire resistance door and comprehensive protection with locking bolts on all 4 sides and 4 corners, making it virtually pry-proof. The luxurious interior includes auto LED lighting and a premium carpet lining to protect delicate items. Ideal for large jewellers and corporate headquarters across India, this safe represents the pinnacle of physical security. Choose Ambika Tools for heavy-duty, commercial-grade safe lockers.",\n    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479604/ambika_tools_products/12-as10-safe-35ft.jpg",
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
    tagline: "Accurate gold weighing solution",\n    description: "The AND EK-610V Gold Weighing Scale is an essential tool for any serious gold merchant or jeweller. Manufactured by the globally respected A&D brand and supplied by Ambika Tools, this scale offers a 610g capacity with a highly accurate 0.01g readability. Its sleek black design not only looks professional on the counter but is also built to withstand the rigors of daily commercial use. It provides fast, stable readings, ensuring that your gold transactions are precise and transparent. As a leading distributor of industrial weighing machines in Pan India, Ambika Tools guarantees the authenticity and performance of the EK-610V. Elevate your business accuracy with this premium scale.",\n    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479605/ambika_tools_products/14-and-ek610v-gold-weighing-scale.jpg",
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
    tagline: "Bank-grade vault protection",\n    description: "The Strong Room Door by Ambika Tools offers bank-grade vault protection for the most secure environments. Engineered for banks, private vaults, and large-scale jewellers, this massive door features multi-point locking bolts, an electronic lock combined with a key lock, and a heavy-duty spanner rotating handle. It also includes an inner grill door for daytime access control without compromising security. Finished in a professional Ivory/White, it acts as an impenetrable barrier against burglar attacks, fire, and drilling. Ambika Tools is recognized across Jaipur and India as a premier manufacturer of heavy-duty security installations. Secure your entire vault room with our industry-leading strong room doors.",\n    image: "https://res.cloudinary.com/dts2pni7w/image/upload/v1780479582/ambika_tools_products/01-strong-room-door.jpg",
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
  }
];
