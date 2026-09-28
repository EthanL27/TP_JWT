const express = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');

const router = express.Router();


 // Route protégée (Tous rôles)
 // GET /api/me

router.get('/me', verifyToken, (req, res) => {
  res.status(200).json({
    id: req.user.id,
    email: req.user.email,
    role: req.user.role
  });
});

module.exports = router;
