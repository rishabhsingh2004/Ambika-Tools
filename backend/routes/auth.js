const express = require('express');
const router = express.Router();
const { login, seed, me } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/seed  — run ONCE to create first admin, then remove or protect
router.post('/seed', seed);

// GET /api/auth/me  — verify token + return admin info
router.get('/me', protect, me);

module.exports = router;
