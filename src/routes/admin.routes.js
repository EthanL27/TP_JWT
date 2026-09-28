const express = require('express');
const { verifyToken, requireRole } = require('../middlewares/auth.middleware');

const router = express.Router();


// Route protégée (Rôle MANAGER uniquement)
// POST /api/admin

router.post('/admin', verifyToken, requireRole('MANAGER'), (req, res) => {
  res.status(200).json({
    status: "Succès",
    message: "Accès autorisé au back-office"
  });
});

module.exports = router;
