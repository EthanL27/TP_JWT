const express = require('express');
const jwt = require('jsonwebtoken');
const USERS = require('../data/users');

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;


 // Route publique d'authentification
 // POST /api/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Recherche de l'utilisateur
  const user = USERS.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Identifiants incorrects." });
  }

  // Génération du JWT (valable 15 minutes)
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  };

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: '15m'
  });

  return res.status(200).json({
    token: token
  });
});

module.exports = router;
