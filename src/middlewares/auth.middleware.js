const jwt = require('jsonwebtoken');

// Clé secrète lue depuis le fichier .env
const SECRET_KEY = process.env.JWT_SECRET;


// Middleware 1 : Vérifie la validité du Token JWT
// En-tête attendu : Authorization: Bearer <TOKEN>

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Accès refusé. Jeton manquant ou format invalide." });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // On transmet l'utilisateur décodé à la suite
    next();
  } catch (error) {
    return res.status(401).json({ error: "Jeton invalide ou expiré." });
  }
};


// Middleware 2 : Contrôle d'accès basé sur le rôle (RBAC)

const requireRole = (roleAttendu) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== roleAttendu) {
      return res.status(403).json({ error: "Accès interdit. Droits insuffisants." });
    }
    next();
  };
};

module.exports = {
  verifyToken,
  requireRole
};
