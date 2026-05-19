const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// ── Multer config for image uploads ─────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase()) &&
               allowed.test(file.mimetype);
    cb(ok ? null : new Error('Only image files are allowed.'), ok);
  },
});

// GET  /api/products            — public
router.get('/',    getProducts);

// GET  /api/products/:id        — public
router.get('/:id', getProduct);

// POST /api/products            — admin only
router.post('/',   protect, upload.single('image'), createProduct);

// PUT  /api/products/:id        — admin only
router.put('/:id', protect, upload.single('image'), updateProduct);

// DELETE /api/products/:id      — admin only
router.delete('/:id', protect, deleteProduct);

module.exports = router;
