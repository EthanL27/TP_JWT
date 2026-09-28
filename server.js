// 1. Charger les variables d'environnement (.env)
require('dotenv').config();

const express = require('express');

// 2. Importer les routes modulaires depuis src/routes
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const adminRoutes = require('./src/routes/admin.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// 3. Middlewares globaux
app.use(express.json());

// 4. Branchement des routes sous le préfixe /api
app.use('/api', authRoutes);   // Branche POST /api/login
app.use('/api', userRoutes);   // Branche GET  /api/me
app.use('/api', adminRoutes);  // Branche POST /api/admin

// 5. Démarrage du serveur
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Serveur API REST (Architecture Pro) démarré !`);
  console.log(`📡 En écoute sur : http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
